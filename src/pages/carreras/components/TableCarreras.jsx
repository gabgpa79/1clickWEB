import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crudActions } from '../../../actions'
import Pagination from '../../../components/Navbars/Pagination'


import {      
  Row,
  Col,  
  Table,  
  Button,  
  ButtonGroup
} from "reactstrap";

class TableCarreras extends React.Component {  
  state = {      
      nroPagina:12,
      modalDelete: false,
      deleteId: 0
      } 


componentDidMount() {  
  let num =   this.state.nroPagina
  this.makeHttpRequestWithPage(1,num);  
}

makeHttpRequestWithPage = (pageNumber,num) => {
    this.props.getData('CARRERA_DATA','carreras',pageNumber,num)
} 

handlePagina = prop => event => {             
    this.setState({
      nroPagina: event.value
    })    
   this.makeHttpRequestWithPage(1,event.value); 

}


componentWillUnmount() {
  this.props.reset('CARRERA_RESET')
}

toggleModal = (item) => {      
   const state = this.props.carreras.modalView === true ? false : true
   this.props.itemRegister('CARRERA_ITEM_REGISTER',state,item)
   
};

render() {    
  const { data, pagina, paginas, total } = this.props.carreras  
  const { nroPagina } = this.state    
    return (
      <>
      
      <Row>
        <Col className="rpx">    
        <Table className="table-basica">         
          <thead>
            <tr>          
              <th className="text-center" width="5%">#</th>                                            
              <th width="40%">Nombre</th>               
              <th width="20%" className="text-center" >Abreviatura</th>
              <th width="25%" className="text-center" >Facultad</th>
              <th width="10%" className="text-center" >Acciones</th>
            </tr>          
          </thead> 
          {data &&        
        <tbody>
        { data.map(item=>(
          <tr key={item.id} > 
            <td className="text-center">{ item.id }</td>                                                                   
            <td >{ item.nombre }</td>
            <td >{ item.abreviacion }</td>
            <td >{ item.Facultad.nombre }</td>
            <td className="text-center">
              <ButtonGroup>                                               
                <Button                                
                  className="btn-success btn-sm"                          
                  onClick={() => this.toggleModal(item) } >
                  <i className="far fa-edit" />
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
      <Col md="12" className="rpx">
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
      ...crudActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  carreras: state.carreras,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(TableCarreras);