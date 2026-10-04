import { useState } from 'react'
import { Link, Route, Routes } from 'react-router'
import HomePage from './pages/home'
import MessagesPage from './pages/messages'

const ROUTES = [
  { path: "/", element: <HomePage /> },
  { path: "/messages", element: <MessagesPage /> },
]

export default function Layout() {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="p-5 space-x-3 flex bg-base-300">
        <Link to="/">
          <button className="btn btn-ghost">Home</button>
        </Link>

        <Link to="/messages">
          <button className="border border-black rounded-md px-4 py-2">
            Messages
          </button>
        </Link>

        <Link to="/daily_streak">
          <button className="btn btn-ghost">Daily Streak</button>
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
