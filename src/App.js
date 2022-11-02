import React from 'react'
import Main from './components/main/Main'
import Sidebar from './components/sidebar/Sidebar'
import Categorias from './components/main/Categorias'
import Proveedores from './components/main/Proveedores'
import Productos from './components/main/Productos'
import Facturas from './components/main/Facturas'
import Stock from './components/main/Stock'
import Transportadores from './components/main/Transportadores'
import Vendedores from './components/main/Vendedores'
import Ventas from './components/main/Ventas'
import Remisiones from './components/main/Remisiones'
import Pedidos from './components/main/Pedidos'
import Caja from './components/main/Caja'
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import './styles/Styles.css'
import {useEffect} from 'react'
import axios from 'axios'

const App = () => {
  
  var items = "benditas"
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/inventario/ventas/`)
        .then(res => {
            const ventas = res.data;
            localStorage.setItem('Ventas', JSON.stringify(ventas))
    }) 
    axios.get(`http://127.0.0.1:8000/inventario/proveedores/`)
        .then(res => {
            const proveedores = res.data;
            localStorage.setItem('Proveedores', JSON.stringify(proveedores))
    }) 
    axios.get(`http://127.0.0.1:8000/inventario/facturas/`)
        .then(res => {
            const facturas = res.data;
            localStorage.setItem('Facturas', JSON.stringify(facturas))
    }) 
  }, [items])


  return (
    <div>
      <Router >
        <Sidebar />
        <main className="container_main">
          <Routes >
            <Route path='/' element={<Main/>} exact/>
            <Route path='/categorias' element={<Categorias/>}/>
            <Route path='/proveedores' element={<Proveedores/>}/>
            <Route path='/productos' element={<Productos/>}/>
            <Route path='/facturas' element={<Facturas/>}/>
            <Route path='/stock' element={<Stock/>}/>
            <Route path='/transportadores' element={<Transportadores/>}/>
            <Route path='/vendedores' element={<Vendedores/>}/>
            <Route path='/ventas' element={<Ventas/>}/>
            <Route path='/remisiones' element={<Remisiones/>}/>
            <Route path='/pedidos' element={<Pedidos/>}/>
            <Route path='/caja' element={<Caja/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
