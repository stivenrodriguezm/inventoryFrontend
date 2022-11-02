import React from 'react'
import axios from 'axios'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import '../../styles/Productos.css'


class Productos extends React.Component {

    state = {
        productos: [],
        proveedores: [],
        categorias: []
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
        axios.get(`http://127.0.0.1:8000/inventario/categorias/`)
            .then(res => {
                const categorias = res.data;
                this.setState({categorias: categorias})
        }) 
    }

    onSubmit = (e) => {
        e.preventDefault()
        var nombre_producto = e.target.elements[0].value        
        var id_proveedor = e.target.elements[1].value        
        var id_categoria = e.target.elements[2].value               
        var costo = e.target.elements[3].value        
        var medidas = e.target.elements[4].value
        var tiempo_entrega = e.target.elements[5].value        
        var nota = e.target.elements[6].value        
        const data = {
            nombre_producto: nombre_producto,
            id_proveedor: Number(id_proveedor),
            id_categoria: Number(id_categoria),
            costo: Number(costo),
            medidas: medidas,
            tiempo_entrega: Number(tiempo_entrega),
            nota: nota,
        }

        console.log(data)

        axios.post('http://127.0.0.1:8000/inventario/nuevoProducto/', data)
        window.location.reload();
    }

    editando = (e) => {
        e.preventDefault()
        const editar = document.getElementById("productos_edit_form_container")
        const agregar = document.getElementById("productos_form_container")
        var edit_container = editar.style.display

        if (edit_container==''||edit_container=='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['productos'].find(obj => {return obj.id_producto === Number(value)})

            editar[0].value=`${data['nombre_producto']}`
            editar[1].value=`${data['id_proveedor_id']}`
            editar[2].value=`${data['id_categoria_id']}`
            editar[3].value=`${data['costo']}`
            editar[4].value=`${data['medidas']}`
            editar[5].value=`${data['tiempo_entrega']}`
            editar[6].value=`${data['nota']}`
            editar[7].value=`${data['id_producto']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['productos'].find(obj => {return obj.id_producto === Number(value)})
            if(editar[7].value != data['id_producto']){
                editar[0].value=`${data['nombre_producto']}`
                editar[1].value=`${data['id_proveedor_id']}`
                editar[2].value=`${data['id_categoria_id']}`
                editar[3].value=`${data['costo']}`
                editar[4].value=`${data['medidas']}`
                editar[5].value=`${data['tiempo_entrega']}`
                editar[6].value=`${data['nota']}`
                editar[7].value=`${data['id_producto']}`
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

    submitEditForm = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('productos_edit_form_container')

        let data = {
            nombre_producto: form[0].value,
            id_proveedor_id: Number(form[1].value),
            id_categoria_id: Number(form[2].value),
            costo: Number(form[3].value),
            medidas: form[4].value,
            tiempo_entrega: Number(form[5].value),
            nota: form[6].value,
        }

        console.log(data)

        axios.put(`http://127.0.0.1:8000/inventario/editarProducto/${Number(value)}`, data)
        window.location.reload()
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarProducto/${Number(id)}`)
        window.location.reload();
    }

    nuevoProducto = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("productos_form_container")
        const editar = document.getElementById("productos_edit_form_container")
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
            <div  className="container_body">
                <div className="barra_navegacion">
                    <h2>Productos</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevoProducto} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nuevo Producto</a>
                        </div>
                    </div>
                </div>
                <div className="body" >
                    <form className="productos_edit_form_container" id="productos_edit_form_container">
                        <h3 className="agregar_producto">Editar Producto</h3>

                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="nombre_producto">Nombre de producto:</label>
                            <input type="text" id="nombre_producto" name="nombre_producto" /><br/>
                        </div>
                        <div className="form_group select_editar_vendedor">
                            <label htmlFor="proveedor">Proveedor:</label>
                            <select>
                                {this.state.proveedores.map(proveedor => {
                                    return(
                                        <option value={proveedor.id_proveedor} id="proveedor" name="proveedor">{proveedor.nombre_proveedor}</option>
                                        )
                                    })}
                            </select><br/>
                        </div>
                        <div className="form_group select_editar_vendedor">
                            <label htmlFor="categoria">Categoria:</label>
                            <select>
                                {this.state.categorias.map(categoria => {
                                    return(
                                        <option value={categoria.id_categoria} id="categoria" name="categoria">{categoria.categoria}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <br/>
                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="costo">Costo:</label>
                            <input type="number" id="costo" name="costo" /><br/>
                        </div>
                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="medidas">Medidas:</label>
                            <input type="text" id="medidas" name="medidas" /><br/>
                        </div>
                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="tiempo_entrega">Tiempo de entrega Días:</label>
                            <input type="number" id="tiempo_entrega" name="tiempo_entrega" /><br/>
                        </div>
                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="nota">Nota:</label>
                            <input type="text" id="nota" name="nota" /><br/>
                        </div>

                        <button type="submit" className="btn btn_primary" onClick={this.submitEditForm}>Editar Producto</button>
                    </form>
                    <form  onSubmit={this.onSubmit} className="productos_form_container" id="productos_form_container" >
                        <h3 className="agregar_producto">Agregar Producto</h3>
                        <label htmlFor="nombre_producto">Nombre de producto:</label>
                        <input type="text" id="nombre_producto" name="nombre_producto" /><br/>
                        
                        <label htmlFor="proveedor">Proveedor:</label>
                        <select>
                            {this.state.proveedores.map(proveedor => {
                                return(
                                    <option value={proveedor.id_proveedor} id="proveedor" name={proveedor.nombre_proveedor}>{proveedor.nombre_proveedor}</option>
                                )
                            })}
                        </select><br/>
                        <label htmlFor="categoria">Categoria:</label>
                        <select>
                            {this.state.categorias.map(categoria => {
                                return(
                                    <option value={categoria.id_categoria} id="categoria" name="categoria">{categoria.categoria}</option>
                                )
                            })}
                        </select>
                        <br/>
                        <label htmlFor="costo">Costo:</label>
                        <input type="number" id="costo" name="costo" /><br/>
                        <label htmlFor="medidas">Medidas:</label>
                        <input type="text" id="medidas" name="medidas" /><br/>
                        <label htmlFor="tiempo_entrega">Tiempo de entrega Días:</label>
                        <input type="number" id="tiempo_entrega" name="tiempo_entrega" /><br/>
                        <label htmlFor="nota">Nota:</label>
                        <input type="text" id="nota" name="nota" /><br/>

                        <button type="submit" className="btn btn_primary">Agregar Producto</button>
                    </form>
                    <table className="productos_tabla_container">
                        <tbody className="tabla prod_tabla">
                            <tr className="titulos_tabla">
                                <th className="prod_id border_top_left">ID</th>
                                <th className="prod_nombre">Producto</th>
                                <th className="prod_categoria">Categoría</th>
                                <th className="prod_proveedor">Proveedor</th>
                                <th className="prod_costo">Costo</th>
                                <th className="prod_medida">Medida</th>
                                <th className="prod_tiempo">Días de producción</th>
                                <th className="prod_nota">Nota</th>
                                <th className="prod_editar">Editar</th>
                                <th className="prod_eliminar border_top_right">Eliminar</th>
                            </tr>
                        {
                            this.state.productos.map((producto) => {
                                return(
                                    <tr className="contenido_tabla">
                                        <td className="display_wrap centrar_texto">{producto.id_producto}</td>
                                        <td>{producto.nombre_producto}</td>
                                        <td className="display_wrap">{producto.categoria}</td>
                                        <td className="display_wrap">{producto.nombre_proveedor}</td>
                                        <td className="centrar_texto dollars">{new Intl.NumberFormat().format(producto.costo)}</td>
                                        <td className="display_wrap">{producto.medidas}</td>
                                        <td className="centrar_texto">{producto.tiempo_entrega}</td>
                                        <td className="display_wrap">{producto.nota}</td>
                                        <td onClick={this.editando} value={producto.id_producto} className="edit_table button_hover centrar_texto"><AiOutlineEdit value={producto.id_producto} /></td>
                                        <td onClick={this.eliminando} value={producto.id_producto} className="edit_table button_hover centrar_texto"><AiOutlineDelete value={producto.id_producto} /></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Productos
