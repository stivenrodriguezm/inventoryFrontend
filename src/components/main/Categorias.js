import React from 'react'
import axios from 'axios'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import '../../styles/Categorias.css'

class Categorias extends React.Component {

    state = {
        categorias: []
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/categorias/`)
            .then(res => {
                const persons = res.data;
                this.setState({categorias: persons})
        }) 
    }

    onSubmit = (e) => {
        e.preventDefault()
        var nombre_categoria = e.target.elements[0].value        
        const data = {
            categoria: nombre_categoria
        }

        axios.post('http://127.0.0.1:8000/inventario/nuevaCategoria/', data)
        window.location.reload();
    }

    editando = (e) => {
        e.preventDefault()
        const editar = document.getElementById("edit_categorias_form")
        const agregar = document.getElementById("add_categorias_form")
        var edit_container = editar.style.display

        if (edit_container==''||edit_container=='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['categorias'].find(obj => {return obj.id_categoria === Number(value)})
            
            editar[0].value=`${data['categoria']}`
            editar[1].value=`${data['id_categoria']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['categorias'].find(obj => {return obj.id_categoria === Number(value)})
            if(editar[1].value != data['id_categoria']){
                editar[0].value=`${data['categoria']}`
                editar[1].value=`${data['id_categoria']}`
            } else {
                editar.style.display="none"
                editar[0].value=''
                editar[1].value=''
            }
        }
    }

    submitEditForm = (e) => {
        e.preventDefault()
        let value = e.target.getAttribute('value')
        let form = document.getElementById('edit_categorias_form')

        let data = {
            categoria: form[0].value,
        }

        axios.put(`http://127.0.0.1:8000/inventario/editarCategoria/${Number(value)}`, data)
        window.location.reload()
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarCategoria/${Number(id)}`)
        window.location.reload();
    }

    nuevaCategoria = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("add_categorias_form")
        const editar = document.getElementById("edit_categorias_form")
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
                    <h2>Categorías</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <BsDownload />
                        </div>
                        <div onClick={this.nuevaCategoria} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Nueva Categoría</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form onSubmit={this.onSubmit} className="add_categorias_form" id="add_categorias_form">
                        <h3 className="agregar_categoria">Agregar Categoria</h3>
                        <div  className="form_group">
                            <label htmlFor="fname">Nombre de categoria:</label><br/>
                            <input type="text" id="fname" name="fname" /><br/>
                        </div>
                        <button type="submit" className="btn btn_primary">Agregar Categoria</button>
                    </form>
                    <form className="edit_categorias_form" id="edit_categorias_form">
                        <h3 className="agregar_categoria">Editar Categoria</h3>
                        <div  className="form_group">
                            <label htmlFor="fname">Nombre de categoria:</label><br/>
                            <input type="text" id="fname" name="fname" /><br/>
                        </div>
                        <button onClick={this.submitEditForm} className="btn btn_primary">Editar Categoria</button>
                    </form>
                    <div className="categorias_tabla_container">
                        <div className="tabla_categorias tabla">
                            <tbody className="tabla tabla_categorias">
                                <tr className="titulos_tabla">
                                    <th className="cat_id border_top_left">Id</th>
                                    <th className="cat_categoria">Categoría</th>
                                    <th className="cat_editar">Editar</th>
                                    <th className="cat_eliminar border_top_right">Eliminar</th>
                                </tr>
                                {
                                    this.state.categorias.map((categoria) => {
                                        return(
                                            <tr className="contenido_tabla">
                                                <td className="centrar_texto">{categoria.id_categoria}</td>
                                                <td className="cat_cat_description">{categoria.categoria}</td>
                                                <td className="centrar_texto button_hover"  onClick={this.editando} value={categoria.id_categoria}><AiOutlineEdit value={categoria.id_categoria} /></td>
                                                <td className="centrar_texto button_hover" onClick={this.eliminando} value={categoria.id_categoria}><AiOutlineDelete value={categoria.id_categoria} /></td>
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

export default Categorias
