import * as voteActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility';

const initialState = {
    loading:false,
    voteError:null,
    voteSave:false
}

const voteStart = (state,action) => {
    return updatedObject(state,{loading:true,voteError:null,voteSave:false})
}

const voteSuccess = (state,action) => {
    return updatedObject(state,{loading:false,voteError:null,voteSave:true})
}

const voteFail = (state,action) => {
    return updatedObject(state,{loading:false,voteError:action.error,voteSave:false})
}

const reducer = (state = initialState,action)=>{
    switch(action.type){
        case voteActions.VOTE_INIT_START:
            return voteStart(state,action)
        case voteActions.VOTE_INIT_SUCCESS:
            return voteSuccess(state,action)
        case voteActions.VOTE_INIT_FAIL:
            return voteFail(state,action)
        default:
            return state;
    }
}

export default reducer;