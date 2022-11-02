import React from 'react'
import axios from 'axios'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import '../../styles/Vendedores.css'

class Vendedores extends React.Component {

    state = {
        vendedores: []
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/vendedores/`)
            .then(res => {
                const vendedores = res.data;
                this.setState({vendedores: vendedores})
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        var nombre_vendedor = e.target.elements[0].value        
        var telefono_vendedor = e.target.elements[1].value        
        var cedula_vendedor = e.target.elements[2].value        
        var correo_vendedor = e.target.elements[3].value        
        var direccion_vendedor = e.target.elements[4].value        
        var activo = e.target.elements[5].value              
        var nombre_contacto = e.target.elements[6].value        
        var numero_contacto = e.target.elements[7].value        

        var active = false
        
        if(activo === 'True'){
            active = true
        } else {
            active = false
        }

        const data = {
            nombre_vendedor: nombre_vendedor,
            telefono_vendedor: telefono_vendedor,
            cedula_vendedor: cedula_vendedor,
            correo_vendedor: correo_vendedor,
            direccion_vendedor: direccion_vendedor,
            activo: active,
            nombre_contacto_emergencia: nombre_contacto,
            numero_contacto_emergencia: numero_contacto,
        }
        axios.post('http://127.0.0.1:8000/inventario/nuevoVendedor/', data)
        window.location.reload();
    }

    editando = (e) => {
        e.preventDefault()
        const editar = document.getElementById("vendedores_editar_container")
        const agregar = document.getElementById("vendedores_form_container")
        var edit_container = editar.style.display
        if (edit_container===''||edit_container==='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['vendedores'].find(obj => {return obj.id_vendedor === Number(value)})

            editar[0].value=`${data['nombre_vendedor']}`
            editar[1].value=`${data['telefono_vendedor']}`
            editar[2].value=`${data['cedula_vendedor']}`
            editar[3].value=`${data['correo_vendedor']}`
            editar[4].value=`${data['direccion_vendedor']}`
            editar[5].value=`${data['activo']}`
            editar[6].value=`${data['nombre_contacto_emergencia']}`
            editar[7].value=`${data['numero_contacto_emergencia']}`
            editar[8].value=`${data['id_vendedor']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['vendedores'].find(obj => {return obj.id_vendedor === Number(value)})
            if(editar[8].value != data['id_vendedor']){
                editar[0].value=`${data['nombre_vendedor']}`
                editar[1].value=`${data['telefono_vendedor']}`
                editar[2].value=`${data['cedula_vendedor']}`
                editar[3].value=`${data['correo_vendedor']}`
                editar[4].value=`${data['direccion_vendedor']}`
                editar[5].value=`${data['activo']}`
                editar[6].value=`${data['nombre_contacto_emergencia']}`
                editar[7].value=`${data['numero_contacto_emergencia']}`
                editar[8].value=`${data['id_vendedor']}`
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
                editar[8].value=''
            }
        }
    }

    subEdit = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('vendedores_editar_container')

        let active = form[5].value
        if(active === "true"){
            active = true
        } else {
            active = false
        }

