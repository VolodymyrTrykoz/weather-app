import {FETCHING_DATA, FETCHING_SUCCESS} from '../actions/actionTypes';

const initialState = {
    cities: [],
    loading: false
};

const fetchReducers = (state = initialState, action) => {
    switch(action.type){
        case FETCHING_DATA: 
            return {
                ...state,
                loading: true
        }
        case FETCHING_SUCCESS: 
            return {
                ...state,
                cities: [action.payload, ...state.cities],
                loading: false
        }
        default: return state; 
    }
}

export default fetchReducers;