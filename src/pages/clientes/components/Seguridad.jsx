import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faTimes} from "@fortawesome/free-solid-svg-icons";

import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button
  } from "reactstrap";

function Seguridad ({ item, password2, handleSubmit, handleChanges, handlec, handleDelete, handleValidar, validate, igual }) {    
return(
    <div className="formcli">
        <h6>Datos de Inicio</h6>
        <Form onSubmit={ handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            value={item.username}                            
                            onChange={handleChanges("username")}                              
                            required                    
                          />
                        </FormGroup>
                      </Col>                                           
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            value={item.password}
                            onChange={handleChanges("password")}    
                            onClick={(e)=> { handleDelete() }}
                            onBlur={(e)=> { handleValidar(item.password) }}
                            required                    
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="1">
                      <FontAwesomeIcon 
                      className={ validate === true ? "picona" : "picono"}
                      icon={ validate === true ? faCheck : faTimes} />
                      </Col>                                                                    
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Retry - Password</label>
                          <Input
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder="password2"
                            value={password2}
                            onChange={ handlec(password2) }        
                            required                    
                          />
                        </FormGroup>
                      </Col>  
                      <Col className="pr-md-1" md="1">
                      <FontAwesomeIcon 
                        className={ item.password === password2 ? "picona" : "picono"}
                        icon={ item.password === password2 ? faCheck : faTimes} />
                      </Col>                                         
                    </Row>
                    
                    <Row>
                      <Col>
                      <Button 
                        className={item.password.toString() === password2.toString() ? 'btn-xs btn-success': 'btn-xs btn-warning disabled'} 
                        color="success" 
                        type="submit">
                          Actualizar
                      </Button>
                      </Col>
                    </Row>
                  </Form>
    </div>
    )
}

export default Seguridad