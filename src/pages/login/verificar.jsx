import React from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions } from '../../actions'
import { Button,ButtonGroup,FormGroup,Form,Input,Col } from "reactstrap";
import { Link } from 'react-router-dom'

class verificar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
        user:{
          nombres:'',
          username: '',                 
          password:'',
          foto:'default.jpg',
          estado:false,          
          email:'',
          telefono:'',

        },            
        submitted: false,
        io : true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount() {
   const { match: { params } } = this.props;       
   this.props.verificarConfirmacion(params.token)    

}
componentWillUnmount() {
    
}  

handleSubmit (event) {
  event.preventDefault()
  const { user } = this.state;
  let dato = this.props.users.usuario
  dato.nombres = user.nombres
  dato.password = user.password
  dato.estado = true
  this.props.usuarioUpdate(dato)
  this.setState({    
      submitted: true    
  })

}

handleChange = prop => event => {   
  const { user } = this.state
  this.setState({
    user:{
      ...user,
      [prop]: event.target.value,
    }
  })
};

handleChanges = prop => event => {     
  const { io } = this.state
  this.setState({
    io : !io
  })  

};

  
  render() {
    const { nombres, io, submitted, password } = this.state;
    const { usuario } = this.props.users        
    const ty = io ? 'password' : 'text'
    const est = io  ? <i className="fas fa-eye f-form text-white" onClick= {this.handleChanges()} /> : <i className="fas fa-eye-slash f-form text-danger" onClick= {this.handleChanges()}/>    

    const obj = submitted === false && usuario ? <>  
        <h3 >Completa tus datos</h3>      
          <Form className="login" onSubmit={this.handleSubmit} >
             <FormGroup row > 
                <Col sm={2} className="ern"><i className="far fa-envelope"/></Col>
                <Col sm={10}>
                  <Input
                  type="email"
                  name="email"
                  id="email"
                  value={ usuario.email }                  
                  onChange= {this.handleChange('email')} 
                  readOnly
                />
                </Col>
            </FormGroup>
            <FormGroup row > 
                <Col sm={2} className="ern"><i className="far fa-user"/></Col>
                <Col sm={10}>
                  <Input
                  type="username"
                  name="username"
                  id="username"
                  value={ usuario.username }                  
                  onChange= {this.handleChange('username')} 
                  readOnly
                />
                </Col>
            </FormGroup>
            <FormGroup row > 
                <Col sm={2} className="ern"><i className="fas fa-phone"/></Col>
                <Col sm={10}>
                  <Input
                  type="text"
                  name="telefono"
                  id="telefono"
                  value={ usuario.telefono }                  
                  onChange= {this.handleChange('telefono')} 
                  readOnly
                />
                </Col>
            </FormGroup>
            <FormGroup row > 
                <Col sm={2} className="ern"><i className="fas fa-user"/></Col>
                <Col sm={10}>
                  <Input
                  type="text"
                  name="nombres"
                  id="nombres"
                  value={ nombres }
                  placeholder="nombres"
                  onChange= {this.handleChange('nombres')} 
                  minlength="5"
                  maxlength="40"
                  required
                />
                </Col>                
            </FormGroup>

            <FormGroup row > 
                <Col sm={2} className="ern"><i className="fas fa-key"/></Col>
                <Col sm={9}>
                  <Input
                  type={ ty }
                  name="password"
                  id="password"
                  value={ password }
                  placeholder="password"
                  onChange= {this.handleChange('password')} 
                  minlength="5"
                  maxlength="10"
                  required
                />
                </Col>                
                <Col sm={1}>
                 {est}
                </Col>                
            </FormGroup>
             

            


                       
            <ButtonGroup>
              <Button
                type="submit"                                             
                className={usuario ? 'btn-primary mt-2' : 'btn-primary mt-2 disabled'}>
                  <i className="fas fa-lock"/> {' '}  Registrar
              </Button>               
            </ButtonGroup>                          
          </Form> 
          </> 
          :
           <>
          <img
            alt="..."
            src={require("../../assets/img/react-logo.png")}
            className="mb-6"
         />         
          <h2>Confirmación realizada</h2>
            <Link to={`/login`}>             
              <Button                                
                 className="btn-success btn-lg"
                 type="button">
                <i className="fas fa-lock" />
                {' '} Iniciar Session
              </Button> 
            </Link>       
            
          </>


    return (
      <div className="pos"
      style={{
            backgroundImage:             
            "url(" + require("../../assets/img/bkp.jpg") + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',                                        
          }}
      >
        <div className="main-pos">      
          { obj }       
          <div className="footer">                    
          
          </div>          
        </div>    
      </div>       
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      ...userActions
    },
    dispatch,
  )  
})

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps,mapDispatchToProps)(verificar);

