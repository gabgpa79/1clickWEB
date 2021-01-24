import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faTimes} from "@fortawesome/free-solid-svg-icons";

import ReactToPrint from "react-to-print";
import { apiErp } from "../../../helpers";
import Moment from "react-moment";
import { Table, Row, Card, Col, Button, CardBody, CardFooter } from "reactstrap";

function ComponentToPrint ({ item, usuario, citem, pdata }) {     
    const fechaHoy = new Date();    
    return(
    <>
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
            <p className="text-right">Usuario : { usuario.nombres } </p>
        </Col>
    </Row>

    <Row>            
            <Col md="4">
              <Card className="card-cliente">
                <CardBody>                                    
                  <div className="author">                                      
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatari"                        
                        src={
                          apiErp + "/static/images/clientes/md/" + item.filename
                        }
                      />                      
                    </a>                    
                  </div>
                  <div className="card-description text-white">                    
                    {item.nombres}
                  </div>
                </CardBody>
                <CardFooter>
                <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Código:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {item.id}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Nombre:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {item.nombres}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Dirección:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {item.direccion}
                      </Col>                      
                    </Row>               
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Teléfono:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {item.telefono}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Celular:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {item.celular}
                      </Col>                      
                    </Row>             
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Email:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {item.email}
                      </Col>                      
                    </Row> 

                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Reg.:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                      {item.registrado ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-center text-success"
                        />
                      ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-danger text-danger"
                      />
                      )}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Habilitado:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                      {item.habilitado ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-center text-success"
                        />
                      ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-danger text-danger"
                      />
                      )}
                      </Col>                      
                    </Row>    
                      
                </CardFooter> 
              </Card>
              <Card className="card-cliente">                
                <CardFooter>
                <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Fecha registro:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {citem.fContrato}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Fecha vencimiento:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {citem.fVencimiento}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Motivo:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {citem.motivo}
                      </Col>                      
                    </Row>

                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Total:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {citem.total}
                      </Col>                      
                    </Row>
                                


                      
                </CardFooter> 
              </Card>
            </Col>
            <Col md="8">
            
    <div className="tablec">
    <Table className="table-simple">
            <thead>
          <tr>
            <th width="20%">N° Cuota</th>
            <th width="30%">Monto</th>
            <th width="20%">Vencimiento</th>
            <th width="20%">Estado</th>
          </tr>
        </thead>
        {pdata && (
          <tbody>
            {pdata.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.cuota}</td>
                <td>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "BOB",
                  }).format(item.monto)}
                </td>
                <td>
                  <Moment format="DD/MM/YYYY">
                    {item.fvencimiento}
                  </Moment>
                </td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        )}           
      </Table>  
    </div>
    </Col>
</Row> 


    </>
     )
}

function ClienteView ({ item, usuario, citem, pdata }) {     
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => ( <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>)}
            content={() => this.componentRef}          
        />
        <ComponentToPrint
            ref={(el) => (this.componentRef = el)}
            item={item}            
            usuario={usuario}
            citem={citem}
            pdata={pdata}
        />
    </div>
     )
}

export default ClienteView