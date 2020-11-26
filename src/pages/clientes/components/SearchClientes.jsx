import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../../actions";
import { Input, FormGroup } from "reactstrap";
class SearchClientes extends React.Component {
  state = {
    item: {
      nombres: "",
      pagina: 1,
      num: 12,
    },
  };

  handleSearch = (prop) => (value) => {
    let item = this.state.item;
    item[prop] = value.target.value;
    if(value.target.value)
    {
      this.search(value.target.value);
    }else{
      this.search(0);
    }
    
    
  };

  search = (name) => {
    /*this.props.search("CONSULTAS_DATA", "clientes", item);    */
    this.props.consultas('CONSULTAS_DATA','consultas',1,12,0,true,name)
  };

  render() {
    const { nombres } = this.state;
    return (
      <FormGroup row>        
          <Input
            id="nombres"
            name="nombres"
            type="text"
            value={nombres}
            onChange={this.handleSearch("nombres")}
            placeholder="...nombres"
          />                   
      </FormGroup>
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
  crud: state.crud,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchClientes);
