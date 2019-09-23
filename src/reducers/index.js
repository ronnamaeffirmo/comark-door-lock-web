import { combineReducers } from 'redux'
import log from './log.reducer'
import rfid from './rfid.reducer'

export default combineReducers({
    log,
    rfid
})
