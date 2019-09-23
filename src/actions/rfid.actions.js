export const GET_RFIDS = 'GET_RFIDS'

export const getRfids = () => {
    return async dispatch => {
        try {
            const fetched = await fetch('http://localhost:3030/rfids')
            const rfids = await fetched.json()

            dispatch({
                type: GET_RFIDS,
                payload: rfids.data
            })
        } catch (e) {
            console.log('[!] ERR - getRfids -', e.message)
        }
    }
}

export const createRfid = values => {
    return async dispatch => {
        try {
            await fetch("http://localhost:3030/rfids", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    rfid: values.rfid,
                    owner: values.owner,
                    phoneNumber: values.phoneNumber
                })
            })

            dispatch(getRfids())
        } catch (e) {
            console.log('[!] ERR - createRfid -', e.message)
        }
    }
}