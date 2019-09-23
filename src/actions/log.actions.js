export const GET_LOGS = 'GET_LOGS'

export const getLogs = () => {
    return async dispatch => {
        try {
            const fetched = await fetch('http://localhost:3030/logs')
            const logs = await fetched.json()

            dispatch({
                type: GET_LOGS,
                payload: logs.data
            })
        } catch (e) {
            console.log('[!] ERR - getLogs -', e.message)
        }
    }
}
