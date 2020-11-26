import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { CardFooter, CardHeader, CardTitle, CardBody, Row, Col, Card } from "reactstrap";
import { apiErp } from "../../helpers";
import Switch from "react-switch";
import SelectsCategorias from "../categorias/components/SelectsCategorias";
import SearchClientes from "../clientes/components/SearchClientes";
import { Link } from "react-router-dom";

class consultas extends React.Component {
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
    const { estado } = this.state;
    const { data } = this.props.rconsultas;        
    return (
      <div className="content">
        <div className="consulta">
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    <Row>
                      <Col md="5">
                      <img
                        alt="..."
                        src={require("../../assets/img/logo.png")}
                        className="mt-2"
                      /> 
                      </Col>
                      <Col md="7">
                      
                      </Col>
                    </Row>                    
                  </CardTitle>
                  <Row>
                    <Col md="6">
                      <SelectsCategorias/>      
                    </Col>
                    <Col md="4">
                      <SearchClientes /> 
                    </Col>                      
                    <Col md="2">
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
                      width={50}
                      id="estado"
                    />  
                    </Col>
                    </Row>                    
                </CardHeader>
                <CardBody>                  
                { data.map((item,index)=>(
                  <Link to={`/consulta/item/${item.id}`}>
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
              ))}
                </CardBody>
                <CardFooter>
                
                </CardFooter>
              </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(consultas);
