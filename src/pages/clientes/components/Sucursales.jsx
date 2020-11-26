import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../../actions";
import { stylesErp } from '../../../helpers'
import Select from 'react-select'
import {  
  Table,  
  Form,
  FormGroup,
  Row,
  Col,
  Button,  
  Input,
  ButtonGroup
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,  
  faTrash,
  faSave
} from "@fortawesome/free-solid-svg-icons";

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}
const tipos =  [{"value":"ninguno","label":"--Ninguno--"},
                {"value":"servicio","label":"Servicio"},
                {"value":"emergencia","label":"Emergencia"},
                {"value":"cajero","label":"Cajero"}
                ];

const iconos  =[{"value":"ninguno","label":"--Ninguno--"}, 
                {"value":"ambulancia","label":"Ambulancia"},
                {"value":"farmacia","label":"Farmacia"},
                {"value":"hospital","label":"Hospital"},
                {"value":"estacion","label":"Estacion"},
                {"value":"taller","label":"Taller"},
                {"value":"cajero","label":"Cajero"},
                ];                

class Sucursales extends React.Component {
  state = {
    nroPagina: 12,
    modalDelete: false,
    deleteId: 0,
  };


  componentWillUnmount() {
    this.props.reset("SUCURSAL_RESET");
  }

  handleChanges = (prop) => (event) => {
    if (event) {
      this.props.change("SUCURSAL_CHANGE", prop, event.target.value);
    } else {
      this.props.change("SUCURSAL_CHANGE", prop, "");
    }
  };

  handleChange = (prop) => (event) => {    
      this.props.change("SUCURSAL_CHANGE", prop, event.value);    
  };

  handleSubmit = () =>  {    
    let dato= this.props.clientes.sucursal;    
    dato.clienteId = this.props.clientes.item.id;
    if (dato.id) { 	    
      this.props.updates("SUCURSAL_DATA", "sucursales", dato);
    } else {
      this.props.registers("SUCURSAL_DATA", "sucursales", dato);
    }
  }

  handleDelete (itemId){           
    this.props.delete("SUCURSAL_DATA", "sucursales", itemId);
   }
  
  handleItem (item){           
    this.props.item("SUCURSAL_ITEM", item);
   } 
  
  render() {
    const { sucursales, sucursal } = this.props.clientes;        
    return (
      <div className="sample">
         <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <label>Nombres</label>
                  <Input
                    id="nombre"
                    type="text"
                    name="nombre"                    
                    placeholder="nombre"
                    value={sucursal.nombre}
                    onChange={this.handleChanges("nombre")}                            
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Dirección</label>
                  <Input
          id="direccion"
          type="text"
          name="direccion"                    
          placeholder="direccion"
          value={sucursal.direccion}
          onChange={this.handleChanges("direccion")}                            
        />
                </FormGroup>
              </Col>  
              <Col md="3">
                <FormGroup>
                  <label>Tipo</label>
                  <Select                                                               
          name="tipo"                        
          options={tipos}                                
          value={defaultVal(tipos,sucursal.tipo)}    
          styles={stylesErp}                                                                                                              
          onChange={this.handleChange('tipo')}
      />
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <label>Servicio</label>
                  <Select                                                               
          name="icon"                        
          options={iconos}                                
          value={defaultVal(iconos,sucursal.icon)}    
          styles={stylesErp}                                                                                                              
          onChange={this.handleChange('icon')}
      />
                </FormGroup>
              </Col>  
            </Row>  
          
          <Row>
            <Col md="3">
                <FormGroup>
                  <label>Teléfono</label>
                  <Input
                    id="telefono"
                    type="text"
                    name="telefono"                    
                    placeholder="telefono"
                    value={sucursal.telefono}
                    onChange={this.handleChanges("telefono")}                            
                  />
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                  <label>Longitud</label>
                  <Input
          id="longitude"
          type="text"
          name="longitude"                    
          placeholder="longitude"
          value={sucursal.longitude}
          onChange={this.handleChanges("longitude")}                            
        /> 
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                  <label>Latitud</label>
                  <Input
          id="latitude"
          type="text"
          name="latitude"                    
          placeholder="latitude"
          value={sucursal.latitude}
          onChange={this.handleChanges("latitude")}                            
        />
                </FormGroup>
            </Col>

        <Col md="3">
        <Button
           className="btn-sm btn-success mt-4"
           onClick={this.handleSubmit}
          >
           <FontAwesomeIcon
                  icon={faSave}
                  className="text-center text-white"
                />
          {' '} Guardar      
          </Button>
        </Col>
        </Row>
          </Form>  
        <Row>
          <Col>
          <Table className="table-simple">
          <thead>
                <tr>
                  <th className="text-center" width="5%">
                    #
                  </th>
                  <th width="16%">Nombre</th>
                  <th width="20%">Dirección</th>
                  <th width="7%">Teléfono</th>                  
                  <th width="10%" >Longitud</th>
                  <th width="10%">Latitud</th>
                  <th width="15%">Tipo</th>                  
                  <th colSpan="2" width="15%">Icono</th>                  
                </tr>              
                           
          </thead>
         
              {sucursales && (
                <tbody>
                  {sucursales.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td className="largo">{item.nombre}</td>
                      <td>{item.direccion}</td>
                      <td>{item.telefono}</td>                      
                      <td>{item.longitude}</td>
                      <td>{item.latitude}</td>
                      <td>{item.tipo}</td>
                      <td>{item.icon}</td>
                      <td>
                        <ButtonGroup>
                          <Button 
                            className="btn-sm btn-success" 
                            onClick={()=>{this.handleItem(item)}}
                            >
                             <FontAwesomeIcon
                            icon={faEdit}
                            className="text-center text-white"
                          />
                          </Button>
                          <Button 
                            className="btn-sm btn-danger" 
                            onClick={()=>{this.handleDelete(item.id)}}
                            >
                             <FontAwesomeIcon
                            icon={faTrash}
                            className="text-center text-delete"
                          />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
                  </Table> 
          </Col>
        </Row>
      
        

      </div>                 
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
  clientes: state.clientes,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sucursales);
