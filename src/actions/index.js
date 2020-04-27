import {FETCHING_DATA, FETCHING_SUCCESS} from './actionTypes';
import {weatherApi} from '../api'
const API_KEY = '83b85b775ddc5eb59fa5f291267a3bd6';

const fetchingData = () => ({
    type: FETCHING_DATA
})

const fetchingSuccess = resp => ({
    type: FETCHING_SUCCESS,
    payload: resp
})


export const getRequest = inputValue => async dispatch => {
    dispatch(fetchingData());
    try {
        const resp = await weatherApi.get(`forecast?q=${inputValue}&appid=${API_KEY}`);
        dispatch(fetchingSuccess(resp.data))
    }
    catch(err) {
        console.log(err)
    }
}

