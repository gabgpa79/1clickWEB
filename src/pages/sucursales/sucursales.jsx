import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { stylesErp } from '../../helpers'
import Select from 'react-select'

import Horarioc from "../horarios/horariosc"


import {  
    Table,  
    Form,
    FormGroup,
    Row,
    Col,
    Button,  
    Modal,
    ModalBody,
    Input,
    ButtonGroup
  } from "reactstrap";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
    faEdit,  
    faTimes,
    faTrash,
    faSave, faCalendar
} from "@fortawesome/free-solid-svg-icons";
const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }
  const tipos =  [{"value":"ninguno","label":"--Ninguno--"},
                  {"value":"servicio","label":"Servicio"},
                  {"value":"emergencia","label":"Emergencia"},
                  {"value":"cajero","label":"Cajero"},
                  {"value":"comida","label":"Comida"}
                  ];
  
  const iconos  =[{"value":"ninguno","label":"--Ninguno--"}, 
                  {"value":"ambulancia","label":"Ambulancia"},
                  {"value":"farmacia","label":"Farmacia"},
                  {"value":"hospital","label":"Hospital"},
                  {"value":"estacion","label":"Estacion"},
                  {"value":"taller","label":"Taller"},
                  {"value":"cajero","label":"Cajero"},
                  {"value":"comida","label":"Comida"},
                  ];   

class sucursales extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        nroPagina: 12,
        modalDelete: false,
        deleteId: 0,
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    } 
      

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
    
      handleSubmit (event){   
        event.preventDefault(); 
        let dato= this.props.sucursales.item;    
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
       
      toggleModalView = () => {
        let est = this.props.horario.modalView === true ? false : true;
        this.props.getHorariosViews("HORARIO_DATA_VIEWS", est);
      };

      toggleViewf = (item) => {
        let est = this.props.horario.modalView === true ? false : true;
        this.props.getHorarios("HORARIO_DATA_VIEW",item,"sucursalId",est );
      };
     
  render() {        
    const { data, item } = this.props.sucursales
    const { modalView } = this.props.horario
    return (
      <div className="content">

<Modal isOpen={modalView} toggle={this.toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => this.toggleModalView()} >
              <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
              <Horarioc/>
          </ModalBody>
        </Modal>

<div className="hede"> 
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
                    value={item.nombre}
                    onChange={this.handleChanges("nombre")}       
                    required      
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
                    value={item.direccion}
                    onChange={this.handleChanges("direccion")}     
                    required                       
                  />
                </FormGroup>
              </Col>  
              <Col md="3">
                <FormGroup>
                  <label>Tipo</label>
                  <Select                                                               
                    name="tipo"                        
                    options={tipos}                                
                    value={defaultVal(tipos,item.tipo)}    
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
          value={defaultVal(iconos,item.icon)}    
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
                    value={item.telefono}
                    onChange={this.handleChanges("telefono")}                            
                  />
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                  <label>Latitude</label>
                  <Input
                    id="latitude"
                    type="number"
                    name="latitude"                    
                    placeholder="latitude"
                    value={item.latitude}
                    onChange={this.handleChanges("latitude")}                            
                    required
                  />
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                  <label>Longitude</label>                  
                  <Input
                    id="longitude"
                    type="number"
                    name="longitude"                    
                    placeholder="longitude"
                    value={item.longitude}
                    onChange={this.handleChanges("longitude")}        
                    required                    
                  /> 
                </FormGroup>
            </Col>

        <Col md="3">
        <Button
           className="btn-sm btn-success mt-4"
           type="submit"
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
         
              {data && (
                <tbody>
                  {data.map((item) => (
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
                          <Button className="btn-sm btn-success" onClick={()=>{this.handleItem(item)}}>
                             <FontAwesomeIcon icon={faEdit} className="text-center text-white"/>
                          </Button>
                          <Button className="btn-sm btn-info"                           
                          onClick={() => this.toggleViewf(item.id)}>
                             <FontAwesomeIcon icon={faCalendar } className="text-center text-white"/>
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
      </div>
      
    )
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
  sucursales: state.sucursales,    
  horario: state.horario,
  users: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(sucursales);