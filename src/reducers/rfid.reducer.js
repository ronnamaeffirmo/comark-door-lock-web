import {GET_RFIDS} from "../actions/rfid.actions";

const initialState = {
    rfidList: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_RFIDS:
            return {
                ...state,
                rfidList: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