        let data = {
            nombre_vendedor: form[0].value,
            telefono_vendedor: form[1].value,
            cedula_vendedor: form[2].value,
            correo_vendedor: form[3].value,
            direccion_vendedor: form[4].value,
            activo: active,
            nombre_contacto_emergencia: form[6].value,
            numero_contacto_emergencia: form[7].value
        }
        axios.put(`http://127.0.0.1:8000/inventario/editarVendedor/${Number(value)}`, data)
        window.location.reload()
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarVendedor/${Number(id)}`)
        window.location.reload();
    }

    nuevoVendedor = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("vendedores_form_container")
        const editar = document.getElementById("vendedores_editar_container")
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
                    <h2>Vendedores</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevoVendedor} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nuevo Vendedor</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form className="vendedores_editar_container" id="vendedores_editar_container">
                        <h3 className="agregar_vendedor">Editar Vendedor</h3>
                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="nombre_vendedor">Nombre del vendedor:</label><br/>
                            <input type="text" id="nombre_vendedor" name="nombre_vendedor" /><br/>
                        </div>

                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="telefono_vendedor">Telefono del vendedor:</label><br/>
                            <input type="text" id="telefono_vendedor" name="telefono_vendedor" /><br/>
                        </div>

                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="cedula_vendedor">Cedula del vendedor:</label><br/>
                            <input type="text" id="cedula_vendedor" name="cedula_vendedor" /><br/>
                        </div>

                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="correo_vendedor">Correo del vendedor:</label><br/>
                            <input type="text" id="correo_vendedor" name="correo_vendedor" /><br/>
                        </div>
                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="direccion_vendedor">Dirección del vendedor:</label><br/>
                            <input type="text" id="direccion_vendedor" name="direccion_vendedor" /><br/>
                        </div>

                        <div className="form_group select_editar_vendedor">
                            <label for="activo">Estado:</label><br/>
                            <select id="activo" name="activo">
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select><br/>
                        </div>

                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="nombre_contacto_emergencia">Nombre Contacto Emergencia:</label><br/>
                            <input type="text" id="nombre_contacto_emergencia" name="nombre_contacto_emergencia" /><br/>
                        </div>

                        <div className="form_group input_editar_vendedor">
                            <label htmlFor="numero_contacto_emergencia">Numero Contacto Emergencia:</label><br/>
                            <input type="text" id="numero_contacto_emergencia" name="numero_contacto_emergencia" /><br/>
                        </div>

                        <button type="submit" onClick={this.subEdit} className="btn btn_primary">Editar Vendedor</button>
                    </form>
                    <form onSubmit={this.onSubmit} className="vendedores_form_container" id="vendedores_form_container">
                        <h3 className="agregar_vendedor">Nuevo Vendedor</h3>

                        <div className="form_group">
                            <label htmlFor="nombre_vendedor">Nombre Vendedor:</label><br/>
                            <input type="text" id="nombre_vendedor" name="nombre_vendedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="telefono_vendedor">Telefono Vendedor:</label><br/>
                            <input type="text" id="telefono_vendedor" name="telefono_vendedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="cedula_vendedor">Cedula Vendedor:</label><br/>
                            <input type="text" id="cedula_vendedor" name="cedula_vendedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="correo_vendedor">Correo Vendedor:</label><br/>
                            <input type="text" id="correo_vendedor" name="correo_vendedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="direccion_vendedor">Direccion Contacto Emergencia:</label><br/>
                            <input type="text" id="direccion_vendedor" name="direccion_vendedor" /><br/>
                        </div>
                        <div className="form_group">
                            <label for="activo">Activo</label><br/>
                            <select id="activo" name="activo">
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </select><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="nombre_contacto_emergencia">Nombre Contacto Emergencia:</label><br/>
                            <input type="text" id="nombre_contacto_emergencia" name="nombre_contacto_emergencia" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="numero_contacto_emergencia">Numero Contacto Emergencia:</label><br/>
                            <input type="text" id="numero_contacto_emergencia" name="numero_contacto_emergencia" /><br/>
                        </div>

                        <button type="submit" class="btn btn_primary">Agregar Vendedor</button>
                    </form>
                    <div className="vendedores_tabla_container">
                        <div className="tabla_vendedores tabla">
                            <tbody className="tabla tabla_vendedores">
                                <tr className="titulos_tabla">
                                    <th className="vendedores_id border_top_left">ID</th>
                                    <th className="vendedores_nombre">Nombre</th>
                                    <th className="vendedores_telefono">Telefono</th>
                                    <th className="vendedores_cedula">Cédula</th>
                                    <th className="vendedores_correo">Correo</th>
                                    <th className="vendedores_direccion">Direccion</th>
                                    <th className="vendedores_activo">Activo</th>
                                    <th className="vendedores_nombre_emergencia">Nombre Contacto</th>
                                    <th className="vendedores_numero_emergencia">Número Contacto</th>
                                    <th className="vendedores_editar">Editar</th>
                                    <th className="vendedores_eliminar border_top_right">Eliminar</th>
                                </tr>
                            {
                                this.state.vendedores.map((vendedor) => {
                                    return(
                                        <tr key={vendedor.id_vendedor} className="contenido_tabla">
                                            <td className="centrar_texto">{vendedor.id_vendedor}</td>
                                            <td>{vendedor.nombre_vendedor}</td>
                                            <td className="centrar_texto">{vendedor.telefono_vendedor}</td>
                                            <td className="centrar_texto">{vendedor.cedula_vendedor}</td>
                                            <td>{vendedor.correo_vendedor}</td>
                                            <td>{vendedor.direccion_vendedor}</td>
                                            <td className="centrar_texto">{vendedor.activo ? "Activo" : "Inactivo"}</td>
                                            <td>{vendedor.nombre_contacto_emergencia}</td>
                                            <td className="centrar_texto">{vendedor.numero_contacto_emergencia}</td>
                                            <td onClick={this.editando} value={vendedor.id_vendedor} className="button_hover centrar_texto"><AiOutlineEdit value={vendedor.id_vendedor} /></td>
                                            <td onClick={this.eliminando} value={vendedor.id_vendedor} className="button_hover centrar_texto"><AiOutlineDelete value={vendedor.id_vendedor} /></td>
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

export default Vendedores
