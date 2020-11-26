import React from "react";
import Imagen from "./Imagen";
import Portada from "./Portada";
import {
  Row,
  Col  
} from "reactstrap";

class FormCliente extends React.Component {
  render() {
    
    return (
      <>       
        <div className="linea">
        <Row>            
            <Col md="6">
              <h5>Perfil</h5>
            </Col>
            <Col md="6">
            <h5>Portada</h5>
            </Col>  
        </Row>
        <Row>            
            <Col md="6">
              <Imagen/>
            </Col>
            <Col md="6">
              <Portada/>
            </Col>  
        </Row>    
        </div>
      </>
    );
  }
}

export default FormCliente;
