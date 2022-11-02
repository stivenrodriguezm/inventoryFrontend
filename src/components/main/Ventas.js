import React from 'react'
import axios from 'axios';
import '../../styles/Ventas.css'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

class Vendedores extends React.Component {

    state = {
        ventas: [],
        vendedores:[]
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/vendedores/`)
            .then(res => {
                const vendedores = res.data;
                this.setState({vendedores: vendedores})
        })
        axios.get(`http://127.0.0.1:8000/inventario/ventas/`)
            .then(res => {
                const ventas = res.data;
                this.setState({ventas: ventas})
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        var id_venta = e.target.elements[0].value        
        var entregado = e.target.elements[1].value        
        var fecha_venta = e.target.elements[2].value        
        var fecha_entrega = e.target.elements[3].value        
        var id_vendedor = e.target.elements[4].value        
        var nombre_cliente = e.target.elements[5].value              
        var ciudad_cliente = e.target.elements[6].value        
        var direccion_cliente = e.target.elements[7].value        
        var correo_cliente = e.target.elements[8].value        
        var telefono_cliente = e.target.elements[9].value        
        var cedula_cliente = e.target.elements[10].value        
        var valor_venta = e.target.elements[11].value       
        
        var estado = false
        
        if(entregado === 'True'){
            estado = true
        } else {
            estado = false
        }
     
        const data = {
            id_venta: Number(id_venta),
            id_vendedor: Number(id_vendedor),
            fecha_venta: fecha_venta,
            fecha_entrega: fecha_entrega,
            entregado: estado,
            nombre_cliente: nombre_cliente,
            cedula_cliente: cedula_cliente,
            direccion_cliente: direccion_cliente,
            ciudad_cliente: ciudad_cliente,
            correo_cliente: correo_cliente,
            telefono_cliente: telefono_cliente,
            valor_venta: Number(valor_venta)
        }
        axios.post('http://127.0.0.1:8000/inventario/nuevaVenta/', data)
        window.location.reload();
    }

    editando = (e) => {
        e.preventDefault()
        const editar = document.getElementById("ventas_editar_container")
        const agregar = document.getElementById("ventas_form_container")
        var edit_container = editar.style.display
        if (edit_container===''||edit_container==='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['ventas'].find(obj => {return obj.id_auto === Number(value)})

            editar[0].value=`${data['id_venta']}`
            editar[1].value=`${data['id_vendedor_id']}`
            editar[2].value=`${data['fecha_venta']}`
            editar[3].value=`${data['fecha_entrega']}`
            editar[4].value=`${data['entregado']}`
            editar[5].value=`${data['valor_venta']}`
            editar[6].value=`${data['id_auto']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['ventas'].find(obj => {return obj.id_auto === Number(value)})
            if(editar[0].value != data['id_venta']){
                editar[0].value=`${data['id_venta']}`
                editar[1].value=`${data['id_vendedor_id']}`
                editar[2].value=`${data['fecha_venta']}`
                editar[3].value=`${data['fecha_entrega']}`
                editar[4].value=`${data['entregado']}`
                editar[5].value=`${data['valor_venta']}`
                editar[6].value=`${data['id_auto']}`
            } else {
                editar.style.display="none"
                editar[0].value=''
                editar[1].value=''
                editar[2].value=''
                editar[3].value=''
                editar[4].value=''
                editar[5].value=''
                editar[6].value=''
            }
        }
    }

    subEdit = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('ventas_editar_container')

        let active = form[4].value

        if(active === 'true'){
            active = true
        } else {
            active = false
        }

        let data = {
            id_venta: Number(form[0].value),
            id_vendedor_id: Number(form[1].value),
            fecha_venta: form[2].value,
            fecha_entrega: form[3].value,
            entregado: active,
            valor_venta: Number(form[5].value)
        }
        axios.put(`http://127.0.0.1:8000/inventario/editarVenta/${Number(value)}`, data)
        window.location.reload()
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarVenta/${Number(id)}`)
        window.location.reload();
    }

    agregarVenta = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("ventas_form_container")
        const editar = document.getElementById("ventas_editar_container")
        var agregar_form = agregar.style.display
        if (agregar_form===''||agregar_form==='none') {
            agregar.style.display="block"
            editar.style.display="none"
        } else {
            agregar.style.display="none"
        }
    }

    render(){
        return (
            <div className="container_body">
                <div className="barra_navegacion">
                    <h2>Ventas</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <ReactHTMLTableToExcel 
                                id="btn_exportar"
                                table="ventas_tabla_container"
                                filename="Ventas"
                                sheet="Ventas"
                                buttonText={<BsDownload />}
                            />
                        </div>
                        <div onClick={this.agregarVenta} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Agregar Venta</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form className="ventas_editar_container" id="ventas_editar_container">
                        <h3 className="agregar_venta">Editar Venta</h3>

                        <div className="form_group input_editar_ventas">
                            <label htmlFor="id_venta">Número de Venta:</label><br/>
                            <input type="number" id="id_venta" name="id_venta" /><br/>
                        </div>
                        <div className="form_group select_editar_ventas">
                            <label for="id_vendedor">Vendedor</label><br/>
                            <select id="id_vendedor" name="id_vendedor">
                                {this.state.vendedores.map(vendedor => {
                                    return(
                                        <option value={vendedor.id_vendedor}>{vendedor.nombre_vendedor}</option>
                                        )
                                    })}
                            </select><br/>
                        </div>
                        <div className="form_group input_editar_ventas">
                            <label htmlFor="fecha_venta">Fecha de venta:</label><br/>
                            <input type="text" id="fecha_venta" name="fecha_venta" /><br/>
                        </div>
                        <div className="form_group input_editar_ventas">
                            <label htmlFor="fecha_entrega">Fecha de entrega:</label><br/>
                            <input type="text" id="fecha_entrega" name="fecha_entrega" /><br/>
                        </div>
                        <div className="form_group select_editar_ventas">
                            <label htmlFor="entregado">Estado:</label><br/>
                            <select id="entregado" name="entregado">
                                <option value="true">Entregado</option>
                                <option value="false">Pendiente</option>
                            </select><br/>
                        </div>
                        <div className="form_group input_editar_ventas">
                            <label htmlFor="valor_venta">Valor de la venta:</label><br/>
                            <input type="number" id="valor_venta" name="valor_venta" /><br/>
                        </div>

                        <button onClick={this.subEdit} className="btn btn_primary"type="submit">Editar Venta</button>
                    </form>
                    <form className="ventas_form_container" id="ventas_form_container"  onSubmit={this.onSubmit}>
                        <h3 className="agregar_venta">Agregar Venta</h3>
                        <div className="venta_estado_formgroup">
                            <div className="form_group form_group_half">
                                <label htmlFor="id_venta">Número de Venta:</label><br/>
                                <input type="text" id="id_venta" name="id_venta" /><br/>
                            </div>
                            <div className="form_group form_group_half estado_ventas_form">
                                <label htmlFor="entregado">Estado:</label><br/>
                                <select id="entregado" name="entregado">
                                    <option value="True">Entregado</option>
                                    <option value="False" selected>Pendiente</option>
                                </select><br/>
                            </div>
                        </div>
                        <div className="venta_fechas_formgroup">
                            <div className="form_group form_group_half">
                                <label htmlFor="fecha_venta">Fecha de venta:</label><br/>
                                <input type="text" id="fecha_venta" name="fecha_venta" /><br/>
                            </div>
                            <div className="form_group form_group_half estado_ventas_form">
                                <label htmlFor="fecha_entrega">Fecha de entrega:</label><br/>
                                <input type="text" id="fecha_entrega" name="fecha_entrega" /><br/>
                            </div>
                        </div>
                        <div className="form_group vendedor_form_ventas">
                            <label for="id_vendedor">Vendedor:</label><br/>
                            <select id="id_vendedor" name="id_vendedor">
                                {this.state.vendedores.map(vendedor => {
                                    return(
                                        <option value={vendedor.id_vendedor}>{vendedor.nombre_vendedor}</option>
                                        )
                                    })}
                            </select><br/>
                        </div>                        
                        <div className="form_group nombre_cliente_form_ventas">
                            <label htmlFor="nombre_cliente">Nombre del cliente:</label><br/>
                            <input type="text" id="nombre_cliente" name="nombre_cliente" /><br/>
                        </div>
                        <div className="form_group venta_ciudad_direccion_formgroup">
                            <div className="form_group form_group_half">
                                <label htmlFor="ciudad_cliente">Ciudad:</label><br/>
                                <input type="text" id="ciudad_cliente" name="ciudad_cliente" /><br/>
                            </div>
                            <div className="form_group form_group_half estado_ventas_form">
                                <label htmlFor="direccion_cliente">Direccion:</label><br/>
                                <input type="text" id="direccion_cliente" name="direccion_cliente" /><br/>
                            </div>            
                        </div>
                        <div className="form_group venta_ciudad_direccion_formgroup">
                            <div className="form_group form_group_half">
                                <label htmlFor="correo_cliente">Correo:</label><br/>
                                <input type="text" id="correo_cliente" name="correo_cliente" /><br/>
                            </div>
                            <div className="form_group form_group_half estado_ventas_form">
                                <label htmlFor="telefono_cliente">Telefono:</label><br/>
                                <input type="text" id="telefono_cliente" name="telefono_cliente" /><br/>
                            </div>
                        </div>
                        <div  className="form_group venta_ciudad_direccion_formgroup">
                            <div className="form_group form_group_half">
                                <label htmlFor="cedula_cliente">Cédula del cliente:</label><br/>
                                <input type="text" id="cedula_cliente" name="cedula_cliente" /><br/>
                            </div>
                            <div className="form_group form_group_half estado_ventas_form">
                                <label htmlFor="valor_venta">Valor de venta:</label><br/>
                                <input type="text" id="valor_venta" name="valor_venta" /><br/>
                            </div>
                        </div>

                        <button type="submit" className="btn btn_primary">Nueva Venta</button>
                    </form>
                    <table className="ventas_tabla_container" id="ventas_tabla_container">
                        <tbody className="tabla tabla_ventas">
                            <tr className="titulos_tabla">
                                <th className="id_tab_ventas border_top_left">Venta</th>
                                <th className="fecha_tab_ventas">Fecha</th>
                                <th className="vendedor_tab_ventas">Vendedor</th>
                                <th className="cliente_ventas">Cliente</th>
                                <th className="cedula_ventas">Cedula</th>
                                <th className="fecha_ventas">Entrega</th>
                                <th className="abono_ventas">Abono</th>
                                <th className="saldo_ventas">Saldo</th>
                                <th className="valor_ventas">Valor</th>
                                <th className="estado_ventas">Estado</th>
                                <th className="editar_ventas">Editar</th>
                                <th className="eliminar_tab_ventas border_top_right">Eliminar</th>
                            </tr>
                        {
                            this.state.ventas.map((venta) => {
                                return(
                                    <tr key={venta.id_auto} className="contenido_tabla">
                                        <td className="centrar_texto">{venta.id_venta}</td>
                                        <td className="centrar_texto">{venta.fecha_venta}</td>
                                        <td>{venta.nombre_vendedor}</td>
                                        <td>{venta.nombre_cliente}</td>
                                        <td>{venta.cedula_cliente}</td>
                                        <td className="centrar_texto">{venta.fecha_entrega}</td>
                                        <td className="centrar_texto dollars">{new Intl.NumberFormat().format(venta.abono)}</td>
                                        <td className="centrar_texto dollars">{new Intl.NumberFormat().format(venta.saldo)}</td>
                                        <td className="centrar_texto dollars">{new Intl.NumberFormat().format(venta.valor_venta)}</td>
                                        <td className="centrar_texto">{venta.entregado ? "Entregado" : "Pendiente"}</td>
                                        <td onClick={this.editando} value={venta.id_auto} className="button_hover centrar_texto"><AiOutlineEdit value={venta.id_auto} /></td>
                                        <td onClick={this.eliminando} value={venta.id_auto} className="button_hover centrar_texto"><AiOutlineDelete value={venta.id_auto} /></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <br/>
                </div>
            </div>
        )
    }
}

export default Vendedores
