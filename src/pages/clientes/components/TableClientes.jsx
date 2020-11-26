import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../../actions";
import { Link } from "react-router-dom";

import {  
  Table,    
  Button,  
  ButtonGroup
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFilePdf,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

class TableClientes extends React.Component {
  state = {
    nroPagina: 12,
    modalDelete: false,
    deleteId: 0,
  };

  componentDidMount() {
    let num = this.state.nroPagina;
    this.makeHttpRequestWithPage(1, num);
  }

  makeHttpRequestWithPage = (pageNumber, num) => {
    this.props.getData("CLIENTE_DATA", "clientes", pageNumber, num);
  };

  componentWillUnmount() {
    this.props.reset("CLIENTE_RESET");
  }
  
  handleAprobar = (item) => {
    let dato = {
      clienteId: item.id,
      paqueteId: item.paqueteId,
      hestado: true
    };
    this.props.aprobar("CLIENTE_DATA", "contratos", dato);
  };

  toggleView = (item) => {
    let est = this.props.clientes.modalView === true ? false : true;
    this.props.getItemView("CLIENTE_ITEM_VIEW", "clientes", item, est);
  };

  toggleViewf = (item) => {
    let est = this.props.clientes.modalView === true ? false : true;
    this.props.getItemView("CLIENTE_ITEM_VIEW", "contratos", item, est);
  };

  toggleModalView = () => {
    let est = this.props.clientes.modalView === true ? false : true;
    this.props.getItemViews("CLIENTE_ITEM_VIEWS", est);
  };


  render() {
    const { data } = this.props.clientes;    
    return (
      <div className="simple">
      
      <Table className="table-simple">
                  <thead>
                <tr>
                  <th className="text-center" width="5%">
                    #
                  </th>
                  <th >Nombre</th>
                  <th >Dirección</th>
                  <th >Teléfono</th>
                  <th >Reg.</th>
                  <th >Hab.</th>
                  <th className="text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              {data && (
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td className="largo">{item.nombres}</td>
                      <td>{item.direccion}</td>
                      <td>{item.telefono}</td>
                      <td>
                        {item.registrado ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-center text-success"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-danger text-danger"
                          />
                        )}
                      </td>
                      <td>
                        {item.habilitado ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-center text-success"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-danger text-danger"
                          />
                        )}
                      </td>

                      <td className="text-center">
                        <ButtonGroup>
                          {item.habilitado === false ? (
                            <>
                              <Button
                                className="btn-success btn-sm"
                                onClick={() => this.handleAprobar(item)}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </Button>
                              <Button
                                className="btn-danger btn-sm"
                                onClick={() => this.toggleView(item.id)}
                              >
                                <FontAwesomeIcon icon={faFilePdf} />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Link to={`/admin/cliente/${item.id}`}>
                                <Button className={"btn-sm btn-info"}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                              </Link>
                              <Button
                                className="btn-danger btn-sm"
                                onClick={() => this.toggleViewf(item.id)}
                              >
                                <FontAwesomeIcon icon={faFilePdf} />
                              </Button>
                            </>
                          )}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
                  </Table>   
                 </div>          
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      ...crudActions,
    },
    dispatch
  ),
});

const mapStateToProps = (state) => ({
  clientes: state.clientes,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(TableClientes);
