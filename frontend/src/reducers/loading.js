import { RECEIVE_DATA } from '../actions/loading';

export default function loading ( state = true, action ){
    
    // eslint-disable-next-line default-case
    switch(action.type) {
        case RECEIVE_DATA: 
            return false;
        default:
            return state;
    }
};