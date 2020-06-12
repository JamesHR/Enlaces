import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Operaciones
function getFSL (_Frecuencia, _Distancia) {
  const Frecuencia = Number(_Frecuencia);
  const Distancia = Number(_Distancia);
  
  const res = (20 * Math.log10((4 * (Frecuencia/300)) * 3.1416 * Distancia));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getPIRE ( _Ptx,  _Pctx,  _Pcotx, _Gtx) {
  const Ptx = Number(_Ptx);
  const Pctx = Math.abs(_Pctx);
  const Pcotx = Math.abs(_Pcotx);
  const Gtx = Number(_Gtx);

  const res = (Ptx + (-Pctx) + (-Pcotx) + Gtx);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
} 

function getRSL (_PIRE, _Pcrx, _Pcorx, _Grx, _FSL) {
  const PIRE = _PIRE;
  const Pcrx =  Math.abs(_Pcrx);
  const Pcorx =  Math.abs(_Pcorx);
  const Grx = Number(_Grx);
  const FSL = _FSL;

  const res = (PIRE + (-Pcrx) + (-Pcorx) + Grx - FSL);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getIRL (_RSl, _Sensibilidad) {
  const RSL = _RSl;
  const Sensibilidad = Math.abs(_Sensibilidad);
  
  const res = (RSL - (- Sensibilidad));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getFresnelC (_Distancia, _Frecuencia) {
  const Distancia = Number(_Distancia);
  const Frecuencia = Number(_Frecuencia);

  const res = (17.32 * (Math.sqrt(Distancia / (4 * Frecuencia))));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getFresnelD (_Dist1, _Dist2, _Distancia, _Frecuencia) {
  const d1 = Number(_Dist1);
  const d2 = Number(_Dist2);
  const Distancia = Number(_Distancia);
  const Frecuencia = Number(_Frecuencia);
  
  const res = (17.32 * (Math.sqrt((d1 * d2) / (_Distancia * Frecuencia))));
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
        <legend>{this.props.name}:</legend>
        <input value={this.props.value} onChange={this.handleChange} />
      </div>
    );
  }
}

// Main
class Calculator extends React.Component {
  constructor(props) {
    super(props);

    // Variables de usuario
    this.state = {
      CurrentForm : [1,1,1,1,1,1,1,1,1,1,1,0,0,0],

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

      _Radio: 0,
      _Dist1: 0,
      _Dist2: 0
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

    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleDist1Change = this.handleDist1Change.bind(this);
    this.handleDist2Change = this.handleDist2Change.bind(this);

  }

  // Controladores de eventos
  handleFrecChange = (value) => this.setState({ _Frecuencia: value });
  handleDistChange = (value) => this.setState({ _Distancia: value });
  handlerSensChange = (value) => this.setState({_Sensibilidad: value});

  handleGtxChange = (value) => this.setState({ _Gtx: value });
  handlePtxChange = (value) => this.setState({ _Ptx: value });
  handlePctxChange = (value) => this.setState({ _Pctx: value });
  handlePcotxChange = (value) => this.setState({ _Pcotx: value });

  handleGrxChange = (value) => this.setState({_Grx : value});
  handlePrxChange = (value) => this.setState({_Prx : value});
  handlePcrxChange = (value) => this.setState({_Pcrx : value});
  handlePcorxChange = (value) => this.setState({_Pcorx : value});

  handleRadioChange = (value) => this.setState({_Radio : value});
  handleDist1Change = (value) => this.setState({_Dist1 : value});
  handleDist2Change = (value) => this.setState({_Dist2 : value});

  
  // Selección de formulario
  setEnlaces = () => this.setState({CurrentForm : [1,1,1,1,1,1,1,1,1,1,1,0,0,0]});
  setFresnelC = () => this.setState({CurrentForm : [1,1,0,0,0,0,0,0,0,0,0,0,0,0]});
  setFresnelD = () => this.setState({CurrentForm : [1,1,0,0,0,0,0,0,0,0,0,0,1,1]});


  render() {
    // Constantes de renderizado
    const isVisible = this.state.CurrentForm;

    const _Frecuencia = this.state._Frecuencia;
    const _Distancia = this.state._Distancia;
    const _Sensibilidad = this.state._Sensibilidad;

    const _Gtx = this.state._Gtx;
    const _Ptx = this.state._Ptx;
    const _Pctx = this.state._Pctx;
    const _Pcotx = this.state._Pcotx;

    const _Grx = this.state._Grx
    const _Prx = this.state._Prx
    const _Pcrx = this.state._Pcrx
    const _Pcorx = this.state._Pcorx

    const _Radio = this.state._Radio
    const _Dist1 = this.state._Dist1
    const _Dist2 = this.state._Dist2

    // Constantes de resultado
    const FSL = getFSL(_Frecuencia, _Distancia);
    const PIRE = getPIRE(_Ptx, _Pctx, _Pcotx, _Gtx);
    const RSL = getRSL(PIRE,_Pcrx, _Pcorx, _Grx, FSL);
    const IRL = getIRL(RSL, _Sensibilidad);
    const FresnelC = getFresnelC(_Distancia, _Frecuencia);
    const FresnelD = getFresnelD(_Dist1, _Dist2, _Distancia, _Frecuencia);

    return (
      <div>
        <fieldset>
          <button onClick={() => this.setEnlaces()}>Enlaces</button>
          <button onClick={() => this.setFresnelC()}>Fresnel al centro</button>
          <button onClick={() => this.setFresnelD()}>Fresnel descetralizdo</button>

          <CreateInput name='Frecuencia' value={_Frecuencia}
            isVisible={isVisible[0]} onValueChange={this.handleFrecChange} />
            
          <CreateInput name='Distancia total' value={_Distancia} 
            isVisible={isVisible[1]} onValueChange={this.handleDistChange} />

          <CreateInput name='Sensibilidad' value={_Sensibilidad} 
            isVisible={isVisible[2]} onValueChange={this.handlerSensChange} />
          

          <CreateInput name='GTx' value={_Gtx}
            isVisible={isVisible[3]} onValueChange={this.handleGtxChange} />
          
          <CreateInput name='PTx' value={_Ptx} 
            isVisible={isVisible[4]} onValueChange={this.handlePtxChange} />
          
          <CreateInput name='PCTx' value={_Pctx}
            isVisible={isVisible[5]} onValueChange={this.handlePctxChange} />
          
          <CreateInput name='PCOTx' value={_Pcotx} 
            isVisible={isVisible[6]} onValueChange={this.handlePcotxChange} />

          
          <CreateInput name='GRx' value={_Grx} 
            isVisible={isVisible[7]} onValueChange={this.handleGrxChange} />

          <CreateInput name='PRx' value={_Prx} 
            isVisible={isVisible[8]} onValueChange={this.handlePrxChange} />

          <CreateInput name='PCRx' value={_Pcrx} 
            isVisible={isVisible[9]} onValueChange={this.handlePcrxChange} />

          <CreateInput name='PCORx' value={_Pcorx} 
            isVisible={isVisible[10]} onValueChange={this.handlePcorxChange} />

          
          <CreateInput name='Radio' value={_Radio} 
            isVisible={isVisible[11]} onValueChange={this.handleRadioChange} />

          <CreateInput name='Distancia 1' value={_Dist1} 
            isVisible={isVisible[12]} onValueChange={this.handleDist1Change} />

          <CreateInput name='Distancia 2' value={_Dist2} 
            isVisible={isVisible[13]} onValueChange={this.handleDist2Change} />

          <h3>FSL: {FSL}</h3>
          <h3>PIRE: {PIRE}</h3>
          <h3>RSL: {RSL}</h3>
          <h3>IRL: {IRL}</h3>
          <h3>Zona de fresnel 1: {FresnelC}</h3>
          <h3>Zona de fersnel 2: {FresnelD}</h3>
          
        </fieldset>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
