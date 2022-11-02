import React from 'react'
import axios from 'axios';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import '../../styles/Facturas.css'

class Facturas extends React.Component {
    state = {
        productos: [],
        proveedores: [],
        facturas: [],
        categorias: [],
        prods_facturados: [0], 
        prods: [],
        cat_1: 0,
        proveedor: 0
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/productos/`)
            .then(res => {
                const productos = res.data;
                this.setState({productos: productos})
        })
        axios.get(`http://127.0.0.1:8000/inventario/proveedores/`)
            .then(res => {
                const proveedores = res.data;
                this.setState({proveedores: proveedores})
        })
        axios.get(`http://127.0.0.1:8000/inventario/facturas/`)
            .then(res => {
                const facturas = res.data;
                this.setState({facturas: facturas})
        })
        axios.get(`http://127.0.0.1:8000/inventario/categorias/`)
            .then(res => {
                const categorias = res.data;
                this.setState({categorias: categorias})
        })
    }

    data = []

    onSubmit = (e) => {
        e.preventDefault()
        var id_factura = e.target.elements[1].value        
        var id_proveedor_id = e.target.elements[0].value        
        var fecha_despacho = e.target.elements[2].value        
        var fecha_pago = e.target.elements[3].value        
        var pagada = e.target.elements[4].value      
        var valor_fact = e.target.elements[5].value      
        var nota_fact = e.target.elements[6].value      

        var products = []
        let position = 7

        var disponibilidad = false
        
        if(e.target.elements[position+4].value == 'True'){
            disponibilidad = true
        } else {
            disponibilidad = false
        }
        
        for (let i = 0; i < this.state.prods_facturados.length; i += 1){
            let prod = {
                id_producto: e.target.elements[position+1].value,  
                cantidad: Number(e.target.elements[position+2].value),  
                valor: e.target.elements[position+3].value,  
                disponible: disponibilidad,  
                nota: e.target.elements[position+5].value 
            }
            products.push(prod)
            position += 6
        }
        const data = {
            id_factura: id_factura,
            id_proveedor: Number(id_proveedor_id),
            fecha_despacho: fecha_despacho,
            fecha_pago: fecha_pago,
            pagada: pagada,
            valor: Number(valor_fact),
            nota: nota_fact,
            productos: products
        }

        // console.log(data)
        axios.post('http://127.0.0.1:8000/inventario/nuevaFactura/', data)
            .then(res => console.log(res))
        window.location.reload();
    }

    onAnadir = (e) => {
        e.preventDefault()
        var num = this.state.prods_facturados
        var objec = this.state.prods_facturados
        var object = num.concat(objec[objec.length-1]+1)
        this.setState({
            prods_facturados: object
        })
    }

