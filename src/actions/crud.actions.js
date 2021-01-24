import { crudService } from "../services";
import { alertActions } from "./";
import { createNotification } from "react-redux-notify";
import { pendingTask, begin, end } from "react-redux-spinner";
export const crudActions = {
  getData,
  getLista,
  getItem,
  change,
  changez,
  changes,
  register,
  update,
  registers,
  updates,
  upload,
  banner,
  slider,
  uploads,
  getItemView,
  getItemViews,
  search,
  itemRegister,
  getBuscar,
  aprobar,
  reset,
  item,
  registrar,
  consultas,
  vusername,
  venlace,
  getNota,
  pagar,
  getHorarios,
  getHorariosViews,
  delete: _delete,

};

/*|===================================ALL==========================================|*/
function consultas(xredux, payload, page, num, categoriaId, estado, nombre) {
  return (dispatch) => {
    crudService
      .getConsulta(payload, page, num, categoriaId, estado, nombre)
      .then((response) => {
        dispatch(Datas(xredux, response.result));        
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function getBuscar(xredux, payload, page, num, parametro) {
  return (dispatch) => {
    crudService
      .buscar(payload, page, num, parametro)
      .then((response) => {
        dispatch(Datas(xredux, response.result));
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function getData(xredux, payload, page, num, prop, orden) {  
  return (dispatch) => {
    crudService
      .getData(payload, page, num, prop, orden)
      .then((response) => {                                
        dispatch(Datas(xredux, response.result));        

      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));       
        
      });
  };
}

function aprobar(xredux, payload, dato) {
  return (dispatch) => {
    dispatch(inicial());
    crudService
      .create(payload, dato)
      .then((response) => {
        if (response.result) {
          dispatch(Datas(xredux, response.result.clientes));
        }
        dispatch(createNotification(alertActions.success(response.message)));
        dispatch(final());
      })

      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function Datas(redu, response) {  
  return {
    type: redu,
    response: response,
  };
}
/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function getLista(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .getLista(payload, dato)
      .then((response) => {
        dispatch(Datas(xredux, response.result));
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function Listas(redu, response) {
  return {
    type: redu,
    response: response,
  };
}
/*|==================================END_DALL======================================|*/

/*|===================================RESTART==========================================|*/
function reset(xredux) {
  return (dispatch) => {
    dispatch(Restart(xredux));
    if(xredux === "CLIENTE_RESET")
    {
      dispatch(Restart("CONTRATO_RESET"));
      dispatch(Restart("PLAN_RESET"));
    }
  };
}

export function Restart(redu) {
  return {
    type: redu,
  };
}
/*|==================================END_RESTART======================================|*/

/*|===================================ALL==========================================|*/
function getItem(xredux, payload, id) {
  return (dispatch) => {
    crudService
      .getItem(payload, id)
      .then((response) => {                      
        dispatch(Item(xredux, response.cliente));
        dispatch(Item('SUCURSAL_DATA', response.sucursales));                
        dispatch(Item('HORARIO_DATA', response.horarios));        
        dispatch(Item('CATEGORIA_ITEM', response.cliente.Categorium));
        dispatch(Item('PAQUETE_ITEM', response.cliente.Paquete));             
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function Item(redu, response) {
  return {
    type: redu,
    response: response,
  };
}
/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function changez(xredux, props, event) {  
  return (dispatch) => {
    dispatch(schange(xredux, props, event));
  };
}

function change(xredux, props, event) {
  return (dispatch) => {
    dispatch(schange(xredux, props, event));
  };
}

function changes(xredux, props, event) {
  return (dispatch) => {
    dispatch(schange(props, event));
  };
}
export function schange(redu, props, value) {
  return {
    type: redu,
    props: props,
    value: value,
  };
}
/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function registrar(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .registrar(payload, dato)
      .then((response) => {        
        dispatch(createNotification(alertActions.success("email enviado")));        
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

function register(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .create(payload, dato)
      .then((response) => {                
        dispatch(Registered(xredux, response.result));                      
        dispatch(createNotification(alertActions.success(response.message)));        
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

function update(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .update(payload, dato)
      .then((response) => {        
        console.log(response)
        dispatch(Registered(xredux, response.result));
        dispatch(createNotification(alertActions.success(response.message)));       
        
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function Registered(redu, response) {      
  return {
    type: redu,
    item: response,
  };
}
/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function upload(xredux, payload, data, datoId) {
  return (dispatch) => {
    dispatch(inicial());
    crudService
      .upload(payload, data, datoId)
      .then((response) => {
        dispatch(Up(xredux, response.result));
        dispatch(
          createNotification(alertActions.success("dato actualizado !!"))
        );
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function Up(redu, response) {
  return {
    type: redu,
    response: response,
    [pendingTask]: end,
  };
}

/*|===================================ALL==========================================|*/
function uploads(xredux, payload, data, datoId) {
  return (dispatch) => {
    dispatch(inicial());
    crudService
      .uploads(payload, data, datoId)
      .then((response) => {
        dispatch(Up(xredux, response.result));
        dispatch(
          createNotification(alertActions.success("dato actualizado !!"))
        );
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

function banner(xredux, payload, data, datoId) {
  return (dispatch) => {
    dispatch(inicial());
    crudService
      .banner(payload, data, datoId)
      .then((response) => {
        dispatch(Up(xredux, response.result));
        dispatch(
          createNotification(alertActions.success("dato actualizado !!"))
        );
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

function slider(xredux, payload, data, datoId,slider) {
  return (dispatch) => {
    dispatch(inicial());
    crudService
      .slider(payload, data, datoId,slider)
      .then((response) => {
        dispatch(Up(xredux, response.result));
        dispatch(
          createNotification(alertActions.success("dato actualizado !!"))
        );
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}






/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function getItemView(xredux, payload, id, state) {
  return (dispatch) => {
    crudService
      .getItem(payload, id)
      .then((response) => {
        console.log(response)
        if (xredux === "CLIENTE_ITEM_VIEW") {
          dispatch(ItemView(xredux, response.cliente, state));
          dispatch(ContratoView("CONTRATO_ITEM", response.contrato));
          dispatch(PlanView("PLAN_ITEM", response.plan));          
          
        }
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function ItemView(redu, response, state) {
  return {
    type: redu,
    response: response,
    state: state,
  };
}

export function ContratoView(redu, response) {
  return {
    type: redu,
    response: response
  };
}
export function PlanView(redu, response) {
  return {
    type: redu,
    response: response
  };
}

export function NotaView(redu, response) {
  return {
    type: redu,
    response: response
  };
}

export function HorarioView(redu, response) {
  return {
    type: redu,
    response: response
  };
}

/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function getItemViews(xredux, state) {
  return (dispatch) => {
    dispatch(ItemViews(xredux, state));    
  };
}

export function ItemViews(redu, state) {
  return {
    type: redu,
    state: state,
  };
}

/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function search(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .search(payload, dato)
      .then((response) => {                
        dispatch(Datas(xredux, response.result));        
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

/*|==================================END_DALL======================================|*/

/*|===================================ALL==========================================|*/
function itemRegister(xredux, state, item) {
  return (dispatch) => {
    dispatch(iReg(xredux, state, item));
  };
}

export function iReg(redu, state, item) {
  return {
    type: redu,
    state: state,
    item: item,
  };
}

/*|==================================END_DALL======================================|*/

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


/*|===================================ALL==========================================|*/
function registers(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .create(payload, dato)
      .then((response) => {
        dispatch(Registereds(xredux, response.result));        
        dispatch(createNotification(alertActions.success(response.message)));
        
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

function updates(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .update(payload, dato)
      .then((response) => {
        dispatch(Registereds(xredux, response.result));
        dispatch(createNotification(alertActions.success(response.message)));
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

export function Registereds(redu, response) {
  return {
    type: redu,
    response: response,
  };
}
/*|==================================END_DALL======================================|*/

function _delete(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .delete(payload, dato)
      .then((response) => {
        dispatch(Registereds(xredux, response.result));
        dispatch(createNotification(alertActions.success(response.message)));
      })
      .catch((err) => {        
        dispatch(createNotification(alertActions.error(err.original.detail)));
      });
  };
}

function item(xredux, dato) {
  return (dispatch) => {    
        dispatch(sItem(xredux, dato));              
  };
}

export function sItem(redu, response) {
  return {
    type: redu,
    response: response,
  };
}

function vusername(xredux, dato) {
    return (dispatch) => {
      crudService
        .vusername('clientes',dato)
        .then((response) => {
          dispatch(vUsername(xredux, response.result));                
        })
        .catch((err) => {        
          dispatch(createNotification(alertActions.error(err.original.detail)));
        });
    };        
  };

export function vUsername(redu, response) {
  return {
    type: redu,
    response: response,
  };
}


function venlace(xredux, dato) {
  return (dispatch) => {
    crudService
      .venlace('clientes',dato)
      .then((response) => {
        dispatch(vEnlace(xredux, response.result));                
      })
      .catch((err) => {        
        dispatch(createNotification(alertActions.error(err.original.detail)));
      });
  };        
};

export function vEnlace(redu, response) {
return {
  type: redu,
  response: response ? true : false 
};
}

function getNota(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .getItem(payload,dato)
      .then((response) => {
        dispatch(vNota(xredux, response.result));                
      })
      .catch((err) => {        
        dispatch(createNotification(alertActions.error(err.original.detail)));
      });
  };        
};

export function vNota(redu, response) {
  return {
    type: redu,
    response: response
  };
}

function pagar(xredux, payload, dato) {
  return (dispatch) => {
    crudService
      .pagar(payload,dato)
      .then((response) => {
        dispatch(vPlan(xredux, response.result));               
      })
      .catch((err) => {        
        dispatch(createNotification(alertActions.error(err.original.detail)));
      });
  };        
};

export function vPlan(redu, response) {
  return {
    type: redu,
    response: response
  };
}

/*
function getHorarios(xredux,sucursalId) {
  return (dispatch) => {
    crudService
      .pagar(sucursalId,"sucursalId")
      .then((response) => {
        console.log(response)
        /*dispatch(vPlan(xredux, response.result)); 
      })
      .catch((err) => {        
        dispatch(createNotification(alertActions.error(err.original.detail)));
      });
  };        
};

export function vHorario(redu, response) {
  return {
    type: redu,
    response: response
  };
}
*/

/*|==================================END_DALL======================================|*/
/*getHorariosViews*/
/*|===================================ALL==========================================|*/
function getHorarios(xredux, sucursalId, tipo,state) {
  return (dispatch) => {
    crudService
      .getHorario(sucursalId, tipo)
      .then((response) => {
          dispatch(HorarioData(xredux, response.result, state));          
      })
      .catch((err) => {
        dispatch(createNotification(alertActions.error(err)));
      });
  };
}

function getHorariosViews(xredux,state) {
  return (dispatch) => {    
     dispatch(HorarioDatav(xredux,state));          
  };
}

export function HorarioDatav(redu, state) {
  return {
    type: redu,    
    state: state,
  };
}

export function HorarioData(redu, response, state) {
  return {
    type: redu,
    response: response,
    state: state,
  };
}