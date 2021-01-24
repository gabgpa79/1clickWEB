import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";

import {Modal,Button,ModalBody,Row,Col} from "reactstrap";
import { Link } from "react-router-dom";

import TablaClientes from './components/TablaClientes'
import ClienteView from './components/ClienteView'
import Pagination from "../../components/Navbars/Pagination";
import SearchClientes from "./components/SearchClientes" 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

class clientes extends React.Component {

  state = {
    nroPagina: 12,
    modalDelete: false,
    deleteId: 0,
    item: {
      nombres: "",
      pagina: 1,
      num: 12,
      prop:"nombres",
      orden:"ASC"
    },
  };
 
  componentDidMount() {    
    this.makeHttpRequestWithPage(1, 12, "nombres","ASC");
  }
  
  makeHttpRequestWithPage = (pageNumber, num, prop, orden) => {    
    this.props.getData("CLIENTE_DATA", "clientes", pageNumber, num, prop, orden);
  };

 
  toggleView = (item) => {
    let est = this.props.clientes.modalView === true ? false : true;
    this.props.getItemView("CLIENTE_ITEM_VIEW", "clientes", item, est);    
  };

  toggleModalView = () => {
    let est = this.props.clientes.modalView === true ? false : true;
    this.props.getItemViews("CLIENTE_ITEM_VIEWS", est);
  };

  toggleViewf = (item) => {
    let est = this.props.clientes.modalView === true ? false : true;
    this.props.getItemView("CLIENTE_ITEM_VIEW", "clientes", item, est);
  };

  handleAprobar = (item) => {
    let dato = {
      clienteId: item.id,
      paqueteId: item.paqueteId,
      hestado: true
    };
    this.props.aprobar("CLIENTE_DATA", "contratos", dato);
  };

  handleSearch = (prop) => (value) => {
    let item = this.state.item;
    item[prop] = value.target.value;
    if(value.target.value)
    {
      this.search(value.target.value);
    }else{
      this.search(0);
    }
    
    
  };

  search = (name) => {    
    this.props.search('CLIENTE_DATA','clientes',name)
  };

  componentWillUnmount() {
    /*this.props.reset("CLIENTE_RESET");*/
  }

  
  render() {        
    const { pagina, paginas, total, data, modalView, item } = this.props.clientes;    
    const { nombres } = this.state
    const { citem } = this.props.contrato;    
    const { pdata } = this.props.plan;          
    return (
      <div className="content">
        
        <Modal isOpen={modalView} toggle={this.toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => this.toggleModalView()} >
              <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
              <ClienteView 
                item = { item }
                usuario = {this.props.users.user}                
                citem = { citem }
                pdata = { pdata }
              />
          </ModalBody>
        </Modal>

        <div className="hede">        
        <Row>
          <Col md="3">
              <Link to="/admin/cliente/0">
                <Button className={"btn-xs btn-info"}>
                  <i className="fas fa-arrow-left" /> Nuevo Cliente
                </Button>
              </Link>
          </Col>
          <Col md="8">
            <SearchClientes
            handleSearch={this.handleSearch}
            nombres={nombres}
            />
          </Col>
        </Row>
        </div>

        <Row>
          <Col md="12">
          <TablaClientes
            data = {data}            
            toggleView ={ this.toggleView}
            toggleViewf ={ this.toggleViewf}
            handleAprobar={ this.handleAprobar}            
          />
          </Col>
        </Row>
        <Row>
        <Col>
        <Pagination
                current={pagina}
                paginas={paginas}
                total={total}
                handlePagina={this.handlePagina}
                pagina={12}
                makeHttpRequestWithPage={this.makeHttpRequestWithPage}
              />
        </Col>        
        </Row>  
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
  contrato: state.contrato,
  notas: state.notas,
  plan: state.plan,
  users: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(clientes);