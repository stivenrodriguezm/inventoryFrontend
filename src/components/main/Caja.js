import React from 'react'
import axios from 'axios'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import '../../styles/Caja.css'

class Categorias extends React.Component {

    state = {
        saldoActualCaja: null,
        caja: [],
        reciboDeCaja: [],
        comprobantesDeEgreso: [],
        facturas: [],
        ventas: [],
        proveedores: [],
        facturas_nuevo_egreso: [0],
        proveedor_seleccionado_ce: 0
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/caja/`)
            .then(res => {
                const caja = res.data;
                this.setState({caja: caja})
        }) 
        axios.get(`http://127.0.0.1:8000/inventario/saldoActualCaja/`)
            .then(res => {
                const saldoActualCaja = res.data[0];
                this.setState({saldoActualCaja: Number(saldoActualCaja.valorActual)})
        }) 
        axios.get(`http://127.0.0.1:8000/inventario/reciboDeCaja/`)
            .then(res => {
                const reciboDeCaja = res.data;
                this.setState({reciboDeCaja: reciboDeCaja})
        }) 
        axios.get(`http://127.0.0.1:8000/inventario/comprobantesDeEgreso/`)
            .then(res => {
                const comprobantesDeEgreso = res.data;
                this.setState({comprobantesDeEgreso: comprobantesDeEgreso})
            }) 
        var ventas = JSON.parse(localStorage.getItem('Ventas'))
        this.setState({ventas: ventas})
        var proveedores = JSON.parse(localStorage.getItem('Proveedores'))
        this.setState({proveedores: proveedores})
        var facturas = JSON.parse(localStorage.getItem('Facturas'))
        this.setState({facturas: facturas})
    }

    onSubmit = (e) => {
        e.preventDefault()

        if(e.target.id === 'caja_container'){
            var fecha = e.target.elements[0].value        
            var concepto = e.target.elements[1].value        
            var tipo = e.target.elements[2].value        
            var valor = e.target.elements[3].value         
         
            const data = {
                fecha: fecha,
                concepto: concepto,
                tipo: tipo,
                subtipo: "Otros",
                valor: Number(valor),
            }
            axios.post('http://127.0.0.1:8000/inventario/crearCaja/', data)
            window.location.reload()
        }

        if(e.target.id === 'rc_container'){
            var numero_recibo_caja = e.target.elements[0].value        
            var id_venta = e.target.elements[1].value        
            var metodo_pago = e.target.elements[2].value        
            var fecha = e.target.elements[3].value        
            var valor = e.target.elements[4].value         
         
            const data = {
                numero_recibo_caja: Number(numero_recibo_caja),
                id_venta: Number(id_venta),
                metodo_pago: metodo_pago,
                fecha: fecha,
                abono_cancelacion: "Abono",
                valor: Number(valor),
            }
            axios.post('http://127.0.0.1:8000/inventario/crearReciboCaja/', data)
            window.location.reload()
        }

        if(e.target.id === 'ce_container'){
            var facturas = document.getElementById('facturas_container')
            facturas = facturas.children
            var facts = []
            for (var i = 0; i < facturas.length; i++){
                facts.push(facturas[i].children[2].value)
            }

            var numero_comprobante_egreso = Number(e.target.elements[0].value)
            var fecha = e.target.elements[1].value
            var metodo_pago = e.target.elements[2].value
            var proveedor = e.target.elements[3].value
            var valor = e.target.elements[4].value

            const data = {
                numero_comprobante_egreso: Number(numero_comprobante_egreso),
                fecha: fecha,
                metodo_pago: metodo_pago,
                id_proveedor: Number(proveedor),
                valor: Number(valor),
                facturas: String(facts),
            }
            axios.post('http://127.0.0.1:8000/inventario/crearComprobanteDeEgreso/', data)
            window.location.reload()
        }

    }

    estado = (e) => {
        e.preventDefault()

    }

    onAnadir = (e) => {
        e.preventDefault()
        var num = this.state.facturas_nuevo_egreso
        var objec = this.state.facturas_nuevo_egreso
        var object = num.concat(objec[objec.length-1]+1)
        this.setState({
            facturas_nuevo_egreso: object
        })
    }

    proveedor_seleccionado_ce = (e) => {
        e.preventDefault()
        var id_proveedor = e.target.value
        this.setState({proveedor_seleccionado_ce: Number(id_proveedor)})
    }

