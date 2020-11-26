import { userService } from '../services';
import { alertActions } from './'
import {createNotification} from 'react-redux-notify';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const usuActions = {
    usuData,

    modalView,
    usuReset
};




function modalView(estado){
    return dispatch => {       
    dispatch(modalViews(estado));      
    }
}

function usuReset(){
    return dispatch => {       
    dispatch(ususReset());      
    }
}

export function ususReset(){
    return{        
        type: 'USU_RESET'
    }
}



export function modalViews(state){
    return{        
        type: 'USU_MODAL_VIEW',
        state:state
    }
}



function usuData(page,numPages){
    return dispatch => {  
    dispatch(inicial());              
        userService.getData(page,numPages)
        .then((response)=>{                              
          dispatch(ususData(response.usuarios));
      })
        .catch((err)=>{ dispatch(createNotification(alertActions.error(err)));})
    };
}

export function ususData(response){
    return{        
        type: 'USU_DATA',
        response: response,
        [ pendingTask ]: end                 
    }
}

export function inicial(){
    return{        
        type: 'INICIO',
        [ pendingTask ]: begin                 
    }
}

export function final(){
    return{        
        type: 'FINAL',
        [ pendingTask ]: end                 
    }
}