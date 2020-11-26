
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import TableClientes from "./components/TableClientes";
import ClienteView from "./components/ClienteView";
import SearchCliente from "./components/SearchCliente"
import { Link } from "react-router-dom";
import {  
  Modal,
  Button,
  ModalBody,  
  Row,
  Col
} from "reactstrap";
import Pagination from "../../components/Navbars/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

class clientes extends React.Component {
  state = {
    nroPagina: 12
  };
  makeHttpRequestWithPage = (pageNumber, num) => {
    this.props.getData("CLIENTE_DATA", "clientes", pageNumber, num);
  };

  handlePagina = (prop) => (event) => {
    this.setState({
      nroPagina: event.value,
    });
    this.makeHttpRequestWithPage(1, event.value);
  };
  toggleModalView = () => {
    let est = this.props.clientes.modalView === true ? false : true;
    this.props.getItemViews("CLIENTE_ITEM_VIEWS", est);
  };
  render() {
    const { data, pagina, paginas, total, modalView } = this.props.clientes;
    const { nroPagina } = this.state;
    return (
      <>
        <div className="content">
        <Modal isOpen={modalView} toggle={this.toggleModalView}>
            <Button className="btn-view btn-danger"  onClick={() => this.toggleModalView()} >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <ModalBody>
              <ClienteView />
            </ModalBody>
          </Modal>
          
          <Row>            
            <Col md="3">
              <Link to="/admin/cliente/0">
               <Button className={"btn-xs btn-info"}>
                   <i className="fas fa-arrow-left" /> Nuevo Cliente
                      </Button>
              </Link>
            </Col>                            
            <Col md="9">
              <SearchCliente/>
            </Col>          
          </Row> 
          <Row>
            <Col md="12" className="table-basic">              
            <TableClientes />    
            </Col>          
          </Row>  
          <Row>
          <Col>
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
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(clientes);
