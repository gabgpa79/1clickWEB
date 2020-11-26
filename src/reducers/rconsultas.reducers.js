const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  item: {
    id: "",
    nombres: "",
    direccion: "",
    telefono: "",
    celular: "",
    web: "",
    filename: "default.jpg",
    descripcion: "",
    registrado: false,
    habilitado: false,
    hinicio: "",
    hfin: "",
    hestado: "",
    coordenadas: "",
    tipo: 1,
    snum: 0,
    username: "",
    password: "",
    estado: false,
    rolId: 1,
    categoriaId: 1,
    paqueteId: 1,
    email: "",
    Categorium: {
      id: 0,
      nombre: "",
    },
  },  
  modalView: false
};

export function rconsultas(state = initialState, action) {
  switch (action.type) {
    case "CONSULTAS_DATA":
      return {
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,
      };
    case "CONSULTAS_UPDATE":
      return {
        ...state,
        item: action.cliente,
      };
    case "CONSULTAS_CONFIRMAR":
      return {
        ...state,
        item: action.cliente,
      };
    case "CONSULTAS_VERIFICAR_USERNAME":
      return {
        ...state,
        vusername: action.vusername,
      };
    case "CONSULTAS_CHANGE":
      return {
        ...state,
        item: { ...state.item, [action.props]: action.value },
      };
    case "CONSULTAS_CREATE":
      return {
        ...state,
        item: initialState.item,
      };
    case "CONSULTAS_ITEM_VIEW":
      return {
        ...state,
        item: action.response.cliente,
        modalView: action.state,
      };
    case "CONSULTAS_ITEM_VIEWS":
      return {
        ...state,
        item: initialState.item,
        modalView: action.state        
      };
    case "CONSULTAS_ITEM":
      return {
        ...state,
        item: action.response,
      };
    case "CONSULTAS_RESET":
      return {
        ...state,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0,
        item: initialState.item        
      };
    default:
      return state;
  }
}
