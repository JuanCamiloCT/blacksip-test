import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

class ResumenCompras extends Component {
    //Open cart dropdown products
    OpenCarShopping() {
        document.getElementById("resumenContainer").classList.toggle("show");
        document.getElementById("menu").classList.toggle("simplemenu-show");
    }
    state = {
        productos: [],
      }
      //get array products
      componentDidMount() {
        axios.get(`https://blackisp.herokuapp.com/products`)
          .then(res => {
            const productos = res.data;
            this.setState({ productos });
          })
      }

    render() {
        return (

            <div className="simplemenu" id="menu">
                <button onClick={this.OpenCarShopping} className="dropbtn"><FontAwesomeIcon icon={faShoppingCart} /></button>
                <div id="resumenContainer" className="dropdown-content">
                    <div className="header-title">
                        <h5>Resumen de la orden</h5>
                    </div>
                    <ul className="products-list">
                    { this.state.productos.map(producto =><li key={producto.name}>
                            <div>
                                <img className="product-img" src={producto.image} alt="" />
                            </div>
                            <div>
                                <p className="product-info">{producto.name}</p>
                            </div>
                            <div>
                                <span className="product-price">${producto.price}.00</span>
                            </div>
                        </li>)}
                    </ul>
                    <div className="resumen-button">
                        <button type="button" className="btn-secondary">Editar</button>
                    </div>
                    <div className="subtotal-container">
                        <ul>
                            <li>
                                <span> Subtotal</span><span>$13.974.00</span>
                            </li>
                            <li>
                                <span>Envío</span><span>A calcular</span>
                            </li>
                        </ul>
                    </div>
                    <div className="total-container">
                        <ul>
                            <li>
                                <span>Total</span><span>$13.974.00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResumenCompras;