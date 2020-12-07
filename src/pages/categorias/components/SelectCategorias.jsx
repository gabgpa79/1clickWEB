import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { stylesErp } from '../../../helpers'
import { crudActions } from "../../../actions";

const defaultVal = (options, valor) => {
  return options.filter((item) => item.value === valor);
};

class SelectCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  handleChanges = (prop) => (event) => {    
    if (event.value) {
      this.props.changez("CATEGORIA_CHANGE", prop, event.value);      
    } else {
      this.props.changez("CATEGORIA_CHANGE", prop, "");
    }
  };

  componentWillUnmount() {
    this.props.reset("CATEGORIA_RESET");
  }

  componentDidMount() {
    this.props.getLista("CATEGORIA_LISTA", "categorias", "0");
  }

  render() {
    const { items, item } = this.props.categorias;        
    return (
      <Select                                                               
      name="categoria"                                    
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
  categorias: state.categorias,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategorias);
