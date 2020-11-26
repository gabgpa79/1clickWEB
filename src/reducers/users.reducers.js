let user  = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));
let items = JSON.parse(localStorage.getItem('items'));
let data = [];
let userId = 0;
let name = '';
let proceso = '';
let message = '';
let vusername = false;
let patrocinador = {
  'id':'',
  'nombres':'',
  'estado':'',
  'email':''
};
let usuario = {
  'id':'',
  'nombres':'',
  'estado':'',
  'email':'',
  'password':'',
  'foto':''
}
const initialState = user ? { modalRegister:false, total:0, pagina:0, paginas:0, loggedIn:true, user, token, items, data, userId, name, proceso, patrocinador, message, vusername, usuario } 
                          : {data, userId, vusername, name, proceso, patrocinador, usuario };

export function users(state = initialState, action) {
  switch (action.type) {         
    case 'USUARIO_VERIFICAR_ENLACE':
      return {  
         ...state,         
         message: action.message,
         patrocinador: action.patrocinador
      };    
    case 'USUARIO_VERIFICAR_USERNAME':
      return {  
         ...state,                  
         vusername: action.vusername
      };                                        
    case 'USUARIO_CONFIRMAR':
      return {  
         ...state,                  
         usuario: action.usuario
      };   
    case 'USUARIO_UPDATE':
      return {  
         ...state,                  
         usuario: action.usuario
      };  
    case 'LOGIN_SUCCESS':
      return { 
        ...state,
          loggingIn: true,
          user: action.user,
          proceso: action.proceso,
          items: action.items
      };
    case 'LOGIN_USER':
      return {           
          ...state
      };
    case 'LOGIN_LOGOUT':
      return {           
          user: {},
          token:{},
          items:[],
          proceso:{}
      };                                          
    default:
      return state
  }
}

