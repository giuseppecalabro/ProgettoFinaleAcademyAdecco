
import React from "react";
import { Route, Routes, NavLink, Link, HashRouter, BrowserRouter, MemoryRouter } from "react-router-dom";

// import Home from "./Home";
// import ChiSiamo from "./ChiSiamo";
// import Contatti from "./Contatti";

import "./MainNavigationRouter.css"
import Componente1 from "../Componente1/Componente1";
import Componente2 from "../Componente2/Componente2";
import Componente3 from "../Componente3/Componente3";

function MainNavigationRouter() {

    return (
        <MemoryRouter>
            <div>
                <h1>Prova Finale</h1>
                <ul className="header">
                    <li><Link to="/">Componente1</Link></li>
                    <li><Link to="/componente2">Componente2</Link></li>
                    <li><Link to="/componente3">Componente3</Link></li>
                </ul>
                <div className="content" style={{ backgroundColor: 'azure' }}>
                    <Routes>
                        <Route path="/" element={<Componente1 />} />
                        <Route path="/componente2" element={<Componente2 />} />
                        <Route path="/componente3" element={<Componente3 />} />
                    </Routes>
                </div>
            </div>
        </MemoryRouter>
    );
}


export default MainNavigationRouter;