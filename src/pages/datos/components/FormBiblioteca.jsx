import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crudActions } from '../../../actions'
import {      
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup
} from "reactstrap";



class FormArticulos extends React.Component {  
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    };   
     

handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.props.bibliotecas.item  
  this.props.update('BIBLIOTECA_REGISTO','bibliotecas',dato);                       
  
 
}


handleChanges = prop => event => {     
if(event){
   this.props.change('BIBLIOTECA_CHANGE',prop, event.target.value);
  }else{
  this.props.change('BIBLIOTECA_CHANGE',prop, '');             
  }    
}

componentWillUnmount() {  
  this.props.reset('BIBLIOTECA_RESET')
}  

render() {   
const { item } = this.props.bibliotecas
  return (
  <> 
  <div className="linea"> 
    <Row>
    <Col md="12">
     <h5 className="ml-2 text-dark"><b>Datos de Biblioteca</b></h5>  
        <Form className="form-registro" onSubmit={ this.handleSubmit}>
          <FormGroup row>
            <Label for="nombre" sm={2}>
            Nombre :
            </Label>
            <Col sm={10}>
              <Input 
                type="text" 
                name="nombre" 
                id="nombre" 
                placeholder="nombre"
                value={item.nombre}                                                                                                                                   
                onChange={this.handleChanges('nombre')}
                 />
            </Col>                        
          </FormGroup>

          <FormGroup row>
            <Label for="direccion" sm={2}>Dirección :</Label>
            <Col sm={5}>
              <Input 
                type="text" 
                name="direccion" 
                id="direccion" 
                placeholder="direccion"
                value={item.direccion}
                onChange={this.handleChanges('direccion')}
                />
            </Col>
            <Label for="telefono" sm={2}>Teléfono :</Label>
            <Col sm={3}>
              <Input 
                type="text" 
                name="telefono" 
                id="telefono" 
                placeholder="telefono"
                value={item.telefono}
                onChange={this.handleChanges('telefono')}
                />
            </Col>
          </FormGroup>

          <FormGroup row>
            

            <Label for="mail" sm={2}>Mail :</Label>
            <Col sm={5}>
              <Input 
                type="text" 
                name="mail" 
                id="mail" 
                placeholder="mail"
                value={item.mail}
                onChange={this.handleChanges('mail')}
                />
            </Col>

            <Label for="web" sm={2}>Web :</Label>
            <Col sm={3}>
              <Input 
                type="text" 
                name="web" 
                id="web" 
                placeholder="web"
                value={item.web}
                onChange={this.handleChanges('web')}
                />
            </Col>
          </FormGroup>

          <ButtonGroup>
            <Col sm={12}>
            <Button
              className="btn-sm btn-success mt-2">
              Actualizar {' '}
              <i className="fas fa-save" />
            </Button>    
            </Col>          
          </ButtonGroup>
        </Form>          
      </Col>  
    </Row>  
    </div>
    </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...crudActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  bibliotecas : state.bibliotecas,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(FormArticulos);