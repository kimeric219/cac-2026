import { useEffect, useRef, useState } from 'react'
import initialConversations from '../data/conversations.json'

const REPLIES = ['Okay!', 'Sounds good 👍', 'Haha', 'Really?', 'Talk later!', '❤️', 'Got it.']

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function membersOf(convo) {
    return [...new Set(convo.messages.map((msg) => msg.from))].filter((from) => from !== 'You')
}

export default function MessagesPage() {
    const [conversations, setConversations] = useState(initialConversations)
    const [currentName, setCurrentName] = useState(initialConversations[0].name)
    const [draft, setDraft] = useState('')
    const [typing, setTyping] = useState({}) // chat name -> who is typing
    const messagesBox = useRef(null)

    const current = conversations.find((convo) => convo.name === currentName)
    const isGroup = membersOf(current).length > 1

    useEffect(() => {
        messagesBox.current.scrollTop = messagesBox.current.scrollHeight
    }, [current.messages.length, currentName, typing])

    function addMessage(name, message) {
        setConversations((prev) =>
            prev.map((convo) =>
                convo.name === name ? { ...convo, messages: [...convo.messages, message] } : convo
            )
        )
    }

    function send() {
        const text = draft.trim()
        if (!text) return
        addMessage(currentName, { from: 'You', text })
        setDraft('')

        // fake reply from someone else in the chat
        const from = pickRandom(membersOf(current)) ?? currentName
        const reply = pickRandom(REPLIES)
        const name = currentName
        setTyping((prev) => ({ ...prev, [name]: from }))
        setTimeout(() => {
            addMessage(name, { from, text: reply })
            setTyping((prev) => ({ ...prev, [name]: null }))
        }, 1500)
    }

    return (
        <div className="max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
                <div className="text-3xl md:text-4xl font-bold">Chat Rooms 💬</div>
                <button className="btn btn-outline border-2 border-cyan-400/60 text-cyan-300 hover:bg-cyan-400/10 rounded-xl font-bold">Add New Friends➕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:h-[70vh]">
                <div className="flex flex-col gap-2 border-2 border-purple-300/20 rounded-xl p-2 overflow-y-auto">
                    {conversations.map((convo) => {
                        const last = convo.messages[convo.messages.length - 1]
                        const selected = convo.name === currentName
                        return (
                            <button
                                key={convo.name}
                                onClick={() => setCurrentName(convo.name)}
                                className={`flex items-center gap-3 text-left rounded-xl px-3 py-2 border-2 ${selected ? 'bg-purple-500/30 border-purple-300' : 'border-transparent hover:bg-purple-500/20'}`}
                            >
                                <div className="relative shrink-0 w-11 h-11 rounded-full bg-purple-500/40 flex items-center justify-center text-lg font-bold text-white">
                                    {convo.name[0]}
                                    <span className="absolute -bottom-0.5 -right-0.5 text-[10px]">🟢</span>
                                </div>
                                <div className="min-w-0">
                                    <div className="text-lg font-bold text-white">{convo.name}</div>
                                    <div className="text-sm font-bold opacity-60 truncate">
                                        {typing[convo.name] ? 'typing...' : `${last.from === 'You' ? 'You: ' : ''}${last.text}`}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <div className="flex flex-col border-2 border-purple-300/20 rounded-xl min-h-[60vh] md:min-h-0">
                    <div className="flex items-center gap-3 px-5 py-3 border-b-2 border-purple-300/20">
                        <div className="w-10 h-10 rounded-full bg-purple-500/40 flex items-center justify-center font-bold text-white">{current.name[0]}</div>
                        <div>
                            <div className="text-xl font-bold">{current.name}</div>
                            <div className="text-xs font-bold opacity-60">{isGroup ? membersOf(current).join(', ') + ', You' : '🟢 Online'}</div>
                        </div>
                    </div>

                    <div ref={messagesBox} className="flex-1 overflow-y-auto flex flex-col gap-2 px-5 py-4">
                        {current.messages.map((msg, i) => {
                            const mine = msg.from === 'You'
                            return (
                                <div key={i} className={`max-w-[75%] ${mine ? 'self-end text-right' : 'self-start'}`}>
                                    {isGroup && !mine && <div className="text-xs font-bold opacity-60 ml-2 mb-0.5">{msg.from}</div>}
                                    <div className={`inline-block text-left text-lg font-bold rounded-2xl px-4 py-2 ${mine ? 'bg-purple-500/50 text-white rounded-br-sm' : 'bg-base-300 text-white rounded-bl-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            )
                        })}
                        {typing[currentName] && (
                            <div className="self-start text-sm font-bold opacity-60 ml-2">{typing[currentName]} is typing...</div>
                        )}
                    </div>

                    <form className="flex gap-2 p-3 border-t-2 border-purple-300/20" onSubmit={(e) => { e.preventDefault(); send() }}>
                        <input
                            className="flex-1 min-w-0 text-lg font-bold text-white border-2 border-purple-300/20 focus:border-purple-300 outline-none rounded-xl px-4 py-3 bg-transparent"
                            placeholder="Type_Message_Here..."
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                        />
                        <button type="submit" className="btn h-auto bg-purple-500/40 hover:bg-purple-500/60 border-2 border-purple-300/40 text-white font-bold rounded-xl px-5">SEND📨</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
