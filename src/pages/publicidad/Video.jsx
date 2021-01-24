import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,  
  Card,
  CardBody,  
  CardHeader
} from "reactstrap";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();     
        let dato = this.props.clientes.item;	             
        this.props.update("CLIENTE_REGISTO", "clientes", dato);
  }

  handleChanges = (prop) => (event) => {
    if (event) {
      this.props.change("CLIENTE_CHANGE", prop, event.target.value);
    } else {
      this.props.change("CLIENTE_CHANGE", prop, "");
    }
  };

  
  render() {
    const { item } = this.props.clientes;    
    
    return (
      <>
       
        <div className="linea">
        <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Editar Datos</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Video</label>
                          <Input
                            type="text"
                            name="video"
                            id="video"
                            placeholder="...video"
                            value={item.video}
                            onChange={this.handleChanges("video")}        
                            required                    
                          />
                        </FormGroup>
                      </Col>                                        
                    </Row>
                    <Row>
                      <Col>
                      <Button 
                        className="btn-sm mb-2" color="success" type="submit">
                          Guardar
                      </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>                
              </Card>
            </Col>            
          </Row>
        </div>
      </>
    );
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
  clientes: state.clientes,  
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
