import React from 'react'
import axios from 'axios';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import '../../styles/Remisiones.css'

class Remisiones extends React.Component {

    state = {
        transportadores: [],
        remisiones:[],
        stock: [],
        categorias: [],
        ventas: [],
        prods_remision: [0],
        cat_1: 0,
        proveedor: 0
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/remisiones/`)
            .then(res => {
                const remisiones = res.data;
                this.setState({remisiones: remisiones})
        })
        axios.get(`http://127.0.0.1:8000/inventario/transportadores/`)
            .then(res => {
                const transportadores = res.data;
                this.setState({transportadores: transportadores})
        })
        axios.get(`http://127.0.0.1:8000/inventario/categorias/`)
            .then(res => {
                const categorias = res.data;
                this.setState({categorias: categorias})
        })
        axios.get(`http://127.0.0.1:8000/inventario/stock/`)
            .then(res => {
                const stock = res.data;
                this.setState({stock: stock})
        })
        axios.get(`http://127.0.0.1:8000/inventario/ventas/`)
            .then(res => {
                const ventas = res.data;
                this.setState({ventas: ventas})
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        var id_remision = Number(e.target.elements[1].value)        
        var id_venta = Number(e.target.elements[0].value)        
        var id_transportador = Number(e.target.elements[2].value)             
        var fecha_remision = e.target.elements[3].value                 
        var nota = e.target.elements[4].value      
        var productos = []

        var position = 5

        for(var i = 0; i < this.state.prods_remision.length; i+=1){
            let stock = {
                id_stock: Number(e.target.elements[position+1].value),  
            }
            productos.push(stock)
            position+=2
        }
     
        const data = {
            id_remision: id_remision,
            id_venta: Number(id_venta),
            id_transportador: id_transportador,
            fecha_remision: fecha_remision,
            nota: nota,
            productos: productos
        }
        // console.log(data)
        axios.post('http://127.0.0.1:8000/inventario/nuevaRemision/', data)
        window.location.reload();
    }

    onAnadir = (e) => {
        e.preventDefault()
        var num = this.state.prods_remision
        var objec = this.state.prods_remision
        var object = num.concat(objec[objec.length-1]+1)
        this.setState({
            prods_remision: object
        })
    }

    editando = (e) => {
        e.preventDefault()
        const editar = document.getElementById("remision_edit_form_container")
        const agregar = document.getElementById("remisiones_form_container")
        var edit_container = editar.style.display
        if (edit_container===''||edit_container==='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['remisiones'].find(obj => {return obj.id_autogenerado === Number(value)})

            editar[0].value=`${data['id_remision']}`
            editar[1].value=`${data['id_venta_id']}`
            editar[2].value=`${data['id_transportador_id']}`
            editar[3].value=`${data['fecha_remision']}`
            editar[4].value=`${data['nota']}`
            editar[5].value=`${data['id_autogenerado']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['remisiones'].find(obj => {return obj.id_autogenerado === Number(value)})
            if(editar[0].value != data['id_remision']){
                editar[0].value=`${data['id_remision']}`
                editar[1].value=`${data['id_venta_id']}`
                editar[2].value=`${data['id_transportador_id']}`
                editar[3].value=`${data['fecha_remision']}`
                editar[4].value=`${data['nota']}`
                editar[5].value=`${data['id_autogenerado']}`
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

    subEdit = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('remision_edit_form_container')

        let data = {
            id_remision: form[0].value,
            id_venta_id: form[1].value,
            id_transportador_id: form[2].value,
            fecha_remision: form[3].value,
            nota: form[4].value
        }

        axios.put(`http://127.0.0.1:8000/inventario/editarRemision/${Number(value)}`, data)
        window.location.reload()
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarRemision/${Number(id)}`)
        window.location.reload();
    }

    nuevaRemision = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("remisiones_form_container")
        const editar = document.getElementById("remision_edit_form_container")
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
                    <h2>Remisiones</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevaRemision} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nueva Remision</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form className="remision_edit_form_container" id="remision_edit_form_container" >
                        <h3 className="agregar_remision">Editar Remision</h3>
                        <div className="form_group input_editar_remisiones">
                            <label htmlFor="id_remision">Número de remisión:</label><br/>
                            <input type="text" id="id_remision" name="id_remision" /><br/>
                        </div>

                        <div className="form_group select_editar_remisiones">
                            <label for="id_venta">Venta</label><br/>
                            <select id="id_venta" name="id_venta">
                                <option>Elige una venta</option>
                                {this.state.ventas.map(venta => {
                                    return venta.entregado === false ? (
                                        <option value={venta.id_auto}>{venta.id_venta}</option>
                                        ) : (null)
                                    })}
                            </select><br/>
                        </div>
                        <div className="form_group select_editar_remisiones">
                            <label for="id_transportador">Transportador:</label><br/>
                            <select id="id_transportador" name="id_transportador">
                                <option selected>Elige un transportador</option>
                                {this.state.transportadores.map(transportador => {
                                    return(
                                        <option value={transportador.id_transportador}>{transportador.nombre_transportador}</option>
                                        )
                                    })}
                            </select><br/>
                        </div>
                        <div className="form_group input_editar_remisiones">
                            <label htmlFor="fecha_remision">fecha_remision:</label><br/>
                            <input type="text" id="fecha_remision" name="fecha_remision" /><br/>
                        </div>
                        <div className="form_group input_editar_remisiones">
                            <label htmlFor="nota">Nota:</label><br/>
                            <input type="text" id="nota" name="nota" /><br/>
                        </div>
                        <button type="submit" class="btn btn_primary" onClick={this.subEdit}>Editar Remision</button>
                    </form>
                    <form onSubmit={this.onSubmit} className="remisiones_form_container" id="remisiones_form_container">
                        <h3 className="agregar_remision">Nueva Remision</h3>
                        <div className="remisiones_formgroups">
                            <div className="form_group half_select_remisiones_formgroup">
                                <label for="id_venta">Venta</label><br/>
                                <select id="id_venta" name="id_venta">
                                    <option>Elige una venta</option>
                                    {this.state.ventas.map(venta => {
                                        return venta.entregado === false ? (
                                            <option value={venta.id_venta}>{venta.id_venta}</option>
                                            ) : (null)
                                        })}
                                </select><br/>
                            </div>
                            <div className="form_group half_input_remisiones_formgroup">
                                <label htmlFor="id_remision">id_remision:</label><br/>
                                <input type="text" id="id_remision" name="id_remision" /><br/>
                            </div>
                       </div>
                        <div className="remisiones_formgroups">
                            <div className="form_group half_select_remisiones_formgroup">
                                <label for="id_transportador">Transportador:</label><br/>
                                <select id="id_transportador" name="id_transportador">
                                    <option selected>Elige un transportador</option>
                                    {this.state.transportadores.map(transportador => {
                                        return(
                                            <option value={transportador.id_transportador}>{transportador.nombre_transportador}</option>
                                        )
                                    })}
                                </select><br/>
                            </div>
                            <div className="form_group half_input_remisiones_formgroup">
                                <label htmlFor="fecha_remision">fecha_remision:</label><br/>
                                <input type="text" id="fecha_remision" name="fecha_remision" /><br/>
                            </div>
                       </div>                      
                        <div className="form_group nota_remisiones_formgroup">
                            <label htmlFor="nota">Nota:</label><br/>
                            <input type="text" id="nota" name="nota" /><br/>
                        </div>

                        {this.state.prods_remision.map(producte => {
                                return(
                                    <div id={producte}>
                                        <div className="barra_separadora_form quince_margin_bottom"></div>
                                        <h3 className="subtitulo">Producto #{producte+1}</h3>
                                        <div className="remisiones_formgroups">
                                            <div className="form_group half_select_remisiones_formgroup">
                                                <label htmlFor="categoria_1">Categoria:</label><br/>
                                                <select onChange={e => this.setState({cat_1: e.target.value})}>
                                                    {this.state.categorias.map(categoria => {
                                                        return(
                                                            <option value={categoria.id_categoria} id="categoria_1" name="categoria_1">{categoria.categoria}</option>
                                                            )
                                                        })}
                                                </select><br/>
                                            </div>
                                            <div className="form_group half_select_remisiones_formgroup">
                                                <label htmlFor="id_stock1">Producto:</label><br/>
                                                <select id="id_stock1" name="id_stock1">
                                                    {this.state.stock.map(stock_prod => {
                                                        var produ = document.getElementById(producte) 
                                                        try {
                                                            var category = produ.children[2].children[0].children[2].value                                          
                                                        } catch (error) {
                                                            
                                                        }
                                                        return Number(stock_prod.Categoria) === Number(category) ? (
                                                            <option value={stock_prod.id_stock}>{stock_prod.id_stock}, {stock_prod.Producto}, {stock_prod.Nota}</option>
                                                            ) : <div></div>
                                                        })}
                                                </select><br/>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        <button type="submit" class="btn btn_primary">Agregar Remision</button>
                        <button onClick={this.onAnadir} class="btn btn_primary">Añadir producto</button>
                    </form>
                    <div className="remisiones_tabla_container">
                        <div className="tabla_remisiones tabla">
                            <tbody  className="tabla tabla_remisiones">
                                <tr className="titulos_tabla">
                                    <th className="border_top_left rem_id">ID</th>
                                    <th className="rem_venta">Venta</th>
                                    <th className="rem_transportador">Transportador</th>
                                    <th className="rem_fecha">Fecha</th>
                                    <th className="rem_nota">Nota</th>
                                    <th className="rem_editar">Editar</th>
                                    <th className="rem_eliminar border_top_right">Eliminar</th>
                                </tr>
                            {
                                this.state.remisiones.map((remision) => {
                                    return(
                                        <tr className="contenido_tabla">
                                            <td className="centrar_texto">{remision.id_remision}</td>
                                            <td className="centrar_texto">{remision.id_venta_id}</td>
                                            <td>{remision.nombre_transportador}</td>
                                            <td className="centrar_texto">{remision.fecha_remision}</td>
                                            <td>{remision.nota}</td>
                                            <td value={remision.id_autogenerado} className="button_hover centrar_texto" onClick={this.editando}><AiOutlineEdit value={remision.id_autogenerado} /></td>
                                            <td value={remision.id_autogenerado} className="button_hover centrar_texto" onClick={this.eliminando}><AiOutlineDelete value={remision.id_autogenerado} /></td>
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

export default Remisiones
