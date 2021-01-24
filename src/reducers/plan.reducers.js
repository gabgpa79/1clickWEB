const initialState = {
  pdata: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  pitem: {
    id: 0,    
    monto:0,
    cuota:0,
    fecha:"",
    estado:"",
    notaId:0,
    fvencimiento:""
  },  
  modalView: false
};

export function plan(state = initialState, action) {
  switch (action.type) {
    case "PLAN_DATA":
      return {
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,
      };    
    case "PLAN_UPDATE":
      return {
        ...state,
        pitem: action.response,
      };    
    case "PLAN_CHANGE":
      return {
        ...state,
        pitem: { ...state.item, [action.props]: action.value },
      };  
    case "PLAN_CREATE":
      return {
        ...state,
        pitem: initialState.item,
      };    
    case "PLAN_ITEM":
      return {
        ...state,
        pdata: action.response
      };
    case "PLAN_ITEM_VIEWS":
      return {
        ...state,
       pitem: initialState.item,
        modalView: action.state
      };    
    case "PLAN_RESET":
      return {
        ...state,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0,
        pitem: initialState.item,
       
      };
    default:
      return state;
  }
}
