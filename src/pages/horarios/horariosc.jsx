import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import TimePicker from 'react-time-picker';

import {  
    Table,      
    Button
  } from "reactstrap";


const defaultVal = (valor) =>{
  let dd = "Lunes"
  switch(valor){
    case 1:
      dd =  "Lunes";
    break;
    case 2:
      dd =  "Martes";
    break;
    case 3:
      dd =  "Miercoles";
    break;
    case 4:
      dd =  "Jueves";
    break;
    case 5:
      dd =  "Viernes";
    break;
    case 6:
      dd =  "Sabado";
    break;
    case 7:
      dd =  "Domingo";
    break;
    default:
      dd =  "Lunes";
    break;  

  }
  return dd
}
  

class horariosc extends React.Component {
    constructor(props) {
        super(props);
    this.state = {        
        ditem: 0,
        hinicio:'00:00:00',
        hfin:'00:00:00',
        sucursalId:0,
        data:[]
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    } 

    componentWillUnmount() {
        this.props.reset("HORARIOS_RESET");
    }

    handleItem = (item) =>{      
        this.setState({
          ditem: item.id,
          sucursalId: item.sucursalId
        })
        
    }
    
    onChangei = time => {    
      this.setState({
        hinicio: time
      })
    }
  
    onChangef = time => {    
      this.setState({
        hfin: time
      })
    }

    handleSubmit(event) {
      event.preventDefault();      
      const { ditem, hinicio, hfin, sucursalId } = this.state      
      let dato = {}
      dato.id     = ditem
      dato.hinicio   = hinicio === '00:00:00' ? dato.hinicio : hinicio
      dato.hfin      = hfin === '00:00:00' ? dato.hfin : hfin
      dato.sucursalId = sucursalId      
      dato.tipo = "sucursalId"            
      this.props.update("HORARIO_UPDATE", "horarios", dato);
      
      this.setState({
        ditem : 0
      })
          
    }

     
  render() {                    
    const { data } = this.props.horario
    const { ditem } = this.state
    return (
      <div className="detim">
        <Table className="table-simple">
        <thead>
            <tr>
                  <th className="text-center" width="15%">
                    #
                  </th>
                  <th width="25%">Dia</th>                  
                  <th width="25%">Horario Inicio</th>
                  <th width="25%">Horario Fin</th>                  
                  
            </tr>
        </thead>
        {data && (
                <tbody>
                  {data.map((item) => (
                     item.id === ditem
                     ?
                     <tr
                     key={item.id}
                     >
                     <td className="text-center">{item.id}</td>
                        <td>{defaultVal(item.dia)}</td>  
                     <td>
                       <TimePicker                          
                        onChange={this.onChangei}
                        value={item.hinicio}                     
                      />
                     </td>
                     <td>
                       <TimePicker
                          onChange={this.onChangef}
                          value={item.hfin}                          
                        /> 
                     </td>
                     <td>
                       <Button
                        className="btn btn-sm btn-success"
                        onClick={ this.handleSubmit}
                       >
                         Guardar
                       </Button>
                     </td>
                     </tr>                    
                     :<tr 
                      key={item.id}
                      onClick={(e)=> this.handleItem(item)}                      
                      >
                        <td className="text-center">{item.id}</td>
                        <td>{defaultVal(item.dia)}</td>
                        <td>{item.hinicio}</td>
                        <td>{item.hfin}</td>
                      </tr>
                  ))}
                </tbody>
        )}
     </Table>       
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
  horario: state.horario,  
  users: state.users
});

export default connect(mapStateToProps, mapDispatchToProps)(horariosc);