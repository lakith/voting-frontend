import * as departmentActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility';

const initialState = {
    departments:null,
    loading:false,
    depError:null
}

const deptStart = (state,action) => {
    return updatedObject(state,{loading:true,depError:null})
}

const deptSubmitSuccess = (state,action) => {
    let dept = []
    action.departments.map((department)=>{
        let skeliton = {
            key: department.departmentId, 
            text: department.departmentName,
            value: department.departmentId
        }
        dept.push(skeliton)
        return dept;
    })
    console.log(dept);

    return updatedObject(state,{loading:false,depError:null,departments:dept})
}

const deptSubmitErrors = (state,action) => {
    return updatedObject(state,{depError:action.error,loading:false})
}

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case departmentActions.INIT_DEPARTMENTS_START:
            return deptStart(state,action)
        case departmentActions.INIT_DEPARTMENTS_SUCCESS:
            return deptSubmitSuccess(state,action)
        case departmentActions.INIT_DEPARTMENTS_FAIL:
            return deptSubmitErrors(state,action)
        default:
            return state;
    }
}

export default reducer;
