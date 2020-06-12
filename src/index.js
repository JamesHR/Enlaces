import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Operaciones
function getFSL(_Frecuencia, _Distancia) {
  const Frecuencia = Number(_Frecuencia);
  const Distancia = Number(_Distancia);

  const res = (20 * Math.log10((4 * (Frecuencia / 300)) * 3.1416 * Distancia));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getPIRE(_Ptx, _Pctx, _Pcotx, _Gtx) {
  const Ptx = Number(_Ptx);
  const Pctx = Math.abs(_Pctx);
  const Pcotx = Math.abs(_Pcotx);
  const Gtx = Number(_Gtx);

  const res = (Ptx + (-Pctx) + (-Pcotx) + Gtx);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getRSL(_PIRE, _Pcrx, _Pcorx, _Grx, _FSL) {
  const PIRE = Number(_PIRE);
  const Pcrx = Math.abs(_Pcrx);
  const Pcorx = Math.abs(_Pcorx);
  const Grx = Number(_Grx);
  const FSL = Number(_FSL);

  const res = (PIRE + (-Pcrx) + (-Pcorx) + Grx - FSL);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getIRL(_RSl, _Sensibilidad) {
  const RSL = Number(_RSl);
  const Sensibilidad = Math.abs(_Sensibilidad);

  const res = (RSL - (- Sensibilidad));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getFresnelC(_Distancia, _Frecuencia, _Ganancia) {
  const Distancia = Number(_Distancia / 1000);
  const Frecuencia = Number(_Frecuencia / 1000);
  const Ganancia = Number(_Ganancia);

  const res = ((17.32 * (Math.sqrt(Distancia / (4 * Frecuencia)))) * (Ganancia / 100));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getFresnelD(_Dist1, _Dist2, _Distancia, _Frecuencia, _Ganancia) {
  const d1 = Number(_Dist1 / 1000);
  const d2 = Number(_Dist2 / 1000);
  const Distancia = Number(_Distancia / 1000);
  const Frecuencia = Number(_Frecuencia / 1000);
  const Ganancia = Number(_Ganancia);

  const res = ((17.32 * (Math.sqrt((d1 * d2) / (Distancia * Frecuencia)))) * (Ganancia / 100));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getAltura(_Obstaculo, _Fresnel) {
  const Obstaculo = Number(_Obstaculo);
  const Fresnel = Number(_Fresnel);

  const res = (Obstaculo + Fresnel);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}



// Controles
class CreateInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => this.props.onValueChange(e.target.value);

  render() {
    const visible = (this.props.isVisible === 1) ? 'txt-input' : 'txt-input-hidden';

    return (
      <div class={visible} >
        <label for={this.props.name}>{this.props.name}</label>
        <div class="wrap-input100 validate-input" >
          <input type="number" class="input100"
            id={this.props.name} placeholder={this.props.name}
            value={this.props.value} onChange={this.handleChange }
          />
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </span>
          <span class="unit-input100">
            <p>{this.props.units}</p>
          </span>
        </div>
      </div >
    );
  }
}

// Main
class Calculator extends React.Component {
  constructor(props) {
    super(props);

    // Variables de usuario
    this.state = {
      CurrentForm: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      IdForm: 0,
      FormName: 'Enlaces y Zona de Fresnel',
      UnitFrec: 'Mhz',
      UnitDist: 'mts',

      _Frecuencia: 0,
      _Distancia: 0,
      _Sensibilidad: 0,

      _Gtx: 0,
      _Ptx: 0,
      _Pctx: 0,
      _Pcotx: 0,

      _Grx: 0,
      _Prx: 0,
      _Pcrx: 0,
      _Pcorx: 0,

      _Dist1: 0,
      _Dist2: 0,
      _Ganancia: 100,
      _Obstaculo: 0,
    };

    // Inicio de los controladores de eventos
    this.handleFrecChange = this.handleFrecChange.bind(this);
    this.handleDistChange = this.handleDistChange.bind(this);
    this.handlerSensChange = this.handlerSensChange.bind(this);

    this.handleGtxChange = this.handleGtxChange.bind(this);
    this.handlePtxChange = this.handlePtxChange.bind(this);
    this.handlePctxChange = this.handlePctxChange.bind(this);
    this.handlePcotxChange = this.handlePcotxChange.bind(this);

    this.handleGrxChange = this.handleGrxChange.bind(this);
    this.handlePrxChange = this.handlePrxChange.bind(this);
    this.handlePcrxChange = this.handlePcrxChange.bind(this);
    this.handlePcorxChange = this.handlePcorxChange.bind(this);

    this.handleDist1Change = this.handleDist1Change.bind(this);
    this.handleDist2Change = this.handleDist2Change.bind(this);
    this.handleGananciaChange = this.handleGananciaChange.bind(this);
    this.handleObstaculoChange = this.handleObstaculoChange.bind(this);

  }

  // Controladores de eventos
  handleFrecChange = (value) => this.setState({ _Frecuencia: value });
  handleDistChange = (value) => this.setState({ _Distancia: value });
  handlerSensChange = (value) => this.setState({ _Sensibilidad: value });

  handleGtxChange = (value) => this.setState({ _Gtx: value });
  handlePtxChange = (value) => this.setState({ _Ptx: value });
  handlePctxChange = (value) => this.setState({ _Pctx: value });
  handlePcotxChange = (value) => this.setState({ _Pcotx: value });

  handleGrxChange = (value) => this.setState({ _Grx: value });
  handlePrxChange = (value) => this.setState({ _Prx: value });
  handlePcrxChange = (value) => this.setState({ _Pcrx: value });
  handlePcorxChange = (value) => this.setState({ _Pcorx: value });

  handleDist1Change = (value) => this.setState({ _Dist1: value });
  handleDist2Change = (value) => this.setState({ _Dist2: value });
  handleGananciaChange = (value) => this.setState({ _Ganancia: value });
  handleObstaculoChange = (value) => this.setState({ _Obstaculo: value });


  // Selección de formulario
  setAll = () => this.setState({ IdForm: 0, CurrentForm: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], FormName: 'Enlaces y Zona de Fresnel' });
  setEnlaces = () => this.setState({ IdForm: 1, CurrentForm: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], FormName: 'Enlaces', UnitDist: 'mts', UnitFrec: 'MHz' });
  setFresnelC = () => this.setState({ IdForm: 2, CurrentForm: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], FormName: 'Zona de Fresnel al Centro', UnitDist: 'Km', UnitFrec: 'GHz' });
  setFresnelD = () => this.setState({ IdForm: 3, CurrentForm: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], FormName: 'Zona de Fresnel Descentralizada', UnitDist: 'Km', UnitFrec: 'GHz' });

  render() {
    // Constantes de renderizado
    const isVisible = this.state.CurrentForm;
    const FormName = this.state.FormName;

    const _Frecuencia = this.state._Frecuencia;
    const _Distancia = this.state._Distancia;
    const _Sensibilidad = this.state._Sensibilidad;

    const _Gtx = this.state._Gtx;
    const _Ptx = this.state._Ptx;
    const _Pctx = this.state._Pctx;
    const _Pcotx = this.state._Pcotx;

    const _Grx = this.state._Grx;
    const _Prx = this.state._Prx;
    const _Pcrx = this.state._Pcrx;
    const _Pcorx = this.state._Pcorx;

    const _Ganancia = this.state._Ganancia;
    const _Dist1 = this.state._Dist1;
    const _Dist2 = this.state._Dist2;
    const _Obstaculo = this.state._Obstaculo;

    // Constantes de resultado
    const isHide = (value) => (value === this.state.IdForm || this.state.IdForm === 0) ? '' : 'output-hidden';

    const FSL = getFSL(_Frecuencia, _Distancia).toFixed(4);
    const PIRE = getPIRE(_Ptx, _Pctx, _Pcotx, _Gtx).toFixed(4);
    const RSL = getRSL(PIRE, _Pcrx, _Pcorx, _Grx, FSL).toFixed(4);
    const IRL = getIRL(RSL, _Sensibilidad).toFixed(4);
    const FresnelC = getFresnelC(_Distancia, _Frecuencia, 100).toFixed(4);
    const FresnelC2 = getFresnelC(_Distancia, _Frecuencia, 66).toFixed(4);
    const FresnelD = getFresnelD(_Dist1, _Dist2, _Distancia, _Frecuencia, 100).toFixed(4);
    const FresnelD2 = getFresnelD(_Dist1, _Dist2, _Distancia, _Frecuencia, 66).toFixed(4);

    const AlturaC = getAltura(_Obstaculo, FresnelC).toFixed(4);
    const AlturaC2 = getAltura(_Obstaculo, FresnelC2).toFixed(4);
    const AlturaD = getAltura(_Obstaculo, FresnelD).toFixed(4);
    const AlturaD2 = getAltura(_Obstaculo, FresnelD2).toFixed(4);

    function viable () { 
      if (IRL < 10) 
        return 'El enlace no es viable';
      else if (IRL >= 10 && IRL < 15)
        return 'El enlace es satisfactorio'
      else 
        return 'El enlace es optimo'
    }

    return (
      <div class="limiter">
        <ul class="nav nav-tabs nav-justified">
          <li class="nav-item">
            <button class="btn-tabs" onClick={() => this.setAll()}>TODO</button>
          </li>
          <li class="nav-item">
            <button class="btn-tabs" onClick={() => this.setEnlaces()}>Enlaces</button>
          </li>
          <li class="nav-item">
            <button class="btn-tabs" onClick={() => this.setFresnelC()}>Fresnel al centro</button>
          </li>
          <li class="nav-item">
            <button class="btn-tabs" onClick={() => this.setFresnelD()}>Fresnel descetralizdo</button>
          </li>
        </ul>
        <div class="container-login100">
          <div class="wrap-login100">
            <div class="login100-form">
              <span class="login100-form-title">{FormName}</span>

              <CreateInput name='Frecuencia' value={_Frecuencia} units='MHz'
                isVisible={isVisible[0]} onValueChange={this.handleFrecChange} />

              <CreateInput name='Distancia total' value={_Distancia} units='mts'
                isVisible={isVisible[1]} onValueChange={this.handleDistChange} />

              <CreateInput name='Sensibilidad' value={_Sensibilidad} units='dB'
                isVisible={isVisible[2]} onValueChange={this.handlerSensChange} />


              <CreateInput name='GTx' value={_Gtx} units='dB'
                isVisible={isVisible[3]} onValueChange={this.handleGtxChange} />

              <CreateInput name='PTx' value={_Ptx} units='dB'
                isVisible={isVisible[4]} onValueChange={this.handlePtxChange} />

              <CreateInput name='PCTx' value={_Pctx} units='dB'
                isVisible={isVisible[5]} onValueChange={this.handlePctxChange} />

              <CreateInput name='PCOTx' value={_Pcotx} units='dB'
                isVisible={isVisible[6]} onValueChange={this.handlePcotxChange} />


              <CreateInput name='GRx' value={_Grx} units='dB'
                isVisible={isVisible[7]} onValueChange={this.handleGrxChange} />

              <CreateInput name='PRx' value={_Prx} units='dB'
                isVisible={isVisible[8]} onValueChange={this.handlePrxChange} />

              <CreateInput name='PCRx' value={_Pcrx} units='dB'
                isVisible={isVisible[9]} onValueChange={this.handlePcrxChange} />

              <CreateInput name='PCORx' value={_Pcorx} units='dB'
                isVisible={isVisible[10]} onValueChange={this.handlePcorxChange} />


              <CreateInput name='Distancia 1' value={_Dist1} units='mts'
                isVisible={isVisible[11]} onValueChange={this.handleDist1Change} />

              <CreateInput name='Distancia 2' value={_Dist2} units='mts'
                isVisible={isVisible[12]} onValueChange={this.handleDist2Change} />

              <CreateInput name='Obstaculo mas alto' value={_Obstaculo} units='mts'
                isVisible={isVisible[13]} onValueChange={this.handleObstaculoChange} />

            </div>
            <div class="login100-pic js-tilt outputs" data-tilt>
              <h4 class={isHide(1)}>Enlaces</h4>
              <h6 class={isHide(1)}>FSL: {FSL} dBi</h6>
              <h6 class={isHide(1)}>PIRE: {PIRE} dBi</h6>
              <h6 class={isHide(1)}>RSL: {RSL} dBi</h6>
              <h6 class={isHide(1)}>IRL: {IRL} dBi</h6>
              <h6 class={isHide(1)}>Viabilidad: {viable()} </h6>
              <hr></hr>

              <h4 class={isHide(2)}>Zona de fresnel al centro</h4>
              <h6 class={isHide(2)}>Radio en zona 100%: {FresnelC} m</h6>
              <h6 class={isHide(2)}>Altura de las torres: {AlturaC} m</h6>
              <br></br>
              <h6 class={isHide(2)}>Radio en zona 66%: {FresnelC2} m</h6>
              <h6 class={isHide(2)}>Altura de las torres: {AlturaC2} m</h6>
              <hr></hr>

              <h4 class={isHide(3)}>Zona de fresnel desentralizada</h4>
              <h6 class={isHide(3)}>Radio al 100%: {FresnelD} m</h6>
              <h6 class={isHide(3)}>Altura de las torres: {AlturaD} m</h6>
              <br></br>
              <h6 class={isHide(3)}>Radio al 66%: {FresnelD2} m</h6>
              <h6 class={isHide(3)}>Altura de las torres: {AlturaD2} m</h6>
              <hr></hr>

              <h5></h5>
              <h5></h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));