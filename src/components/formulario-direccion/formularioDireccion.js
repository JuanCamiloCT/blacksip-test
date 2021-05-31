import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

class FormularioDireccion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //gets from services
      cities: [],
      City: '',
      Code: '',
      State: '',
      Town: '',
      Colonies: [],
      //send post
      nombre: '',
      apellidos: '',
      email: '',
      numero: '',
      col: '',
      calle: ''
    }
  }

  //get value from Form
  getName = (event) => {
    this.setState({ nombre: event.target.value });
  }
  getLast = (event) => {
    this.setState({ apellidos: event.target.value });
  }
  getEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  getNum = (event) => {
    this.setState({ numero: event.target.value });
  }
  getCalle = (event) => {
    this.setState({ calle: event.target.value });
  }
  getCol = (event) => {
    this.setState({ col: event.target.value });
  }
  //get code for get services
  getCodeColonies = (event) => {
    this.setState({ Code: event.target.value });
    console.log(this.state.Code)
    this.readColonies();
  }
  //get cities,states,tows,colonies from code postal
  readColonies = async () => {
    let code = this.state.Code;
    axios.get('https://blackisp.herokuapp.com/postalCodes/' + code)
      .then(res => {
        const cities = res.data;
        this.setState({ City: cities.city, State: cities.state, Town: cities.town, Colonies: cities.colonies });
      })
  }
  //send Data form
  sendForm = () => {
    const user = {
      nombre: this.state.nombre,
      apellidos: this.state.apellidos,
      email: this.state.email,
      col: this.state.col,
      state: this.state.State,
      city: this.state.City,
      town: this.state.Town,
      calle: this.state.calle
    };
    console.log({ user })
    axios.post(`https://blackisp.herokuapp.com/contact/`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert('Registro satisfactorio!')
      })
  }
  render() {
    return (
      <div>
        <div className="form-container">
          <form onSubmit={this.sendForm}>
            <div className="row">
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input type="text" placeholder="Nombre" value={this.state.nombre} onChange={this.getName} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input type="text" placeholder="Apellidos" value={this.state.apellidos} onChange={this.getLast} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input type="text" placeholder="Correo Electrónico" value={this.state.email} onChange={this.getEmail} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <input type="text" placeholder="Número de teléfono" value={this.state.numero} onChange={this.getNum} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                <input type="text" placeholder="Código postal" onKeyUp={this.getCodeColonies} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                {this.state.Colonies === undefined || this.state.Colonies.length === 1 ?
                  <input type="text" placeholder="Estado/Región" defaultValue={this.state.Colonies} />
                  : <select>{this.state.Colonies.map(colonia => <option value={this.state.col} onChange={this.getCol} key={colonia}>{colonia}</option>)}</select>
                }
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                <input type="text" placeholder="Estado/Región" defaultValue={this.state.State} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                <input type="text" placeholder="Ciudad" defaultValue={this.state.City} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                <input type="text" placeholder="Delegación/Municipio" defaultValue={this.state.Town} />
              </div>
              <div className="input-control">
                <span className="input-decoration">
                  <FontAwesomeIcon icon={faMapMarkedAlt} />
                </span>
                <input type="text" placeholder="Calle" value={this.state.calle} onChange={this.getCalle} />
              </div>
            </div>
            <div className="btn-group">
              <button type="button" className="btn-primary">Libreta de direcciones</button>
              <button type="sumit" className="btn-primary">Guardar</button>
            </div>
            <label className="check-container">Utilizar como diracción de facturación
            <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default FormularioDireccion;