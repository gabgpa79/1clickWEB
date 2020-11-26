import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crudActions } from '../../../actions'

import { Form, Row, Col, FormGroup, Label, Input,  Button } from "reactstrap";

class FacultadRegister extends Component {
  constructor(props){
    super(props);
    this.state = {      
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}  



reset = () => {            
   const item = null 
   const state = this.props.facultades.modalView === true ? false : true
   this.props.itemRegister('FACULTAD_ITEM_REGISTER',state,item)  

}

handleChanges = prop => event => {     
if(event){
   this.props.change('FACULTAD_CHANGE',prop, event.target.value);
  }else{
  this.props.change('FACULTAD_CHANGE',prop, '');             
  }    
}

handleSubmit(event){ 
  event.preventDefault();         
  let dato = this.props.facultades.item      
  if(dato.id){
      this.props.update('FACULTAD_REGISTRO','facultades',dato);
  }else{
      this.props.register('FACULTAD_REGISTRO','facultades',dato);                       
  }
 
}



render() {    
  const { item } = this.props.facultades 
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
  facultades: state.facultades
});

export default connect(mapStateToProps,mapDispatchToProps)(FacultadRegister);
