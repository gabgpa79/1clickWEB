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

class TableEditoriales extends React.Component {  
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
    this.props.getData('EDITORIAL_DATA','editoriales',pageNumber,num)
} 

handlePagina = prop => event => {             
    this.setState({
      nroPagina: event.value
    })    
   this.makeHttpRequestWithPage(1,event.value); 

}


componentWillUnmount() {
  this.props.reset('EDITORIAL_RESET')
}

toggleModal = (item) => {      
   const state = this.props.editoriales.modalView === true ? false : true
   this.props.itemRegister('EDITORIAL_ITEM_REGISTER',state,item)
   
};

render() {    
  const { data, pagina, paginas, total } = this.props.editoriales  
  const { nroPagina } = this.state    
    return (
      <>
      
      <Row>
        <Col className="rpx">    
        <Table className="table-basica">         
          <thead>
            <tr>          
              <th className="text-center" width="5%">#</th>               
              <th width="15%">Código</th>                
              <th width="40%">Nombre</th> 
              <th width="15%">País</th>                    
              <th width="10%" className="text-center" >Acciones</th>                                            
            </tr>          
          </thead> 
          {data &&        
        <tbody>
        { data.map(item=>(
          <tr key={item.id} > 
            <td className="text-center">{ item.id }</td>                                                       
            <td >{ item.codigo }</td>  
            <td >{ item.nombre }</td>            
            <td >{ item.pais }</td>                        
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
  editoriales: state.editoriales,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(TableEditoriales);