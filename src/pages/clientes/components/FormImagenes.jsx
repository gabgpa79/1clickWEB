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
        <div className="ifiles">
          <Row>
            <Col>
            <Portada/>  
            </Col>          
          </Row>
          <Row>
          <Col>
            <Imagen/>
          </Col>
          </Row>                  
        </div>      
    );
  }
}

export default FormCliente;
