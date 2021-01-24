const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  citem: {
    id: 0,
    motivo: "",
    subTotal:0,
    totalSaldo:0,
    total:0,
    estado:false,
    fContrato:'',
    fVencimiento:'',
    clienteId:0,
    paqueteId:1    
  },  
  modalView: false
};

export function contrato(state = initialState, action) {
  switch (action.type) {
    case "CONTRATO_DATA":
      return {
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,
      };    
    case "CONTRATO_UPDATE":
      return {
        ...state,
        citem: action.response,
      };    
    case "CONTRATO_CHANGE":
      return {
        ...state,
        citem: { ...state.item, [action.props]: action.value },
      };  
    case "CONTRATO_CREATE":
      return {
        ...state,
        citem: initialState.item,
      };    
    case "CONTRATO_ITEM":
      return {
        ...state,
        citem: action.response
      };
    case "CONTRATO_ITEM_VIEWS":
      return {
        ...state,
        citem: initialState.item,
        modalView: action.state
      };    
    case "CONTRATO_RESET":
      return {
        ...state,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0,
        citem: initialState.item
      };
    default:
      return state;
  }
}