    eligeUnaTabla = (e) => {
        e.preventDefault()
        var name = e.target.getAttribute('name')
        if(name === "rc"){
            var tabla_ce =document.getElementById('tabla_rc_id').style.display
            if (tabla_ce === 'block'){
                document.getElementById('tabla_rc_id').style.display = 'none'
            } else {
                document.getElementById('tabla_ce_id').style.display = 'none'
                document.getElementById('tabla_caja').style.display = 'none'
                document.getElementById('tabla_rc_id').style.display = 'block'
            }
        }
        if(name === "ce"){
            var tabla_ce =document.getElementById('tabla_ce_id').style.display
            if (tabla_ce === 'block'){
                document.getElementById('tabla_ce_id').style.display = 'none'
            } else {
                document.getElementById('tabla_rc_id').style.display = 'none'
                document.getElementById('tabla_caja').style.display = 'none'
                document.getElementById('tabla_ce_id').style.display = 'block'
            }
        }
        if(name === "caja"){
            var tabla_ce =document.getElementById('tabla_caja').style.display
            if (tabla_ce === 'block'){
                document.getElementById('tabla_caja').style.display = 'none'
            } else {
                document.getElementById('tabla_rc_id').style.display = 'none'
                document.getElementById('tabla_ce_id').style.display = 'none'
                document.getElementById('tabla_caja').style.display = 'block'
            }
        }

    }

    nuevoForm = (e) => {
        e.preventDefault()
        var name = e.target.getAttribute('name')

        if(name === "nueva_caja"){
            var tabla_ce =document.getElementById('caja_container').style.display
            if (tabla_ce === 'block'){
                document.getElementById('caja_container').style.display = 'none'
            } else {
                document.getElementById('rc_container').style.display = 'none'
                document.getElementById('ce_container').style.display = 'none'
                document.getElementById('caja_container').style.display = 'block'
            }
        }
        if(name === "nuevo_rc"){
            var tabla_ce =document.getElementById('rc_container').style.display
            if (tabla_ce === 'block'){
                document.getElementById('rc_container').style.display = 'none'
            } else {
                document.getElementById('caja_container').style.display = 'none'
                document.getElementById('ce_container').style.display = 'none'
                document.getElementById('rc_container').style.display = 'block'
            }
        }
        if(name === "nuevo_ce"){
            var tabla_ce =document.getElementById('ce_container').style.display
            if (tabla_ce === 'block'){
                document.getElementById('ce_container').style.display = 'none'
            } else {
                document.getElementById('rc_container').style.display = 'none'
                document.getElementById('caja_container').style.display = 'none'
                document.getElementById('ce_container').style.display = 'block'
            }
        }
    }

