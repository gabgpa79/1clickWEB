import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { Table, Button, ButtonGroup, Row, Col, Card } from "reactstrap";
import Pagination from "../../components/Navbars/Pagination";
import ListaCategorias from "../categorias/components/ListaCategorias";
import { apiErp } from "../../helpers";
import Switch from "react-switch";
import SelectsCategorias from "../categorias/components/SelectsCategorias";
import SearchClientes from "../clientes/components/SearchClientes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faEdit,
  faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";

class consultaDetalle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parametro: "",
      nroPagina: 1,
      num: 12,
      submitted: false,
      estado: true
    };
    /*this.handleSubmit = this.handleSubmit.bind(this);*/
  }

  
componentDidMount() {  
  let est =   this.state.estado
  this.makeHttpRequestWithPage(1,12,est);  
}

makeHttpRequestWithPage = (pageNumber,num, est) => {
    this.props.consultas('CONSULTAS_DATA','consultas',pageNumber,num,0,est,0)
}

handleChange = (prop) => (event) => {    
    this.setState({
      [prop]: event,
    });
    this.makeHttpRequestWithPage(1,12,event);  
};


  render() {
    const { parametro, submitted, nroPagina, estado } = this.state;
    const { data, pagina, paginas, total, modalView } = this.props.rconsultas;        
    return (
      <div className="cos">
        <div className="main-cos">
          <Row className="header">
            <Col sm="4">  
            <img
            alt="..."
            src={require("../../assets/img/logo.png")}
            className="mt-2"
            />      
            </Col>
            <Col sm="8">
            <SearchClientes />            
            </Col>
          </Row>
          <Row className="header">
            <Col sm="10">  
            <SelectsCategorias/>          
            </Col>
            <Col sm="2">              
            <Switch                      
                      name="estado"
                      onChange={this.handleChange("estado")}
                      checked={estado}
                      handleDiameter={18}
                      offColor="#fd5d93"
                      onColor="#26e413"
                      offHandleColor="#4d4d4d"
                      onHandleColor="#fff"
                      height={30}
                      width={75}
                      id="estado"
                    />
            </Col>
          </Row>
          <Row>
          <Col className="body">                    
          { data.map((item,index)=>(
          <Link to={`/admin/libro/0`}>
          <Card
          key={item.id}
          className={item.estado ? "productoItem" : "productoItem bg-producto" } >          
          <Row>
            <Col className="cimagen" md="2">
            <img 
            alt="producto" 
            src={apiErp + '/static/images/clientes/sm/'+ item.filename }/>
            </Col>
            <Col className="cnombres" md="10">
            <h6>{ item.nombres }</h6>            
            <p>{ item.direccion }</p>
            <p>{ item.telefono }</p>
              { item.hestado ? 
              <p className="text-success estado" >Abierto </p>
              :
              <p className="text-danger estado">Cerrado </p> }

            </Col>            
          </Row>
          </Card>
          </Link>
          ))
        }           
          </Col>
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
  user: state.user,
  rconsultas: state.rconsultas,
});

export default connect(mapStateToProps, mapDispatchToProps)(consultaDetalle);
