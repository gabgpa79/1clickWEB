import React from "react";
import {  
  Row,
  Col
} from "reactstrap";

import Bars from './components/Bars'
import Bar from './components/Bar'
import Pie from './components/Pie'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (      
        <div className="content">
          <Row>
            <Col xs="12" md="12" className="iok">              
              <Bars/>            
            </Col>
          </Row>     
          <Row>
            <Col xs="6" md="6" className="iok">              
              <Bar/>            
            </Col>
            <Col xs="6" md="6" className="iok">              
              <Pie/>            
            </Col>
          </Row>               
        </div>
    );
  }
}

export default Dashboard;
