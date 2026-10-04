export default function HomePage() {
  return (
    <div className="flex-1 flex">
      <div className="bg-blue-500 w-1/2">
        <div className="h-1/3 bg-red-800">daily streak</div>
        <div className="h-1/3 bg-yellow-500">weekly challenge</div>
        <div className="h-1/3 bg-green-800">family friends</div>
      </div>
      <div className="bg-pink-500 w-1/2">
        <div className="h-2/3 bg-yellow-800">chat rooms</div>
        <div className="h-1/3 bg-green-800">calendar</div>
      </div>
    </div>
  );
}

// export default function HomePage() {

//     return (
//         <div className="">
//             <div className="text-6xl font-extrabold ">Welcome to Family Together!</div>
//             <div className="h-grid">
//                 <div className="first"> {/*Far Left (33%)*/}
//                     <div className="flex text-2xl font-bold border-2 border-red px-4 py-2 text-red-500">🔥 Daily Streak: 7🔥</div>
//                     <div className="flex text-2xl font-bold border-2 border-blue px-4 py -2 text-blue-600">👥 Family/Friends</div>
//                 </div>
//                 <div className="second"> {/*Middle (33%)*/}
//                     <a className="flex text-2xl font-bold border-2 border-cyan px-4 py-2" href="/messages">💬 Chatrooms!</a>
//                 </div>

//                 <div className="third"> {/*Far Right (33%)*/}
//                     <div className="flex border-2 border-green px-4 py-2 text-2xl font-bold text-green-500">🏆 Weekly Challenge</div>
//                 </div>
//             </div>
//         </div>
//     );
// }
