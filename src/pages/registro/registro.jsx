import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { Link } from "react-router-dom"
import { Row, Card, CardHeader, CardBody, CardFooter, CardText, Button, FormGroup, Form, Input, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SelectCategorias from "../categorias/components/SelectCategorias";
import SelectPaquetes from "../paquetes/components/SelectPaquetes";
import {    
  faHome,  
  faTimes,
  faCheck,
  faEye
} from "@fortawesome/free-solid-svg-icons";


class registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: {
        nombres: "",
        direccion: "",
        telefono: "",        
        email: "",                   
        descripcion:"",                
        username:"",
        password:"",        
        rolId:1,
        valor:5,
        snum:0,
        latitude:17.63524,
        longitude:63.25411,
        categoriaId:1,
        paqueteId:1,
        password2:""
      },
      submitted: false,
      tipo:"password"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  
  }
  componentWillUnmount() {}
  
  handleChange = (prop) => (event) => {
    const { cliente } = this.state;
    this.setState({
      cliente: {
        ...cliente,
        [prop]: event.target.value,
      },
    });
  };
  
  handleChanges = (prop) => (event) => {                  
    this.props.vusername('CLIENTE_VERIFICAR_USERNAME',event.target.value)    
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

handleView = () =>{
  const { tipo } = this.state
  this.setState({
    tipo : tipo === "text" ? "password" : "text"
  })
}

handleSubmit(event) {
  event.preventDefault();       
      let dato = this.state.cliente;
      dato.paqueteId = this.props.paquetes.item.id;
      dato.categoriaId = this.props.categorias.item.id;        
      this.props.registrar("CLIENTE_REGISTO", "clientes", dato);
      this.setState({
        submitted: true,
        cliente: {
          nombres: "",
          direccion: "",
          telefono: "",        
          email: "",                   
          descripcion:"",                
          username:"",
          password:"",        
          rolId:1,
          valor:5,
          snum:0,
          latitude:17.63524,
          longitude:63.25411,
          categoriaId:1,
          paqueteId:1,
          password2:""
        }
      }) 
   
}

  render() {
    const { vusername } = this.props.clientes;    
    const { submitted, cliente, tipo } = this.state;
          
    return (
      <div className="pos"
      style={{
            backgroundImage:             
            "url(" + require("../../assets/img/back.jpg") + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',                                        
          }}
      >
      <div className="content">
        <div className="registro">
        {submitted === false ? (
            <>
        <Row>
            <Col md="8">
              <Card className="bg-erp">
                <CardHeader>
                  <h5 className="title text-white">Formulario de Registro</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                  <Row>
                      <Col className="pr-md-1 text-white" md="12">
                        <FormGroup>
                          <label
                          className="text-white"
                          >Nombres</label>
                          <Input
                            type="text"
                            name="nombres"
                            id="nombres"
                            placeholder="nombres"
                            value={cliente.nombres}
                            onChange={this.handleChange("nombres")}        
                            required                    
                          />
                        </FormGroup>
                      </Col>                       
                    </Row>
                    <Row>                      
                      <Col className="pr-md-1" md="6">
                      <FormGroup>
                          <label
                          className="text-white"
                          >Categorías</label>
                          <SelectCategorias/>
                        </FormGroup>
                      </Col>                    
                      <Col className="px-md-1" md="6">
                      <FormGroup>
                          <label
                          className="text-white"
                          >Paquete</label>
                          <SelectPaquetes />
                        </FormGroup>
                      </Col>                      
                    </Row>
               
                    <Row>
                    <Col className="pr-md-1" md="12">
                      <label
                      className="text-white"
                      >Dirección</label>
                      <Input
                          type="text"
                          name="direccion"
                          id="direccion"
                          placeholder="direccion"
                          value={cliente.direccion}
                          onChange={this.handleChange("direccion")}
                          required
                          />  
                      </Col>                                
                    </Row>
                    
                    <Row>
                      <Col className="pr-md-1" md="8">
                      <FormGroup>
                        <label
                        className="text-white"
                        >E-mail</label>                          
                          <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="email"
                            value={cliente.email}
                            onChange={this.handleChange("email")}
                            required
                          />
                        </FormGroup>
                      </Col>                      
                      <Col className="px-md-1" md="4">                        
                        <FormGroup>
                        <label
                        className="text-white"
                        >Teléfono</label>
                          <Input
                          type="text"
                          name="telefono"
                          id="telefono"
                          placeholder="telefono"
                          value={cliente.telefono}
                          onChange={this.handleChange("telefono")}
                          required
                          />
                        </FormGroup>
                      </Col>                   
                    </Row>

                    

                    <Row>
                      <Col className="pr-md-1" md="10">
                      <FormGroup>
                        <label
                        className="text-white"
                        >Username</label>                          
                          <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            value={cliente.username}
                            onChange={this.handleChange("username")}    
                            onBlur={this.handleChanges("username")}                        
                            required
                          />
                        </FormGroup>
                      </Col>                      
                      <Col className="px-md-1" md="2">                        
                      <FontAwesomeIcon 
                        className={ vusername ? "picona" : "picono"} 
                        icon={ vusername ? faCheck : faTimes } />                       
                      </Col>                                       
                    </Row>

                    <Row>                                
                      <Col className="pr-md-1" md="5">                        
                        <FormGroup>
                        <label
                        className="text-white"
                        >Password</label>
                          <Input
                          type={tipo}
                          name="password"
                          id="password"                          
                          value={cliente.password}
                          onChange={this.handleChange("password")}                          
                          minLength="8"
                          required
                          />
                        </FormGroup>
                      </Col>                      
                      <Col className="px-md-1" md="5">                        
                        <FormGroup>
                        <label
                        className="text-white"
                        >Retry - Password</label>
                          <Input
                          type={tipo}
                          name="password2"
                          id="password2"                          
                          value={cliente.password2}
                          onChange={this.handleChange("password2")}
                          required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="1">                        
                      <FontAwesomeIcon 
                        className={ (cliente.password === cliente.password2 && cliente.password2) ? "picona" : "picono"} 
                        icon={ (cliente.password === cliente.password2 && cliente.password2) ? faCheck : faTimes} />
                      </Col>                                         
                    </Row>
                    <Row>                                
                      <Col className="px-md-1" md="2">                        
                      <div className="lgb"> 
                        <FontAwesomeIcon 
                          icon={faEye} 
                          className="ml-3 text-info" 
                          size="1x" 
                          onClick={(e) => {this.handleView()}}
                        />
                        </div>
                      </Col>                                                                     
                    </Row>
                    <Row>
                      <Col>
                      <Button                         
                          className={(cliente.password.toString() === cliente.password2.toString() && cliente.password && vusername ) ? 'btn-xs btn-success': 'btn-xs btn-warning disabled'} 
                          color="success" type="submit">
                          Registrar
                      </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user bg-erp text-white">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatari mt-2"
                        src={require("../../assets/img/log.png")}
                      />
                      <h5 className="title mt-3 text-white">1click-bo.com</h5>
                      <h5 className="title mt-3 text-white">info@1click-bo.com</h5>
                      <h5 className="mt-5 text-white">
                      Registrate gratis por 5 dias, despues elige uno de nuestros paquetes...
                      </h5>
                    </a>                    
                  </div>                  
                </CardBody>
                <CardFooter>
                  <div className="button-container mt-5">                    
                  <Link to={`/admin/login`}>
                  <Button className="btn-icon btn-round text-info" color="twitter">
                    <FontAwesomeIcon icon={faHome} />
                    </Button>            
                  </Link>                     
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          </>
          ) : (
            <>
            <div className="central">
            <Row>            
            <Col md="12">
              <Card className="card-user bg-erp">
                <CardBody>
                  <CardText />
                  <div className="author">                    
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatari mt-2"
                        src={require("../../assets/img/logo.png")}
                      />                     
                    </a>
                    <p className="description mt-4">registro aprobado</p>
                    <p className="description mt-4">Se envió un mail al correo ****</p>
                  </div>                  
                </CardBody>
                <CardFooter>
                  <div className="button-container">   
                  <Link to={`/admin/login`}>
                  <Button className="btn-icon btn-round text-info" color="twitter">
                    <FontAwesomeIcon icon={faHome} />
                    </Button>            
                  </Link>           
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> 
          </div>
            </>
          )}

        </div>  
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
  categorias: state.categorias,
  paquetes: state.paquetes
});

export default connect(mapStateToProps, mapDispatchToProps)(registro);