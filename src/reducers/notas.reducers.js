const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  nitem: {
    id: 0,
    nro: "",
    monto:0,
    estado:false,
    imagen:"defualt.jpg",
    contratoId:0
  },  
  modalView: false
};

export function notas(state = initialState, action) {
  switch (action.type) {
    case "NOTA_DATA":
      return {
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,
      };    
    case "NOTA_UPDATE":
      return {
        ...state,
        nitem: action.response,
      };    
    case "NOTA_CHANGE":
      return {
        ...state,
        nitem: { ...state.item, [action.props]: action.value },
      };  
    case "NOTA_CREATE":
      return {
        ...state,
        nitem: initialState.item,
      };    
    case "NOTA_ITEM":
      return {
        ...state,
        nitem: action.response.nota,
        data: action.response.plan
      };
      case "PLAN_ITEM":
        return {
          ...state,          
          data: action.response.planes
        };  
    case "NOTA_ITEM_VIEWS":
      return {
        ...state,
        nitem: initialState.item,
        modalView: action.state
      };    
    case "NOTA_RESET":
      return {
        ...state,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0,
        nitem: initialState.item
      };
    default:
      return state;
  }
}
