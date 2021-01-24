import React from "react";
import { connect } from "react-redux";
import Banner from "./Banner";
import Slider from "./Slider";
import Video from "./Video";

class publicidad extends React.Component {  
  render() {
    const { item } = this.props.clientes;
    let dd = null
    switch(item.paqueteId){
      case '1':
      dd = null
      break
      case '2':
      dd = <Banner/>
      break
      case '3':
      dd = <Slider/>
      break  
      case '4':
      dd = <Video/>
      break  
      default:
      break
    }
    return (
      <div className="ifiles">
        { dd }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clientes: state.clientes
});

export default connect(mapStateToProps)(publicidad);
