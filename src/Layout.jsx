import { useState } from 'react'
import { Link, Route, Routes } from 'react-router'
import HomePage from './pages/home'
import TemplatePage from './pages/template'
import TemplateWithParamPage from './pages/template-with-param'

const ROUTES = [
  { path: "/", element: <HomePage /> },
  { path: "/template", element: <TemplatePage /> },
  { path: "/template/:v", element: <TemplateWithParamPage /> },
]

export default function Layout() {


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="p-5 space-x-3 flex bg-base-300">
        <Link to="/">
          <button className="btn btn-ghost">Home</button>
        </Link>
        <Link to="/template">
          <button className="btn btn-ghost">Template</button>
        </Link>
        <Link to="/template/test">
          <button className="btn btn-ghost">Template Parameter</button>
        </Link>
      </nav>
      {/* Main */}
      <Routes>
        {ROUTES.map((r) => <Route key={r.path} path={r.path} element={r.element} />)}
      </Routes>
      {/* Footer */}
      <div className="p-5 bg-base-300">Footer</div>
    </div>
  )
}
