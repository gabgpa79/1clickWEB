import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { usuActions } from '../../actions'
import { Button,Row,Col,Modal,ModalBody } from "reactstrap";
import TableUsers from './components/TableUsers'
import ViewUsuario from './components/ViewUsuario'
/*import SearchClientes from './components/SearchClientes'*/
class users extends React.Component {
 
 toggleModal = () => {   
  let est = this.props.usus.modalView === true ? false : true
  this.props.modalView(est)
} 

componentWillUnmount() {  
  this.props.usuReset()
}

  render() {    
    const { modalView } = this.props.usus
    return (
      <>
    

      <div className="content">     
        <div className="main-contenido">
          <Row className="subi">          
            <Col md="12">
            <h4 >USUARIOS</h4>
            </Col>
          </Row>     

        <Row className="crl">
          <Col md="7">
              
          </Col>
          <Col md="5">
            
          </Col>
        </Row>
        <Row>       
          <Col md="12">
            <TableUsers/>
          </Col>
        </Row>




         <Modal isOpen={modalView} toggle={this.toggleModal}>
            <Button className="btn-view btn-danger"
                onClick={ () => this.toggleModal() }>
                <i className="fas fa-times"/>
            </Button>
          <ModalBody>
            <ViewUsuario/>
          </ModalBody>        
        </Modal>

        </div>
      </div>  
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
  usus: state.usus,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(users);
