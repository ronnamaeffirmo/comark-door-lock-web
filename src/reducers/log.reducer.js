import {GET_LOGS} from "../actions/log.actions";

const initialState = {
    logList: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOGS:
            return {
                ...state,
                logList: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
