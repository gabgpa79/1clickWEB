import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../actions";
import { Link } from "react-router-dom"
import { Row, Card, CardHeader, CardBody, CardFooter, CardText, Button, ButtonGroup, FormGroup, Form, Input, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {    
  faHome,  
  faTimes,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
class registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        nombres: "",
        telefono: "",
        direccion: "",
        email: "",
      },
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.verificarEnlace(params.token);
  }
  componentWillUnmount() {}

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    user.rolId = 1;
    user.categoriaId = 1;
    user.paqueteId = 1;
    this.props.usuarioCreate(user);
    this.setState({
      submitted: true,
    });
  }

  handleChange = (prop) => (event) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [prop]: event.target.value,
      },
    });
  };

  handleChanges = (prop) => (event) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [prop]: event.target.value,
      },
    });
    let det = {
      username: event.target.value,
    };
    this.props.verificarUsername(det);
  };

  render() {
    const { vusername } = this.props.clientes;
    const {
      submitted,
      username,
      nombres,
      telefono,
      direccion,
      email,
    } = this.state;
    const est = vusername ? (
      <FontAwesomeIcon icon={faCheck} className="text-success mt-1" size="2x" />
    ) : (
      <FontAwesomeIcon icon={faTimes} className="text-danger mt-1" size="2x" />
    );
    console.log(vusername);
    return (
      <div className="content">    
        <div className="registro">    
          {submitted === false ? (
            <>
              <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Formulario de Registro</h5>
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
                            value={nombres}
                            placeholder="nombres"
                            onChange={this.handleChange("nombres")}
                            minLength="5"
                            maxLength="30"
                            required
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
                            value={username}
                            placeholder="username"
                            onChange={this.handleChanges("username")}
                            minLength="5"
                            maxLength="10"
                            required
                        />
                        </FormGroup>
                      </Col> 
                      <Col className="px-md-1 mt-4" md="1">
                      {est}
                      </Col>                 
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Dirección</label>
                          <Input
                            type="direccion"
                            name="direccion"
                            id="direccion"
                            value={direccion}
                            placeholder="direccion"
                            onChange={this.handleChange("direccion")}
                            required
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
                            value={email}
                            placeholder="email"
                            onChange={this.handleChange("email")}
                            required
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
                            value={telefono}
                            placeholder="telefono"
                            onChange={this.handleChange("telefono")}
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
                          className={
                            vusername === true
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
                    <p className="description">registro aprobado</p>
                  </div>
                  <div className="card-description text-center">                      
                      Se envió un mail al correo ****                      
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
          )}
          <div className="footer"></div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(registro);
