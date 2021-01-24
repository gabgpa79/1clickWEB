import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../pages/login/login.jsx";
import Registro from "../../pages/registro/registro.jsx";
import Verificar from "../../pages/registro/verificar.jsx"
import { Notify } from "react-redux-notify";
import { Spinner } from "react-redux-spinner";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
    };
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <Spinner config={{ trickleRate: 3 }} />
          <Notify />
          <Switch>
            <Route path="/login/" component={Login} />
            <Route path="/registro" component={Registro} />
            <Route path="/verificar/:token" component={Verificar} />
          </Switch>
        </div>
      </>
    );
  }
}

export default Post;
