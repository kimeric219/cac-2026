export default function MessagesPage() {

    return (
        <div className="">
            <div className="hover:bg-purple-500/20 text-4xl font-bold flex border-2 border-green px-5 py-2 rounded-xl">Add New Friends➕</div>
            <div className="h-grid">
                <div className="messages">
                    <div className="hover:bg-purple-500/20 flex text-2xl font-bold text-white border-2 border-purple-300/20 rounded-xl px-10 py-2">🟢Mom - Don't Forget Dinner Tonight!</div>
                    <div className="hover:bg-purple-500/20 flex text-2xl font-bold text-white border-2 border-purple-300/20  rounded-xl px-10 py-2">🟢 Friend - Yo</div>
                    <a className="hover:bg-purple-500/20 flex text-2xl font-bold text-white border-2 border-purple-300/20  rounded-xl px-10 py-2" href="/messages">🟢 Dad - Everything Okay at home?</a>
                    <div className="hover:bg-purple-500/20 flex text-2xl font-bold text-white border-2 border-purple-300/20  rounded-xl px-10 py-2">🟢Brother - Clean your room</div>
                    <div className="hover:bg-purple-500/20 flex text-2xl font-bold text-green border-2 border-purple-300/20  rounded-xl px-10 py-2">🟢Family Chat: Mom - How's everything going?</div>

                </div>
                <div className=" text-4xl font-bold flex justify-center border-2 border-purple-300/20e px-5 py-2 rounded-xl">Current Conversation: Mom
                    <div className="text-2xl hover:bg-purple-500/20 flex font-bold text-white border-2 border-purple-300/20 rounded-xl px-1 py-0.5">Mom - Don't Forget Dinner Tonight!</div>
                    <div className="text-2xl hover:bg-purple-500/20 flex font-bold text-blue border-2 border-purple-300/20 rounded-xl px-1 py-0.5">You - Okay, I'll prepare chicken!</div>
                    <div className="text-2xl hover:bg-purple-500/20 flex font-bold text-white border-2 border-purple-300/20 rounded-xl px-1 py-0.5">Mom - I'll be home by 8pm.</div>
                    <div className="text-2xl hover:bg-purple-500/20 flex font-bold text-blue border-2 border-purple-300/20 rounded-xl px-1 py-0.5">You - I'll be done cooking dinner by then!</div>
                    <div className="text-xl hover:bg-purple-500/20 font-bold text-white border-1 border-purple-300/20 rounded-xl px-50 py-5">Type_Message_Here...</div>



                </div>


            </div>
        </div>
    );
}




