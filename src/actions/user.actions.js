import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";
import { createNotification } from "react-redux-notify";
import { pendingTask, begin, end } from "react-redux-spinner";

export const userActions = {
  verificarEnlace,
  verificarConfirmacion,
  verificarUsername,
  usuarioCreate,
  usuarioUpdate,
  changePassword,
  login,
  logout,
};

function changePassword(data){
  return dispatch => {               
  dispatch(inicial());  
      userService.cambiarPassword(data,data.id)
      .then((response)=>{                                                     
          dispatch(createNotification(alertActions.success("se envio la solicitud al mail indicado !!")));
  dispatch(final());          
      })
      .catch((err)=>{           
        dispatch(createNotification(alertActions.error(err))); })
  }
}

function verificarConfirmacion(enlace) {
  return (dispatch) => {
    dispatch(inicial());
    userService
      .verificarConfirmacion(enlace)
      .then((response) => {
        dispatch(usuariosConfirmar(response.result));
        dispatch(categoriaItem(response.result.Categorium));
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function categoriaItem(response) {
  return {
    type: "CATEGORIA_ITEM",
    response: response,
  };
}

export function usuariosConfirmar(response) {
  return {
    type: "CLIENTE_CONFIRMAR",
    cliente: response,
    [pendingTask]: end,
  };
}

function usuarioUpdate(usuario) {
  return (dispatch) => {
    dispatch(inicial());
    userService
      .update(usuario)
      .then((response) => {
        dispatch(usuarioUpd(response.result));

        dispatch(
          createNotification(alertActions.success("dato actualizado !!"))
        );
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function usuarioUpd(response) {
  return {
    type: "CLIENTE_UPDATE",
    cliente: response,
    [pendingTask]: end,
  };
}

/*****************/
function verificarUsername(usuario) {
  return (dispatch) => {
    dispatch(inicial());
    userService
      .verificarUsername(usuario)
      .then((response) => {
        dispatch(usuariosVerificar(response.result));
      })
      .catch((err) => {
        dispatch(usuariosVerificar(false));
        /*dispatch(createNotification(alertActions.error(err)));*/
      });
  };
}

export function usuariosVerificar(response) {
  return {
    type: "CLIENTE_VERIFICAR_USERNAME",
    vusername: response,
    [pendingTask]: end,
  };
}

/*****************/

/*****************/
function usuarioCreate(usuario) {
  return (dispatch) => {
    dispatch(inicial());
    userService
      .create(usuario)
      .then((response) => {
        dispatch(usuariosCreate(response));
        dispatch(createNotification(alertActions.success("mail enviado !!")));
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function usuariosCreate(response) {
  return {
    type: "CLIENTE_CREATE",
    response: response,
    [pendingTask]: end,
  };
}

/*****************/
function verificarEnlace(enlace) {
  return (dispatch) => {
    dispatch(inicial());
    userService
      .verificarPatrocinador(enlace)
      .then((response) => {
        dispatch(vEnlace(response));
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function vEnlace(response) {
  return {
    type: "USUARIO_VERIFICAR_ENLACE",
    message: response.message,
    patrocinador: response.patrocinador,
    [pendingTask]: end,
  };
}

/******************************************/
function login(user) {
  return (dispatch) => {
    dispatch(inicial());
    userService
      .login(user)
      .then((response) => {
        console.log(response);
        dispatch(LOGIN(response.cliente.user, response.modulos));
        dispatch(
          createNotification(alertActions.success(response.cliente.message))
        );
        history.push("/admin");
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
        dispatch(final());
      });
  };
}

export function LOGIN(user, data, billetera, donacion, comision) {
  return {
    type: "LOGIN_SUCCESS",
    user: user,
    items: data,
    [pendingTask]: end,
  };
}

function logout() {
  return (dispatch) => {
    userService.logout();
    dispatch(loginOut());
    history.push("/admin");
  };
}

export function loginOut() {
  return {
    type: "LOGIN_LOGOUT",
  };
}
/******************************************/

export function inicial() {
  return {
    type: "INICIO",
    [pendingTask]: begin,
  };
}

export function final() {
  return {
    type: "FINAL",
    [pendingTask]: end,
  };
}
