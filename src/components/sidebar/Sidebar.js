import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Sidebar.css'
import { BiCategory } from 'react-icons/bi';
import { RiExchangeBoxLine } from 'react-icons/ri';
import { TbSofa, TbTruckDelivery, TbFileInvoice, TbReportMoney } from 'react-icons/tb';
import { MdOutlineInventory, MdOutlineBorderColor } from 'react-icons/md';
import { BsFilePerson } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="div_letrero_lottus">
                <h3 className="letrero_lottus">LOTTUS</h3>
            </div>
            <nav className="sidebar_nav">
                <div className="navtext_icon_div">
                    <Link to="ventas" className="icon_div">
                        <TbReportMoney />
                    </Link>
                    <Link to="ventas">Ventas</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="facturas" className="icon_div">
                        <TbFileInvoice />
                    </Link>
                    <Link to="facturas">Facturas</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="remisiones" className="icon_div">
                        <HiOutlineDocumentText />
                    </Link>
                    <Link to="remisiones">Remisiones</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="stock" className="icon_div">
                        <MdOutlineInventory />
                    </Link>
                    <Link to="stock">Stock</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="pedidos" className="icon_div">
                        <MdOutlineBorderColor />
                    </Link>
                    <Link to="pedidos">Pedidos</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="caja" className="icon_div">
                        <MdOutlineBorderColor />
                    </Link>
                    <Link to="caja">Caja</Link>
                </div>

                <div className="separador_navbar">

                </div>

                <div className="navtext_icon_div">
                    <Link to="productos" className="icon_div">
                        <TbSofa />
                    </Link>
                    <Link to="productos">Productos</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="categorias" className="icon_div">
                        <BiCategory />
                    </Link>
                    <Link to="categorias">Categorias</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="proveedores" className="icon_div">
                        <RiExchangeBoxLine />
                    </Link>
                    <Link to="proveedores">Proveedores</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="transportadores" className="icon_div">
                        <TbTruckDelivery />
                    </Link>
                    <Link to="transportadores">Transportadores</Link>
                </div>
                <div className="navtext_icon_div">
                    <Link to="vendedores" className="icon_div">
                        <BsFilePerson />
                    </Link>
                    <Link to="vendedores">Vendedores</Link>
                </div>
                

            </nav>
        </div>
    )
}

export default Sidebar
