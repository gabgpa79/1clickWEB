import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { crudActions } from "../../../actions";
const defaultVal = (options, valor) => {
  return options.filter((item) => item.value === valor);
};

class SelectsCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
    };
  }

  

  handleChanges = (prop) => (event) => {
    if (event) {
      this.props.change("CATEGORIA_CHANGE", prop, event.value);
      this.makeHttpRequestWithPage(1,12,event.value,true)
    } else {
      this.props.change("CATEGORIA_CHANGE", prop, "");
      this.makeHttpRequestWithPage(1,12,0,true)
    }       
    
  };
  makeHttpRequestWithPage = (pageNumber,num, categoria,est) => {
    this.props.consultas('CONSULTAS_DATA','consultas',pageNumber,num,categoria,est,0)
  }

  componentWillUnmount() {
    this.props.reset("CATEGORIA_RESET");
  }

  componentDidMount() {
    this.props.getLista("CATEGORIA_LISTA", "categorias", "0");
  }

  render() {
    const { items, item } = this.props.categorias;
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;

    return (
      <Select
        className="basic-single"
        defaultValue={items[0]}
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectsCategorias);
