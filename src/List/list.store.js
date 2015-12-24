import {getInstance as getD2} from 'd2/lib/d2';
import {Subject, Observable} from 'rx';
import Store from 'd2-flux/store/Store';

export default Store.create({
    listSourceSubject: new Subject(),

    initialise() {
        this.listSourceSubject
            .concatAll()
            .subscribe(modelCollection => {
                this.setState({
                    pager: modelCollection.pager,
                    list: modelCollection.toArray(),
                });
            });
        return this;
    },

    getListFor(modelName, complete, error) {
        getD2().then(d2 => {
            if (d2.models[modelName]) {
                const listPromise = d2.models[modelName]
                    .list();

                this.listSourceSubject.onNext(Observable.fromPromise(listPromise));

                complete(modelName + ' list loading');
            } else {
                error(modelName + ' is not a valid schema name');
            }
        });
    },

    getNextPage() {
        this.listSourceSubject.onNext(Observable.fromPromise(this.state.pager.getNextPage()));
    },

    getPreviousPage() {
        this.listSourceSubject.onNext(Observable.fromPromise(this.state.pager.getPreviousPage()));
    },

    searchByName(modelType, searchString, complete, error) {
        getD2().then(d2 => {
            if (!d2.models[modelType]) {
                error(modelType + ' is not a valid schema name');
            }

            let modelDefinition = d2.models[modelType];

            if (searchString) {
                modelDefinition = d2.models[modelType].filter().on('displayName').ilike(searchString);
            }

            const listSearchPromise = modelDefinition.list({fields: 'name,id,code,description'});

            this.listSourceSubject.onNext(Observable.fromPromise(listSearchPromise));

            complete(modelType + ` list with search on 'name' for '${searchString}' is loading`);
        });
    },
}).initialise();
