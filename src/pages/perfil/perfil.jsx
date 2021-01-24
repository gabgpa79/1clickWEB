import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import FormCliente from '../clientes/components/FormCliente'
import Imagenes from '../clientes/components/Imagenes'
import Sucursales from '../sucursales/sucursales'
import Publicidad from '../publicidad/publicidad'
import Horarios from '../horarios/horarios'
import Seguridad from '../clientes/components/Seguridad'


import classnames from 'classnames';

class perfil extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
        activeTab:'2',
        clienteId: 0,
        password2:'0', 
        validate:false,
        igual:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };  

    componentDidMount() {
        const { id } = this.props.users.user;
          this.props.getItem("CLIENTE_ITEM", "clientes", id);
          this.setState({
            clienteId: id,
            file: "",
            imagePreviewUrl: "",
          })        
    }    

    toggle = tab =>{
        const {activeTab, clienteId } = this.state
        if(activeTab !== tab) {
          this.setState({
            activeTab : tab
          },this.props.getItem("CLIENTE_ITEM", "clientes", clienteId)
          )
        }
    
    }
    handleSubmit(event) {
      event.preventDefault();       
          let dato = this.props.clientes.item;
          dato.paqueteId = this.props.paquetes.item.id;
          dato.categoriaId = this.props.categorias.item.id;  
          if (dato.id) { 	    
            this.props.update("CLIENTE_REGISTO", "clientes", dato);
          } else {
            this.props.register("CLIENTE_REGISTO", "clientes", dato);
          }
       
       
    }
  
    handleChange = (prop) => (event) => {
      if (event) {
        this.props.change("CLIENTE_CHANGE", prop, event.value);
      } else {
        this.props.change("CLIENTE_CHANGE", prop, "");
      }
    };
  
    handleChanges = (prop) => (event) => {
      if (event) {
        this.props.change("CLIENTE_CHANGE", prop, event.target.value);
      } else {
        this.props.change("CLIENTE_CHANGE", prop, "");
      }
    };
  
    handleChan = (prop) => (event) => {
      this.props.change("CLIENTE_CHANGE", prop, event);
    };

    handlec = (prop) => (event) => {
      this.setState({
        password2: event.target.value
      })      
    };

    handleDelete = () => {      
      this.props.change("CLIENTE_CHANGE", "password", "");      
      this.setState({
        validate: false
      })
        
    };

    handleValidar = (dato) => {      
      let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if(dato.match(passw)) 
      { 
        this.setState({
          validate: true
        })
      }      
  };


     
  render() {       
    const { activeTab, clienteId, password2, validate, igual } = this.state       
    const { item } = this.props.clientes
    return (
        <div className="content">
        <div className="main-contenido">        
        <Nav tabs>        
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
            onClick={() => { clienteId === 0 ?this.toggle('2') :this.toggle('3'); }}
          >
            Imagenes            
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { clienteId === 0 ?this.toggle('2') :this.toggle('4'); }}
          >
            Sucursales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { clienteId === 0 ?this.toggle('2') :this.toggle('5'); }}
          >
            Publicidad
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { clienteId === 0 ?this.toggle('2') :this.toggle('6'); }}
          >
            Horarios
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '7' })}
            onClick={() => { clienteId === 0 ?this.toggle('2') :this.toggle('7'); }}
          >
            Seguridad
          </NavLink>
        </NavItem>
       
      </Nav>
      <TabContent activeTab={activeTab} className="tabled">
        <TabPane tabId="1">          
                  
        </TabPane>
        <TabPane tabId="2">          
          <FormCliente
            item = { item }
            handleSubmit = { this.handleSubmit }            
            handleChange = { this.handleChange }
            handleChanges = { this.handleChanges }
            handleChan = { this.handleChan }
          />
        </TabPane>
        <TabPane tabId="3">
          <Imagenes />
        </TabPane>
        <TabPane tabId="4">
          <Sucursales/>
        </TabPane>
        <TabPane tabId="5">
          <Publicidad/>
        </TabPane>
        <TabPane tabId="6">
          <Horarios/>
        </TabPane>
        <TabPane tabId="7">
          <Seguridad
            item = { item }
            password2 = {password2}
            handleSubmit = { this.handleSubmit }                        
            handleChanges = { this.handleChanges }
            handlec = { this.handlec }
            handleDelete={ this.handleDelete}
            handleValidar={ this.handleValidar }
            validate = {validate}
            igual = {igual}
          />
        </TabPane>
      </TabContent>
        </div>
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
  clientes: state.clientes,
  paquetes: state.paquetes,
  categorias: state.categorias,
  users: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(perfil);