import { authHeader, apiErp } from "../helpers";

export const crudService = {
  getData,
  getLista,
  getItem,
  getItemFull,
  create,
  update,
  upload,
  uploads,
  banner,
  slider,
  search,
  buscar,
  getConsulta,
  delete: _delete,
};

function buscar(payload, page, numPage, parametro) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${apiErp}/${payload}/buscar/${page}/${numPage}/${parametro}`,
    requestOptions
  ).then(handleResponse);
}

function getData(payload, page, numPage) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${apiErp}/${payload}/lista/${page}/${numPage}`,
    requestOptions
  ).then(handleResponse);
}

function getLista(payload, name) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${apiErp}/${payload}/listar/${name}`, requestOptions).then(
    handleResponse
  );
}

function getConsulta(payload, page, num, categoriaId,estado,nombre) {  
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${apiErp}/${payload}/lista/${page}/${num}/${categoriaId}/${estado}/${nombre}`, requestOptions).then(
    handleResponse
  );
}

function create(payload, dato) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${apiErp}/${payload}`, requestOptions).then(handleResponse);
}

function getItemFull(payload, id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${apiErp}/${payload}/item/${id}`, requestOptions).then(
    handleResponse
  );
}
function getItem(payload, id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${apiErp}/${payload}/${id}`, requestOptions).then(
    handleResponse
  );
}

function update(payload, dato) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };
  return fetch(`${apiErp}/${payload}/${dato.id}`, requestOptions).then(
    handleResponse
  );
}

function banner(payload, dato, datoId) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: dato,
  };
  return fetch(
    `${apiErp}/${payload}/banner/item/${datoId}`,
    requestOptions
  ).then(handleResponse);
}

function slider(payload, dato, datoId) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: dato,
  };
  return fetch(
    `${apiErp}/${payload}/slider/item/${datoId}`,
    requestOptions
  ).then(handleResponse);
}

function upload(payload, dato, datoId) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: dato,
  };
  return fetch(
    `${apiErp}/${payload}/upload/item/${datoId}`,
    requestOptions
  ).then(handleResponse);
}

function uploads(payload, dato, datoId) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: dato,
  };
  return fetch(
    `${apiErp}/${payload}/uploads/item/${datoId}`,
    requestOptions
  ).then(handleResponse);
}

function search(payload, dato) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(dato),
  };

  return fetch(`${apiErp}/${payload}/search`, requestOptions).then(
    handleResponse
  );
}

function _delete(payload, id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${apiErp}/${payload}/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}