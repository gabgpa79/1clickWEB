import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tareaActions } from '../../../actions'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import ModalTask from './ModalTask'
import ViewTask from './ViewTask'
import { Modal } from "reactstrap";

const getMes = () =>{
  let mesHoy = new Date()
  let m = mesHoy.getMonth() +1
  let y = mesHoy.getFullYear()
  let fecha ={}
  fecha.desde = `${y}-${m}-01`
  fecha.hasta = 0
  switch(m)
  {
    case 1:      
      fecha.hasta = `${y}-${m}-31`
    break;  
    case 2:
      fecha.hasta = `${y}-${m}-28`          
    break;  
    case 3:      
      fecha.hasta = `${y}-${m}-31`
      break;
    case 4:      
      fecha.hasta = `${y}-${m}-30`      
      break;
    case 5:      
      fecha.hasta = `${y}-${m}-31`
      break;
    case 6:      
      fecha.hasta = `${y}-${m}-30`
      break;
    case 7:      
      fecha.hasta = `${y}-${m}-31`
      break;
    case 8:      
      fecha.hasta = `${y}-${m}-31`
      break;
    case 9:      
      fecha.hasta = `${y}-${m}-30`
      break;
    case 10:      
      fecha.hasta = `${y}-${m}-31`
      break;
    case 11:      
      fecha.hasta = `${y}-${m}-30`
      break;        
    case 12:      
      fecha.hasta = `${y}-${m}-31`
      break;  
    default:
    break;

  }
  return fecha

}

class CalendarTareas extends React.Component {    
constructor(props){
    super(props);
    this.state = {
      modalDelete: false,
      modalRegister: false,
      modalView: false,
      deleteId:0,
      fechaId:'',
      titulo:'' ,
      task: {            
          id:'',          
          usuarioId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }    
    };
    this.handleSubmit = this.handleSubmit.bind(this);    
} 

componentDidMount() {
 const {desde, hasta} = getMes()  
 let dato ={}
 dato.usuarioId = this.props.users.user.id
 dato.desde  = desde
 dato.hasta  = hasta
 this.props.taskData(dato)
}

componentWillUnmount() {
  this.props.taskReset()
}

handleChange = async (event) => {
   const { name, value } = event.target;  
   const { task } = this.state
   await this.setState({
    task:{
      ...task,
      [name]: value
      }
   })
};

handleChanges = async (event) => {      
   const { task } = this.state
   await this.setState({
    task:{
      ...task,
      backgroundColor: event.value
      }
   })
};


toggleModalRegister = (arg) => {      
  this.setState({
    modalRegister: !this.state.modalRegister,
    fechaId: arg
  }); 
}

toggleModalView = (item) => {  
  if(this.state.modalView){
    this.setState({
    modalView: !this.state.modalView  ,
    task: {            
          id:'',          
          usuarioId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }   
  }); 
  } else{      
    this.setState({
    modalView: !this.state.modalView,
    task: {
      id: item.event.id,
      title: item.event.title,
      start: item.event.start
    }
  });
  }   
};

handleSubmit(event){     
  const {desde, hasta} = getMes() 
  let dato = this.state.task
  dato.usuarioId = this.props.users.user.id    
  dato.start = this.state.fechaId.date
  dato.end = this.state.fechaId.date
  dato.desde = desde
  dato.hasta = hasta

  this.props.taskCreate(dato);
  this.setState({
    modalRegister: false,        
    fechaId:'',
     task: {            
          id:'',          
          usuarioId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }
    
   })
  event.preventDefault();      
}

handleMarcar=(task)=>{
  const {desde, hasta} = getMes() 
  let dato = task
  dato.classNames="tachado"
  dato.backgroundColor="#26e413"
  dato.usuarioId = this.props.users.user.id
  dato.desde = desde
  dato.hasta = hasta
  this.props.taskUpdate(dato);
  this.setState({
    modalView: false,        
    fechaId:'',
     task: {            
          id:'',          
          usuarioId:0,
          start:'',
          end:'',
          title:'',
          url:'#',
          editable:false,
          selectable:false,
          backgroundColor: '#1da1f2'
        }
    
   })
}

render() {      
  const { modalRegister, modalView, task } = this.state
  let {data } = this.props.tareas      
    return (
      < >
        <FullCalendar      
            locales={[ esLocale]}  
            locale= {'es'}
        timeZone={'America/La_Paz'}
        navLinks={true}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        defaultView="dayGridMonth"                
        header={{
              left: 'prev,next today',
              center: 'title'              
            }}
            events= { data }         
        eventLimit={ true}
        dateClick={ this.toggleModalRegister}
        eventClick={this.toggleModalView}    
           
        /> 
      <Modal
        modalClassName="modal-task" 
        isOpen={modalRegister}
        toggle={this.toggleModalRegister} 
        >        
        <ModalTask        
        handleChange={this.handleChange}
        handleChanges={this.handleChanges}
        handleSubmit={ this.handleSubmit}
        task = {task}
        /> 
      </Modal>
      
      <Modal 
      modalClassName="modal-task"
      isOpen={modalView}
      toggle={this.toggleModalView} 
      > 
      <ViewTask
          task={task}   
          handleMarcar={ this.handleMarcar}            
        />          
      </Modal>

  </>  


    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...tareaActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  tareas: state.tareas,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(CalendarTareas);
