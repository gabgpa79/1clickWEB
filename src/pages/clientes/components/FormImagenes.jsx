import React from "react";
import Imagen from "./Imagen";
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
            <Imagen/>
          </Col>
          </Row>                  
        </div>      
    );
  }
}

export default FormCliente;
