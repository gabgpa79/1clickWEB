const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  item: {
    id: "",
    nombre: "",
    tiempo: 0,
    fInicio: "",
    fFin: "",
    valor: 0,
  },
  items: [],
  modalView: false,
};

export function paquetes(state = initialState, action) {
  switch (action.type) {
    case "PAQUETE_DATA":
      return {
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,
      };
    case "PAQUETE_LISTA":
      return {
        ...state,
        items: action.response,
      };
    case "PAQUETE_CHANGE":
      return {
        ...state,
        item: { ...state.item, [action.props]: action.value },
      };

    case "PAQUETE_REGISTRO":
      return {
        ...state,
        modalView: false,
        item: initialState.item,
        data: action.item.data,
        pagina: action.item.pagina,
        paginas: action.item.paginas,
        total: action.item.total,
      };

    case "PAQUETE_ITEM_REGISTER":
      return {
        ...state,
        modalView: action.state,
        item: action.item === null ? initialState.item : action.item,
      };
    case "PAQUETE_ITEM":
      return {
        ...state,
        item: action.response,
      };
    case "PAQUETE_RESET":
      return {
        ...state,
        data: [],
        items: [],
        item: initialState.item,
      };
    default:
      return state;
  }
}
