import { Link, Route, Routes } from 'react-router'
import HomePage from './pages/home'
import MessagesPage from './pages/messages'
import WeeklyChallengePage from './pages/weekly_challenge'
import WeeklyCallenderPage from './pages/weeklycallender'

const ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: '/messages', element: <MessagesPage /> },
  { path: '/weekly_challenge', element: <WeeklyChallengePage /> },
  { path: '/weeklycallender', element: <WeeklyCallenderPage /> },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="p-5 space-x-3 flex bg-base-300">
        <Link to="/">
          <button className="btn btn-ghost">Home</button>
        </Link>
        <Link to="/messages">
          <button className="btn btn-ghost">Chat Rooms</button>
        </Link>
        <Link to="/weekly_challenge">
          <button className="btn btn-ghost">Weekly Challenge</button>
        </Link>
        <Link to="/weeklycallender">
          <button className="btn btn-ghost">Calendar</button>
        </Link>
      </nav>
      <Routes>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}
