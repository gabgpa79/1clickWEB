const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  item: {
    id: 0,
    nombres: "",
    direccion: "",
    telefono: "",
    celular: "",
    web: "",
    filename: "default.jpg",
    descripcion: "",
    registrado: false,
    habilitado: false,
    hinicio: "00:00:00",
    hfin: "00:00:00",
    hestado: false,
    coordenadas: "",
    tipo: "",
    snum: 0,
    username: "",
    password: "",
    estado: false,
    rolId: 1,
    categoriaId: 1,
    paqueteId: 1,
    email: "",
    emergencias:false,
    servicios:false,
    longitude: -17.877973,
    latitude: -63.173716,
    video:'',
    Categorium: {
      id: 0,
      nombre: "",
    },
  },  
  modalView: false,
  vusername: false,
  venlace: false
};

export function clientes(state = initialState, action) {
  switch (action.type) {
    case "CLIENTE_DATA":
      return {
        ...state,
        data: action.response.data,
        pagina: action.response.pagina,
        paginas: action.response.paginas,
        total: action.response.total,
      };    
    case "CLIENTE_UPDATE":
      return {
        ...state,
        item: action.cliente,
      };
    case "CLIENTE_CONFIRMAR":
      return {
        ...state,
        item: action.cliente,
      };
    case "CLIENTE_VERIFICAR_USERNAME":
      return {
        ...state,
        vusername: action.response,
      };
    case "CLIENTE_VERIFICAR_ENLACE":
        return {
          ...state,
          venlace: action.response,
        };  
    case "CLIENTE_CHANGE":
      return {
        ...state,
        item: { ...state.item, [action.props]: action.value },
      };  
    case "CLIENTE_CREATE":
      return {
        ...state,
        item: initialState.item,
      };
    case "CLIENTE_REGISTRO":
        return {
          ...state,
          item: action.item
        };  
    case "CLIENTE_ITEM_VIEW":
      return {
        ...state,
        item: action.response,        
        modalView: action.state,
      };
    case "CLIENTE_ITEM_VIEWS":
      return {
        ...state,
        item: initialState.item,
        modalView: action.state,
        nota: {},
        contrato: {},
        plan: [],
      };
    case "CLIENTE_ITEM":
      return {
        ...state,
        item: action.response

      };
    case "CLIENTE_RESET":
      return {
        ...state,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0,
        item: initialState.item,
        nota: {},
        contrato: {},
        plan: [],
      };
    default:
      return state;
  }
}
