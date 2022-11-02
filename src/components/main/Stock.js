import React from 'react'
import axios from 'axios'
import '../../styles/Stock.css'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
//import { useTable, useSortBy } from "react-table";


class Stock extends React.Component {
    state = {
        stock: [],
        categorias: [],
        proveedores: [],
        productos: [],
        filtered_stock: [],
        order: "ASC",
        categoria_filter: null,
        proveedor_filter: null,
        producto_filter: null,
        proveedores_filtrados: [],
        productos_filtrados: [],
        categorias_filtradas: []
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/inventario/stock/`)
            .then(res => {
                const stock = res.data;
                this.setState({stock: stock})
        })
        axios.get(`http://127.0.0.1:8000/inventario/stock/`)
            .then(res => {
                const stocky = res.data;
                this.setState({filtered_stock: stocky})
        })
        axios.get(`http://127.0.0.1:8000/inventario/categorias/`)
            .then(res => {
                const categorias = res.data;
                this.setState({categorias: categorias})
                this.setState({categorias_filtradas: categorias})
        })
        axios.get(`http://127.0.0.1:8000/inventario/proveedores/`)
            .then(res => {
                var proveedores = res.data;
                this.setState({proveedores: proveedores})
                this.setState({proveedores_filtrados: proveedores})
        })
        axios.get(`http://127.0.0.1:8000/inventario/productos/`)
            .then(res => {
                const productos = res.data;
                this.setState({productos: productos})
                this.setState({productos_filtrados: productos})
        })
    }

