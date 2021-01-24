const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,    
  item:{
    id: "",
    nombre: "",
    direccion:"",
    telefono:"",
    celular:"",
    longitude:"",
    latitude:"",
    tipo:"",
    icon:""
  },
  modalView: false
};

export function horario(state = initialState, action) {
  switch (action.type) {    
    case "HORARIO_DATA":
        return {
          ...state,
          data: action.response,
          item: initialState.item
        }; 
    case "HORARIO_ITEM":
          return {
            ...state,            
            item: action.response
          };          
    case "HORARIO_CHANGE":
        return {
          ...state,
          item: { ...state.item, [action.props]: action.value },
        };
    case "HORARIO_UPDATE":
          return {
            ...state,
            data: action.item
          };     
    case "HORARIO_DATA_VIEW":
            return {
              ...state,
              data: action.response,        
              modalView: action.state
            };
    case "HORARIO_DATA_VIEWS":
            return {
              ...state,
              data: [],
              modalView: action.state              
            };                   
    default:
      return state;
  }
}
