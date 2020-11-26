import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { crudActions } from "../../../actions";
import { Row, Col, Table, Button, ButtonGroup } from "reactstrap";

class ListaCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChanges = (prop) => (event) => {
    if (event) {
      this.props.change("CATEGORIA_CHANGE", prop, event.value);
    } else {
      this.props.change("CATEGORIA_CHANGE", prop, "");
    }
  };

  componentWillUnmount() {
    this.props.reset("CATEGORIA_RESET");
  }

  componentDidMount() {
    this.props.getData("CATEGORIA_DATA", "categorias", 1, 12);
  }

  render() {
    const { data, item } = this.props.categorias;

    return (
      <>
        {data && (
          <ButtonGroup>
            {data.map((item) => (
              <Button
                key={item.id}
                onClick={() => this.handleAsignar(item)}
                className={
                  item.id === this.state.itemId
                    ? "btn-danger btn-mm"
                    : "btn-primary btn-mm"
                }
              >
                <i className="fas fa-chevron-right"> {item.nombre}</i>
              </Button>
            ))}
          </ButtonGroup>
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListaCategorias);
