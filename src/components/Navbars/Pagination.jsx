import React from "react";
import { Button, Nav } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination({
  makeHttpRequestWithPage,
  total,
  paginas,
  current,
  handlePagina,
  pagina,
}) {
  let renderPageNumbers;
  const pageNumber = [];
  if (total !== null) {
    for (let i = 1; i <= paginas; i++) {
      pageNumber.push(i);
    }
    renderPageNumbers = pageNumber.map((number) => {
      let classes = current === number ? "nav-pag" : "nav-pag disabled";

      if (
        number === 1 ||
        number === total ||
        (number >= current - 2 && number <= current + 2)
      ) {
        return (
          <button
            key={number}
            className={classes}
            onClick={() => makeHttpRequestWithPage(number, pagina)}
          >
            {number}
          </button>
        );
      } else {
        return null;
      }
    });
  }
  return (
    <Nav className="navbar navbar-expand bnavbar">
      <li className="nav-link">
        <Button
          className="nav-link btn-link aa"
          onClick={() => makeHttpRequestWithPage(1, pagina)}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
      </li>

      <li className="nav-link">
        <Button
          className="nav-link btn-link aa"
          onClick={() =>
            makeHttpRequestWithPage(current === 1 ? 1 : current - 1, pagina)
          }
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
      </li>
      {renderPageNumbers}

      <li className="nav-link">
        <Button
          className="nav-link btn-link aa"
          onClick={() =>
            makeHttpRequestWithPage(
              current === paginas ? current : current + 1,
              pagina
            )
          }
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </li>
      <li className="nav-link">
        <Button
          className="nav-link btn-link aa"
          onClick={() => makeHttpRequestWithPage(paginas, pagina)}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      </li>
      <li className="nav-link pull-right">
        página {current} de {paginas}{" "}
      </li>
      <li className="nav-link ml-2">
        <b>{total === 0 ? " Sin resultados" : "Total :" + total + " items"}</b>
      </li>
    </Nav>
  );
}
export default Pagination;
