const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  item: {
    id: "",
    nombre: "",
  },
  items: [],
  modalView: false,
};

export function categorias(state = initialState, action) {
  switch (action.type) {
    case "CATEGORIA_DATA":
      return {
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,
      };
    case "CATEGORIA_LISTA":
      return {
        ...state,
        items: action.response,
      };
    case "CATEGORIA_CHANGE":
      return {
        ...state,
        item: { ...state.item, [
          action.props]: action.value },
      };

    case "CATEGORIA_REGISTRO":
      return {
        ...state,
        modalView: false,
        item: initialState.item,
        data: action.item.data,
        pagina: action.item.pagina,
        paginas: action.item.paginas,
        total: action.item.total,
      };

    case "CATEGORIA_ITEM_REGISTER":
      return {
        ...state,
        modalView: action.state,
        item: action.item === null ? initialState.item : action.item,
      };
    case "CATEGORIA_ITEM":
      return {
        ...state,
        item: action.response,
      };
    case "CATEGORIA_RESET":
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
