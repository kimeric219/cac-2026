import { Link } from 'react-router'
import conversations from '../data/conversations.json'


export default function HomePage() {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="text-center">
        <div className="text-6xl font-extrabold">Welcome to Family Together!</div>
        <div className="text-xl font-bold opacity-60 mt-2">Stay close with the people who matter most 💜</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 border-2 border-red-500/60 bg-red-500/10 rounded-xl px-6 py-4">
          <div className="text-6xl">🔥</div>
          <div className="text-4xl font-bold text-red-500">Daily Streak</div>
        </div>
        <div className="flex items-center gap-4 border-2 border-blue-500/60 bg-blue-500/10 rounded-xl px-6 py-4">
          <div className="text-6xl">👥</div>
          <div>
            <div className="text-lg font-bold opacity-70">Family/Friends</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {conversations.map((person) => (
                <span key={person.name} className="text-lg font-bold text-blue-400 border-2 border-blue-500/40 rounded-full px-3">
                  🟢 {person.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/messages" className="flex flex-col gap-2 border-2 border-cyan-400/60 hover:bg-cyan-400/10 rounded-xl px-6 py-5">
          <div className="text-4xl font-bold">💬 Chatrooms!</div>
          <div className="text-lg font-bold opacity-70">Chat with your family & friends</div>
        </Link>

        <Link to="/weeklycallender" className="flex flex-col gap-2 border-2 border-blue-500/60 hover:bg-blue-500/10 rounded-xl px-6 py-5">
          <div className="text-4xl font-bold">📅 Calendar Plan!</div>
          <div className="text-lg font-bold opacity-70">October 2026 Family Calendar</div>
          <div className="text-xl font-bold">Plan your week together</div>
        </Link>

        <Link to="/weekly_challenge" className="flex flex-col gap-2 border-2 border-green-500/60 hover:bg-green-500/10 rounded-xl px-6 py-5">
          <div className="text-4xl font-bold text-green-500">🏆 Weekly Challenge</div>
          <div className="text-lg font-bold opacity-70">Complete Family Photo Album 2026</div>
        </Link>
      </div>
    </div>
  )
}
