import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crudActions } from '../../../actions'

import SelectFacultades from '../../facultades/components/SelectFacultades'

import { Form, Row, Col, FormGroup, Label, Input,  Button } from "reactstrap";


class CarreraRegister extends Component {
  constructor(props){
    super(props);
    this.state = {      
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}  



reset = () => {            
   const item = null 
   const state = this.props.carreras.modalView === true ? false : true
   this.props.itemRegister('CARRERA_ITEM_REGISTER',state,item)  

}

handleChanges = prop => event => {     
if(event){
   this.props.change('CARRERA_CHANGE',prop, event.target.value);
  }else{
  this.props.change('CARRERA_CHANGE',prop, '');             
  }    
}

handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.props.carreras.item   
  dato.facultadId = this.props.facultades.item.id
  if(dato.id){
      this.props.update('CARRERA_REGISTRO','carreras',dato);
  }else{
      this.props.register('CARRERA_REGISTRO','carreras',dato);                       
  }
 
}



render() {    
  const { item } = this.props.carreras 
  return (   
   <Row className="crl">
   <Col>
   <h5 className="ml-2 mb-2 text-dark"><b>Formulario de Registro</b></h5>
   <Form className="form-registro" onSubmit={ this.handleSubmit}>                
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
                onChange={this.handleChanges('nombre')}
                 />
            </Col>            
        </FormGroup> 
        <FormGroup row>
            <Label for="nombre" sm={3}>
            Nombre :
            </Label>
            <Col sm={9}>
              <SelectFacultades/>
            </Col>            
        </FormGroup> 
        <FormGroup row>
            <Label for="abreviacion" sm={3}>
            Abreviatura :
            </Label>
            <Col sm={9}>
              <Input 
                type="text" 
                name="abreviacion" 
                id="abreviacion" 
                placeholder="abreviacion"
                value={item.abreviacion}                                                                                                                                   
                onChange={this.handleChanges('abreviacion')}
                 />
            </Col>            
        </FormGroup>
        <Button        
        className={(item.nombre) ? "btn-sm btn-success" : "btn-sm disabled" }                      
        type="submit"                      
        >
         Guardar
        </Button>
          {' '}
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

    )
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...crudActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  carreras: state.carreras,
  facultades: state.facultades
});

export default connect(mapStateToProps,mapDispatchToProps)(CarreraRegister);