    editando = (e) => {
        e.preventDefault()
        var editar = document.getElementById("facturas_edit_form_container")
        var agregar = document.getElementById("facturas_form_container")
        var edit_container = editar.style.display
        
        if (edit_container === ''||edit_container === 'none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['facturas'].find(obj => {return obj.id_auto === Number(value)})

            editar[0].value=`${data['id_factura']}`
            editar[1].value=`${data['id_proveedor_id']}`
            editar[2].value=`${data['fecha_despacho']}`
            editar[3].value=`${data['fecha_pago']}`
            editar[4].value=`${data['pagada']}`
            editar[5].value=`${data['valor']}`
            editar[6].value=`${data['nota']}`
            editar[7].value=`${data['id_auto']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['facturas'].find(obj => {return obj.id_auto === Number(value)})

            if(editar[0].value != data['id_factura']){
                editar[0].value=`${data['id_factura']}`
                editar[1].value=`${data['id_proveedor_id']}`
                editar[2].value=`${data['fecha_despacho']}`
                editar[3].value=`${data['fecha_pago']}`
                editar[4].value=`${data['pagada']}`
                editar[5].value=`${data['valor']}`
                editar[6].value=`${data['nota']}`
                editar[7].value=`${data['id_auto']}`
            } else {
                editar.style.display="none"
                editar[0].value=''
                editar[1].value=''
                editar[2].value=''
                editar[3].value=''
                editar[4].value=''
                editar[5].value=''
                editar[6].value=''
                editar[7].value=''
            }
        }
    }

    subEdit = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('facturas_edit_form_container')
        let pagada = form[4].value

        if (pagada === "true") {
            pagada = true
        } else {
            pagada = false
        }

        let data = {
            id_proveedor_id: Number(form[1].value),
            id_factura: Number(form[0].value),
            fecha_despacho: form[2].value,
            fecha_pago: form[3].value,
            pagada: pagada,
            valor: Number(form[5].value),
            nota: form[6].value,
        }

        axios.put(`http://127.0.0.1:8000/inventario/editarFactura/${Number(value)}`, data)
        window.location.reload()
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarFactura/${Number(id)}`)
        window.location.reload();
    }

    cambiando_proveedor = (e) => {
        e.preventDefault()
        let id_proveedor_seleccionado = e.target.value
        this.setState({
            proveedor: Number(id_proveedor_seleccionado)
        })
    }
    
    nuevaFactura = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("facturas_form_container")
        const editar = document.getElementById("facturas_edit_form_container")
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
                    <h2>Facturas</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevaFactura} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nueva Factura</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form className="facturas_edit_form_container" id="facturas_edit_form_container">
                        <h3 className="agregar_factura">Editar Factura</h3>

                        <div className="form_group input_editar_facturas">
                            <label htmlFor="id_factura">Número de Factura:</label><br/>
                            <input type="text" id="id_factura" name="id_factura" /><br/>
                        </div>
                        <div className="form_group input_editar_facturas">
                            <label htmlFor="id_proveedor">Proveedor:</label><br/>
                            <select>
                                <option selected>Elige un proveedor</option>
                                {this.state.proveedores.map(proveedor => {
                                    return(
                                        <option value={proveedor.id_proveedor} id="id_proveedor" name="id_proveedor">{proveedor.nombre_proveedor}</option>
                                        )
                                    })}
                            </select><br/>
                        </div>                        
                        <div className="form_group input_editar_facturas">
                            <label htmlFor="fecha_despacho">Fecha de despacho:</label><br/>
                            <input type="text" id="fecha_despacho" name="fecha_despacho" /><br/>
                        </div>
                        <div className="form_group input_editar_facturas">
                            <label htmlFor="fecha_pago">Fecha de pago:</label><br/>
                            <input type="text" id="fecha_pago" name="fecha_pago" /><br/>
                        </div>
                        <div className="form_group input_editar_facturas">
                            <label htmlFor="pagada">Pagada:</label><br/>
                            <select id="pagada" name="pagada">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select><br/>
                        </div>
                        <div className="form_group input_editar_facturas">
                            <label htmlFor="valor_fact">Valor de la factura:</label><br/>
                            <input type="number" id="valor_fact" name="valor_fact" /><br/>
                        </div>
                        <div className="form_group input_editar_facturas">
                            <label htmlFor="nota">Nota:</label><br/>
                            <input type="text" id="nota" name="nota" />
                        </div>
                        <button onClick={this.subEdit} className="btn btn_primary">EDITAR</button>
                        <br/>
                        <br/>
                    </form>
                    <form onSubmit={this.onSubmit} className="facturas_form_container" id="facturas_form_container">
                        <h3 className="agregar_factura">Nueva Factura</h3>

                        <div className="facturas_formgroups">
                            <div className="form_group proveedor_facturas_formgroup">
                                <label htmlFor="id_proveedor">Proveedor:</label><br/>
                                <select onChange={this.cambiando_proveedor}>
                                    <option selected value="0">Elige un proveedor</option>
                                    {this.state.proveedores.map(proveedor => {
                                        return(
                                            <option value={proveedor.id_proveedor} id="id_proveedor" name="id_proveedor" >{proveedor.nombre_proveedor}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="form_group proveedor_idfactura_formgroup">
                                <label htmlFor="id_factura">Número de Factura:</label>
                                <input type="text" id="id_factura" name="id_factura" />
                            </div>
                        </div>

                        <div className="facturas_formgroups">
                            <div className="form_group fechas_facturas_formgroup">
                                <label htmlFor="fecha_despacho">Fecha de despacho:</label><br/>
                                <input type="text" id="fecha_despacho" name="fecha_despacho" /><br/>
                            </div>
                            <div className="form_group fechas_facturas_formgroup">
                                <label htmlFor="fecha_pago">Fecha de pago:</label><br/>
                                <input type="text" id="fecha_pago" name="fecha_pago" /><br/>
                            </div>
                        </div>

                        <div className="facturas_formgroups">
                            <div className="form_group pagada_facturas_formgroup">
                                <label htmlFor="pagada">Pagada:</label><br/>
                                <select id="pagada" name="pagada">
                                    <option value="True">Si</option>
                                    <option value="False" selected>No</option>
                                </select><br/>
                            </div>
                            <div className="form_group valor_facturas_formgroup">
                                <label htmlFor="valor_fact">Valor de la factura:</label><br/>
                                <input type="number" id="valor_fact" name="valor_fact" /><br/>
                            </div>
                        </div>
                        <div className="form_group">
                            <label htmlFor="nota">Nota:</label><br/>
                            <input type="text" id="nota" name="nota" />
                        </div>
                        <br/>
                        
                        {this.state.prods_facturados.map(producte => {
                            return(
                                <div id={producte}>
                                    <div className="barra_separadora_form"></div>
                                    <p className="subtitulo">Producto #{producte+1}</p>
                                    <div className="facturas_formgroups">
                                        <div className="form_group categoria_facturas_formgroup">
                                            <label htmlFor="categoria">Categoria:</label><br/>
                                            <select onChange={e => this.setState({cat_1: e.target.value})}>
                                                <option selected>Elige una categoría</option>
                                                {this.state.categorias.map(categoria => {
                                                    return(
                                                        <option value={categoria.id_categoria} id="categoria" name="categoria">{categoria.categoria}</option>
                                                        )
                                                })}
                                            </select><br/>
                                        </div>
                                        <div className="form_group producto_facturas_formgroup">
                                            <label htmlFor="producto">Producto:</label><br/>
                                            <select>
                                                <option selected>Selecciona un producto</option>
                                                {this.state.productos.map(producto => { 
                                                    var produ = document.getElementById(producte)
                                                    try {
                                                        var category = produ.children[2].children[0].children[2].value                                        
                                                    } catch (error) {
                                                        
                                                    }
                                                    var proveedore = this.state.proveedor 
                                                    return Number(producto.id_categoria_id) === Number(category) && Number(producto.id_proveedor_id) === Number(proveedore) ? (
                                                        <option value={producto.id_producto} id={`prod${producto.id_producto}`} name="producto" key={producto.id_producto}>{producto.nombre_producto}</option>
                                                        ) : null
                                                    })}
                                            </select><br/>
                                        </div>
                                    </div>
                                    <div className="facturas_formgroups">
                                        <div className="form_group cantidad_facturas_formgroup">
                                            <label htmlFor="cantidad">Cantidad:</label><br/>
                                            <input type="number" id="cantidad" name="cantidad" /><br/>
                                        </div>
                                        <div className="form_group precio_facturas_formgroup">
                                            <label htmlFor="precio">Precio:</label><br/>
                                            <input type="number" id="precio" name="precio" /><br/>
                                        </div>
                                    </div>
                                    <div className="facturas_formgroups">
                                        <div className="form_group disponible_facturas_formgroup">
                                            <label htmlFor="disponible">Disponible:</label><br/>
                                            <select id="disponible" name="disponible">
                                                <option value="True">Si</option>
                                                <option value="False" selected>No</option>
                                            </select><br/>
                                        </div>
                                        <div className="form_group nota_facturas_formgroup">
                                            <label htmlFor="nota">Nota:</label><br/>
                                            <input type="text" id="nota" name="nota" /><br/>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            )
                        })}
                        <button type="submit" class="btn btn_primary">AGREGAR</button>
                        <button onClick={this.onAnadir} class="btn btn_primary">Añadir producto</button>
                    </form>
                    <div id="fact_tabla" className="facturas_tabla_container">
                        <tbody className="tabla tabla_facturas">
                            <tr className="titulos_tabla">
                                <th className="fact_id border_top_left">ID</th>
                                <th className="fact_proveedor">Proveedor</th>
                                <th className="fact_fecha_despacho">Fecha Despacho</th>
                                <th className="fact_fecha_pago">Fecha Pago</th>
                                <th className="fact_valor">Valor</th>
                                <th className="fact_pagada">Pagada</th>
                                <th className="fact_nota">Nota</th>
                                <th className="fact_editar">Editar</th>
                                <th className="fact_eliminar_tab border_top_right">Eliminar</th>
                            </tr>
                        {
                            this.state.facturas.map((factura) => {
                                return(
                                    <tr  className="contenido_tabla">
                                        <td className="centrar_texto">{factura.id_factura}</td>
                                        <td>{factura.nombre_proveedor}</td>
                                        <td className="centrar_texto">{factura.fecha_despacho}</td>
                                        <td className="centrar_texto">{factura.fecha_pago}</td>
                                        <td className="centrar_texto dollars">{new Intl.NumberFormat().format(factura.valor)}</td>
                                        <td className="centrar_texto">{factura.pagada ? <div>SI</div> : <div>NO</div>}</td>
                                        <td>{factura.nota}</td>
                                        <td onClick={this.editando} value={factura.id_auto}  className="button_hover centrar_texto"><AiOutlineEdit value={factura.id_auto} /></td>
                                        <td onClick={this.eliminando} value={factura.id_auto}  className="button_hover centrar_texto"><AiOutlineDelete value={factura.id_auto} /></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Facturas
