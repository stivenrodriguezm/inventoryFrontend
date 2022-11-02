import React from 'react'
import axios from 'axios'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import '../../styles/Transportadores.css'

class Transportadores extends React.Component {

    state = {
        transportadores: []
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/transportadores/`)
            .then(res => {
                const transportadores = res.data;
                this.setState({transportadores: transportadores})
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        var nombre_transportador = e.target.elements[0].value        
        var telefono_tranportador = e.target.elements[1].value        
        var cedula_transportador = e.target.elements[2].value        
        var direccion_transportador = e.target.elements[3].value        
        var nombre_contacto_emergencia = e.target.elements[4].value        
        var numero_contacto_emergencia = e.target.elements[5].value        
     
        const data = {
            nombre_transportador: nombre_transportador,
            telefono_transportador: telefono_tranportador,
            cedula_transportador: cedula_transportador,
            direccion_transportador: direccion_transportador,
            nombre_contacto_emergencia: nombre_contacto_emergencia,
            numero_contacto_emergencia: numero_contacto_emergencia,
        }
        axios.post('http://127.0.0.1:8000/inventario/nuevoTransportador/', data)
        window.location.reload();
    }
    subEdit = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('transportadores_editar_container')

        let data = {
            nombre_transportador: form[0].value,
            telefono_transportador: form[1].value,
            cedula_transportador: form[2].value,
            direccion_transportador: form[3].value,
            nombre_contacto_emergencia: form[4].value,
            numero_contacto_emergencia: form[5].value
        }
        // console.log(data)
        axios.put(`http://127.0.0.1:8000/inventario/editarTransportador/${Number(value)}`, data)
        window.location.reload()
    }

    editando = (e) => {
        e.preventDefault()
        const editar = document.getElementById("transportadores_editar_container")
        const agregar = document.getElementById("transportadores_form_container")
        var edit_container = editar.style.display
        if (edit_container===''||edit_container==='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['transportadores'].find(obj => {return obj.id_transportador === Number(value)})

            editar[0].value=`${data['nombre_transportador']}`
            editar[1].value=`${data['telefono_transportador']}`
            editar[2].value=`${data['cedula_transportador']}`
            editar[3].value=`${data['direccion_transportador']}`
            editar[4].value=`${data['nombre_contacto_emergencia']}`
            editar[5].value=`${data['numero_contacto_emergencia']}`
            editar[6].value=`${data['id_transportador']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['transportadores'].find(obj => {return obj.id_transportador === Number(value)})
            if(editar[6].value != data['id_transportador']){
                editar[0].value=`${data['nombre_transportador']}`
                editar[1].value=`${data['telefono_transportador']}`
                editar[2].value=`${data['cedula_transportador']}`
                editar[3].value=`${data['direccion_transportador']}`
                editar[4].value=`${data['nombre_contacto_emergencia']}`
                editar[5].value=`${data['numero_contacto_emergencia']}`
                editar[6].value=`${data['id_transportador']}`
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

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarTransportador/${Number(id)}`)
        window.location.reload();
    }

    nuevoTransportador = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("transportadores_form_container")
        const editar = document.getElementById("transportadores_editar_container")
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
            <div>
                <div className="barra_navegacion">
                    <h2>Transportadores</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevoTransportador} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nuevo Transportador</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form className="transportadores_editar_container" id="transportadores_editar_container" >
                        <h3 className="agregar_transportador">Editar Vendedor</h3>
                        <div className="form_group">
                            <label htmlFor="nombre_transportador">Nombre Transportador:</label><br/>
                            <input type="text" id="nombre_transportador" name="nombre_transportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="telefono_tranportador">Telefono Transportador:</label><br/>
                            <input type="text" id="telefono_tranportador" name="telefono_tranportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="cedula_transportador">Cedula Transportador:</label><br/>
                            <input type="text" id="cedula_transportador" name="cedula_transportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="direccion_transportador">Direccion Transportador:</label><br/>
                            <input type="text" id="direccion_transportador" name="direccion_transportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="nombre_contacto_emergencia">Nombre Contacto Emergencia:</label><br/>
                            <input type="text" id="nombre_contacto_emergencia" name="nombre_contacto_emergencia" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="numero_contacto_emergencia">Numero Contacto Emergencia:</label><br/>
                            <input type="text" id="numero_contacto_emergencia" name="numero_contacto_emergencia" /><br/>
                        </div>

                        <button onClick={this.subEdit} className="btn btn_primary">Editar</button>
                    </form>
                    <form className="transportadores_form_container" id="transportadores_form_container" onSubmit={this.onSubmit}>
                        <h3 className="agregar_transportador">Nuevo Vendedor</h3>
                        <div className="form_group">
                            <label htmlFor="nombre_transportador">Nombre Transportador:</label><br/>
                            <input type="text" id="nombre_transportador" name="nombre_transportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="telefono_tranportador">Telefono Transportador:</label><br/>
                            <input type="text" id="telefono_tranportador" name="telefono_tranportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="cedula_transportador">Cedula Transportador:</label><br/>
                            <input type="text" id="cedula_transportador" name="cedula_transportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="direccion_transportador">Direccion Transportador:</label><br/>
                            <input type="text" id="direccion_transportador" name="direccion_transportador" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="nombre_contacto_emergencia">Nombre Contacto Emergencia:</label><br/>
                            <input type="text" id="nombre_contacto_emergencia" name="nombre_contacto_emergencia" /><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="numero_contacto_emergencia">Numero Contacto Emergencia:</label><br/>
                            <input type="text" id="numero_contacto_emergencia" name="numero_contacto_emergencia" /><br/>
                        </div>

                        <button type="submit" className="btn btn_primary">Agregar</button>
                    </form>
                    <div className="transportadores_tabla_container">
                        <div className="tabla_transportadores tabla">
                            <tbody className="tabla prod_tabla">
                                <tr className="titulos_tabla">
                                    <th className="transportadores_id border_top_left">ID</th>
                                    <th className="transportadores_nombre">Nombre</th>
                                    <th className="transportadores_telefono">Telefono</th>
                                    <th className="transportadores_cedula">Cédula</th>
                                    <th className="transportadores_direccion">Direccion</th>
                                    <th className="transportadores_nombre_contacto">Nombre Contacto</th>
                                    <th className="transportadores_numero_contacto">Número Contacto</th>
                                    <th className="transportadores_editar">Editar</th>
                                    <th className="transportadores_eliminar border_top_right">Eliminar</th>
                                </tr>
                            {
                                this.state.transportadores.map((transportador) => {
                                    return(
                                        <tr key={transportador.id_transportador} className="contenido_tabla">
                                            <td className="centrar_texto">{transportador.id_transportador}</td>
                                            <td>{transportador.nombre_transportador}</td>
                                            <td className="centrar_texto">{transportador.telefono_transportador}</td>
                                            <td className="centrar_texto">{transportador.cedula_transportador}</td>
                                            <td>{transportador.direccion_transportador}</td>
                                            <td>{transportador.nombre_contacto_emergencia}</td>
                                            <td className="centrar_texto">{transportador.numero_contacto_emergencia}</td>
                                            <td onClick={this.editando} value={transportador.id_transportador} className="edit_table button_hover centrar_texto"><AiOutlineEdit value={transportador.id_transportador} /></td>
                                            <td onClick={this.eliminando} value={transportador.id_transportador} className="edit_table button_hover centrar_texto"><AiOutlineDelete value={transportador.id_transportador} /></td>
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

export default Transportadores
