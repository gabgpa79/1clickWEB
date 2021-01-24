import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../actions";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  Form,
  Input,
  Card,
  CardBody,
  CardFooter,
  CardText
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
      },
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}
  componentWillUnmount() {}

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    if (user.username && user.password) {
      this.props.login(user);
    }
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

  render() {
    const { username, password, submitted } = this.state;
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
        <div className="central">
          <Row>
            <Col md="12">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">                    
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatari"
                        src={require("../../assets/img/logo.png")}
                      />
                      <h5 className="title mt-2 text-white">1Click-bo.com</h5>
                    </a>
                    <p className="description text-white mt-2">Inicia Sessión</p>
                  </div>
                  <div className="card-description">
                  <Form className="login mt-5" onSubmit={this.handleSubmit}>
    <FormGroup
      row
      className={submitted && !username ? " has-error" : ""}
    >
      <Col sm={2} className="text-white">
        <FontAwesomeIcon icon={faUser} />
      </Col>
      <Col sm={10}>
        <Input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="username"
          onChange={this.handleChange("username")}
        />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Col sm={2} className="text-white">
        <FontAwesomeIcon icon={faKey} />
      </Col>
      <Col sm={10}>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="**********"
          value={password}
          onChange={this.handleChange("password")}
        />
      </Col>
    </FormGroup>
      <div className="button-container">
        <ButtonGroup>
          <Button className="btn-info mt-5 btn-md">
            <FontAwesomeIcon icon={faLock} />
            {' '} Ingresar
          </Button>
        </ButtonGroup>
      </div>
  </Form>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
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
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(login);
