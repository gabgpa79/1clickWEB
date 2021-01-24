let user  = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));
let items = JSON.parse(localStorage.getItem('items'));

let userId = 0;
let message = '';
let vusername = false;
const initialState = user ? { modalRegister:false, total:0, pagina:0, paginas:0, loggedIn:true, user, token, items, userId, message, vusername } 
                          : { userId, vusername };

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

