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
    latitude:"",
    longitude:"",    
    tipo:"",
    icon:""
  },
  modalView: false
};

export function sucursales(state = initialState, action) {
  switch (action.type) {    
    case "SUCURSAL_DATA":
        return {
          ...state,
          data: action.response,
          item: initialState.item
        }; 
    case "SUCURSAL_ITEM":
          return {
            ...state,            
            item: action.response
          };          
    case "SUCURSAL_CHANGE":
        return {
          ...state,
          item: { ...state.item, [action.props]: action.value },
        };              
    default:
      return state;
  }
}
