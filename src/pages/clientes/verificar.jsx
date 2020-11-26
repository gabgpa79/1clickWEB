import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../actions";
import { Row, CardText, CardFooter, Card, CardHeader, CardBody, Button, ButtonGroup, FormGroup, Form, Input, Col } from "reactstrap";
import { Link } from "react-router-dom";
import SelectCategorias from "../categorias/components/SelectCategorias";
import SelectPaquetes from "../paquetes/components/SelectPaquetes";

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
        password: "",
      },
      submitted: false,
      io: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.verificarConfirmacion(params.token);
  }
  componentWillUnmount() {}

  handleSubmit(event) {
    event.preventDefault();
    const { cliente } = this.state;
    let dato = this.props.clientes.item;
    dato.categoriaId = this.props.categorias.item.id;
    dato.paqueteId = this.props.paquetes.item.id;
    dato.password = cliente.password;
    dato.estado = true;
    this.props.usuarioUpdate(dato);
    this.setState({
      submitted: true,
    });
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
    const { item } = this.props.clientes;
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

    const obj =
      submitted === false && item.estado === false ? (
        <>
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Completa los dato</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="7">
                        <FormGroup>
                          <label>Nombre</label>
                          <Input
                            type="text"
                            name="nombres"
                            id="nombres"
                            value={item.nombres}
                            placeholder="nombres"
                            onChange={this.handleChange("nombres")}
                            minLength="5"
                            maxLength="40"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            type="text"
                            name="username"
                            id="username"
                            value={item.username}
                            placeholder="username"
                            onChange={this.handleChanges("username")}
                            minLength="5"
                            maxLength="10"
                            disabled
                        />
                        </FormGroup>
                      </Col>                                       
                    </Row>

                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                          type="email"
                          name="email"
                          id="email"
                          value={item.email}
                          onChange={this.handleChange("email")}
                          readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Teléfono</label>
                          <Input
                            type="text"
                            name="telefono"
                            id="telefono"
                            value={item.telefono}
                            onChange={this.handleChange("telefono")}
                            readOnly
                          />
                        </FormGroup>
                      </Col>                      
                    </Row>
                    
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Categorias</label>
                          <SelectCategorias />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Paquetes</label>
                          <SelectPaquetes />  
                        </FormGroup>
                      </Col>                      
                    </Row>

                    

                    <Row>
                      <Col className="pr-md-1" md="11">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            type={ty}
                            name="password"
                            id="password"
                            value={cliente.password}
                            placeholder="password"
                            onChange={this.handleChange("password")}
                            minLength="5"
                            maxLength="10"
                            required
                        />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="1">
                        { est }
                      </Col>                      
                    </Row>

                    <Row>
                      <Col>
                      <ButtonGroup>
                        <Button
                          type="submit"
                          className={
                            cliente.password
                              ? "btn-success mt-2"
                              : "btn-success mt-2 disabled"
                          }
                        >
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
                    <p className="description">Confirmación realizada</p>
                  </div>
                  <div className="card-description text-center">                      
                      En breve recibiras la confirmación de tu registro, muchas gracias.      
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
  categorias: state.categorias,
  paquetes: state.paquetes,
});

export default connect(mapStateToProps, mapDispatchToProps)(verificar);
