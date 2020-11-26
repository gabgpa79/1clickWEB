import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import FormCliente from "./components/FormCliente";
import FormImagenes from "./components/FormImagenes";
import Sucursales from "./components/Sucursales"
import FormPropaganda from "./components/FormPropaganda"
import classnames from 'classnames';
import { Link } from "react-router-dom";

class libros extends React.Component {
  state = {
      activeTab:'2',
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    if (params.clienteId > 0) {
      this.props.getItem("CLIENTE_ITEM", "clientes", params.clienteId);
    }
  }
  
  toggle = tab => {
    const { activeTab } = this.state
    this.setState({
      activeTab : tab
    })
  }
  

  render() {
    const { activeTab } = this.state
    return (
      <div className="content">
        <div className="main-contenido">        
        <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}>
            <Link to={`/admin/clientes`}>
            Lista de Clientes
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            Datos Generales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            Imagenes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { this.toggle('4'); }}
          >
            Sucursales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { this.toggle('5'); }}
          >
            Publicidad
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">          
                  
        </TabPane>
        <TabPane tabId="2">          
            <FormCliente/>            
        </TabPane>
        <TabPane tabId="3">
          <FormImagenes/>
        </TabPane>
        <TabPane tabId="4">
          <Sucursales/>
        </TabPane>
        <TabPane tabId="5">
          <FormPropaganda/>
        </TabPane>
      </TabContent>
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
  clientes: state.clientes,
});

export default connect(mapStateToProps, mapDispatchToProps)(libros);
