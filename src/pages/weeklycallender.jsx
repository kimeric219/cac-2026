import { useState } from 'react'
import initialTodos from '../data/todos.json'

const YEAR = 2026
const MONTH = 9 // October (months start at 0)
const DAYS = [
    ['Sun', 'Sunday'],
    ['Mon', 'Monday'],
    ['Tue', 'Tuesday'],
    ['Wed', 'Wednesday'],
    ['Thu', 'Thursday'],
    ['Fri', 'Friday'],
    ['Sat', 'Saturday'],
]

const firstWeekday = new Date(YEAR, MONTH, 1).getDay()

function getToday() {
    const now = new Date()
    return now.getFullYear() === YEAR && now.getMonth() === MONTH ? now.getDate() : null
}

const CELL_COLORS = {
    done: 'bg-green-500/40 hover:bg-green-500/60',
    missed: 'bg-red-500/30 hover:bg-red-500/50',
    today: 'bg-indigo-500/30 hover:bg-indigo-500/50',
    upcoming: 'bg-indigo-500/15 hover:bg-indigo-500/30',
}

export default function WeeklyCallenderPage() {
    const [today] = useState(getToday)
    const [todos, setTodos] = useState(initialTodos)
    const [selected, setSelected] = useState(today ?? 1)

    function statusOf(date) {
        if (today === null || date > today) return 'upcoming'
        if (todos[date - 1].done) return 'done'
        return date === today ? 'today' : 'missed'
    }

    function completeToday() {
        setTodos((prev) => prev.map((item, i) => (i === today - 1 ? { ...item, done: true } : item)))
    }

    const blanks = Array.from({ length: firstWeekday })
    const selectedTodo = todos[selected - 1]
    const selectedStatus = statusOf(selected)

    return (
        <div className="max-w-6xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
            <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold">October 2026 Family Calendar</div>
                <div className="text-lg font-bold opacity-60 mt-2">One thing to do together, every day</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
                <div className="border-3 border-cyan-400 rounded-3xl p-3 md:p-5">
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {DAYS.map(([short, long]) => (
                            <div key={long} className="font-bold text-center border border-green-500/60 rounded-xl py-2 text-xs md:text-sm">
                                <span className="md:hidden">{short}</span>
                                <span className="hidden md:inline">{long}</span>
                            </div>
                        ))}
                        {blanks.map((_, i) => (
                            <div key={`blank-${i}`} className="aspect-square rounded-md bg-indigo-500/10" />
                        ))}
                        {todos.map((_, i) => {
                            const date = i + 1
                            const status = statusOf(date)
                            const isSelected = date === selected
                            return (
                                <button
                                    key={date}
                                    onClick={() => setSelected(date)}
                                    className={`aspect-square rounded-md flex flex-col items-center justify-center font-bold md:text-lg ${CELL_COLORS[status]} ${isSelected ? 'border-4 border-purple-200' : ''} ${date === today ? 'outline-2 outline-offset-2 outline-cyan-400' : ''} ${status === 'upcoming' ? 'opacity-60' : ''}`}
                                >
                                    <span>{date}</span>
                                    {status === 'done' && <span className="text-green-300 leading-none">✓</span>}
                                    {status === 'missed' && <span className="text-red-300 leading-none">✗</span>}
                                </button>
                            )
                        })}
                    </div>
                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 mt-4 font-bold">
                        <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-500/40" />Done Together</div>
                        <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-500/30" />Incomplete</div>
                    </div>
                </div>

                <div className="border-2 border-green-500/60 rounded-xl p-5 flex flex-col gap-3">
                    <div>
                        <div className="text-sm font-bold opacity-60">
                            {new Date(YEAR, MONTH, selected).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}
                            {selected === today && ' · TODAY'}
                        </div>
                        <div className="text-3xl font-bold">October {selected}</div>
                    </div>

                    <div className="border-2 border-purple-300/20 rounded-xl px-4 py-3">
                        {selectedTodo.special && <div className="text-sm font-bold opacity-60">SPECIAL OCCASION</div>}
                        <div className="text-xl font-bold">{selectedTodo.todo}</div>
                    </div>

                    {selectedStatus === 'today' && (
                        <>
                            <button onClick={completeToday} className="btn btn-success btn-lg font-bold">Mark as complete</button>
                            <div className="text-sm font-bold opacity-60">Not done by tonight? It will be marked incomplete.</div>
                        </>
                    )}
                    {selectedStatus === 'done' && <div className="text-2xl font-bold text-green-400 bg-green-500/20 rounded-xl px-4 py-3 text-center">✓ Completed together!</div>}
                    {selectedStatus === 'missed' && <div className="text-2xl font-bold text-red-400 bg-red-500/20 rounded-xl px-4 py-3 text-center">✗ Incomplete</div>}
                    {selectedStatus === 'upcoming' && <div className="text-lg font-bold opacity-60">Upcoming. You can complete this on the day.</div>}
                </div>
            </div>
        </div>
    )
}
