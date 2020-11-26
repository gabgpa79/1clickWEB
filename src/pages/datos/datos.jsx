import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { Nav, NavItem, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class datos extends React.Component {
  state = {};

  componentDidMount() {
    /*this.props.getItem('BIBLIOTECA_ITEM','bibliotecas',1)    */
  }

  render() {
    return (
      <div className="content">
        <div className="main-contenido">
          <Row className="subi">
            <Col md="9" className="text-left">
              <Nav tabs className="bg-navin">
                <NavItem>
                  <Link to="/admin/datos" className="nav-link active">
                    <i className="fas fa-chevron-down" /> Configuración
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/admin/paquetes" className="nav-link">
                    <i className="fas fa-chevron-right" /> Paquetes
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/admin/categorias" className="nav-link">
                    <i className="fas fa-chevron-right" /> Categorias{" "}
                  </Link>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3" className="text-right">
              <h5>DATOS</h5>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(datos);
