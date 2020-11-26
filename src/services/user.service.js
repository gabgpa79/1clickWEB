import { authHeader, apiErp } from "../helpers";
export const userService = {
  create,
  verificarPatrocinador,
  verificarUsername,
  verificarConfirmacion,
  update,
  login,
  logout,
  totales,
  upload,
  getData,
  habilitarUsuario,
  cambiarPassword
};
function cambiarPassword(data,id) {  
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };            
  return fetch(`${apiErp}/clientes/change/password/${id}`, requestOptions).then(handleResponse);    
}

function login(usuario) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };

  return fetch(`${apiErp}/clientes/login`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.cliente.user));
      localStorage.setItem("token", JSON.stringify(response.cliente.token));
      localStorage.setItem("items", JSON.stringify(response.modulos));
      return response;
    });
}

function habilitarUsuario(usuarioId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${apiErp}/contratos/aprobar/${usuarioId}`, requestOptions).then(
    handleResponse
  );
}

function getData(page, num) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${apiErp}/usuarios/listar/${page}/${num}`, requestOptions).then(
    handleResponse
  );
}

function upload(data, usuarioId) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: data,
  };
  return fetch(`${apiErp}/contratos/${usuarioId}`, requestOptions).then(
    handleResponse
  );
}

function update(usuario) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };
  return fetch(`${apiErp}/clientes/${usuario.id}`, requestOptions).then(
    handleResponse
  );
}

function verificarConfirmacion(enlace) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${apiErp}/clientes/verificarConfirmacion/${enlace}`,
    requestOptions
  ).then(handleResponse);
}

function verificarUsername(usuario) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };

  return fetch(`${apiErp}/clientes/verificarUsername`, requestOptions).then(
    handleResponse
  );
}

function totales(usuario) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };

  return fetch(`${apiErp}/usuarios/totales`, requestOptions).then(
    handleResponse
  );
}
function create(usuario) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };

  return fetch(`${apiErp}/clientes/registrar`, requestOptions).then(
    handleResponse
  );
}

function verificarPatrocinador(enlace) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${apiErp}/usuarios/verificarPatrocinador/${enlace}`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function logout() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("token");
  localStorage.removeItem("items");
}
