import React from 'react'
import axios from 'axios';

class Pedidos extends React.Component {

    state = {
        pedidos: [],
        ventas: [],
        proveedores: [],
        proveedoresLOL: [],
        vendedores: [],
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/pedidos/`)
            .then(res => {
                const pedidos = res.data;
                this.setState({pedidos: pedidos})
        })
        axios.get(`http://127.0.0.1:8000/inventario/ventas/`)
            .then(res => {
                const ventas = res.data;
                this.setState({ventas: ventas})
        })
        axios.get(`http://127.0.0.1:8000/inventario/proveedores/`)
            .then(res => {
                const proveedores = res.data;
                this.setState({proveedores: proveedores})
        })
        axios.get(`http://127.0.0.1:8000/inventario/proveedores/`)
            .then(res => {
                const proveedoresLOL = res.data;
                this.setState({proveedoresLOL: proveedoresLOL})
        })
        axios.get(`http://127.0.0.1:8000/inventario/vendedores/`)
            .then(res => {
                const vendedores = res.data;
                this.setState({vendedores: vendedores})
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        var id_orden_pedido = e.target.elements[0].value        
        var id_venta_id = e.target.elements[1].value        
        var id_proveedor = e.target.elements[2].value        
        var id_vendedor_id = e.target.elements[3].value        
        var tela = e.target.elements[4].value        
        var fecha = e.target.elements[5].value        
        var fecha_despacho = e.target.elements[6].value        
        var enviada = e.target.elements[7].value        
        var recibida = e.target.elements[8].value        
        var valor_total = e.target.elements[9].value        
        const data = {
            id_orden_pedido: id_orden_pedido,
            id_venta: id_venta_id,
            id_proveedor: id_proveedor,
            id_vendedor: id_vendedor_id,
            tela: tela,
            fecha: fecha,
            fecha_despacho: fecha_despacho,
            enviada: enviada,
            recibida: recibida,
            valor_total: valor_total,
        }

        axios.post('http://127.0.0.1:8000/inventario/nuevoPedido/', data)
        window.location.reload();
    }

    cambiando = (e) => {
        e.preventDefault()
        var proveedores = this.state.proveedores
        console.log(this.state.proveedoresLOL)
        var lol = proveedores.sort((a, b) => a.telefono_proveedor.localeCompare(b.telefono_proveedor))
        console.log(lol)
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="id_orden_pedido">Numero OP. Proveedor:</label><br/>
                    <input type="number" id="id_orden_pedido" name="id_orden_pedido" /><br/>
                    <label htmlFor="id_venta_id">id_venta_id:</label><br/>
                    <select id="id_venta_id" name="id_venta_id">
                        {this.state.ventas.map(venta => {
                            return(
                                <option value={venta.id_venta}>{venta.id_venta}</option>
                            )
                        })}
                    </select><br/>
                    <label htmlFor="id_proveedor">id_proveedor:</label><br/>
                    <select id="id_proveedor" name="id_proveedor">
                        {this.state.proveedores.map(proveedor => {
                            return(
                                <option value={proveedor.id_proveedor}>{proveedor.nombre_proveedor}</option>
                            )
                        })}
                    </select><br/>

                    <label htmlFor="id_vendedor_id">id_vendedor_id:</label><br/>
                    <select id="id_vendedor_id" name="id_vendedor_id">
                        {this.state.vendedores.map(vendedor => {
                            return(
                                <option value={vendedor.id_vendedor}>{vendedor.nombre_vendedor}</option>
                            )
                        })}
                    </select><br/>
                    <label htmlFor="tela">tela:</label><br/>
                    <select id="tela" name="tela">
                        <option value="No Aplica">No Aplica</option>   
                        <option value="Pedida">Pedida</option>   
                        <option value="PENDIENTE">Pendiente</option>   
                    </select><br/>

                    <label htmlFor="fecha">fecha:</label><br/>
                    <input type="date" id="fecha" name="fecha" /><br/>
                    <label htmlFor="fecha_despacho">fecha_despacho:</label><br/>
                    <input type="date" id="fecha_despacho" name="fecha_despacho" /><br/>
                    <label htmlFor="enviada">enviada:</label><br/>
                    <select id="enviada" name="enviada">
                        <option value="Enviada">Enviada</option>   
                        <option value="No se envía">No se envía</option>   
                        <option value="Pendiente por enviar">Pendiente por enviar</option>   
                    </select><br/>
                    <label htmlFor="recibida">recibida:</label><br/>
                    <select id="recibida" name="recibida">
                        <option value="False">Pendiente</option>   
                        <option value="True">Recibida</option>
                    </select><br/>
                    <label htmlFor="valor_total">valor_total:</label><br/>
                    <input type="number" id="valor_total" name="valor_total" /><br/>
                    <button type="submit" onClick={this.cambiando}>Agregar OP.</button>
                </form>
                <div>
                    {
                        this.state.pedidos.map((pedido) => {
                            return(
                                <li>{pedido.id_orden_pedido}, {pedido.id_venta_id}, ${pedido.valor_total}</li>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Pedidos
