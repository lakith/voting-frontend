import * as departmentActions from './actionTypes';
import axios from '../../axios-base'

export const initDepartmentsStart = () => {
    return{
        type:departmentActions.INIT_DEPARTMENTS_START
    }
}

export const initDepartmentsSuccess = (departments)=> {
    return {
        type:departmentActions.INIT_DEPARTMENTS_SUCCESS,
        departments:departments
    }
}

export const initDepartmentsFail = (error)=> {
    return {
        type:departmentActions.INIT_DEPARTMENTS_FAIL,
        error:error
    }
}

export const initDepartments = () => {

    return dispatch => {
        dispatch(initDepartmentsStart())
        axios.get('/department/getAll')
        .then((res => {
            dispatch(initDepartmentsSuccess(res.data))
            console.log(res);
        }))
        .catch((error)=> {
            dispatch(initDepartmentsFail(error.response.data.message))
            // console.log(error);
        })
    }

}