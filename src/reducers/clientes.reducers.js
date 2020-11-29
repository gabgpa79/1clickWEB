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
    Categorium: {
      id: 0,
      nombre: "",
    },
  },
  sucursales: [], 
  sucursal:{
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
  modalView: false,
  vusername: false,
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
    case "SUCURSAL_DATA":
        return {
          ...state,
          sucursales: action.response,
          sucursal: initialState.sucursal
        }; 
    case "SUCURSAL_ITEM":
          return {
            ...state,            
            sucursal: action.response
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
        vusername: action.vusername,
      };
    case "CLIENTE_CHANGE":
      return {
        ...state,
        item: { ...state.item, [action.props]: action.value },
      };
    case "SUCURSAL_CHANGE":
        return {
          ...state,
          sucursal: { ...state.sucursal, [action.props]: action.value },
        };  
    case "CLIENTE_CREATE":
      return {
        ...state,
        item: initialState.item,
      };
    case "CLIENTE_ITEM_VIEW":
      return {
        ...state,
        item: action.response.cliente,
        contrato: action.response.contrato,
        nota: action.response.nota,
        plan: action.response.plan,
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
        item: action.response.cliente,
        sucursales: action.response.sucursales

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
