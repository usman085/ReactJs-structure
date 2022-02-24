import { PACER_STATE_CHANGE } from '../constants/pacerConstants';

export const toggle = (msg = null, value = null) => {
    return {
        type: PACER_STATE_CHANGE,
        payload: { value, msg }
    }
}

