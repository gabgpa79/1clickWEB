import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../../actions";
import Switch from "react-switch";
import { stylesErp } from '../../../helpers'
import Select from 'react-select'
import SelectCategorias from "../../categorias/components/SelectCategorias";
import SelectPaquetes from "../../paquetes/components/SelectPaquetes";
import TimePicker from 'react-time-picker';
import {
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Button,  
  Card,
  CardBody,  
  CardHeader
} from "reactstrap";

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



class FormCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '10:00',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
     
        let dato = this.props.clientes.item;
	      dato.paqueteId = this.props.paquetes.item.id;
	      dato.categoriaId = this.props.categorias.item.id;  
        if (dato.id) { 	    
          this.props.update("CLIENTE_REGISTO", "clientes", dato);
        } else {
          this.props.register("CLIENTE_REGISTO", "clientes", dato);
        }
     
     
  }

  handleChange = (prop) => (event) => {
    if (event) {
      this.props.change("CLIENTE_CHANGE", prop, event.value);
    } else {
      this.props.change("CLIENTE_CHANGE", prop, "");
    }
  };

  handleChanges = (prop) => (event) => {
    if (event) {
      this.props.change("CLIENTE_CHANGE", prop, event.target.value);
    } else {
      this.props.change("CLIENTE_CHANGE", prop, "");
    }
  };

  handleChan = (prop) => (event) => {
    this.props.change("CLIENTE_CHANGE", prop, event);
  };

  componentWillUnmount() {
    this.props.reset("CLIENTE_RESET");
  }

  onChangei = time => {    
    this.props.change("CLIENTE_CHANGE", 'hinicio', time);
  }

  onChangef = time => {    
    this.props.change("CLIENTE_CHANGE", 'hfin', time);
  }

  render() {
    const { item } = this.props.clientes;    
    
    return (
      <>
       
        <div className="linea">
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Editar Datos</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Nombres</label>
                          <Input
                            type="text"
                            name="nombres"
                            id="nombres"
                            placeholder="nombres"
                            value={item.nombres}
                            onChange={this.handleChanges("nombres")}        
                            required                    
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>                        
                        <label>H.Apertura</label>
                        <TimePicker                          
                          onChange={this.onChangei}
                          value={item.hinicio}
                        />                  
                        </FormGroup>
                      </Col>                    
                      <Col  md="3">
                        <FormGroup>                        
                        <label>H.Cierre</label>
                        <TimePicker
                          onChange={this.onChangef}
                          value={item.hfin}
                        />                                                
                        </FormGroup>
                      </Col>                    
                    </Row>

                    <Row>
                      <Col className="pr-md-1" md="3">
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
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                        <label>Icono</label>
                          <Select                                                               
                            name="icon"                        
                            options={iconos}                                
                            value={defaultVal(iconos,item.icon)}    
                            styles={stylesErp}                                                                                                              
                            onChange={this.handleChange('icon')}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                      <FormGroup>
                          <label>Categorías</label>
                          <SelectCategorias/>
                        </FormGroup>
                      </Col>                    
                      <Col className="px-md-1" md="3">
                      <FormGroup>
                          <label>Paquete</label>
                          <SelectPaquetes />
                        </FormGroup>
                      </Col> 

                    </Row>
                    <Row>
                    <Col className="pr-md-1" md="6">
                      <label>Dirección</label>
                      <Input
                          type="text"
                          name="direccion"
                          id="direccion"
                          placeholder="direccion"
                          value={item.direccion}
                          onChange={this.handleChanges("direccion")}
                          required
                          />  
                      </Col>
                      <Col className="pr-md-1" md="3">
                      <label>Latitud</label>
                          <Input
                          type="text"
                          name="latitude"
                          id="latitude"
                          placeholder="latitude"
                          value={item.latitude}
                          onChange={this.handleChanges("latitude")}
                          />
                      </Col>   
                      <Col className="px-md-1" md="3">
                      <label>Longitud</label>
                          <Input
                          type="text"
                          name="longitude"
                          id="longitude"
                          placeholder="longitude"
                          value={item.longitude}
                          onChange={this.handleChanges("longitude")}
                          />
                      </Col>
                                                            
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                        <label>Teléfono</label>
                          <Input
                          type="text"
                          name="telefono"
                          id="telefono"
                          placeholder="telefono"
                          value={item.telefono}
                          onChange={this.handleChanges("telefono")}
                          required
                          />
                        </FormGroup>
                      </Col> 
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                        <label>Celular</label>
                          <Input
                          type="text"
                          name="celular"
                          id="celular"
                          placeholder="celular"
                          value={item.celular}
                          onChange={this.handleChanges("celular")}
                          />
                        </FormGroup>
                      </Col>                      
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                        <label>E-mail</label>                          
                          <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="email"
                            value={item.email}
                            onChange={this.handleChanges("email")}
                            required
                          />
                        </FormGroup>
                      </Col>                   
                    </Row>

                    <Row>
                      <Col className="pr-md-1" md="4">
                       <FormGroup>
                       <label>Web</label>
                          <Input
                          type="text"
                          name="web"
                          id="web"
                          placeholder="..web"
                          value={item.web}
                          onChange={this.handleChanges("web")}
                        />                           
                       </FormGroup>                        
                      </Col>
                      <Col className="px-md-1" md="4">
                      <FormGroup>
                          <label>Facebook</label>
                          <Input
                          type="text"
                          name="facebook"
                          id="facebook"
                          placeholder="facebook"
                          value={item.facebook}
                          onChange={this.handleChanges("facebook")}                          
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                      <FormGroup>
                          <label>Instagram</label>
                          <Input
                          type="text"
                          name="instagram"
                          id="instagram"
                          placeholder="instagram"
                          value={item.instagram}
                          onChange={this.handleChanges("instagram")}                          
                          />
                        </FormGroup>
                      </Col>                                          
                    </Row>                  

                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Descripción/Actividad</label>
                          <Input
                          type="textarea"
                          name="descripcion"
                          id="descripcion"
                          placeholder="descripcion"
                          value={item.descripcion}
                          onChange={this.handleChanges("descripcion")}
                          style={{ height: "70px" }}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <Label>Estado</Label>
                          <Switch
                          name="estado"                          
                          onChange={this.handleChan("estado")}
                          checked={item.estado}
                          handleDiameter={18}
                          offColor="#a6d8f7"
                          onColor="#049dfd"
                          offHandleColor="#4d4d4d"
                          onHandleColor="#fff"
                          height={22}
                          width={55}
                          id="estado"
                        />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Habilitado</label>
                          <Switch
                          name="habilitado"
                          onChange={this.handleChan("habilitado")}
                          checked={item.habilitado}
                          handleDiameter={18}
                          offColor="#a6d8f7"
                          onColor="#049dfd"
                          offHandleColor="#4d4d4d"
                          onHandleColor="#fff"
                          height={22}
                          width={55}
                          id="habilitado"
                        />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Registrado</label>
                          <Switch
                          name="registrado"
                          onChange={this.handleChan("registrado")}
                          checked={item.registrado}
                          handleDiameter={18}
                          offColor="#a6d8f7"
                          onColor="#049dfd"
                          offHandleColor="#4d4d4d"
                          onHandleColor="#fff"
                          height={22}
                          width={55}
                          id="registrado"
                        />
                        </FormGroup>
                      </Col>                   
                    </Row>

                    <Row>
                      <Col>
                      <Button 
                        className="btn-sm mb-2" color="success" type="submit">
                          Guardar
                      </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>                
              </Card>
            </Col>            
          </Row>
        </div>
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
  clientes: state.clientes,
  paquetes: state.paquetes,
  categorias: state.categorias,	
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCliente);
