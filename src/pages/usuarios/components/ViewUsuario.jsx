import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactToPrint from 'react-to-print';
import { apiErp } from '../../../helpers'
import Barcode from 'react-barcode'
import Moment from 'react-moment';
import { Table, Row, Col, Button } from "reactstrap";

class ComponentToPrint extends Component {

  constructor(props) {
    super(props);
     this.state = {      
      
    };    
  }

render() {         
    const { contrato, nota , item } = this.props.data
    const { user } = this.props.date    
    const fechaHoy =  new Date() 
    return (      
      <>
      <div className="reporte">     
      <div className="invoice-box">
        <Row>
          <Col md="4"><p className="text-left">Fecha Impresión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p></Col>
          <Col md="4"><p className="text-center">Hora : <Moment format="HH:mm:ss">{ fechaHoy }</Moment></p></Col>
          <Col md="4"><p className="text-right">Usuario : { user.name }</p></Col>
        </Row>
        <div className="sol">
          <Row className="crl">
            <Col md={12}>
             <h5 className="text-center"> Código # { contrato.Usuario.id }</h5>             
            </Col>                          
          </Row>
        </div>

        <Row className="crl mt-2">      
        <Col md={6} >
        <div className="sol">
        <Row>
          <Col>
          <div className="box mt-2">
          <h6 className="title">Comprobante # { nota.id }</h6>        
          </div>
            <img alt="logo"
            className="text-center" 
            src={apiErp + '/static/images/notas/md/'+nota.imagen }/>   
          </Col>
        </Row>
        <Row>
          <Col>
             <Barcode 
                value={4745887 + (contrato.id + contrato.Usuario.id) }
                width={3} 
                height={60}
                fontSize={1}
              />
          </Col>
        </Row>
        </div> 
        </Col>      
        
        <Col md={6}>
          <div className="sol">
          <div className="box mt-2">
          <h6 className="title">Datos Generales</h6>
           <Table className="table-reporteh mt-2">
           <tbody>
          <tr>
            <td><b>Código</b></td>
          </tr>
          <tr>
            <td>{ contrato.Usuario.id}</td>                       
          </tr>
          <tr>
            <td><b>Nombre :</b></td>
          </tr>
          <tr>
            <td>{contrato.Usuario.nombres}</td>
          </tr>          
          <tr>
            <td><b>Username :</b></td>
          </tr>
          <tr>
            <td>{contrato.Usuario.username}</td>
          </tr>
          <tr>
            <td><b>Teléfono :</b></td>
          </tr>         
          <tr>
            <td>{contrato.Usuario.telefono}</td>
          </tr>
          <tr>
            <td><b>Email :</b></td>
          </tr>                 
          <tr>
            <td>{contrato.Usuario.email}</td>
          </tr>
          <tr>
            <td><b>Fecha registro :</b></td>
          </tr>                 
          <tr>
            <td>{contrato.Usuario.createdAt}</td>
          </tr>
          <tr>
            <td><b>Fecha Aprobación :</b></td>
          </tr>                 
          <tr>
            <td>{contrato.updatedAt}</td>
          </tr>                 
       
           </tbody>
        </Table>
          </div>
            <div className="box">
          <h6 className="title">Patrocinador</h6>
          <Table className="table-reporteh mt-2">
           <tbody>              
          <tr>            
            <td><b>Nombre :</b></td><td>{item.origin}</td> 
          </tr>               
           </tbody>
        </Table>
          </div> 
         </div>
        </Col>      
    </Row> 
    </div>    
    </div>
    </>
    )
  }
};


class ViewUsuario extends React.Component {  

  render() {    
    return (
      <div className="creporte">   
        <ReactToPrint
          trigger={() => <Button className="fas fa-print btn-sm btn-primary" >Imprimir</Button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint 
        ref={el => (this.componentRef = el)} 
        data = { this.props.usus }
        date = {this.props.users} 
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usus: state.usus,
  users: state.users

});

export default connect(mapStateToProps)(ViewUsuario);