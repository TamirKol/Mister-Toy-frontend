import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Provider } from 'react-redux'
// import './assets/style/main.css'
import './assets/style/scss/main.scss'

import { HomePage } from './pages/HomePage'
import { store } from '../src/store/store.js'

import { ToyDetails } from './pages/ToyDetails'
import { AppHeader } from './cmps/layout/AppHeader.jsx'
import { AppFooter } from './cmps/layout/AppFooter.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDashboard } from './pages/ToyDashboard.jsx'
import { About } from './pages/About.jsx'

export default function App() {
    return (
   
            <Router>
                <section className="main-layout app">
                <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<About />} path="/about" />
                            <Route element={< ToyDetails/>} path="/toy/:toyId" />
                            <Route element={< ToyIndex/>} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDashboard/>} path="/dashboard" />
                        </Routes>
                    </main>
                <AppFooter />
                </section>
            </Router>
   
    )
}