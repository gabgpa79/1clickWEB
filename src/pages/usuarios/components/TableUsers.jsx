import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { usuActions } from '../../../actions'
import Pagination from '../../../components/Navbars/Pagination'
import Moment from 'react-moment'

import {      
  Row,
  Col,  
  Table,  
  Button,
  ButtonGroup
} from "reactstrap";

class TableUsers extends React.Component {  
constructor(props){
    super(props);
    this.state = {      
      nroPagina:12,
      modalDelete: false,
      deleteId: 0  
    };    
} 


componentDidMount() {  
  let num =   this.state.nroPagina
  this.makeHttpRequestWithPage(1,num);  
}

makeHttpRequestWithPage = (pageNumber,num) => {
    this.props.usuData(pageNumber,num)
} 

handlePagina = prop => event => {             
    this.setState({
      nroPagina: event.value
    })    
   this.makeHttpRequestWithPage(1,event.value); 

}

handleActivate = (item) => {           
    this.props.habilitarUser(item.id)     
}

toggleModal = (item) => {     
  let est = this.props.usus.modalView === true ? false : true    
  this.props.getUsuarioDetalle(est,item.id)
}

render() {    
  let { data, pagina, paginas, total} = this.props.usus
  let { nroPagina } = this.state  
    return (
      <>
      <Row className="limite">
      <Col md="12">
    
        <Table className="table-basica">         
          <thead>
            <tr>                                                            
              <th width="25%">Nombre</th>
              <th width="20%">Username</th>
              <th width="10%">F/Registro</th>
              <th width="15%">F/Aprobación</th>
              <th width="10%">Estado</th>
              <th width="10%">Participante</th>
              <th width="10%" className="text-center" >Acciones</th>                                            
            </tr>          
          </thead> 
          {data &&        
        <tbody>
        { data.map(item=>(
          <tr key={item.id} >             
            <td >{ item.nombres }</td>
            <td >{ item.username }</td>            
            <td ><Moment format="DD/MM/YYYY">{ item.createdAt }</Moment></td>            
            <td ><Moment format="DD/MM/YYYY">{ item.updatedAt }</Moment></td>            
            <td >{ item.estado === true ? 'habilitado' : 'desahabilitado'}</td>
            <td >{ item.registrado === true ? 'registrado' : 'pendiente'}</td>

            <td className="text-center">
              <ButtonGroup>                              	
                { item.participante === true ?
                <>
                <Button className="btn-primary btn-sm">
                  <i className="fas fa-lock-open" />
                </Button>
                <Button className="btn-warning btn-sm">
                  <i className="fas fa-file" />
                </Button>                
                </>
                :
                <Button                                
                  className="btn-success btn-sm"                          
                  onClick={() => this.handleActivate(item) } >
                  <i className="fas fa-check" />
                </Button>} 
                <Button                                
                  className="btn-danger btn-sm"
                  type="button"                                                  
                  onClick={() => this.toggleModal(item) } >
                  <i className="far fa-file-pdf" />
                </Button>
              </ButtonGroup>
            </td>          
          </tr>    
          ))}
        </tbody>
        }  
        </Table>
          
      </Col> 
      </Row>

        <Row>
      <Col md="12">
        <Pagination
        current = { pagina }
        paginas = { paginas }
        total   = { total }
        handlePagina = { this.handlePagina}
        pagina  = {nroPagina}
        makeHttpRequestWithPage = {this.makeHttpRequestWithPage}
      />
      </Col> 
      </Row>
 
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...usuActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({  
  users: state.users,
  usus: state.usus
});

export default connect(mapStateToProps,mapDispatchToProps)(TableUsers);