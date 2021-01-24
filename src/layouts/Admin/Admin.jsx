import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../actions";
import { Route, Switch } from "react-router-dom";


import AdminNavbar from "../../components/Navbars/AdminNavbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import { Notify } from "react-redux-notify";
import Error from "../Error.jsx";
import Dashboard from "../../pages/dashboard/dashboard.jsx";

import Usuarios from "../../pages/usuarios/users.jsx";
import Clientes from "../../pages/clientes/clientes.jsx";
import Cliente from "../../pages/clientes/cliente.jsx";
import Datos from "../../pages/datos/datos.jsx";
import Paquetes from "../../pages/paquetes/paquetes.jsx";
import Categorias from "../../pages/categorias/categorias.jsx";

import Perfil from "../../pages/perfil/perfil.jsx"
import Nota from "../../pages/nota/nota.jsx"
import { Spinner } from "react-redux-spinner";

import logo from "../../assets/img/logo.png";



class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemr: [],
      backgroundColor: 'blue',
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
     /* ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });*/
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
      /*  ps = new PerfectScrollbar(tables[i]);*/
      }
    }
    this.cahrgeModule();
  }
  /*componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }*/
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          /*ps = new PerfectScrollbar(tables[i]);*/
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  verificar = (component) => {
    switch (component) {
      case "Dashboard":
        return Dashboard;
      case "Usuarios":
        return Usuarios;
      case "Clientes":
        return Clientes;
      case "Datos":
        return Datos;      
      case "Perfil":
        return Perfil;  
      default:
        return null;
    }
  };
  cahrgeModule = () => {
    let items = [...this.state.itemr];
    this.props.users.items.map((prop, key) => {
      var dato = {
        path: prop.path,
        name: prop.name,
        icon: prop.icon,
        component: this.verificar(prop.component),
        layout: prop.layout,
      };
      items.push(dato);
      return null;
    });

    this.setState({
      itemr: items,
    });
  };
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  render() {
    const { itemr } = this.state;
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={itemr}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "https://biomax.com/",
              imgSrc: logo,
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <Spinner config={{ trickleRate: 3 }} />
            <Notify />
            <AdminNavbar
              {...this.props}
              routes={itemr}
              toggleSidebar={this.toggleSidebar}
              logo={{
                outterLink: "https://www.beggu.net/",
                text: "MLM",
                imgSrc: logo,
              }}
              sidebarOpened={this.state.sidebarOpened}
            />
            <Switch>
              {this.getRoutes(itemr)}
              <Route path="/admin/dashboard" component={Dashboard} />
              <Route path="/admin/cliente/:clienteId" component={Cliente} />
              <Route path="/admin/paquetes" component={Paquetes} />
              <Route path="/admin/categorias" component={Categorias} />
              <Route path="/admin/nota/:clienteId" component={Nota} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      ...userActions,
    },
    dispatch
  ),
});

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
