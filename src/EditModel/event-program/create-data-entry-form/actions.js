const actionCreator = type => payload => ({ type, payload })

export const PROGRAM_STAGE_DATA_ELEMENTS_ORDER_CHANGE =
    'PROGRAM_STAGE_DATA_ELEMENTS_ORDER_CHANGE'
export const PROGRAM_STAGE_DATA_ELEMENTS_ORDER_CHANGE_COMPLETE =
    'PROGRAM_STAGE_DATA_ELEMENTS_ORDER_CHANGE_COMPLETE'

export const PROGRAM_STAGE_SECTIONS_ORDER_CHANGE =
    'PROGRAM_STAGE_SECTIONS_ORDER_CHANGE'
export const PROGRAM_STAGE_SECTIONS_ADD = 'PROGRAM_STAGE_SECTIONS_ADD'
export const PROGRAM_STAGE_SECTIONS_REMOVE = 'PROGRAM_STAGE_SECTIONS_REMOVE'
export const PROGRAM_STAGE_SECTION_NAME_EDIT = 'PROGRAM_STAGE_SECTION_NAME_EDIT'

export const changeProgramStageDataElementOrder = actionCreator(
    PROGRAM_STAGE_DATA_ELEMENTS_ORDER_CHANGE
)
export const changeProgramStageSectionOrder = actionCreator(
    PROGRAM_STAGE_SECTIONS_ORDER_CHANGE
)
export const addProgramStageSection = actionCreator(PROGRAM_STAGE_SECTIONS_ADD)
export const removeProgramStageSection = actionCreator(
    PROGRAM_STAGE_SECTIONS_REMOVE
)
export const editProgramStageSectionName = actionCreator(
    PROGRAM_STAGE_SECTION_NAME_EDIT
)
