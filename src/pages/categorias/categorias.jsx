import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { Modal, Nav, NavItem, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableCategorias from './components/TableCategorias'
import CategoriaRegister from './components/CategoriaRegister'


import {  
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

class Categorias extends React.Component {
  state = {
    
  };

  toggleModal = () => {
    const state = this.props.categorias.modalView === true ? false : true;
    this.props.itemRegister("CATEGORIA_ITEM_REGISTER", state, null);
  };

  render() {
    const { modalView } = this.props.categorias;
    
return(
  <div className="content">
  <div className="main-contenido">
    <Row className="subi">
      <Col md="9" className="text-left">
        <Nav tabs className="bg-navin">
          <NavItem>
            <Link to="/admin/datos" className="nav-link">
              <FontAwesomeIcon icon={faChevronRight} /> Configuración
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/paquetes" className="nav-link">
              <FontAwesomeIcon icon={faChevronRight} /> Paquetes
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/admin/categorias" className="nav-link active">
              <FontAwesomeIcon icon={faChevronDown} /> Categorias{" "}
            </Link>
          </NavItem>
        </Nav>
      </Col>            
    </Row>          
    <Row>            
      <Col md="3">              
          <Button 
            className={"btn-xs btn-info"}
            onClick={() => {
              this.toggleModal();
            }}                
          >
             <i className="fas fa-arrow-left" /> Nueva Categoria
          </Button>              
      </Col>                            
      <Col md="9">
        
      </Col>          
    </Row> 

    <Row>
      <Col>
        <TableCategorias/>
      </Col>
    </Row>
  </div>

  <Modal
    modalClassName="modal-update"
    isOpen={modalView}
    toggle={this.toggleModal}
  >
    <div className="modal-content">
      <CategoriaRegister />
    </div>
  </Modal>
</div>
 )
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
  users: state.users,
  categorias: state.categorias,
});

export default connect(mapStateToProps, mapDispatchToProps)(Categorias);