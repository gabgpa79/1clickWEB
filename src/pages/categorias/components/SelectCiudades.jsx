import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import { crudActions } from '../../../actions'

const origens =[ 
                 {"label":"Argentina", "value":"Argentina"}, 
{"label":"Bolivia","value":"Bolivia"}, 
{"label":"Brasil","value":"Brasil"}, 
{"label":"Canada","value":"Canada"}, 
{"label":"Colombia","value":"Colombia"}, 
{"label":"Mexico","value":"Mexico"}, 
{"label":"Paraguay","value":"Paraguay"}, 
{"label":"Peru","value":"Peru"}, 
{"label":"Uruguay","value":"Uruguay"}, 
{"label":"Venezuela","value":"Venezuela"} 
                ];

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

class SelectPaises extends React.Component {  
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
   this.props.change('EDITORIAL_CHANGE',prop, event.value);
  }else{
  this.props.change('EDITORIAL_CHANGE',prop, '');             
  }
 }

render() {   
const { item } = this.props.editoriales
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
          defaultValue={origens}
          classNamePrefix="select"              
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="tipo"          
          options={origens}
          value={defaultVal(origens,item.pais)}   
          onChange={this.handleChanges('pais')}                          
          
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
  editoriales: state.editoriales,
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(SelectPaises);