import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../../actions";
import Pagination from "../../../components/Navbars/Pagination";

import { Row, Col, Table, Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
class TableCategorias extends React.Component {
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
    this.props.getData("CATEGORIA_DATA", "categorias", pageNumber, num);
  };

  handlePagina = (prop) => (event) => {
    this.setState({
      nroPagina: event.value,
    });
    this.makeHttpRequestWithPage(1, event.value);
  };

  componentWillUnmount() {
    this.props.reset("CATEGORIA_RESET");
  }

  toggleModal = (item) => {
    const state = this.props.categorias.modalView === true ? false : true;
    this.props.itemRegister("CATEGORIA_ITEM_REGISTER", state, item);
  };

  handleDelete (itemId){           
    this.props.delete("CATEGORIA_DATA", "categorias", itemId);
   }

  render() {
    const { data, pagina, paginas, total } = this.props.categorias;
    const { nroPagina } = this.state;
    return (
      <div className="simple">      
      <Row>
        <Col>      
          <Table className="table-simple">
              <thead>
                <tr>
                  <th className="text-center" width="5%">
                    #
                  </th>
                  <th width="70%">Nombre</th>                                    
                  <th width="30%" className="text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              {data && (
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.nombre}</td>                                            
                      <td className="text-center">
                        <ButtonGroup>
                          <Button
                            className="btn-success btn-sm"
                            onClick={() => this.toggleModal(item)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>                                             
                          <Button 
                            className="btn-sm btn-danger" 
                            onClick={()=>{this.handleDelete(item.id)}}
                            >
                             <FontAwesomeIcon
                            icon={faTrash}
                            className="text-center text-delete"
                          />
                          </Button>  
                        </ButtonGroup>                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="rpx">
            <Pagination
              current={pagina}
              paginas={paginas}
              total={total}
              handlePagina={this.handlePagina}
              pagina={nroPagina}
              makeHttpRequestWithPage={this.makeHttpRequestWithPage}
            />
          </Col>
        </Row>
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
  categorias: state.categorias,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(TableCategorias);
