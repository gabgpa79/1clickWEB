import React from "react";
import Banner from "./Banner";
import Slider from "./Slider";
import {Row,Col } from "reactstrap";

class FormPropaganda extends React.Component {
  render() {
    
    return (
      <>       
        <div className="linea">
        <Row>            
            <Col md="6">
              <h5>Banner</h5>
            </Col>
            <Col md="6">
            <h5>Slider</h5>
            </Col>  
        </Row>
        <Row>            
            <Col md="6">
              <Banner/>
            </Col>
            <Col md="6">
              <Slider/>
            </Col>  
        </Row>    
        </div>
      </>
    );
  }
}

export default FormPropaganda;
