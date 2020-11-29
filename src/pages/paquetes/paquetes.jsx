import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { Modal, Nav, NavItem, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import TablePaquetes from "./components/TablePaquetes";
import PaqueteRegister from "./components/PaqueteRegister";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPlus,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

class Paquetes extends React.Component {
  state = {
    acc1: "nav-links active",
    acc2: "nav-links ",
  };

  toggleModal = () => {
    const state = this.props.paquetes.modalView === true ? false : true;
    this.props.itemRegister("PAQUETE_ITEM_REGISTER", state, null);
  };

  render() {
    const { modalView } = this.props.paquetes;
    const { acc1, acc2 } = this.state;
    return (
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
                  <Link to="/admin/paquetes" className="nav-link active">
                    <FontAwesomeIcon icon={faChevronDown} /> Paquetes
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/admin/categorias" className="nav-link">
                    <FontAwesomeIcon icon={faChevronRight} /> Categorias{" "}
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
                   <i className="fas fa-arrow-left" /> Nuevo Paquete
                </Button>              
            </Col>                            
            <Col md="9">
              
            </Col>          
          </Row> 

          <Row>
            <Col>
              <TablePaquetes />
            </Col>
          </Row>
        </div>

        <Modal
          modalClassName="modal-update"
          isOpen={modalView}
          toggle={this.toggleModal}
        >
          <div className="modal-content">
            <PaqueteRegister />
          </div>
        </Modal>
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
  users: state.users,
  paquetes: state.paquetes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Paquetes);
