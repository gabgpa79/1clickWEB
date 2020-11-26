import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../../actions";
import SelectPaises from "./SelectCiudades";

import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

class EditorialRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reset = () => {
    const item = null;
    const state = this.props.editoriales.modalView === true ? false : true;
    this.props.itemRegister("EDITORIAL_ITEM_REGISTER", state, item);
  };

  handleChanges = (prop) => (event) => {
    if (event) {
      this.props.change("EDITORIAL_CHANGE", prop, event.target.value);
    } else {
      this.props.change("EDITORIAL_CHANGE", prop, "");
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    let dato = this.props.editoriales.item;
    if (dato.id) {
      this.props.update("EDITORIAL_REGISTRO", "editoriales", dato);
    } else {
      this.props.register("EDITORIAL_REGISTRO", "editoriales", dato);
    }
  }

  render() {
    const { item } = this.props.editoriales;
    return (
      <Row className="crl">
        <Col>
          <Form className="form-registro" onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="code" sm={3}>
                Código :
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="codigo"
                  id="codigo"
                  placeholder="código"
                  value={item.codigo}
                  onChange={this.handleChanges("codigo")}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="nombre" sm={3}>
                Nombre :
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="nombre"
                  value={item.nombre}
                  onChange={this.handleChanges("nombre")}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="nombre" sm={3}>
                Paises :
              </Label>
              <Col sm={9}>
                <SelectPaises />
              </Col>
            </FormGroup>
            <Button
              className={item.nombre ? "btn-sm btn-success" : "btn-sm disabled"}
              type="submit"
            >
              Guardar
            </Button>{" "}
            <Button
              className="btn-sm btn-danger"
              data-dismiss="modal"
              type="button"
              onClick={this.reset}
            >
              Cancelar
            </Button>
          </Form>
        </Col>
      </Row>
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
  editoriales: state.editoriales,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorialRegister);
