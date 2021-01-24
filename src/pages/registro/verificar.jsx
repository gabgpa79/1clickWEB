import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { Link } from "react-router-dom"
import { Row, Card, CardBody, CardFooter, CardText, Button, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {    
  faHome
} from "@fortawesome/free-solid-svg-icons";


class verificar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: {
        nombres: ""
      },
      submitted: false,
      tipo:"password"
    };
    
  }

  componentDidMount() {
    const { match: { params },} = this.props;
      this.props.venlace('CLIENTE_VERIFICAR_ENLACE',params.token);     
  
  }
  componentWillUnmount() {}
  
render() {
    const { venlace } = this.props.clientes;    
         
      
    return (
      <div className="content">
        <div className="registro">
        { venlace ?

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
                        className="avatari mt-2"
                        src={require("../../assets/img/logo.png")}
                    />                     
                    </a>
                    <p className="description mt-4">Usuario habilitado</p>
                    <p className="description mt-4">Iniciar sessión</p>
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
        :
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
                        className="avatari mt-2"
                        src={require("../../assets/img/logo.png")}
                      />                     
                    </a>
                    <p className="description mt-4">enlace caducado</p>                    
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
        }
        
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
  clientes: state.clientes
});

export default connect(mapStateToProps, mapDispatchToProps)(verificar);