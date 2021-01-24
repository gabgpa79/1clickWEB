import { combineReducers } from "redux";
import notifyReducer from "react-redux-notify";
import { pendingTasksReducer } from "react-redux-spinner";
import { users } from "./users.reducers";
import { usus } from "./usus.reducers";
import { clientes } from "./clientes.reducers";
import { sucursales } from "./sucursales.reducers";
import { categorias } from "./categorias.reducers";
import { paquetes } from "./paquetes.reducers";
import { rconsultas } from "./rconsultas.reducers";
import { horario } from "./horario.reducers"
import { contrato } from "./contrato.reducers"
import { plan } from "./plan.reducers"
import { notas } from "./notas.reducers"

const rootReducer = combineReducers({
  users,
  usus,
  clientes,
  categorias,
  paquetes,
  rconsultas,
  sucursales,
  horario,
  contrato,
  plan,
  notas,
  notifications: notifyReducer,
  pendingTasks: pendingTasksReducer,
});

export default rootReducer;
