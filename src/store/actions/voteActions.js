import * as voteActions from './actionTypes'
import axios from '../../axios-base'

export const initVoteStart = () => {
    return{
        type:voteActions.VOTE_INIT_START
    }
}

export const voteSuccess = () => {
    return{
        type:voteActions.VOTE_INIT_SUCCESS
    }
}

export const voteFail = (error) => {
    return{
        type:voteActions.VOTE_INIT_FAIL,
        error:error
    }
}

export const initVoteSave= (voteData,token) => {
    return dispatch => {
        dispatch(initVoteStart())
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token 
        }
        axios.post("staffUser/saveVote", voteData, {headers: headers})
            .then((response) => {
                console.log(response)
                dispatch(voteSuccess())
            })
            .catch((error) => {
                console.log(error.response)
                dispatch(voteFail(error.response.data.message))
            })
    } 
}