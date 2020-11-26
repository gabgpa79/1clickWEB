import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { crudActions } from '../../actions'
import { Modal, Nav, NavItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import TableCarreras from './components/TableCarreras'
import CarreraRegister from './components/CarreraRegister'


class carreras extends React.Component { 
  state = {
      acc1:"nav-links active",
      acc2:"nav-links " 
    }   

componentDidMount() {

}     

toggleModal = () => {  
   const item = null    
   const state = this.props.carreras.modalView === true ? false : true
   this.props.itemRegister('CARRERA_ITEM_REGISTER',state,item)
   
};

  render() {       
  const { modalView } = this.props.carreras
  const { acc1, acc2 } = this.state
    return (     
    <div className="content">     
        <div className="main-contenido">  
         <Row className="subi">          
            <Col md="9" className="text-left">              
              <Nav tabs className="bg-navin">                   
           <NavItem>            
              <Link to="/admin/datos" className="nav-link"> 
              <i className="fas fa-chevron-right"/>{' '}
              Configuración
              </Link>
          </NavItem>
          <NavItem>            
            <Link to="/admin/editoriales" className="nav-link"> 
              <i className="fas fa-chevron-right"/>{' '}
              Editoriales
            </Link>
          </NavItem>
          <NavItem>            
            <Link to="/admin/carreras" className="nav-link active"> 
            <i className="fas fa-chevron-down"/>{' '}
            Carreras </Link>
          </NavItem>
          <NavItem>            
            <Link to="/admin/facultades" className="nav-link"> 
            <i className="fas fa-chevron-right"/>{' '}
            Facultades </Link>
          </NavItem>               
        </Nav>
            </Col>
            <Col md="3" className="text-right">
              <h5 >DATOS</h5>
            </Col>
          </Row>  
          <Row>
            <Col>
              <Nav tabs className="bg-navins">            
            <li className={ acc1 }> 
                  <i className="fas fa-list fa-md"/> {' '}
                  Lista 
              </li>                             
              <li className={ acc2 }
                  onClick={() => { this.toggleModal(); }}> 
                  <i className="fas fa-plus fa-md"/> {' '}
                  Nuevo 
              </li>                                         
          </Nav>
            </Col>
          </Row>

          <Row>
            <Col>
              <TableCarreras/>
            </Col>
          </Row>          
        </div>

        <Modal
          modalClassName="modal-update"
          isOpen={modalView}
          toggle={this.toggleModal}
        >       
        <div className="modal-content">                     
        <CarreraRegister/>
      </div>
  </Modal>

      </div> 
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
  users: state.users,
  carreras: state.carreras

});

export default connect(mapStateToProps,mapDispatchToProps)(carreras);