    onFilterChange = async (e) => {
        e.preventDefault()
        
        var filtro = e.target.name
        const inventario = this.state.stock
        var value = e.target.value

        if (filtro === "categoria" && value === "nulo"){
            this.setState({categoria_filter: null})
            this.setState({productos_filtrados: this.state.productos})
            this.setState({proveedores_filtrados: this.state.proveedores})
            if (this.state.proveedor_filter === null && this.state.producto_filter === null){
                this.setState({filtered_stock: this.state.stock})
            }
            if (this.state.proveedor_filter != null && this.state.producto_filter === null){
                var proveedor = this.state.proveedor_filter
                var newInventory = inventario.filter(function (i){
                    return i.Proveedor === proveedor
                })
                this.setState({filtered_stock: newInventory})
            }
            if (this.state.proveedor_filter === null && this.state.producto_filter != null){
                var producto = this.state.producto_filter
                var newInventory = inventario.filter(function (i){
                    return i.Producto === producto
                })
                this.setState({filtered_stock: newInventory})
            }
            if (this.state.proveedor_filter != null && this.state.producto_filter != null){
                var producto = this.state.producto_filter
                var proveedor = this.state.proveedor_filter
                var newInventory = inventario.filter(function (i){
                    return i.Producto === producto
                        && i.Proveedor === proveedor
                })
                this.setState({filtered_stock: newInventory})
            }
        }
        if (filtro === "categoria" && this.state.proveedor_filter === null && this.state.producto_filter === null && value != "nulo"){
            this.setState({categoria_filter: null})
            var categorie = e.target.value
            this.setState({categoria_filter: categorie})
            var newInventory = inventario.filter(function (i){
                return Number(i.Categoria) === Number(categorie)
            })
            await this.setState({filtered_stock: newInventory})

            // FILTRAR PROVEEDORES
            await this.setState({proveedores_filtrados: this.state.proveedores})
            var stock_impreso = document.getElementById("stock_tabla_container").rows
            var lista_proveedores = []
            for(var i = 1; i < stock_impreso.length; i++){
                lista_proveedores.push(stock_impreso[i].children[3].textContent)
            }
            let set_proveedores = new Set(lista_proveedores.map(JSON.stringify))
            let proveedoresSinDuplicaciones = Array.from(set_proveedores).map(JSON.parse)
            var stateProveedores = this.state.proveedores
            var lista = []
            for (var i = 0; i < proveedoresSinDuplicaciones.length; i++) {
                const pushInfo = stateProveedores.filter(proveedor => proveedor.nombre_proveedor.includes(proveedoresSinDuplicaciones[i]))
                lista.push(pushInfo[0])
            }
            await this.setState({proveedores_filtrados: []})
            await this.setState({proveedores_filtrados: lista})

            // FILTRAR PRODUCTOS
            var stock_impreso = document.getElementById("stock_tabla_container").rows
            var lista_productos = []
            for(var i = 1; i < stock_impreso.length; i++){
                lista_productos.push(stock_impreso[i].children[1].textContent)
            }
            let set_productos = new Set(lista_productos.map(JSON.stringify))
            let productosSinDuplicaciones = Array.from(set_productos).map(JSON.parse)
            var stateProductos = this.state.productos
            var lista = []
            for (var i = 0; i < productosSinDuplicaciones.length; i++) {
                const pushInfo = stateProductos.filter(producto => producto.nombre_producto.includes(productosSinDuplicaciones[i]))
                lista.push(pushInfo[0])
            }
            await this.setState({productos_filtrados: []})
            await this.setState({productos_filtrados: lista})

        } else if (filtro === "categoria" && this.state.proveedor_filter != null && this.state.producto_filter === null && value != "nulo"){
            var categorie = e.target.value
            this.setState({categoria_filter: categorie})

            var proveedor = this.state.proveedor_filter
            var newInventory = inventario.filter(function (i){
                return Number(i.Categoria) === Number(categorie)
                    && i.Proveedor === proveedor
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "categoria" && this.state.proveedor_filter === null && this.state.producto_filter != null && value != "nulo"){
            var categorie = e.target.value
            this.setState({categoria_filter: categorie})

            var producto = this.state.producto_filter
            var newInventory = inventario.filter(function (i){
                return Number(i.Categoria) === Number(categorie)
                    && i.Producto === producto
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "categoria" && this.state.proveedor_filter != null && this.state.producto_filter != null && value != "nulo"){
            var categorie = e.target.value
            this.setState({categoria_filter: categorie})

            var producto = this.state.producto_filter
            var proveedor = this.state.proveedor_filter
            var newInventory = inventario.filter(function (i){
                return Number(i.Categoria) === Number(categorie)
                    && i.Producto === producto
                    && i.Proveedor === proveedor
            })
            this.setState({filtered_stock: newInventory})
        }

        if (filtro === "proveedor" && value === "nulo"){
            this.setState({proveedor_filter: null})
            this.setState({categorias_filtradas: this.state.categorias})
            this.setState({productos_filtrados: this.state.productos})
            if (this.state.categoria_filter === null && this.state.producto_filter === null){
                this.setState({filtered_stock: this.state.stock})
            }
            if (this.state.categoria_filter != null && this.state.producto_filter === null){
                var categoria = this.state.categoria_filter
                var newInventory = inventario.filter(function (i){
                    return Number(i.Categoria) === Number(categoria)
                })
                this.setState({filtered_stock: newInventory})
            }
            if (this.state.categoria_filter === null && this.state.producto_filter != null){
                var producto = this.state.producto_filter
                var newInventory = inventario.filter(function (i){
                    return i.Producto === producto
                })
                this.setState({filtered_stock: newInventory})
            }
            if (this.state.categoria_filter != null && this.state.producto_filter != null){
                var producto = this.state.producto_filter
                var categoria = this.state.categoria_filter
                var newInventory = inventario.filter(function (i){
                    return i.Producto === producto
                        && Number(i.Categoria) === Number(categoria)
                })
                this.setState({filtered_stock: newInventory})
            }
        }
        if (filtro === "proveedor" && this.state.categoria_filter === null && this.state.producto_filter === null && value != "nulo") {
            var proveedor = e.target.value
            this.setState({proveedor_filter: proveedor})

            var newInventory = inventario.filter(function (i){
                return i.Proveedor === proveedor
            })
            await this.setState({filtered_stock: newInventory})

            // FILTRAR CATEGORIAS
            var stock_impreso = document.getElementById("stock_tabla_container").rows
            var lista_categorias = []
            for(var i = 1; i < stock_impreso.length; i++){
                lista_categorias.push(stock_impreso[i].children[2].textContent)
            }
            let set_categorias = new Set(lista_categorias.map(JSON.stringify))
            let categoriasSinDuplicaciones = Array.from(set_categorias).map(JSON.parse)
            var stateProductos = this.state.productos
            var lista = []
            for (var i = 0; i < categoriasSinDuplicaciones.length; i++) {
                const pushInfo = stateProductos.filter(producto => producto.categoria.includes(categoriasSinDuplicaciones[i]))
                lista.push(pushInfo[0])
            }
            await this.setState({categorias_filtradas: []})
            await this.setState({categorias_filtradas: lista})

            // FILTRAR PRODUCTOS
            var stock_impreso = document.getElementById("stock_tabla_container").rows
            var lista_productos = []
            for(var i = 1; i < stock_impreso.length; i++){
                lista_productos.push(stock_impreso[i].children[1].textContent)
            }
            let set_productos = new Set(lista_productos.map(JSON.stringify))
            let productosSinDuplicaciones = Array.from(set_productos).map(JSON.parse)
            var stateProductos = this.state.productos
            var lista = []
            for (var i = 0; i < productosSinDuplicaciones.length; i++) {
                const pushInfo = stateProductos.filter(producto => producto.nombre_producto.includes(productosSinDuplicaciones[i]))
                lista.push(pushInfo[0])
            }
            await this.setState({productos_filtrados: []})
            await this.setState({productos_filtrados: lista})
        } else if (filtro === "proveedor" && this.state.categoria_filter != null && this.state.producto_filter === null && value != "nulo"){
            var proveedor = e.target.value
            this.setState({proveedor_filter: proveedor})

            var categorie = this.state.categoria_filter
            var newInventory = inventario.filter(function (i){
                return i.Proveedor === proveedor
                    && Number(i.Categoria) === Number(categorie)
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "proveedor" && this.state.categoria_filter === null && this.state.producto_filter != null && value != "nulo"){
            var proveedor = e.target.value
            this.setState({proveedor_filter: proveedor})

            var producto = this.state.producto_filter
            var newInventory = inventario.filter(function (i){
                return i.Proveedor === proveedor
                    && i.Producto === producto
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "proveedor" && this.state.categoria_filter != null && this.state.producto_filter != null && value != "nulo"){
            var proveedor = e.target.value
            this.setState({proveedor_filter: proveedor})

            var producto = this.state.producto_filter
            var categorie = this.state.categoria_filter
            var newInventory = inventario.filter(function (i){
                return Number(i.Categoria) === Number(categorie)
                    && i.Producto === producto
                    && i.Proveedor === proveedor
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "proveedor" && Number(e.target.value) === 0){
            this.setState({proveedor_filter: null})
        }

        if (filtro === "producto" && value === "nulo"){
            this.setState({producto_filter: null})
            this.setState({categorias_filtradas: this.state.categorias})
            this.setState({proveedores_filtrados: this.state.proveedores})
            if (this.state.categoria_filter === null && this.state.proveedor_filter === null){
                this.setState({filtered_stock: this.state.stock})
            }
            if (this.state.categoria_filter != null && this.state.proveedor_filter === null){
                var categoria = this.state.categoria_filter
                var newInventory = inventario.filter(function (i){
                    return Number(i.Categoria) === Number(categoria)
                })
                this.setState({filtered_stock: newInventory})
            }
            if (this.state.categoria_filter === null && this.state.proveedor_filter != null){
                var proveedor = this.state.proveedor_filter
                var newInventory = inventario.filter(function (i){
                    return i.Proveedor === proveedor
                })
                this.setState({filtered_stock: newInventory})
            }
            if (this.state.categoria_filter != null && this.state.proveedor_filter != null){
                var proveedor = this.state.proveedor_filter
                var categoria = this.state.categoria_filter
                var newInventory = inventario.filter(function (i){
                    return i.Proveedor === proveedor
                        && Number(i.Categoria) === Number(categoria)
                })
                this.setState({filtered_stock: newInventory})
            }
        }
        if (filtro === "producto" && this.state.categoria_filter === null && this.state.proveedor_filter === null && value != "nulo"){
            var producto = e.target.value
            this.setState({producto_filter: producto})

            var newInventory = inventario.filter(function (i){
                return i.Producto === producto
            })
            await this.setState({filtered_stock: newInventory})

            // FILTRAR CATEGORIAS
            var stock_impreso = document.getElementById("stock_tabla_container").rows
            var lista_categorias = []
            for(var i = 1; i < stock_impreso.length; i++){
                lista_categorias.push(stock_impreso[i].children[2].textContent)
            }
            let set_categorias = new Set(lista_categorias.map(JSON.stringify))
            let categoriasSinDuplicaciones = Array.from(set_categorias).map(JSON.parse)
            var stateProductos = this.state.productos
            var lista = []
            for (var i = 0; i < categoriasSinDuplicaciones.length; i++) {
                const pushInfo = stateProductos.filter(producto => producto.categoria.includes(categoriasSinDuplicaciones[i]))
                lista.push(pushInfo[0])
            }
            await this.setState({categorias_filtradas: []})
            await this.setState({categorias_filtradas: lista})

            // FILTRAR PROVEEDORES
            var stock_impreso = document.getElementById("stock_tabla_container").rows
            var lista_proveedores = []
            for(var i = 1; i < stock_impreso.length; i++){
                lista_proveedores.push(stock_impreso[i].children[3].textContent)
            }
            let set_proveedores = new Set(lista_proveedores.map(JSON.stringify))
            let proveedoresSinDuplicaciones = Array.from(set_proveedores).map(JSON.parse)
            var stateProveedores = this.state.proveedores
            var lista = []
            for (var i = 0; i < proveedoresSinDuplicaciones.length; i++) {
                const pushInfo = stateProveedores.filter(proveedor => proveedor.nombre_proveedor.includes(proveedoresSinDuplicaciones[i]))
                lista.push(pushInfo[0])
            }
            await this.setState({proveedores_filtrados: []})
            await this.setState({proveedores_filtrados: lista})
        } else if (filtro === "producto" && this.state.categoria_filter != null && this.state.proveedor_filter === null && value != "nulo"){
            var producto = e.target.value
            this.setState({producto_filter: producto})

            var categorie = this.state.categoria_filter
            var newInventory = inventario.filter(function (i){
                return i.Producto === producto
                    && Number(i.Categoria) === Number(categorie)
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "producto" && this.state.categoria_filter === null && this.state.proveedor_filter != null && value != "nulo"){
            var producto = e.target.value
            this.setState({producto_filter: producto})
            
            var proveedor = this.state.proveedor_filter
            var newInventory = inventario.filter(function (i){
                return i.Producto === producto
                && i.Proveedor === proveedor
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "producto" && this.state.categoria_filter != null && this.state.proveedor_filter != null && value != "nulo"){
            var producto = e.target.value
            this.setState({producto_filter: producto})

            var categorie = this.state.categoria_filter
            var proveedor = this.state.proveedor_filter
            var newInventory = inventario.filter(function (i){
                return i.Producto === producto
                && i.Proveedor === proveedor
                && Number(i.Categoria) === Number(categorie)
            })
            this.setState({filtered_stock: newInventory})
        } else if (filtro === "producto" && Number(e.target.value) === 0){
            this.setState({producto_filter: null})
        }
        
    }

    onSubmit = (e) => {
        e.preventDefault()
        var id_producto = e.target.elements[1].value
        var valor = e.target.elements[2].value
        var disponible = e.target.elements[3].value
        var nota = e.target.elements[4].value

        if(disponible === 'true'){
            disponible = true
        }
        if(disponible === 'false'){
            disponible = false
        }

        const data = {
            id_producto: Number(id_producto),
            valor: Number(valor),
            disponible: disponible,
            nota: nota
        }

        axios.post('http://127.0.0.1:8000/inventario/nuevoStock/', data)
            .then(res => console.log(res))
        window.location.reload();

    }

    editando = (e) => {
        e.preventDefault()
        e.preventDefault()
        const editar = document.getElementById("stock_edit_form_container")
        const agregar = document.getElementById("stock_form_container")
        var edit_container = editar.style.display
        if (edit_container===''||edit_container==='none') {
            editar.style.display="block"
            agregar.style.display="none"

            let value = e.target.getAttribute('value')
            let data = this.state['stock'].find(obj => {return obj.id_stock === Number(value)})

            editar[0].value=`${data['Precio']}`
            if(data['Disponible'] === 1){
                editar[1].value=true
            }
            if(data['Disponible'] === 0){
                editar[1].value=false
            }
            editar[2].value=`${data['Nota']}`
            editar[3].value=`${data['id_stock']}`
        } else {
            let value = e.target.getAttribute('value')
            let data = this.state['stock'].find(obj => {return obj.id_stock === Number(value)})
            if(editar[3].value != data['id_stock']){
                editar[0].value=`${data['Precio']}`
                if(data['Disponible'] === 1){
                    editar[1].value=true
                }
                if(data['Disponible'] === 0){
                    editar[1].value=false
                }
                editar[2].value=`${data['Nota']}`
                editar[3].value=`${data['id_stock']}`
            } else {
                editar.style.display="none"
                editar[0].value=''
                editar[1].value=''
                editar[2].value=''
                editar[3].value=''
            }
        }
    }

    subEdit = (e) => {
        e.preventDefault()

        let form = document.getElementById('stock_edit_form_container')

        var valor = form[0].value
        var disponible = form[1].value
        var nota = form[2].value
        var id_stock = form[3].value

        if(disponible === 'true'){
            disponible = true
        }
        if(disponible === 'false'){
            disponible = false
        }

        const data = {
            valor: Number(valor),
            disponible: disponible,
            nota: nota
        }
        axios.put(`http://127.0.0.1:8000/inventario/editarStock/${id_stock}`, data)
            .then(res => console.log(res))
        window.location.reload();
    }
    
    agregando = (e) => {
        e.preventDefault()
        const agregar = document.getElementById("stock_form_container")
        const editar = document.getElementById("stock_edit_form_container")
        var agregar_form = agregar.style.display
        if (agregar_form===''||agregar_form==='none') {
            agregar.style.display="block"
            editar.style.display="none"
        } else {
            agregar.style.display="none"
        }
    }

    eliminando = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('value')
        axios.delete(`http://127.0.0.1:8000/inventario/eliminarStock/${Number(id)}`)
        window.location.reload()
    }

    printStock = (e) => {
        e.preventDefault()
        console.log(this.state.stock)
    }

    sorting = (e) => {
        e.preventDefault()
        var intString = e.target.getAttribute('name')
        var filtro = e.target.getAttribute('id')
        if (intString === "int"){
            if(this.state.order === "ASC"){
                const sorted = [...this.state.filtered_stock].sort((a,b) => 
                a[filtro] > b[filtro] ? 1 : -1)
                this.setState({filtered_stock: sorted})
                this.setState({order: "DSC"})
                }
                if(this.state.order === "DSC"){
                    const sorted = [...this.state.filtered_stock].sort((a,b) => 
                    a[filtro] < b[filtro] ? 1 : -1)
                    this.setState({filtered_stock: sorted})
                    this.setState({order: "ASC"})
                }
                // if(this.state.order === "NORMAL"){
                //     const sorted = this.state.stock
                //     this.setState({filtered_stock: sorted})
                //     this.setState({order: "ASC"})
                // }
        } 
        if (intString === "string"){
            if(this.state.order === "ASC"){
                const sorted = [...this.state.filtered_stock].sort((a,b) => 
            a[filtro].toLowerCase() > b[filtro].toLowerCase() ? 1 : -1)
            this.setState({filtered_stock: sorted})
            this.setState({order: "DSC"})
            }
            if(this.state.order === "DSC"){
                const sorted = [...this.state.filtered_stock].sort((a,b) => 
                a[filtro].toLowerCase() < b[filtro].toLowerCase() ? 1 : -1)
                this.setState({filtered_stock: sorted})
                this.setState({order: "ASC"})
            }
            // if(this.state.order === "NORMAL"){
            //     const sorted = this.state.stock
            //     this.setState({filtered_stock: sorted})
            //     this.setState({order: "ASC"})
            // }
        }
        
        
    }

    quitarFiltros = (e) => {
        e.preventDefault()
        this.setState({categoria_filter: null})
        this.setState({proveedor_filter: null})
        this.setState({producto_filter: null})
        this.setState({proveedores_filtrados: this.state.proveedores})
        this.setState({productos_filtrados: this.state.productos})
        this.setState({categorias_filtradas: this.state.categorias})
        axios.get(`http://127.0.0.1:8000/inventario/stock/`)
            .then(res => {
                const stocky = res.data;
                this.setState({filtered_stock: stocky})
        })
        var container_filtros = document.getElementById('container_filtros')
        container_filtros.children[0].children[0].children[0].selected = true
        container_filtros.children[1].children[0].children[0].selected = true
        container_filtros.children[2].children[0].children[0].selected = true
    }
  
    render(){
        return (
            <div>
                <div className="barra_navegacion">
                    <h2>Stock</h2>
                    <div className="container_barra_interno">
                        <input type="text" className="input_barra" placeholder="Buscar..." />
                        <div className="icon_border">
                            <ReactHTMLTableToExcel 
                                id="btn_exportar"
                                table="stock_tabla_container"
                                filename="Stock"
                                sheet="Stock"
                                buttonText={<BsDownload />}
                            />
                        </div>
                        <div onClick={this.agregando} className="barra_agregar">
                            <div className="icon_div_body">
                                <AiOutlinePlus />
                            </div>
                            <a>Agregar</a>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form className="stock_edit_form_container" id="stock_edit_form_container">
                        <h3>Editar Stock</h3>
                        <div className="form_group">
                            <label htmlFor="valor">Valor:</label><br/>
                            <input type="number" id="valor" name="valor" />
                        </div>
                        <div className="form_group">
                            <label htmlFor="disponible">Disponible:</label><br/>
                            <select id="disponible" name="disponible">
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="nota">Nota:</label><br/>
                            <input type="text" id="nota" name="nota" /><br/>
                        </div>
                        <button type="submit" onClick={this.subEdit} class="btn btn_primary">EDITAR</button>
                    </form>
                    <form onSubmit={this.onSubmit} className="stock_form_container" id="stock_form_container">
                        <h3>Agregar a Stock</h3>
                        <div className="form_group">
                            <label for="categoria">Categoría:</label><br/>
                            <select id="categoria" name="categoria">
                                {this.state.categorias.map(categoria => {
                                    return(
                                        <option value={categoria.id_categoria} id="categoria_1" name="categoria_1">{categoria.categoria}</option>
                                        )
                                    })}
                            </select><br/>
                        </div>
                        <div className="form_group">
                            <label for="producto">Producto:</label><br/>
                            <select id="producto" name="producto">
                                {this.state.productos.map(producto => {
                                    return(
                                        <option value={producto.id_producto} id="producto_1" name="producto_1">{producto.nombre_producto}</option>
                                        )
                                    })}
                            </select><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="valor">Valor:</label><br/>
                            <input type="number" id="valor" name="valor" />
                        </div>
                        <div className="form_group">
                            <label htmlFor="disponible">Disponible:</label><br/>
                            <select id="disponible" name="disponible">
                                <option value="true">Si</option>
                                <option value="false" selected>No</option>
                            </select><br/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="nota">Nota:</label><br/>
                            <input type="text" id="nota" name="nota" /><br/>
                        </div>
                        <button type="submit" class="btn btn_primary">AGREGAR</button>
                    </form>
                    <div className="container_filtros" id="container_filtros">
                        <div className="div_filtro">
                            <select onChange={this.onFilterChange} name="categoria" >
                                <option value="nulo" name="reset">Categoría</option>
                                {this.state.categorias_filtradas.map(categoria => {
                                    return (
                                        <option value={categoria.id_categoria}>{categoria.categoria}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="div_filtro">
                            <select onChange={this.onFilterChange} name="proveedor">
                                <option value="nulo">Proveedor</option>
                                {this.state.proveedores_filtrados.map(proveedor => {
                                    return (
                                        <option  value={proveedor ? proveedor.nombre_proveedor : ""}>{proveedor ? proveedor.nombre_proveedor : ""}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="div_filtro">
                            <select onChange={this.onFilterChange} name="producto">
                                <option value="nulo">Producto</option>
                                {this.state.productos_filtrados.map(producto => {
                                    return (
                                        <option>{producto.nombre_producto}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="div_filtro_btn">
                                    <button onClick={this.quitarFiltros} className="btn btn_primary btn_quitar_filtros">Quitar Filtros</button>
                        </div>
                    </div>
                    <table className="stock_tabla_container" id="stock_tabla_container">
                        <tbody className="tabla tabla_stock">
                            <tr className="titulos_tabla">
                                <th onClick={this.sorting} id="id_stock" name="int"  className="stock_id border_top_left">Id Stock</th>
                                <th onClick={this.sorting} id="Producto" name="string" className="stock_producto">Producto</th>
                                <th onClick={this.sorting} id="Categoria_nombre"name="string" className="stock_categoria">Categoria</th>
                                <th onClick={this.sorting} id="Proveedor" name="string"className="stock_proveedor">Proveedor</th>
                                <th onClick={this.sorting} id="Factura" className="stock_factura">Factura</th>
                                <th onClick={this.sorting} id="Precio" name="int" className="stock_precio">Precio</th>
                                <th onClick={this.sorting} id="Disponible" name="int" className="stock_disponible">Disponible</th>
                                <th className="stock_nota">Nota</th>
                                <th className="stock_editar">Editar</th>
                                <th className="stock_eliminar border_top_right">Eliminar</th>
                            </tr>
                            {
                                this.state.filtered_stock.map(producto => {
                                    return (
                                        <tr className="contenido_tabla">
                                            <td className="centrar_texto">{producto.id_stock}</td>
                                            <td>{producto.Producto}</td>
                                            <td>{producto.Categoria_nombre}</td>
                                            <td>{producto.Proveedor}</td>
                                            <td className="centrar_texto">{producto.Factura}</td>
                                            <td className="dollars centrar_texto">{new Intl.NumberFormat().format(producto.Precio)}</td>
                                            <td className="centrar_texto">{producto.Disponible ? "Si" : "No"  }</td>
                                            <td>{producto.Nota}</td>
                                            <td onClick={this.editando} value={producto.id_stock} className="centrar_texto button_hover"><AiOutlineEdit /></td>
                                            <td onClick={this.eliminando} value={producto.id_stock} className="centrar_texto button_hover"><AiOutlineDelete /></td>
                                        </tr>    
                                )})
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Stock
