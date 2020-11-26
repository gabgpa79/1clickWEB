import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../actions";
import { Row, CardText, CardFooter, Card, CardHeader, CardBody, Button, ButtonGroup, FormGroup, Form, Input, Col } from "reactstrap";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,  
  faHome
} from "@fortawesome/free-solid-svg-icons";

class verificar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: {
        id:'',
        password:'',
        passwords:'',
      },
      submitted: false,
      io: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;   
    const enlace  = params.token    
    const usuario = (parseInt(enlace.substring(41,68)) / 3) - 4745    
    console.log(usuario)
    this.setState({
      cliente:{
        id : usuario
      }
    })
  }
  componentWillUnmount() {}

  handleSubmit(event) {
    event.preventDefault();
    const { cliente } = this.state;          
    this.props.changePassword(cliente)
    this.setState({    
      cliente:{
        id:'',
        password:'',
        passwords:''
      },
      submitted: true    
  }) 
  }

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
    const { io } = this.state;
    this.setState({
      io: !io,
    });
  };

  render() {
    const { io, submitted, cliente } = this.state;    
    const ty = io ? "password" : "text";
    const est = io ? (
      <FontAwesomeIcon icon={faEye}       
      onClick={this.handleChanges()}
      className="text-success mt-4"

      />      
    ) : (
      <FontAwesomeIcon icon={faEyeSlash} 
      onClick={this.handleChanges()}
      className="text-danger mt-4"
      />
    );

    const obj = submitted === false ? (
        <>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Ingresa tu nueva contraseña</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="7">
                        <FormGroup>
                          <label>Nombre</label>
                          <Input 
                            type={ ty }
                            name="password"
                            id="password"
                            value={ cliente.password }
                            placeholder="password"
                            onChange= {this.handleChange('password')}                   
                            required
                         />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Username</label>
                          <Input 
                            type={ ty }
                            name="passwords"
                            id="passwords"
                            value={ cliente.passwords }
                            placeholder="retry"
                            onChange= {this.handleChange('passwords')}                   
                            required
                        />
                        </FormGroup>
                      </Col>                                       
                    </Row>

                    <Row>
                      <Col>
                      <ButtonGroup>
                        <Button
                          type="submit"                          
                          className={ cliente.password === cliente.passwords ? 'btn-primary mt-2' : 'btn-primary mt-2 disabled'}>
                        
                        Registrar
                        </Button>
                      </ButtonGroup>                      
                      </Col>
                    </Row>  
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
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
                      <h5 className="title mt-4">1click-bo.com</h5>
                    </a>
                    <p className="description">info@1click-bo.com</p>
                  </div>
                  <div className="card-description">
                    Registrate gratis por 5 dias, despues elige uno de nuestros paquetes...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">                    
                  <Link to={`/admin/login`}>
                  <Button className="btn-icon btn-round" color="twitter">
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
              <Card className="card-user">
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
                      <h5 className="title mt-4">1click-bo.com</h5>
                    </a>
                    <p className="description">Cambio realizado con éxito </p>
                  </div>                  
                </CardBody>
                <CardFooter>
                  <div className="button-container">   
                  <Link to={`/admin/login`}>
                  <Button className="btn-md" color="twitter">
                    <FontAwesomeIcon icon={faHome} />
                    Iniciar Sessión
                  </Button>            
                  </Link>           
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> 
          </div>
        </>
      );

    return (
      <div className="content">
        <div className="registro">
          {obj}          
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      ...userActions,
    },
    dispatch
  ),
});

const mapStateToProps = (state) => ({
  clientes: state.clientes,  
});

export default connect(mapStateToProps, mapDispatchToProps)(verificar);
