import React, { Component } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { apiErp } from "../../../helpers";
import Barcode from "react-barcode";
import Moment from "react-moment";
import { Table, Row, Card, Col, Button } from "reactstrap";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props.data;
    const { user } = this.props.date;
    const fechaHoy = new Date();
    return (
      <>
        <div className="reporte">
          <div className="invoice-box">
            <Row>
              <Col md="4">
                <p className="text-left">
                  Fecha Impresión :{" "}
                  <Moment format="DD/MM/YYYY">{fechaHoy}</Moment>
                </p>
              </Col>
              <Col md="4">
                <p className="text-center">
                  Hora : <Moment format="HH:mm:ss">{fechaHoy}</Moment>
                </p>
              </Col>
              <Col md="4">
                <p className="text-right">Usuario : {user.name}</p>
              </Col>
            </Row>
            <div className="sol">
              <Row className="crl">
                <Col md={12}>
                  <h4 className="text-center"> {item.nombres}</h4>
                </Col>
              </Row>
            </div>

            <Row className="crl mt-2">
              <Col md={5}>
                <div className="sol">
                  <Row>
                    <Col>
                      <img
                        alt="logo"
                        className="text-center"
                        src={
                          apiErp + "/static/images/clientes/md/" + item.filename
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Barcode
                        value={item.id}
                        width={2}
                        height={50}
                        fontSize={18}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={7}>
                <div className="box mt-2">
                  <Table className="table-reporteh mt-2">
                    <tbody>
                      <tr>
                        <td width="35%">
                          <b>Código :</b>
                        </td>
                        <td width="75%">{item.id}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Nombre :</b>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">{item.nombres}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Dirección :</b>
                        </td>
                      </tr>
                      <tr>
                        <td>{item.direccion}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Teléfono :</b>
                        </td>
                      </tr>
                      <tr>
                        <td>{item.telefono}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Celular :</b>
                        </td>
                      </tr>
                      <tr>
                        <td>{item.celular}</td>
                      </tr>

                      <tr>
                        <td>
                          <b>Email :</b>
                        </td>
                        <td>{item.email}</td>
                      </tr>

                      <tr>
                        <td>
                          <b>Descripción :</b>
                        </td>
                        <td>{item.descripcion}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Estado</b>
                        </td>
                        <td>{item.estado}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Registrado :</b>
                        </td>
                        <td>{item.registrado}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Habilitado :</b>
                        </td>
                        <td>{item.habilitado}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>

          <div className="invoice-box">
            <h3 className="mt-2 text-dark">Resumen Financiero</h3>
          </div>
        </div>
      </>
    );
  }
}

class ClienteResumen extends React.Component {
  render() {
    return (
      <div className="creporte">
        <ReactToPrint
          trigger={() => (
            <Button className="fas fa-print btn-sm btn-primary">
              Imprimir
            </Button>
          )}
          content={() => this.componentRef}
        />
        <ComponentToPrint
          ref={(el) => (this.componentRef = el)}
          data={this.props.clientes}
          date={this.props.users}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clientes: state.clientes,
  users: state.users,
});

export default connect(mapStateToProps)(ClienteResumen);
