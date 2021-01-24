import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crudActions } from "../../actions";
import { apiErp } from "../../helpers";

import { Input, Row, Col, Label, FormGroup, Button, ButtonGroup } from "reactstrap";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
    };
  }

  componentDidMount() {
    this.setState({
      file: "",
      imagePreviewUrl: "",
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    this.props.banner(
      "CLIENTE_REGISTO",
      "files",
      formData,
      this.props.clientes.item.id
    );
    /* this.setState({
        file: '',
        imagePreviewUrl: ''
      });*/
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { item } = this.props.clientes;
    const { imagePreviewUrl, file } = this.state;
    
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="preview" className="img-responsive" src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <img
          alt="banner"
          className="img-responsive"
          src={apiErp + "/static/images/banner/lg/" + item.banner}
        />
      );
    }

    return (
      <>        
      
        <Row className="bannerPreview">
          <Col>
              {$imagePreview}
          </Col>
        </Row>
        <Row className="bannerSave">          
          <Col>
          <form onSubmit={(e) => this._handleSubmit(e)}>
    {item.id && (
      <>
        <Row>
          <Col className="imga text-center">
            <FormGroup className="frmi">
              <Input
                type="file"
                id="file"
                name="formData"
                onChange={(e) => this._handleImageChange(e)}
              />
              <Label for="file">seleccionar</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="imga text-center">
            <ButtonGroup>
              <Button
                className={
                  file
                    ? "submitButton btn-success"
                    : "submitButton disabled"
                }
                type="submit"
                onClick={(e) => this._handleSubmit(e)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
