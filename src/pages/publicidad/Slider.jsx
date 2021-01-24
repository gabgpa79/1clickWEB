import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { apiErp } from "../../helpers";

import { Input, Row, Col, Label, FormGroup, Button, ButtonGroup } from "reactstrap";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file1: "",
      file2: "",
      file3: "",
      imagePreviewUrl1: "",
      imagePreviewUrl2: "",
      imagePreviewUrl3: "",

    };
  }

  componentDidMount() {
    this.setState({
      file1: "",
      file2: "",
      file3: "",
      imagePreviewUrl1: "",
      imagePreviewUrl2: "",
      imagePreviewUrl3: "",
    });
  }

  _handleSubmit1(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file1);
    this.props.slider(
      "CLIENTE_REGISTO",
      "files",
      formData,
      this.props.clientes.item.id,
      1
    );    
  }

  _handleSubmit2(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file2);
    this.props.slider(
      "CLIENTE_REGISTO",
      "files",
      formData,
      this.props.clientes.item.id,
      2

    );    
  }
  _handleSubmit3(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file3);
    this.props.slider(
      "CLIENTE_REGISTO",
      "files",
      formData,
      this.props.clientes.item.id,
      3
    );    
  }

  _handleImageChange1(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file1: file,
        imagePreviewUrl1: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  _handleImageChange2(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file2: file,
        imagePreviewUrl2: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  _handleImageChange3(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file3: file,
        imagePreviewUrl3: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { item } = this.props.clientes;
    const { imagePreviewUrl1,imagePreviewUrl2,imagePreviewUrl3, file1, file2, file3 } = this.state;
    
    let $imagePreview1 = null;
    let $imagePreview2 = null;
    let $imagePreview3 = null;
    
    if (imagePreviewUrl1) {
      $imagePreview1 = <img alt="preview" className="img-responsive" src={imagePreviewUrl1} />;
    } else {
      $imagePreview1 = (
        <img
          alt="imagen"
          className="img-responsive"
          src={apiErp + "/static/images/slider/lg/" + item.slider1}
        />
      );
    }
    if (imagePreviewUrl2) {
      $imagePreview2 = <img alt="preview" className="img-responsive" src={imagePreviewUrl2} />;
    } else {
      $imagePreview2 = (
        <img
          alt="imagen"
          className="img-responsive"
          src={apiErp + "/static/images/slider/lg/" + item.slider2}
        />
      );
    }
    if (imagePreviewUrl3) {
      $imagePreview3 = <img alt="preview" className="img-responsive" src={imagePreviewUrl3} />;
    } else {
      $imagePreview3 = (
        <img
          alt="imagen"
          className="img-responsive"
          src={apiErp + "/static/images/slider/lg/" + item.slider3}
        />
      );
    }

    return (
      <div className="containers">
        <Row className="slider">
          <Col md="10">
          <div className="sliderPreview">{$imagePreview1}</div>
          </Col>
          <Col md="2">
          <form onSubmit={(e) => this._handleSubmit1(e)}>
            {item.id && (
              <>
                <Row>
                  <Col className="imga text-center">
                    <FormGroup className="frmis">
                      <Input
                        type="file"
                        id="file1"
                        name="formData"
                        onChange={(e) => this._handleImageChange1(e)}
                      />
                      <Label for="file">seleccionar</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="imgas text-center">
                    <ButtonGroup>
                      <Button
                        className={
                          file1
                            ? "submitButton btn-success"
                            : "submitButton disabled"
                        }
                        type="submit"
                        onClick={(e) => this._handleSubmit1(e)}
                      >
                        Upload
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </>
            )}
          </form>
          </Col>  
        </Row>  

        <Row className="slider">
          <Col md="10">
          <div className="sliderPreview">{$imagePreview2}</div>
          </Col>
          <Col md="2">
          <form onSubmit={(e) => this._handleSubmit2(e)}>
            {item.id && (
              <>
                <Row>
                  <Col className="imga text-center">
                    <FormGroup className="frmis">
                      <Input
                        type="file"
                        id="file1"
                        name="formData"
                        onChange={(e) => this._handleImageChange2(e)}
                      />
                      <Label for="file">seleccionar</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="imgas text-center">
                    <ButtonGroup>
                      <Button
                        className={
                          file2
                            ? "submitButton btn-success"
                            : "submitButton disabled"
                        }
                        type="submit"
                        onClick={(e) => this._handleSubmit2(e)}
                      >
                        Upload
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </>
            )}
          </form>
          </Col>  
        </Row>  

        <Row className="slider">
          <Col md="10">
          <div className="sliderPreview">{$imagePreview3}</div>
          </Col>
          <Col md="2">
          <form onSubmit={(e) => this._handleSubmit3(e)}>
            {item.id && (
              <>
                <Row>
                  <Col className="imga text-center">
                    <FormGroup className="frmis">
                      <Input
                        type="file"
                        id="file1"
                        name="formData"
                        onChange={(e) => this._handleImageChange3(e)}
                      />
                      <Label for="file">seleccionar</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="imgas text-center">
                    <ButtonGroup>
                      <Button
                        className={
                          file3
                            ? "submitButton btn-success"
                            : "submitButton disabled"
                        }
                        type="submit"
                        onClick={(e) => this._handleSubmit3(e)}
                      >
                        Upload
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </>
            )}
          </form>
          </Col>  
        </Row>  
      </div>   
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

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
