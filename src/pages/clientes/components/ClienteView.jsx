import React, { Component } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { apiErp } from "../../../helpers";
import Moment from "react-moment";
import { Table, Row, Card, Col, Button, CardBody, CardFooter, CardText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, plan } = this.props.data;
    const { user } = this.props.date;
    const fechaHoy = new Date();
    return (
      <>
      <Row>
        <Col md="4">
          <p className="text-left">
            Fecha Impresión :{" "}
            <Moment format="DD/MM/YYYY">{fechaHoy}</Moment>
          </p>
        </Col>
        <Col md="4">
          <p className="text-center">
            Hora : <Moment format="HH:mm:ss">{fechaHoy}</Moment>
          </p>
        </Col>
        <Col md="4">
          <p className="text-right">Usuario : {user.nombres}</p>
        </Col>
      </Row>
      

       <Row>            
            <Col md="5">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="portada">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatarp"                        
                        src={
                          apiErp + "/static/images/clientes/portada/md/" + item.portada
                        }
                      />                      
                    </a>                                          
                  </div>
                  <div className="author">                                      
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar mt-5"                        
                        src={
                          apiErp + "/static/images/clientes/md/" + item.filename
                        }
                      />
                      <h5 className="title">{item.nombres}</h5>
                    </a>                    
                  </div>
                  <div className="card-description">                    
                    {item.descripcion}
                  </div>
                </CardBody>
                
                <CardFooter>
                <Row>
                      <Col className="pr-md-1" md="4">                        
                          Código:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                          {item.id}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">                        
                          Nombre:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                          {item.nombres}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">                        
                          Dirección:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                          {item.direccion}
                      </Col>                      
                    </Row>               
                    <Row>
                      <Col className="pr-md-1" md="4">                        
                          Teléfono:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                          {item.telefono}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">                        
                          Celular:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                          {item.celular}
                      </Col>                      
                    </Row>             
                    <Row>
                      <Col className="pr-md-1" md="4">                        
                          Email:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                          {item.email}
                      </Col>                      
                    </Row> 

                    <Row>
                      <Col className="pr-md-1" md="4">                        
                          Reg.:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                      {item.registrado ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-center text-success"
                        />
                      ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-danger text-danger"
                      />
                      )}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">                        
                          Habilitado:
                      </Col>
                      <Col className="px-md-1" md="8">                        
                      {item.habilitado ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-center text-success"
                        />
                      ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-danger text-danger"
                      />
                      )}
                      </Col>                      
                    </Row>      
                </CardFooter>  
              </Card>
            </Col>
            <Col md="7">
            
            <Table className="table-dark" responsive>
            <thead>
          <tr>
            <th width="20%">N° Cuota</th>
            <th width="30%">Monto</th>
            <th width="20%">Vencimiento</th>
            <th width="20%">Estado</th>
          </tr>
        </thead>
        {plan && (
          <tbody>
            {plan.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.cuota}</td>
                <td>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "BOB",
                  }).format(item.monto)}
                </td>
                <td>
                  <Moment format="DD/MM/YYYY">
                    {item.fvencimiento}
                  </Moment>
                </td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        )}           
            </Table>  
            </Col>
          </Row>
      </>
    );
  }
}

class LibroView extends React.Component {
  render() {
    return (
      <div className="creporte">
        <ReactToPrint
          trigger={() => (
            <Button className="fas fa-print btn-sm btn-info">
              Imprimir
            </Button>
          )}
          content={() => this.componentRef}          
        />
        <ComponentToPrint
          ref={(el) => (this.componentRef = el)}
          data={this.props.clientes}
          date={this.props.users}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clientes: state.clientes,
  users: state.users,
});

export default connect(mapStateToProps)(LibroView);
