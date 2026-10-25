export default function HomePage() {
  return (
    <div className="">
      <div className="text-6xl font-extrabold">Welcome to Family Together!</div>
      <div className="h-grid">
        <div className="first">
          <div className="flex text-4xl font-bold border-2 border-red px-4 py-2 text-red-500">
            🔥 Daily Streak: 7🔥
          </div>
          <div className="flex text-4xl font-bold border-2 border-blue px-4 py-2 text-blue-600">
            👥 Family/Friends
          </div>
        </div>
        <div className="second">
          <a className="flex text-4xl font-bold border-2 border-cyan px-4 py-2" href="/messages">
            💬 Chatrooms!
          </a>
          <a className="flex text-4xl font-bold border-2 border-blue px-4 py-2" href="/weeklycallender">
            📅 Calendar Plan!
          </a>
        </div>
        <div className="third">
          <a className="flex border-2 border-green px-4 py-2 text-4xl font-bold text-green-500" href="/weekly_challenge">
            🏆 Weekly Challenge
          </a>
        </div>
      </div>
    </div>
  )
}
