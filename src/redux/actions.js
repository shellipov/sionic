import {
    START_LOADING,
    SUCCESSFUL_LOADING,
    LOADING_ERROR,
} from './actionTypes';
import { API } from "../api/api";


export function startLoading() {
    return {
        type: START_LOADING,
    }
}

export function successfulLoading(data) {
    return {
        type: SUCCESSFUL_LOADING,
        payload: data
    }
}

export function loadingError(data) {
    return {
        type: LOADING_ERROR,
        payload: data
    }
}
export function load(city) {
    return async (dispatch) => {
       
        dispatch(startLoading())
        try {
            const data = await API.get(
                `forecast?appid=ce1fe59a97e1d3ca691fd2a7a7a2db8a&q=${city}&units=metric&lang=ru`,
                {}
              );

            if(data.status === 200){
                dispatch(successfulLoading(data.data.list))
                console.log(data.data.list);
            } else {
                dispatch(loadingError('статус загрузки' + data.status))

            }
        }
        catch (err) {
            dispatch(loadingError(err.message))
        }
    }
}