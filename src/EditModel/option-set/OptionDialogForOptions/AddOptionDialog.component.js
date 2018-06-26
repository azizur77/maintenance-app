import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog/Dialog';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import Heading from 'd2-ui/lib/headings/Heading.component';

import FormButtons from '../../FormButtons.component';
import SaveButton from '../../SaveButton.component';
import CancelButton from '../../CancelButton.component';

import actions from '../actions';
import { showTranslatedOkMessage, showTranslatedMessage, showOkMessage } from '../../../Snackbar/snackBarShortCuts';
import getFirstInvalidFieldMessage from '../../form-helpers/validateFields';

class AddOptionDialog extends Component {
    state = {
        isFormValid: true,
        isSaving: false,
    };

    onUpdateField = (field, value) => {
        actions.updateModel(this.props.model, field, value);
    }

    onSaveSuccess = () => {
        showTranslatedMessage('option_saved');
        this.setState({ isSaving: false });
        this.props.onRequestClose();
        // After the save was successful we request the options from the server to get the updated list
        actions.getOptionsFor(this.props.parentModel);
    }

    onSaveError = ({ message }) => {
        showTranslatedOkMessage(message);
        this.setState({ isSaving: false });
    }

    onSaveOption = () => {
        const invalidFieldMessage = getFirstInvalidFieldMessage(this.props.fieldConfigs, this.formRef);
        if (invalidFieldMessage) {
            showOkMessage(invalidFieldMessage);
        } else {
            this.setState({ isSaving: true });
            actions
                .saveOption(this.props.model, this.props.parentModel)
                .subscribe(this.onSaveSuccess, this.onSaveError);
        }
    }

    setFormRef = (form) => {
        this.formRef = form;
    }

    render() {
        return (
            <Dialog
                open={this.props.isDialogOpen}
                modal
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent
            >
                <Heading>{this.props.title}</Heading>
                <FormBuilder
                    fields={this.props.fieldConfigs}
                    onUpdateField={this.onUpdateField}
                    ref={this.setFormRef}
                />
                <FormButtons>
                    <SaveButton
                        isValid={this.state.isFormValid}
                        onClick={this.onSaveOption}
                        isSaving={this.state.isSaving}
                    />
                    <CancelButton onClick={this.props.onRequestClose} />
                </FormButtons>
            </Dialog>
        );
    }
}

AddOptionDialog.propTypes = {
    fieldConfigs: PropTypes.array,
    title: PropTypes.string,
    isDialogOpen: PropTypes.bool,
    model: PropTypes.object,
    onRequestClose: PropTypes.func.isRequired,
    parentModel: PropTypes.object,
};

AddOptionDialog.defaultProps = {
    parentModel: {},
    model: {},
    fieldConfigs: [],
    isDialogOpen: false,
    title: '',
};

AddOptionDialog.contextTypes = { d2: React.PropTypes.object };

export default AddOptionDialog;
