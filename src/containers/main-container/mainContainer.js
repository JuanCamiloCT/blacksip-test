import React, { Component } from "react";
import FormularioDireccion from "../../components/formulario-direccion/formularioDireccion";
import ResumenCompras from "../../components/resumen-compras/resumenCompras";
import '../../assets/css/skin.css';
import '../../assets/css/vars.css'

class MainContainer extends Component {

  render() {
    return (
      <div className="main-container">
        <header className="main-header">
          <div className="main-controls">
            <h4>Dirección de envio</h4>
            < ResumenCompras/>
          </div>
        </header>
        <FormularioDireccion />
      </div>
    )

  }
}

export default MainContainer;