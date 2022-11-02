import React from 'react'
import axios from 'axios'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import '../../styles/Proveedores.css'

class Proveedores extends React.Component {

    state = {
        proveedores: []
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/proveedores/`)
            .then(res => {
                const proveedores = res.data;
                this.setState({proveedores: proveedores})
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        var nombre_proveedor = e.target.elements[0].value        
        var telefono_proveedor = e.target.elements[1].value        
        var direccion_proveedor = e.target.elements[2].value        
        var segundo_telefono = e.target.elements[3].value        
        var observacion = e.target.elements[4].value        
        const data = {
            nombre_proveedor: nombre_proveedor,
            telefono_proveedor: telefono_proveedor,
            direccion_proveedor: direccion_proveedor,
            segundo_telefono: segundo_telefono,
            observacion: observacion,
        }

        axios.post('http://127.0.0.1:8000/inventario/nuevoProveedor/', data)
        window.location.reload();
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarProveedor/${Number(id)}`)
        window.location.reload();
    }

    subEdit = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('proveedores_editar_container')

        let data = {
            nombre_proveedor: form[0].value,
            telefono_proveedor: form[1].value,
            direccion_proveedor: form[2].value,
            segundo_telefono: form[3].value,
            observacion: form[4].value,
            id_proveedor: form[5].value
        }

        axios.put(`http://127.0.0.1:8000/inventario/editarProveedor/${Number(value)}`, data)
        window.location.reload()
    }

    editando = (e) => {
        e.preventDefault()
        const editar = document.getElementById("proveedores_editar_container")
        const agregar = document.getElementById("proveedores_form_container")
        var edit_container = editar.style.display

        if (edit_container==''||edit_container=='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let info_proveedor = this.state['proveedores'].find(obj => {return obj.id_proveedor === Number(value)})

            editar[0].value=`${info_proveedor['nombre_proveedor']}`
            editar[1].value=`${info_proveedor['telefono_proveedor']}`
            editar[2].value=`${info_proveedor['direccion_proveedor']}`
            editar[3].value=`${info_proveedor['segundo_telefono']}`
            editar[4].value=`${info_proveedor['observacion']}`
            editar[5].value=`${info_proveedor['id_proveedor']}`
        } else {
            let value = e.target.getAttribute('value')
            let data =  this.state['proveedores'].find(obj => {return obj.id_proveedor === Number(value)})
            if(editar[5].value != data['id_proveedor']){
                editar[0].value=`${data['nombre_proveedor']}`
                editar[1].value=`${data['telefono_proveedor']}`
                editar[2].value=`${data['direccion_proveedor']}`
                editar[3].value=`${data['segundo_telefono']}`
                editar[4].value=`${data['observacion']}`
                editar[5].value=`${data['id_proveedor']}`
            } else {
                editar.style.display="none"
                editar[0].value=''
                editar[1].value=''
                editar[2].value=''
                editar[3].value=''
                editar[4].value=''
                editar[5].value=''
            }
        }
    }

    editarProveedor = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')

        let form = document.getElementById('edit_proveedores_form')
        let data = {
            nombre_proveedor: form[0].value,
            telefono_proveedor: form[1].value,
            direccion_proveedor: form[2].value,
            segundo_telefono: form[3].value,
            observacion: form[4].value,
        }

        axios.put(`http://127.0.0.1:8000/inventario/editarProveedor/${Number(value)}`, data)
        window.location.reload();
    }

    nuevoProveedor = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("proveedores_form_container")
        const editar = document.getElementById("proveedores_editar_container")
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
                    <h2>Proveedores</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevoProveedor} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nuevo Proveedor</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form className="proveedores_editar_container" id="proveedores_editar_container">
                        <h3 className="agregar_proveedor">Editar Proveedor</h3>
                        <div className="form_group input_editar_proveedor">
                            <label htmlFor="nombre_proveedor">Nombre de proveedor:</label><br/>
                            <input type="text" id="nombre_proveedor" name="nombre_proveedor" />
                        </div>
                        <div className="form_group input_editar_proveedor">
                            <label htmlFor="telefono_proveedor">Telefono de proveedor:</label><br/>
                            <input type="text" id="telefono_proveedor" name="telefono_proveedor" /><br/>
                        </div>
                        <div className="form_group input_editar_proveedor">
                            <label htmlFor="direccion_proveedor">Direccion de proveedor:</label><br/>
                            <input type="text" id="direccion_proveedor" name="direccion_proveedor" /><br/>
                        </div>
                        <div className="form_group input_editar_proveedor">
                            <label htmlFor="segundo_telefono">Segundo Telefono:</label><br/>
                            <input type="text" id="segundo_telefono" name="segundo_telefono" /><br/>
                        </div>
                        <div className="form_group input_editar_proveedor">
                            <label htmlFor="observacion">Observacion:</label><br/>
                            <input type="text" id="observacion" name="observacion" /><br/>
                        </div>
                        <button type="submit" class="btn btn_primary" onClick={this.subEdit}>Editar Proveedor</button>
                    </form>
                    <form onSubmit={this.onSubmit} className="proveedores_form_container" id="proveedores_form_container">
                        <h3 className="agregar_proveedor">Agregar Proveedor</h3>
                        <div className="form_group">
                            <label htmlFor="nombre_proveedor">Nombre del proveedor:</label>
                            <input type="text" id="nombre_proveedor" name="nombre_proveedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="telefono_proveedor">Telefono de proveedor:</label>
                            <input type="text" id="telefono_proveedor" name="telefono_proveedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="direccion_proveedor">Direccion de proveedor:</label>
                            <input type="text" id="direccion_proveedor" name="direccion_proveedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="segundo_telefono">Segundo Telefono:</label>
                            <input type="text" id="segundo_telefono" name="segundo_telefono" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="observacion">Observacion:</label>
                            <input type="text" id="observacion" name="observacion" /><br/>
                        </div>
                        <button className="btn btn_primary">Agregar Proveedor</button>
                    </form>
                    <div className="proveedores_tabla_container">
                        <div className="tabla_proveedores tabla">
                            <tbody className="tabla tabla_vendedores">
                                <tr className="titulos_tabla">
                                    <th className="proveedores_nombre border_top_left">Nombre</th>
                                    <th className="proveedores_telefono ">Telefono</th>
                                    <th className="proveedores_direccion ">Dirección</th>
                                    <th className="proveedores_segundo_telefono ">Segundo telefono</th>
                                    <th className="proveedores_observacion ">Observación</th>
                                    <th className="proveedores_editar ">Editar</th>
                                    <th className="proveedores_eliminar border_top_right">Eliminar</th>
                                </tr>
                            {
                                this.state.proveedores.map((proveedor) => {
                                    return(
                                        <tr className="contenido_tabla">
                                            <td className="padding_inicio_tabla">{proveedor.nombre_proveedor}</td>
                                            <td className="centrar_texto">{proveedor.telefono_proveedor}</td>
                                            <td className="">{proveedor.direccion_proveedor}</td>
                                            <td className="centrar_texto">{proveedor.segundo_telefono}</td>
                                            <td className="">{proveedor.observacion}</td>
                                            <td className="button_hover centrar_texto" onClick={this.editando} value={proveedor.id_proveedor}><AiOutlineEdit value={proveedor.id_proveedor} /></td>
                                            <td className="button_hover centrar_texto" onClick={this.eliminando} value={proveedor.id_proveedor}><AiOutlineDelete value={proveedor.id_proveedor} /></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Proveedores
