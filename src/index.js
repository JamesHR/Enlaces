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

// Sistema fotovoltaico
function getCargaTotal(_DeviceList) {
  var res = 0;
  _DeviceList.forEach(item => {
    res += Number(item.total);
  });

  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getCargaDiaria (_CargaTotal, _Tension) {
  const CargaTotal = Number(_CargaTotal);
  const Tension = Number(_Tension);
  
  const res = (CargaTotal / Tension);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getCargaDiariaCorregida (_CargaDiaria, _FactorSeguridad) {
  const CargaDiaria = Number(_CargaDiaria);
  const FactorSeguridad = Number(_FactorSeguridad / 100);

  const res = (CargaDiaria * (1 + FactorSeguridad));
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getAmperajeRequerido (_CargaDiariaCorregida, _HorasSol) {
  const CargaDiariaCorregida = Number (_CargaDiariaCorregida);
  const HorasSol = Number(_HorasSol);

  const res = (CargaDiariaCorregida / HorasSol);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getPaneles (_AmperajeRequerido, _AmperajePanel) {
  const AmperajeRequerido = Number(_AmperajeRequerido);
  const AmperajePanel = Number (_AmperajePanel);

  const res = (AmperajeRequerido / AmperajePanel);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getCapacidadBanco (_CargaDiariaCorregida, _Reserva) {
  const CargaDiariaCorregida = Number(_CargaDiariaCorregida);
  const Reserva = Number(_Reserva);

  const res = (CargaDiariaCorregida * Reserva);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getCapacidadBancoCorregida (_CapacidadBanco, _FactorDescarga) {
  const CapacidadBanco = Number(_CapacidadBanco);
  const FactorDescarga = Number(_FactorDescarga / 100);

  const res = (CapacidadBanco / FactorDescarga);
  return (isNaN(res) || !isFinite(res)) ? 0 : res;
}

function getBaterias (_CapacidadBancoCorregida, _CapacidadBateria) {
  const CapacidadBancoCorregida = Number(_CapacidadBancoCorregida);
  const CapacidadBateria = Number(_CapacidadBateria);

  const res = (CapacidadBancoCorregida / CapacidadBateria);
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
    const type = (this.props.type != null) ? this.props.type : 'number';

    return (
      <div className={visible} >
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <div className="wrap-input100 validate-input" >
          <input type={type} className="input100"
            id={this.props.name} placeholder={this.props.name}
            value={this.props.value} onChange={this.handleChange }
          />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </span>
          <span className="unit-input100">
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
      CurrentForm: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
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
      //_Ganancia: 100,
      _Obstaculo: 0,

      // Sistema fotovoltaico
      _DeviceList: [],
      _DeviceItemNombre: '',
      _DeviceItemCantidad : 0,
      _DeviceItemCarga : 0,
      _DeviceItemHoras : 0,
      _DeviceItemTotal : 0,

      // Constantes
      _Tension: 12,
      _FactorSeguridad: 20,
      _HorasSol: 6,
      _AmperajePanel: 6,
      _Reserva: 2,
      _FactorDescarga: 80,
      _CapacidadBateria: 120
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
    //this.handleGananciaChange = this.handleGananciaChange.bind(this);
    this.handleObstaculoChange = this.handleObstaculoChange.bind(this);

    this.handleDeviceListChange = this.handleDeviceListChange.bind(this);
    this.handleDeviceItemChange_nombre = this.handleDeviceItemChange_nombre.bind(this);
    this.handleDeviceItemChange_cant = this.handleDeviceItemChange_cant.bind(this);
    this.handleDeviceItemChange_carga = this.handleDeviceItemChange_carga.bind(this);
    this.handleDeviceItemChange_horas = this.handleDeviceItemChange_horas.bind(this);

    this.handleTensionChange = this.handleTensionChange.bind(this);
    this.handleFactorSeguridadChange = this.handleFactorSeguridadChange.bind(this);
    this.handleHorasSolChange = this.handleHorasSolChange.bind(this);
    this.handleAmperajePanelChange = this.handleAmperajePanelChange.bind(this);

    this.handleReservaChange = this.handleReservaChange.bind(this);
    this.handleFactorDescargaChange = this.handleFactorDescargaChange.bind(this);
    this.handleCapacidadBateriaChange = this.handleCapacidadBateriaChange.bind(this);
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
  //handleGananciaChange = (value) => this.setState({ _Ganancia: value });
  handleObstaculoChange = (value) => this.setState({ _Obstaculo: value });

  handleDeviceListChange = (value) => this.setState({_DeviceList: value});
  handleDeviceItemChange_nombre = (value) => this.setState({_DeviceItemNombre : value});
  handleDeviceItemChange_cant = (value) => this.setState({_DeviceItemCantidad : value});
  handleDeviceItemChange_carga = (value) => this.setState({_DeviceItemCarga : value});
  handleDeviceItemChange_horas = (value) => this.setState({_DeviceItemHoras : value});

  handleTensionChange = (value) => this.setState({_Tension : value});
  handleFactorSeguridadChange = (value) => this.setState ({_FactorSeguridad : value});
  handleHorasSolChange = (value) => this.setState({_HorasSol : value});
  handleAmperajePanelChange = (value) => this.setState({_AmperajePanel : value});

  handleReservaChange = (value) => this.setState({_Reserva : value});
  handleFactorDescargaChange = (value) => this.setState({_FactorDescarga : value});
  handleCapacidadBateriaChange = (value) => this.setState({_CapacidadBateria : value});


  // Selección de formulario
  setAll = () => this.setState({ IdForm: 0, CurrentForm: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], FormName: 'Enlaces y Zona de Fresnel' });
  setEnlaces = () => this.setState({ IdForm: 1, CurrentForm: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], FormName: 'Enlaces', UnitDist: 'mts', UnitFrec: 'MHz' });
  setFresnelC = () => this.setState({ IdForm: 2, CurrentForm: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], FormName: 'Zona de Fresnel al Centro', UnitDist: 'Km', UnitFrec: 'GHz' });
  setFresnelD = () => this.setState({ IdForm: 3, CurrentForm: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0], FormName: 'Zona de Fresnel Descentralizada', UnitDist: 'Km', UnitFrec: 'GHz' });
  setFoto = () => this.setState({ IdForm: 4, CurrentForm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], FormName: 'Sistema Fotovoltaico'});

  // Dispositivos
  resetItem = () => this.setState({_DeviceItemNombre : '', _DeviceItemCantidad : 0, _DeviceItemCarga : 0, _DeviceItemHoras : 0, _DeviceItemTotal: 0});
  removeDevice = (i) => this.setState(state => {const _DeviceList = state._DeviceList.filter((item,j) => i !== j); return {_DeviceList};});
  addDevice = () => { 
    const nombre = this.state._DeviceItemNombre;
    const cantidad = this.state._DeviceItemCantidad;
    const carga = this.state._DeviceItemCarga
    const horas = this.state._DeviceItemHoras;
    const total = Number(cantidad * carga * horas);

    this.state._DeviceList.push({nombre, cantidad, carga, horas, total}); 
    this.resetItem(); 
  }

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

    //const _Ganancia = this.state._Ganancia;
    const _Dist1 = this.state._Dist1;
    const _Dist2 = this.state._Dist2;
    const _Obstaculo = this.state._Obstaculo;

    // Constantes de sistema fotovoltaico
    const _DeviceItemNombre = this.state._DeviceItemNombre;
    const _DeviceItemCantidad = this.state._DeviceItemCantidad;
    const _DeviceItemCarga = this.state._DeviceItemCarga;
    const _DeviceItemHoras = this.state._DeviceItemHoras;
    const _DeviceList = this.state._DeviceList;

    const _Tension = this.state._Tension;
    const _FactorSeguridad = this.state._FactorSeguridad;
    const _HorasSol = this.state._HorasSol;
    const _AmperajePanel = this.state._AmperajePanel;

    const _Reserva = this.state._Reserva;
    const _FactorDescarga = this.state._FactorDescarga;
    const _CapacidadBateria = this.state._CapacidadBateria;

    // Constantes de resultado
    const isHide = (value) => (value === this.state.IdForm || ( this.state.IdForm === 0 && value !== 4 )) ? '' : 'output-hidden';

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

    const CargaTotal = getCargaTotal(_DeviceList).toFixed(4);
    const CargaDiaria = getCargaDiaria(CargaTotal, _Tension).toFixed(4);
    const CargaDiariaCorregida = getCargaDiariaCorregida(CargaDiaria, _FactorSeguridad).toFixed(4);
    
    const AmperajeRequerido = getAmperajeRequerido(CargaDiariaCorregida, _HorasSol).toFixed(4);
    const Paneles = getPaneles(AmperajeRequerido, _AmperajePanel).toFixed(4);
    const TotalPaneles = Math.ceil(Paneles);

    const CapacidadBanco = getCapacidadBanco(CargaDiariaCorregida, _Reserva).toFixed(4);
    const CapacidadBancoCorregida = getCapacidadBancoCorregida(CapacidadBanco, _FactorDescarga).toFixed(4);
    const Baterias = getBaterias(CapacidadBancoCorregida, _CapacidadBateria).toFixed(4);
    
    const TotalBaterias = Math.ceil(Baterias);

    function viable () { 
      if (IRL < 10) 
        return 'El enlace no es viable';
      else if (IRL >= 10 && IRL < 15)
        return 'El enlace es satisfactorio'
      else 
        return 'El enlace es optimo'
    }

    return (
      <div className="limiter">
        <ul className="nav nav-tabs nav-justified">
          <li className="nav-item">
            <button className="btn-tabs" onClick={() => this.setAll()}>TODO</button>
          </li>
          <li className="nav-item">
            <button className="btn-tabs" onClick={() => this.setEnlaces()}>Enlaces</button>
          </li>
          <li className="nav-item">
            <button className="btn-tabs" onClick={() => this.setFresnelC()}>Fresnel al centro</button>
          </li>
          <li className="nav-item">
            <button className="btn-tabs" onClick={() => this.setFresnelD()}>Fresnel descentralizado</button>
          </li>
          <li className="nav-item">
            <button className="btn-tabs" onClick={() => this.setFoto()}>Sistema fotovoltaico</button>
          </li>
        </ul>
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form">
              <span className="login100-form-title">{FormName}</span>

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

              <div className={isHide(4)}>
                <div id="accordion">
                  <div id="headingOne">
                    <div className="btn-group btn-group-toggle">
                      <button className="btn btn-sm btn-primary" data-toggle="collapse" data-target="#FormDevice" aria-expanded="true" aria-controls="FormDevice">
                        <i className="fa fa-plus" aria-hidden="true"></i> Dispositivos
                      </button>
                      <button className="btn btn-sm btn-warning" data-toggle="collapse" data-target="#FormFoto" aria-expanded="true" aria-controls="FormFoto">
                        <i className="fa fa-cogs fa-inverse" aria-hidden="true"></i> Mas ajustes
                      </button>
                    </div>
                  </div>

                  <div className="card">
                    <div id="FormDevice" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      <div className="card-body">
                        <CreateInput name='Nombre' value={_DeviceItemNombre} units='' type='text'
                          isVisible={isVisible[14]} onValueChange={this.handleDeviceItemChange_nombre} />

                        <CreateInput name='Cantidad' value={_DeviceItemCantidad} units='pza'
                          isVisible={isVisible[14]} onValueChange={this.handleDeviceItemChange_cant} />

                        <CreateInput name='Carga' value={_DeviceItemCarga} units='watts'
                          isVisible={isVisible[14]} onValueChange={this.handleDeviceItemChange_carga} />

                        <CreateInput name='Horas' value={_DeviceItemHoras} units='h'
                          isVisible={isVisible[14]} onValueChange={this.handleDeviceItemChange_horas} />
                        
                        <br></br>
                        <button type="button" onClick={this.addDevice} className="btn btn-sm btn-success btn-block">
                          <i className="fa fa-floppy-o" aria-hidden="true"></i> Guardar
                        </button>
                      </div>
                    </div>
                    <div id="FormFoto" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      <div className="card-body">
                        <CreateInput name='Tensión' value={_Tension} units='V'
                          isVisible={isVisible[14]} onValueChange={this.handleTensionChange} />

                        <CreateInput name='Factor de seguridad' value={_FactorSeguridad} units='%'
                          isVisible={isVisible[14]} onValueChange={this.handleFactorSeguridadChange} />

                        <CreateInput name='Horas de sol por día' value={_HorasSol} units='horas'
                          isVisible={isVisible[14]} onValueChange={this.handleHorasSolChange} />
                        
                        <CreateInput name='Amperaje máximo por panel' value={_AmperajePanel} units='A'
                          isVisible={isVisible[14]} onValueChange={this.handleAmperajePanelChange} />

                        <CreateInput name='Días de reserva' value={_Reserva} units='Días'
                          isVisible={isVisible[14]} onValueChange={this.handleReservaChange} />

                        <CreateInput name='Factor de descarga' value={_FactorDescarga} units='%'
                          isVisible={isVisible[14]} onValueChange={this.handleFactorDescargaChange} />

                        <CreateInput name='Capacidad por batería' value={_CapacidadBateria} units='Días'
                          isVisible={isVisible[14]} onValueChange={this.handleCapacidadBateriaChange} />
                      </div>
                    </div>
                  </div>
                </div>              

                <br></br>
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th>Cantidad</th>
                      <th>Carga</th>
                      <th>Horas</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      _DeviceList.map((item, index) =>
                        <tr key={index}>
                          <th>{item.nombre}</th>
                          <th>{item.cantidad}</th>
                          <th>{item.carga}</th>
                          <th>{item.horas}</th>
                          <th>{item.total}</th>
                          <th>
                            <button onClick={() => this.removeDevice(index)}>
                              <i className="fa fa-eraser" aria-hidden="true"></i>
                            </button>
                          </th>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>

            </div>
            <div className="login100-pic js-tilt outputs" data-tilt>
              <h4 className={isHide(1)}>Enlaces</h4>
              <h6 className={isHide(1)}>FSL: {FSL} dBi</h6>
              <h6 className={isHide(1)}>PIRE: {PIRE} dBi</h6>
              <h6 className={isHide(1)}>RSL: {RSL} dBi</h6>
              <h6 className={isHide(1)}>IRL: {IRL} dBi</h6>
              <h6 className={isHide(1)}>Viabilidad: {viable()} </h6>
              <hr className={isHide(1)}></hr>

              <h4 className={isHide(2)}>Zona de fresnel al centro</h4>
              <h6 className={isHide(2)}>Radio en zona 100%: {FresnelC} m</h6>
              <h6 className={isHide(2)}>Altura de las torres: {AlturaC} m</h6>
              <br className={isHide(2)}></br>
              <h6 className={isHide(2)}>Radio en zona 66%: {FresnelC2} m</h6>
              <h6 className={isHide(2)}>Altura de las torres: {AlturaC2} m</h6>
              <hr className={isHide(2)}></hr>

              <h4 className={isHide(3)}>Zona de fresnel descentralizada</h4>
              <h6 className={isHide(3)}>Radio al 100%: {FresnelD} m</h6>
              <h6 className={isHide(3)}>Altura de las torres: {AlturaD} m</h6>
              <br className={isHide(3)}></br>
              <h6 className={isHide(3)}>Radio al 66%: {FresnelD2} m</h6>
              <h6 className={isHide(3)}>Altura de las torres: {AlturaD2} m</h6>
              <hr className={isHide(3)}></hr>

              <h4 className={isHide(4)}>Sistema fotovoltaico</h4>
              <h6 className={isHide(4)}>Carga total diaria: {CargaTotal} Whd</h6>
              <h6 className={isHide(4)}>Tensión CD del sistema: {_Tension} V</h6>
              <h6 className={isHide(4)}>Carga diaria de corriente: {CargaDiaria} A/h</h6>
              <h6 className={isHide(4)}>Factor de seguridad: {_FactorSeguridad} %</h6>
              <h6 className={isHide(4)}>Carga diaria final: {CargaDiariaCorregida} A/h</h6>
              <h6 className={isHide(4)}>Promedio de sol por día: {_HorasSol} Hrs</h6>
              <h6 className={isHide(4)}>Amperaje requerido: {AmperajeRequerido} A/h</h6>
              <br className={isHide(4)}></br>
              <h6 className={isHide(4)}>Amperaje máximo por módulo: {_AmperajePanel} A/h</h6>
              <h6 className={isHide(4)}>Paneles requeridos: {Paneles} Paneles</h6>
              <h6 className={isHide(4)}>Total de Paneles: {TotalPaneles} Paneles</h6>
              <br className={isHide(4)}></br>
              <h6 className={isHide(4)}>Días de reserva: {_Reserva} Días</h6>
              <h6 className={isHide(4)}>Capacidad nóminal del banco de baterías: {CapacidadBanco} A/h</h6>
              <h6 className={isHide(4)}>Factor profundidad de descarga: {_FactorDescarga} %</h6>
              <h6 className={isHide(4)}>Capacidad nominal del banco de baterías final: {CapacidadBancoCorregida} </h6>
              <h6 className={isHide(4)}>Capacidad por batería: {_CapacidadBateria} A/h</h6>
              <h6 className={isHide(4)}>Baterías requeridas: {Baterias} Baterías</h6>
              <h6 className={isHide(4)}>Total baterías: {TotalBaterias} Baterías</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));