    render(){
        return (
            <div className="container_body">
                <div className="barra_navegacion">
                    <h2>Caja</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevaCategoria} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nueva Entrada</a>
                        </div>
                    </div>
                </div>
                <div className="body">                          
                    <div className="container_tablas_ce">
                        <div className="elige_una_tabla">
                            <div className="dinero_tag">
                                <div className="seccion_elige_tabla" onClick={this.eligeUnaTabla} name="caja">
                                    <a>Caja</a>
                                    <div className="plus_elige" name="nueva_caja" onClick={this.nuevoForm}><a>+</a></div>
                                </div>
                                <div className="seccion_elige_tabla" onClick={this.eligeUnaTabla} name="bancos">
                                    <a>Bancos</a>
                                    <div className="plus_elige" ><a>+</a></div>    
                                </div>
                                <div className="seccion_elige_tabla" name="rc" onClick={this.eligeUnaTabla}>
                                    <a>Recibo de caja</a>
                                    <div className="plus_elige" name="nuevo_rc" onClick={this.nuevoForm}><a>+</a></div>
                                </div>
                                <div className="seccion_elige_tabla" name="ce" onClick={this.eligeUnaTabla}>
                                    <a>Comprobantes de egreso</a>
                                    <div className="plus_elige" name="nuevo_ce" onClick={this.nuevoForm}><a>+</a></div>
                                </div>
                            </div>
                            <div className="form_and_data">
                                <div className="seccion_saldo_actual">
                                    <a className="">Saldo en caja: ${new Intl.NumberFormat().format(this.state.saldoActualCaja)}</a>
                                </div>
                                <div className="formularios_ocultos">
                                    <form onSubmit={this.onSubmit} className="caja_container" id="caja_container">
                                        <h3 className="agregar_caja">Movimiento de Caja</h3>

                                        <div className="form_group caja_input_select">
                                            <label htmlFor="fecha">Fecha:</label><br/>
                                            <input type="text" id="fecha" name="fecha" /><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="concepto">Concepto:</label><br/>
                                            <input type="text" id="concepto" name="concepto" /><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="tipo">Tipo:</label><br/>
                                            <select id="tipo" name="tipo">
                                                <option value="Ingreso">Ingreso</option>
                                                <option value="Egreso">Egreso</option>
                                            </select><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="valor">Valor:</label><br/>
                                            <input type="number" id="valor" name="valor" /><br/>
                                        </div>

                                        <button className="btn btn_primary"type="submit">Editar Venta</button>
                                    </form>
                                    <form onSubmit={this.onSubmit} className="rc_container" id="rc_container">
                                        <h3 className="agregar_caja">Recibo de Caja</h3>

                                        <div className="form_group caja_input_select">
                                            <label htmlFor="numero_rc">Recibo de caja:</label><br/>
                                            <input type="number" id="numero_rc" name="numero_rc" /><br/>
                                        </div>

                                        <div className="form_group caja_input_select">
                                            <label htmlFor="venta_rc">Venta:</label><br/>
                                            <select id="venta_rc" name="venta_rc">
                                                {this.state.ventas 
                                                    ? this.state.ventas.map((venta) =>  {
                                                        return venta.entregado ? null : <option value={venta.id_auto}>{venta.id_venta}</option>
                                                    })
                                                    : <option></option>
                                                }
                                            </select><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="metodo_pago_rc">Método:</label><br/>
                                            <select id="metodo_pago_rc" name="metodo_pago_rc">
                                                <option value="Efectivo">Efectivo</option>
                                                <option value="Transferencia">Transferencia</option>
                                            </select><br/>
                                        </div>

                                        <div className="form_group caja_input_select">
                                            <label htmlFor="fecha_rc">Fecha:</label><br/>
                                            <input type="text" id="fecha_rc" name="fecha_rc" /><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="valor_rc">Valor:</label><br/>
                                            <input type="number" id="valor_rc" name="valor_rc" /><br/>
                                        </div>

                                        <button className="btn btn_primary"type="submit">Agregar</button>
                                    </form>
                                    <form onSubmit={this.onSubmit} className="ce_container" id="ce_container">
                                        <h3 className="agregar_caja">Comprobante de egreso</h3>

                                        <div className="form_group caja_input_select">
                                            <label htmlFor="numero_ce">Comprobante de egreso:</label><br/>
                                            <input type="number" id="numero_ce" name="numero_ce" /><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="fecha_ce">Fecha:</label><br/>
                                            <input type="text" id="fecha_ce" name="fecha_ce" /><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="metodo_pago_ce">Método:</label><br/>
                                            <select id="metodo_pago_ce" name="metodo_pago_ce">
                                                <option value="Efectivo">Efectivo</option>
                                                <option value="Transferencia">Transferencia</option>
                                            </select><br/>
                                        </div>
                                        <div className="form_group caja_input_select">
                                            <label htmlFor="proveedor_rc">Proveedor:</label><br/>
                                            <select onChange={this.proveedor_seleccionado_ce} id="venta_rc" name="venta_rc">
                                                <option>- Elige un proveedor -</option>
                                                {this.state.proveedores 
                                                    ? this.state.proveedores.map((proveedor) =>  {
                                                        return <option value={proveedor.id_proveedor}>{proveedor.nombre_proveedor}</option>
                                                    })
                                                    : <option>Sin proveedores!</option>
                                                }
                                            </select><br/>
                                        </div>

                                        <div className="form_group caja_input_select">
                                            <label htmlFor="valor_rc">Valor:</label><br/>
                                            <input type="number" id="valor_rc" name="valor_rc" /><br/>
                                        </div>

                                        <div className="facturas_container" id="facturas_container">
                                            {this.state.facturas_nuevo_egreso.map(factura => {
                                                return(
                                                    <div className="form_group caja_input_select">
                                                        <label htmlFor="facturas_ce">Factura: {factura+1}</label><br/>
                                                        <select id="facturas_ce" name="facturas_ce">
                                                            <option> - Elige una factura - </option>
                                                            {
                                                                this.state.facturas.map(factura => {
                                                                    return factura.id_proveedor_id === Number(this.state.proveedor_seleccionado_ce) && factura.pagada === false ? <option value={factura.id_auto}>{factura.id_factura}, ${factura.nombre_proveedor}, ${factura.valor}</option> : null
                                                                })
                                                            }
                                                        </select><br/>
                                                    </div>
                                                )
                                            })}
                                        </div>                            

                                        <br />

                                        <button className="btn btn_primary"type="submit">Agregar</button>
                                        <button onClick={this.onAnadir} className="btn btn_primary"type="submit">Añadir</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="seccion_tablas ">
                            <div className="tabla_ce tabla" id='tabla_ce_id'>
                                <tbody className="tabla tabla_ce">
                                    <tr className="titulos_tabla">
                                        <th className="ce_id border_top_left">ID</th>
                                        <th className="ce_numero_ce">C.E.</th>
                                        <th className="ce_venta">Venta</th>
                                        <th className="ce_fecha">Fecha</th>
                                        <th className="ce_caja">Caja</th>
                                        <th className="ce_metodo">Metodo</th>
                                        <th className="ce_facturas">Facturas</th>
                                        <th className="ce_valor">Valor_</th>
                                        <th className="ce_editar">Editar</th>
                                        <th className="ce_eliminar border_top_right">Eliminar</th>
                                    </tr>
                                {
                                    this.state.comprobantesDeEgreso.map((comprobante) => {
                                        return(
                                            <tr className="contenido_tabla">
                                                <td className="padding_inicio_tabla">{comprobante.id_auto}</td>
                                                <td className="">{comprobante.numero_comprobante_egreso}</td>
                                                <td className="">Nono</td>
                                                <td className="">{comprobante.fecha}</td>
                                                <td className="">{comprobante.id_movimiento_caja_id}</td>
                                                <td className="">{comprobante.metodo_pago}</td>
                                                <td className="">lol</td>
                                                <td className="dollars">{new Intl.NumberFormat().format(comprobante.valor)}</td>
                                                <td className="button_hover centrar_texto" onClick={this.editando} value={comprobante.id_auto}><AiOutlineEdit value={comprobante.id_auto} /></td>
                                                <td className="button_hover centrar_texto" onClick={this.eliminando} value={comprobante.id_auto}><AiOutlineDelete value={comprobante.id_auto} /></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </div>
                            <div className="tabla_rc tabla" id='tabla_rc_id'>
                                <tbody className="tabla tabla_rc">
                                    <tr className="titulos_tabla">
                                        <th className="rc_id border_top_left">ID</th>
                                        <th className="rc_num_rc">R.C.</th>
                                        <th className="rc_venta">Venta</th>
                                        <th className="rc_caja">Caja</th>
                                        <th className="rc_metodo">Metodo</th>
                                        <th className="rc_fecha">Fecha</th>
                                        <th className="rc_valor">Valor</th>
                                        <th className="rc_editar">Editar</th>
                                        <th className="rc_eliminar border_top_right">Eliminar</th>
                                    </tr>
                                {
                                    this.state.reciboDeCaja.map((recibo) => {
                                        return(
                                            <tr className="contenido_tabla">
                                                <td className="padding_inicio_tabla">{recibo.id_auto}</td>
                                                <td className="">{recibo.numero_recibo_caja}</td>
                                                <td className="">{recibo.id_venta_id}</td>
                                                <td className="">{recibo.id_movimiento_caja_id}</td>
                                                <td className="">{recibo.metodo_pago}</td>
                                                <td className="">{recibo.fecha}</td>
                                                <td className="dollars">{new Intl.NumberFormat().format(recibo.valor)}</td>
                                                <td className="button_hover centrar_texto" onClick={this.editando} value={recibo.id_auto}><AiOutlineEdit value={recibo.id_auto} /></td>
                                                <td className="button_hover centrar_texto" onClick={this.eliminando} value={recibo.id_auto}><AiOutlineDelete value={recibo.id_auto} /></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </div>
                            <div className="tabla_caja tabla" id='tabla_caja'>
                                <tbody className="tabla tabla_caja">
                                    <tr className="titulos_tabla">
                                        <th className="caja_id border_top_left">ID</th>
                                        <th className="caja_fecha ">Fecha</th>
                                        <th className="caja_concepto">Concepto</th>
                                        <th className="caja_tipo">Tipo</th>
                                        <th className="caja_subtipo">Subtipo</th>
                                        <th className="caja_saldo_caja">Saldo Caja</th>
                                        <th className="caja_valor">Valor</th>
                                        <th className="caja_editar">Editar</th>
                                        <th className="caja_eliminar border_top_right">Eliminar</th>
                                    </tr>
                                {
                                    this.state.caja.map((movimiento) => {
                                        return(
                                            <tr className="contenido_tabla">
                                                <td className="padding_inicio_tabla">{movimiento.id_movimiento}</td>
                                                <td className="">{movimiento.fecha}</td>
                                                <td className="">{movimiento.concepto}</td>
                                                <td className="">{movimiento.tipo}</td>
                                                <td className="">{movimiento.subtipo}</td>
                                                <td className="dollars">{new Intl.NumberFormat().format(movimiento.valorCaja)}</td>
                                                <td className="dollars">{new Intl.NumberFormat().format(movimiento.valor)}</td>
                                                <td className="button_hover centrar_texto" onClick={this.editando} value={movimiento.id_movimiento}><AiOutlineEdit value={movimiento.id_movimiento} /></td>
                                                <td className="button_hover centrar_texto" onClick={this.eliminando} value={movimiento.id_movimiento}><AiOutlineDelete value={movimiento.id_movimiento} /></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Categorias
