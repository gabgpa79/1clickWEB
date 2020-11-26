import { combineReducers } from "redux";
import notifyReducer from "react-redux-notify";
import { pendingTasksReducer } from "react-redux-spinner";
import { users } from "./users.reducers";
import { usus } from "./usus.reducers";
import { clientes } from "./clientes.reducers";
import { categorias } from "./categorias.reducers";
import { paquetes } from "./paquetes.reducers";
import { rconsultas } from "./rconsultas.reducers";

const rootReducer = combineReducers({
  users,
  usus,
  clientes,
  categorias,
  paquetes,
  rconsultas,
  notifications: notifyReducer,
  pendingTasks: pendingTasksReducer,
});

export default rootReducer;
