import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { crudActions } from "../../../actions";
import { stylesErp } from '../../../helpers'
const defaultVal = (options, valor) => {
  return options.filter((item) => item.value === valor);
};

class SelectPaquetes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  handleChanges = (prop) => (event) => {
    if (event) {
      this.props.change("PAQUETE_CHANGE", prop, event.value);
    } else {
      this.props.change("PAQUETE_CHANGE", prop, "");
    }
  };

  componentWillUnmount() {
    this.props.reset("PAQUETE_RESET");
  }

  componentDidMount() {
    this.props.getLista("PAQUETE_LISTA", "paquetes", "0");
  }

  render() {
    const { items, item } = this.props.paquetes;
    const {
      
    } = this.state;

    return (
      <Select                                                               
      name="paquete"                                    
      styles={stylesErp}                     
      options={items}
      value={defaultVal(items, item.id)}
      onChange={this.handleChanges("id")}
      />
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
  paquetes: state.paquetes,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPaquetes);
