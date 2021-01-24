import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import Moment from 'react-moment'
import { Card, Button, CardFooter, Table,Row, Col  } from "reactstrap";

class nota extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
        activeTab:'2',
        clienteId: 0,
        password2:'0', 
        validate:false,
        igual:false
    };    
  };  

    componentDidMount() {
        const {
          match: { params },
        } = this.props;
        if (params.clienteId > 0) {
          this.props.getNota("NOTA_ITEM", "contratos", params.clienteId);
          this.setState({
            clienteId: params.clienteId
          })
        }
    }    

    handleSubmit = (dato) =>  {        
        this.props.pagar("PLAN_ITEM", "contratos", dato);         
      }

     
  render() {           
    const { nitem, data  } = this.props.notas    
    const { user } = this.props.users
    const fechaHoy = new Date();    
    return (
        <div className="content">
        <div className="main-contenido">        
       
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
            <p className="text-right">Usuario : { user.nombres } </p>
        </Col>
    </Row>

    <Row>            
            <Col md="4">              
              <Card className="card-cliente">                
                <CardFooter>
                <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          F. registro:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          <Moment format="DD/MM/YYYY">{nitem.createdAt}</Moment>
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Monto:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {nitem.monto}
                      </Col>                      
                    </Row>
                    <Row>
                      <Col className="pr-md-1 txtcl" md="4">                        
                          Registro N°:
                      </Col>
                      <Col className="px-md-1 txtcl" md="8">                        
                          {nitem.contratoId}
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
            <th width="10%">Acción</th>
          </tr>
        </thead>
        {data && (
          <tbody>
            {data.map((item) => (
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
                <td                
                >
                   <span
                   className={item.estado === 'pagado' ? 'text-success': 'text-danger'}   
                   >{item.estado}
                       </span> 
                    
                </td>
                <td>
                    <Button
                    className="btn btn-success btn-sm"
                    onClick={(e) => { this.handleSubmit(item.id)}}
                    >
                        Pagar
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}           
      </Table>  
    </div>
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
  plan: state.plan,
  notas: state.notas,
  users: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(nota);