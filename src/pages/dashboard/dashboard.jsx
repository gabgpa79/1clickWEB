import React from "react";
import {  
  Row,
  Col
} from "reactstrap";

import { connect } from "react-redux";



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
    const { users } = this.props
    const conten = users.user.rolId === 2 ?
        <>
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
        </>:
        <>
        <h5>Bienvenido!!</h5>
        <h6>{ users.user.nombres }</h6>
          <img
            alt="..."
            src={require("../../assets/img/dashboard.jpg")}
            className="dashboardi"
          />
        </>
    return (      
        <div className="content">
          { conten }
        </div>
    );
  }
}

const mapStateToProps = (state) => ({  
  users: state.users
});

export default connect(mapStateToProps)(Dashboard);
