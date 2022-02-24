import { PACER_STATE_CHANGE } from '../constants/pacerConstants';

const intialState = {
    open: false,
    msg: 'Loading'
}

const cart = (state = intialState, action) => {
    switch (action.type) {
        case PACER_STATE_CHANGE: return {
            ...state,
            open: (action.payload.value ? action.payload.value : !state.open),
            msg: (action.payload.msg ? action.payload.msg : 'Loading')
        };
        default: return state;
    }
}

export default cart;