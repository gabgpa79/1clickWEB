const initialState = { 
    data:[],    
    items:[],
    pagina:0,
    paginas:0,
    total:0,
    item:{
      id:'',
      nombre:'',
      username:'',
      password:'',
      enabled:'',      
      rolId:1
    },
    contrato:{},
    nota:{},
    modalView:false
} ;

export function usus(state = initialState, action) {
  switch (action.type) {    
    case 'USU_DATA':
      return {                   
        ...state,
        data: action.response.data,
        pagina:action.response.pagina,
        paginas:action.response.paginas,
        total:action.response.total
      };
    case 'USU_RESET':
      return {                   
        ...state,
        data: [],
        pagina: 0,
        paginas:0,
        total:0,
        contrato:{},
        nota:{}
      };       
    case 'USU_DETALLE':
      return {                           
        ...state,
        modalView: action.state,
        contrato: action.contrato,
        nota: action.nota
      };  
    case 'USU_MODAL_VIEW':
      return {                           
        ...state, 
        modalView: action.state,
        item: initialState.item     
      };                                        
    default:
      return state
  }    
}
