import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import { crudActions } from '../../../actions'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

class SelectCarreras extends React.Component {  
constructor(props){
    super(props);
    this.state = {                                    
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
    };    
} 


handleChanges = prop => event => {  
 if(event){
   this.props.change('FACULTAD_CHANGE',prop, event.value);   
  }else{
  this.props.change('FACULTAD_CHANGE',prop, '');               
  } 
 }

componentWillUnmount() {
  this.props.reset('FACULTAD_RESET')
}

componentDidMount() {   
  this.props.getLista('FACULTAD_LISTA','facultades','0')  
}
render() {   
const { items, item } = this.props.facultades  
const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;

  return (
    
        <Select
          className="basic-single"
          defaultValue={items[0]}
          classNamePrefix="select"              
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}          
          options={items}
          value={defaultVal(items,item.id)}   
          onChange={this.handleChanges('id')}                          
          
        />  
    
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
  facultades: state.facultades,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SelectCarreras);