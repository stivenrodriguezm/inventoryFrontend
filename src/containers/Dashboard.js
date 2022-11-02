import React from 'react'
import Main from '../components/main/Main'
import Sidebar from '../components/sidebar/Sidebar'
import Categorias from '../components/main/Categorias'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <Router >
                <Sidebar />
                <Routes>
                    <Route path='/' component={Main}/>
                    <Route path='/a' component={Categorias}/>
                </Routes>
            </Router>
        </div>
    )
}

export default Dashboard
