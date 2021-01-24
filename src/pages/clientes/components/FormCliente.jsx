import React from 'react';
import Switch from "react-switch";
import { stylesErp } from '../../../helpers'
import Select from 'react-select'
import SelectCategorias from "../../categorias/components/SelectCategorias";
import SelectPaquetes from "../../paquetes/components/SelectPaquetes";
import {
    Row,
    Col,
    Label,
    Form,
    FormGroup,
    Input,
    Button
  } from "reactstrap";

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

function FormCliente ({ item, handleSubmit, handleChange, handleChanges, handleChan }) {     
return(
    <div className="formcli">
        <h6>Formulario de Registro</h6>
        <Form onSubmit={ handleSubmit}>
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
                            onChange={handleChanges("nombres")}        
                            required                    
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
                          onChange={handleChanges("direccion")}
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
                          onChange={handleChanges("latitude")}
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
                          onChange={handleChanges("longitude")}
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
                          onChange={handleChanges("telefono")}
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
                          onChange={handleChanges("celular")}
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
                            onChange={handleChanges("email")}
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
                          onChange={handleChanges("web")}
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
                          onChange={handleChanges("facebook")}                          
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
                          onChange={handleChanges("instagram")}                          
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
                          onChange={handleChanges("descripcion")}
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
                          onChange={handleChan("estado")}
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
                          onChange={handleChan("habilitado")}
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
                          onChange={handleChan("registrado")}
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
                      <Col className="pr-md-1" md="3">
                       <FormGroup>
                       <label>Tipo</label>
                          <Select                                                               
                          name="tipo"                        
                          options={tipos}                                
                          value={defaultVal(tipos,item.tipo)}    
                          styles={stylesErp}                                                                                                              
                          onChange={handleChange('tipo')}
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
                            onChange={handleChange('icon')}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                      <Button 
                        className="btn-sm mb-2" color="success" type="submit">
                          Registrar
                      </Button>
                      </Col>
                    </Row>
                  </Form>
    </div>
    )
}

export default FormCliente