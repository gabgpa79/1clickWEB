import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../../actions";
import { Input, Col, FormGroup } from "reactstrap";
class SearchCliente extends React.Component {
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
    this.search(item);
  };

  search = (item) => {
    this.props.search("CLIENTE_DATA", "clientes", item);
  };

  render() {
    const { nombres } = this.state;
    return (
      <FormGroup row>
        <Col>
          <Input
            id="nombres"
            name="nombres"
            type="text"
            value={nombres}
            onChange={this.handleSearch("nombres")}
            placeholder="...buscar"
          />
        </Col>        
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchCliente);
