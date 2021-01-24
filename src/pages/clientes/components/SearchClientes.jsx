import React from 'react';
import { FormGroup, Input } from "reactstrap";

function SearchClientes ({handleSearch, nombres }) {     
return(
    <div className="csearch">
     <FormGroup row>        
          <Input
            id="nombres"
            name="nombres"
            type="text"
            value={nombres}
            onChange={ handleSearch("nombres")}
            placeholder="...nombres"
          />                   
      </FormGroup>
    </div>
    )
}

export default SearchClientes