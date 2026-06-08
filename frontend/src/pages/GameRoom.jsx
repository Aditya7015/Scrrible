// import {
//   useContext,
//   useEffect,
//   useState
// } from "react";

// import socket from "../socket/socket";

// import { GameContext }
// from "../context/GameContext";

// import Canvas from "../components/Canvas";
// import Chat from "../components/Chat";
// import PlayerList from "../components/PlayerList";
// import ScoreBoard from "../components/ScoreBoard";
// import WordSelection from "../components/WordSelection";

// import {
//   Users,
//   Timer,
//   Crown,
//   Wifi,
//   Gamepad2,
//   Trophy,
//   Layers
// } from "lucide-react";

// function GameRoom() {

//   const [roomLoaded, setRoomLoaded] = useState(false);
//   const [hint,setHint] = useState("");
//   const {
//     roomId,
    
//     players,
//     setPlayers,

//     timer,
//     setTimer,

//     word,
//     setWord,

//     playerName
//   } = useContext(GameContext);

//   // =========================
//   // STATES
//   // =========================
//   const [drawer,
//     setDrawer] =
//     useState("");

//   const [
//     currentDrawerId,
//     setCurrentDrawerId
//   ] = useState("");

//   const [connected,
//     setConnected] =
//     useState(false);

//   const [round,
//     setRound] =
//     useState(1);

//   const [maxRounds,
//     setMaxRounds] =
//     useState(5);

//   const [wordChoices,
//     setWordChoices] =
//     useState([]);

//   const [gameEnded,
//     setGameEnded] =
//     useState(false);

//   const [winner,
//     setWinner] =
//     useState(null);

//   const [leaderboard,
//     setLeaderboard] =
//     useState([]);

//   // =========================
//   // PLAYER ROLES
//   // =========================
//   // const isDrawer =
//   //   socket.id ===
//   //   currentDrawerId;

//   const isDrawer =
//   socket.id === currentDrawerId;
  

//     console.log("drawer",isDrawer,"socket.id",socket.id,"currentDrawerId",currentDrawerId);

//   const isHost =
//     players[0]?.name ===
//     playerName;

//   // =========================
//   // SOCKET EVENTS
//   // =========================
//  useEffect(() => {

//   // REMOVE OLD LISTENERS FIRST
//   socket.off("connect");
//   socket.off("disconnect");
//   socket.off("players");
//   socket.off("timerUpdate");
//   socket.off("yourTurn");
//   socket.off("newDrawer");
//   socket.off("wordChoices");
//   socket.off("wordSelected");
//   socket.off("clearWord");
//   socket.off("roundUpdate");
//   socket.off("gameEnded");

//   setConnected(socket.connected);

//   // CONNECT
//   const onConnect = () => {

//     setConnected(true);

//     console.log(
//       "CONNECTED:",
//       socket.id
//     );

//   };

//   // DISCONNECT
//   const onDisconnect = () => {

//     setConnected(false);

//   };

//   // PLAYERS
//   const onPlayers = (
//     updatedPlayers
//   ) => {

//     console.log(
//       "PLAYERS:",
//       updatedPlayers
//     );

//     setPlayers(
//       updatedPlayers
//     );

//     setRoomLoaded(true);

//   };

//   // TIMER
//   const onTimerUpdate = ({
//     time,
//     hint
//   }) => {

//     setTimer(time);

//     setHint(hint);

//   };

//   // YOUR TURN
//   const onYourTurn = (
//     newWord
//   ) => {

//     console.log(
//       "YOUR TURN",
//       newWord
//     );

//     setWord(newWord);

//   };

//   // NEW DRAWER
//   const onNewDrawer = ({
//     name,
//     id
//   }) => {

//     console.log(
//       "NEW DRAWER:",
//       name,
//       id
//     );

//     setDrawer(name);

//     setCurrentDrawerId(id);

//   };

//   // WORD CHOICES
//   const onWordChoices = (
//     choices
//   ) => {

//     console.log(
//       "WORD CHOICES:",
//       choices
//     );

//     setWordChoices(
//       choices
//     );

//   };

//   // WORD SELECTED
//   const onWordSelected = () => {

//     setWordChoices([]);

//   };

//   // CLEAR WORD
//   const onClearWord = () => {

//     setWord("");

//     setWordChoices([]);

//   };

//   // ROUND UPDATE
//   const onRoundUpdate = ({
//     currentRound,
//     maxRounds
//   }) => {

//     setRound(currentRound);

//     setMaxRounds(maxRounds);

//   };

//   // GAME ENDED
//   const onGameEnded = (
//     data
//   ) => {

//     setGameEnded(true);

//     setWinner(data.winner);

//     setLeaderboard(
//       data.leaderboard
//     );

//   };

//   // REGISTER LISTENERS
//   socket.on("connect", onConnect);

//   socket.on(
//     "disconnect",
//     onDisconnect
//   );

//   socket.on(
//     "players",
//     onPlayers
//   );

//   socket.on(
//     "timerUpdate",
//     onTimerUpdate
//   );

//   socket.on(
//     "yourTurn",
//     onYourTurn
//   );

//   // socket.on(
//   //   "newDrawer",
//   //   onNewDrawer
//   // );

//   socket.on(
//   "newDrawer",
//   ({
//     name,
//     id
//   }) => {
    
//      console.log(
//       "NEW DRAWER EVENT:",
//       name,
//       id
//     );
//     setDrawer(name);

//     setCurrentDrawerId(id);

//     // IMPORTANT
//     setWord("");

//     setWordChoices([]);

//   }
// );

//   socket.on(
//     "wordChoices",
//     onWordChoices
//   );

//   socket.on(
//     "wordSelected",
//     onWordSelected
//   );

//   socket.on(
//     "clearWord",
//     onClearWord
//   );

//   socket.on(
//     "roundUpdate",
//     onRoundUpdate
//   );

//   socket.on(
//     "gameEnded",
//     onGameEnded
//   );

//   return () => {

//     socket.off(
//       "connect",
//       onConnect
//     );

//     socket.off(
//       "disconnect",
//       onDisconnect
//     );

//     socket.off(
//       "players",
//       onPlayers
//     );

//     socket.off(
//       "timerUpdate",
//       onTimerUpdate
//     );

//     socket.off(
//       "yourTurn",
//       onYourTurn
//     );

//     socket.off(
//       "newDrawer",
//       onNewDrawer
//     );

//     socket.off(
//       "wordChoices",
//       onWordChoices
//     );

//     socket.off(
//       "wordSelected",
//       onWordSelected
//     );

//     socket.off(
//       "clearWord",
//       onClearWord
//     );

//     socket.off(
//       "roundUpdate",
//       onRoundUpdate
//     );

//     socket.off(
//       "gameEnded",
//       onGameEnded
//     );

//   };

// }, []);

//   // =========================
//   // START GAME
//   // =========================
//   const startGame = () => {

//     setGameEnded(false);

//     socket.emit(
//       "startGame",
//       roomId
//     );

//   };

  
  

//   // =========================
//   // GAME OVER SCREEN
//   // =========================
//   if (gameEnded) {

//     return (

//       <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">

//         <div className="card bg-base-100 shadow-2xl border border-base-300 w-full max-w-2xl">

//           <div className="card-body">

//             {/* TITLE */}
//             <div className="text-center mb-8">

//               <div className="inline-flex p-5 rounded-full bg-warning text-warning-content mb-5">

//                 <Trophy size={60} />

//               </div>

//               <h1 className="text-5xl font-black">

//                 Game Over

//               </h1>

//               <p className="opacity-70 mt-3">

//                 Winner of this match

//               </p>

//             </div>

//             {/* WINNER */}
//             <div className="text-center mb-8">

//               <div className="text-4xl font-black text-primary">

//                 🏆 {winner?.name}

//               </div>

//               <div className="text-xl mt-2 opacity-70">

//                 Score: {winner?.score}

//               </div>

//             </div>

//             {/* LEADERBOARD */}
//             <div>

//               <h2 className="text-2xl font-bold mb-5">

//                 Leaderboard

//               </h2>

//               <div className="space-y-3">

//                 {
//                   leaderboard.map(
//                     (player, index) => (

//                       <div
//                         key={player.id}
//                         className="flex items-center justify-between bg-base-200 rounded-2xl px-5 py-4"
//                       >

//                         <div className="flex items-center gap-4">

//                           <div className="text-2xl font-black">

//                             #{index + 1}

//                           </div>

//                           <div className="font-bold text-lg">

//                             {player.name}

//                           </div>

//                         </div>

//                         <div className="badge badge-primary badge-lg">

//                           {player.score}

//                         </div>

//                       </div>

//                     )
//                   )
//                 }

//               </div>

//               {/* PLAY AGAIN */}
//               {
//                 isHost && (

//                   <button
//                     className="btn btn-primary btn-lg rounded-2xl w-full mt-8"
//                     onClick={startGame}
//                   >

//                     Play Again

//                   </button>

//                 )
//               }

//             </div>

//           </div>

//         </div>

//       </div>

//     );

//   }

//   return (

//     <div className="min-h-screen bg-base-200 overflow-x-hidden relative">

//       {
//   roomLoaded &&
//   players.length < 2 && (

//     <div className="absolute inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

//       <div className="card bg-base-100 shadow-2xl border border-base-300 w-full max-w-lg">

//         <div className="card-body text-center">

//           <div className="text-7xl mb-5">

//             🎮

//           </div>

//           <h1 className="text-4xl font-black">

//             Waiting for Players

//           </h1>

//           <p className="opacity-70 mt-3 text-lg">

//             Minimum 2 players required

//           </p>

//           <div className="badge badge-primary badge-lg mt-6 p-4">

//             Room: {roomId}

//           </div>

//         </div>

//       </div>

//     </div>

//   )
// }

//       {/* HEADER */}
//       <div className="sticky top-0 z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-300 shadow-md">

//         <div className="max-w-[1800] mx-auto px-4 py-3">

//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//             {/* LEFT */}
//             <div className="flex flex-col gap-2">

//               <div className="flex items-center gap-3">

//                 <div className="p-3 rounded-2xl bg-primary text-primary-content shadow-lg">

//                   <Gamepad2 size={28} />

//                 </div>

//                 <div>

//                   <h1 className="text-2xl sm:text-4xl font-black">

//                     Skribbl Clone

//                   </h1>

//                   <p className="text-sm opacity-70">

//                     Realtime Multiplayer Drawing Game

//                   </p>

//                 </div>

//               </div>

//               {/* BADGES */}
//               <div className="flex flex-wrap gap-2 mt-1">

//                 <div className="badge badge-primary badge-lg p-4">

//                   Room: {roomId}

//                 </div>

//                 <div
//                   className={`badge badge-lg p-4 ${
//                     connected
//                       ? "badge-success"
//                       : "badge-error"
//                   }`}
//                 >

//                   <Wifi size={14} />

//                   {
//                     connected
//                       ? "Connected"
//                       : "Disconnected"
//                   }

//                 </div>

//               </div>

//             </div>

//             {/* RIGHT */}
//             <div className="flex flex-wrap gap-3">

//               {/* TIMER */}
//               <div className="stat bg-base-100 rounded-3xl shadow-lg border border-base-300 w-[140px]">

//                 <div className="stat-title flex items-center gap-2">

//                   <Timer size={16} />

//                   Timer

//                 </div>

//                 <div className="stat-value text-primary text-4xl">

//                   {timer}

//                 </div>

//               </div>

//               {/* PLAYERS */}
//               <div className="stat bg-base-100 rounded-3xl shadow-lg border border-base-300 w-[140px]">

//                 <div className="stat-title flex items-center gap-2">

//                   <Users size={16} />

//                   Players

//                 </div>

//                 <div className="stat-value text-secondary text-4xl">

//                   {players.length}

//                 </div>

//               </div>

//               {/* ROUND */}
//               <div className="stat bg-base-100 rounded-3xl shadow-lg border border-base-300 w-[140px]">

//                 <div className="stat-title flex items-center gap-2">

//                   <Layers size={16} />

//                   Round

//                 </div>

//                 <div className="stat-value text-accent text-4xl">

//                   {round}/{maxRounds}

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* MAIN */}
//       <div className="max-w-[1800p] mx-auto p-4">

//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

//           {/* LEFT SIDEBAR */}
//           <div className="xl:col-span-3 flex flex-col gap-5">

//             {/* DRAWER */}
//             <div className="card bg-base-100 shadow-2xl border border-base-300">

//               <div className="card-body">

//                 <div className="flex items-center gap-2">

//                   <Crown className="text-warning" />

//                   <h2 className="card-title">

//                     Current Drawer

//                   </h2>

//                 </div>

//                 <div className="mt-2 text-2xl font-black text-primary break-words">

//                   {drawer || "Waiting..."}

//                 </div>

//               </div>

//             </div>

//             {/* START BUTTON */}
//             {
//               isHost &&
//               players.length >= 2 &&
//               !gameEnded && (

//                 <button
//                   className="btn btn-primary btn-lg rounded-2xl"
//                   onClick={startGame}
//                 >

//                   Start Game

//                 </button>

//               )
//             }

//             {/* WORD */}
//             <div className="card bg-base-100 shadow-2xl border border-base-300">

//               <div className="card-body">

//                 {
//   !isDrawer &&
//   hint && (

//     <div className="card bg-base-100 shadow-xl border border-base-300">

//       <div className="card-body">

//         <h2 className="font-bold text-lg">

//           Hint

//         </h2>

//         <div className="text-3xl font-black tracking-widest text-primary">

//           {hint}

//         </div>

//       </div>

//     </div>

//   )
// }

//                 <WordSelection
                
//                   word={
//                     isDrawer
//                       ? word
//                       : ""
//                   }
//                   wordChoices={
//                     wordChoices
//                   }
//                   roomId={roomId}
//                 />

//               </div>

//             </div>

//             {/* PLAYERS */}
//             <div className="card bg-base-100 shadow-2xl border border-base-300">

//               <div className="card-body">

//                 <PlayerList
//                   players={players}
//                 />

//               </div>

//             </div>

//             {/* SCOREBOARD */}
//             <div className="card bg-base-100 shadow-2xl border border-base-300">

//               <div className="card-body">

//                 <ScoreBoard
//                   players={players}
//                 />

//               </div>

//             </div>

//           </div>

//           {/* CANVAS */}
//           <div className="xl:col-span-6">

//             <div className="card bg-base-100 shadow-2xl border border-base-300 h-full">

//               <div className="card-body p-2 sm:p-4">

//                 <Canvas
//                   roomId={roomId}
//                   isDrawer={isDrawer}
//                 />

//               </div>

//             </div>

//           </div>

//           {/* CHAT */}
//           <div className="xl:col-span-3">

//             <div className="card bg-base-100 shadow-2xl border border-base-300 h-full min-h-[500px]">

//               <div className="card-body h-full flex flex-col">

//                 <Chat
//                   roomId={roomId}
//                   isDrawer={isDrawer}
//                 />

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default GameRoom;


import {
  useContext,
  useEffect,
  useState
} from "react";

import socket from "../socket/socket";

import { GameContext } from "../context/GameContext";

import Canvas from "../components/Canvas";
import Chat from "../components/Chat";
import PlayerList from "../components/PlayerList";
import ScoreBoard from "../components/ScoreBoard";
import WordSelection from "../components/WordSelection";

import {
  Users,
  Timer,
  Crown,
  Wifi,
  Gamepad2,
  Trophy,
  Layers,
  Zap,
  Sparkles,
  Palette,
  Brush,
  Flame,
  Skull,
  Star,
  Radar,
  Activity
} from "lucide-react";

function GameRoom() {

  const [roomLoaded, setRoomLoaded] = useState(false);
  const [hint, setHint] = useState("");
  const {
    roomId,
    players,
    setPlayers,
    timer,
    setTimer,
    word,
    setWord,
    playerName
  } = useContext(GameContext);

  // =========================
  // STATES
  // =========================
  const [drawer, setDrawer] = useState("");
  const [currentDrawerId, setCurrentDrawerId] = useState("");
  const [connected, setConnected] = useState(false);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(5);
  const [wordChoices, setWordChoices] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [particles, setParticles] = useState([]);

  // =========================
  // PLAYER ROLES
  // =========================
  const isDrawer = socket.id === currentDrawerId;
  const isHost = players[0]?.name === playerName;

  // Particle effect for timer
  useEffect(() => {
    if (timer <= 10 && timer > 0) {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 0.5
        });
      }
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 1000);
    }
  }, [timer]);

  // =========================
  // SOCKET EVENTS
  // =========================
  useEffect(() => {

    socket.off("connect");
    socket.off("disconnect");
    socket.off("players");
    socket.off("timerUpdate");
    socket.off("yourTurn");
    socket.off("newDrawer");
    socket.off("wordChoices");
    socket.off("wordSelected");
    socket.off("clearWord");
    socket.off("roundUpdate");
    socket.off("gameEnded");

    setConnected(socket.connected);

    const onConnect = () => {
      setConnected(true);
      console.log("CONNECTED:", socket.id);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    const onPlayers = (updatedPlayers) => {
      console.log("PLAYERS:", updatedPlayers);
      setPlayers(updatedPlayers);
      setRoomLoaded(true);
    };

    const onTimerUpdate = ({ time, hint }) => {
      setTimer(time);
      setHint(hint);
    };

    const onYourTurn = (newWord) => {
      console.log("YOUR TURN", newWord);
      setWord(newWord);
    };

    const onNewDrawer = ({ name, id }) => {
      console.log("NEW DRAWER EVENT:", name, id);
      setDrawer(name);
      setCurrentDrawerId(id);
      setWord("");
      setWordChoices([]);
    };

    const onWordChoices = (choices) => {
      console.log("WORD CHOICES:", choices);
      setWordChoices(choices);
    };

    const onWordSelected = () => {
      setWordChoices([]);
    };

    const onClearWord = () => {
      setWord("");
      setWordChoices([]);
    };

    const onRoundUpdate = ({ currentRound, maxRounds }) => {
      setRound(currentRound);
      setMaxRounds(maxRounds);
    };

    const onGameEnded = (data) => {
      setGameEnded(true);
      setWinner(data.winner);
      setLeaderboard(data.leaderboard);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("players", onPlayers);
    socket.on("timerUpdate", onTimerUpdate);
    socket.on("yourTurn", onYourTurn);
    socket.on("newDrawer", onNewDrawer);
    socket.on("wordChoices", onWordChoices);
    socket.on("wordSelected", onWordSelected);
    socket.on("clearWord", onClearWord);
    socket.on("roundUpdate", onRoundUpdate);
    socket.on("gameEnded", onGameEnded);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("players", onPlayers);
      socket.off("timerUpdate", onTimerUpdate);
      socket.off("yourTurn", onYourTurn);
      socket.off("newDrawer", onNewDrawer);
      socket.off("wordChoices", onWordChoices);
      socket.off("wordSelected", onWordSelected);
      socket.off("clearWord", onClearWord);
      socket.off("roundUpdate", onRoundUpdate);
      socket.off("gameEnded", onGameEnded);
    };
  }, []);

  // =========================
  // START GAME
  // =========================
  const startGame = () => {
    setGameEnded(false);
    socket.emit("startGame", roomId);
  };

  // =========================
  // GAME OVER SCREEN - CRAZY VERSION
  // =========================
  if (gameEnded) {
    return (
      <div className="min-h-screen bg-black overflow-hidden relative">
        {/* Insane Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#ff006620,transparent_50%),radial-gradient(circle_at_80%_70%,#00ffcc20,transparent_50%),radial-gradient(circle_at_50%_50%,#ff00ff20,transparent_60%)]"></div>
          <div className="absolute top-10 left-10 text-red-500/20 animate-ping"><Skull size={80} /></div>
          <div className="absolute bottom-10 right-10 text-cyan-500/20 animate-spin-slow"><Flame size={100} /></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
        </div>

        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            >
              <Star size={20} className={`text-${['cyan', 'purple', 'pink', 'yellow'][i % 4]}-400`} />
            </div>
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-black/40 backdrop-blur-3xl border-2 border-cyan-500/50 rounded-[60px] p-10 shadow-[0_0_100px_rgba(0,255,255,0.3),0_0_50px_rgba(255,0,255,0.2)] animate-border-pulse">
            <div className="text-center mb-8">
              <div className="inline-flex p-8 rounded-[50px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mb-6 shadow-[0_0_80px_rgba(168,85,247,0.8)] animate-bounce-slow">
                <Trophy size={80} className="text-white animate-spin-slow" />
              </div>
              <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glitch">
                GAME OVER
              </h1>
              <p className="text-cyan-300 mt-3 text-lg animate-pulse">Champion of this battle</p>
            </div>

            {/* WINNER - CRAZY STYLE */}
            <div className="text-center mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"></div>
              <div className="relative text-5xl font-black text-yellow-400 animate-rainbow">
                👑 {winner?.name} 👑
              </div>
              <div className="text-2xl text-cyan-300 mt-3">
                Score: <span className="text-4xl font-bold text-pink-400">{winner?.score}</span>
              </div>
            </div>

            {/* LEADERBOARD - CRAZY STYLE */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ⚡ LEGENDARY LEADERBOARD ⚡
              </h2>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className="group relative flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-2xl px-6 py-4 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/10 group-hover:translate-x-full transition-transform duration-500"></div>
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl font-black ${index === 0 ? 'text-yellow-400 animate-pulse' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-600' : 'text-cyan-400'}`}>
                        {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </div>
                      <div className="font-bold text-xl text-white">
                        {player.name}
                      </div>
                    </div>
                    <div className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                      {player.score}
                    </div>
                  </div>
                ))}
              </div>

              {/* PLAY AGAIN BUTTON - CRAZY STYLE */}
              {isHost && (
                <button
                  className="relative w-full mt-10 h-16 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 font-black text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(168,85,247,0.6)] overflow-hidden group"
                  onClick={startGame}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Flame size={24} className="animate-pulse" />
                  PLAY AGAIN - BATTLE ROYALE
                  <Zap size={24} className="animate-pulse" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* INSANE BACKGROUND EFFECTS */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#ff006630,transparent_50%),radial-gradient(circle_at_80%_70%,#00ffcc30,transparent_50%),radial-gradient(circle_at_40%_80%,#ff00ff30,transparent_50%)]"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-scroll"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-10 left-10 text-cyan-500/20 animate-float-slow"><Palette size={120} /></div>
        <div className="absolute bottom-20 right-20 text-purple-500/20 animate-float-medium"><Brush size={140} /></div>
        <div className="absolute top-40 right-40 text-pink-500/20 animate-float-fast"><Skull size={80} /></div>
        <div className="absolute bottom-40 left-40 text-yellow-500/20 animate-float-slow"><Flame size={100} /></div>
        <div className="absolute top-1/2 left-10 text-cyan-500/10 animate-pulse"><Radar size={60} /></div>
        <div className="absolute top-1/2 right-10 text-purple-500/10 animate-spin-slow"><Activity size={60} /></div>
        
        {/* Neon Lines */}
        <div className="absolute top-20 left-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan"></div>
        <div className="absolute bottom-20 right-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-scan-reverse"></div>
      </div>

      {/* WAITING FOR PLAYERS OVERLAY - CRAZY STYLE */}
      {roomLoaded && players.length < 2 && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="relative bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl border-2 border-cyan-500/50 rounded-[60px] p-10 max-w-lg w-full text-center animate-border-pulse">
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-cyan-500 rounded-full blur-3xl animate-ping"></div>
            <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-pink-500 rounded-full blur-3xl animate-ping delay-700"></div>
            <div className="text-8xl mb-5 animate-bounce">🎮</div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glitch">
              LOADING PLAYERS
            </h1>
            <p className="text-cyan-300 mt-3 text-lg animate-pulse">Minimum 2 players required to start the battle</p>
            <div className="mt-8 inline-flex px-8 py-4 rounded-full bg-black/50 border-2 border-cyan-500 text-cyan-300 font-mono text-xl font-bold shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              🔥 ROOM: {roomId} 🔥
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HEADER - CRAZY STYLE */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b-2 border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
        <div className="max-w-[1800px] mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* LEFT */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl animate-pulse"></div>
                  <div className="relative p-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(0,255,255,0.5)] animate-rotate-slow">
                    <Gamepad2 size={28} className="text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer">
                    SKETCH ARENA • BATTLE ROYALE
                  </h1>
                  <p className="text-sm text-cyan-300 animate-pulse">
                    ⚡ Realtime Multiplayer Drawing Warfare ⚡
                  </p>
                </div>
              </div>

              {/* BADGES - CRAZY STYLE */}
              <div className="flex flex-wrap gap-2 mt-1">
                <div className="relative px-5 py-2 rounded-full bg-black/50 border-2 border-cyan-500 text-cyan-300 text-sm font-mono font-bold shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                  🔑 ROOM: {roomId}
                </div>
                <div className={`px-5 py-2 rounded-full border-2 flex items-center gap-2 text-sm font-bold ${connected ? 'border-green-500 text-green-400 shadow-[0_0_15px_rgba(0,255,0,0.3)] bg-green-500/10' : 'border-red-500 text-red-400 shadow-[0_0_15px_rgba(255,0,0,0.3)] bg-red-500/10'}`}>
                  <Wifi size={14} />
                  {connected ? "ONLINE • READY" : "OFFLINE • RECONNECTING"}
                  {connected && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1"></div>}
                </div>
              </div>
            </div>

            {/* RIGHT STATS - CRAZY STYLE */}
            <div className="flex flex-wrap gap-3">
              {/* TIMER */}
              <div className={`relative bg-black/50 backdrop-blur-xl border-2 rounded-2xl px-5 py-3 min-w-[130px] transition-all ${timer <= 10 ? 'border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.5)] animate-shake' : 'border-cyan-500/50 hover:border-cyan-500'}`}>
                {timer <= 10 && particles.map(p => (
                  <div key={p.id} className="absolute w-1 h-1 bg-red-500 rounded-full animate-particle" style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.delay}s` }}></div>
                ))}
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Timer size={14} className={`${timer <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />
                  TIME LEFT
                </div>
                <div className={`text-4xl font-bold ${timer <= 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                  {timer}s
                </div>
              </div>

              {/* PLAYERS */}
              <div className="bg-black/50 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl px-5 py-3 min-w-[130px] hover:border-purple-500 hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition-all">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Users size={14} className="text-purple-400" />
                  WARRIORS
                </div>
                <div className="text-4xl font-bold text-purple-400">
                  {players.length}
                </div>
              </div>

              {/* ROUND */}
              <div className="bg-black/50 backdrop-blur-xl border-2 border-pink-500/50 rounded-2xl px-5 py-3 min-w-[130px] hover:border-pink-500 hover:shadow-[0_0_20px_rgba(255,0,128,0.3)] transition-all">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Layers size={14} className="text-pink-400" />
                  BATTLE
                </div>
                <div className="text-4xl font-bold text-pink-400">
                  {round}/{maxRounds}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1800px] mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* LEFT SIDEBAR - CRAZY STYLE */}
          <div className="xl:col-span-3 flex flex-col gap-5">
            {/* CURRENT DRAWER */}
            <div className="group relative bg-black/40 backdrop-blur-2xl border-2 border-cyan-500/30 rounded-[32px] p-6 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center gap-2 mb-4">
                <Crown size={24} className="text-yellow-400 animate-pulse" />
                <h2 className="font-black text-white text-lg tracking-wider">🎨 CURRENT ARTIST</h2>
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent break-words animate-text-shimmer">
                {drawer || "⚡ LOADING..."}
              </div>
              {drawer && <div className="mt-2 text-xs text-cyan-400 animate-pulse">🎭 Drawing Masterpiece</div>}
            </div>

            {/* START BUTTON - CRAZY STYLE */}
            {isHost && players.length >= 2 && !gameEnded && (
              <button
                className="relative w-full h-16 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 font-black text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_60px_rgba(168,85,247,0.6)] overflow-hidden group animate-pulse-slow"
                onClick={startGame}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Zap size={24} className="animate-spin-slow" />
                ⚡ INITIATE BATTLE ⚡
                <Flame size={24} className="animate-pulse" />
              </button>
            )}

            {/* WORD SELECTION / HINT - CRAZY STYLE */}
            <div className="bg-black/40 backdrop-blur-2xl border-2 border-purple-500/30 rounded-[32px] p-6 hover:border-purple-500 transition-all">
              {!isDrawer && hint && (
                <div className="mb-6 p-5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-6xl opacity-10 animate-pulse">💡</div>
                  <h2 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
                    <Sparkles size={18} /> MYSTERY HINT
                  </h2>
                  <div className="text-3xl font-black tracking-[0.2em] text-white animate-pulse">
                    {hint}
                  </div>
                </div>
              )}
              <WordSelection
                word={isDrawer ? word : ""}
                wordChoices={wordChoices}
                roomId={roomId}
              />
            </div>

            {/* PLAYERS LIST */}
            <div className="bg-black/40 backdrop-blur-2xl border-2 border-pink-500/30 rounded-[32px] p-6 hover:border-pink-500 transition-all">
              <PlayerList players={players} />
            </div>

            {/* SCOREBOARD */}
            <div className="bg-black/40 backdrop-blur-2xl border-2 border-yellow-500/30 rounded-[32px] p-6 hover:border-yellow-500 transition-all">
              <ScoreBoard players={players} />
            </div>
          </div>

          {/* CANVAS AREA - CRAZY STYLE */}
          <div className="xl:col-span-6">
            <div className="relative bg-black/40 backdrop-blur-2xl border-2 border-cyan-500/30 rounded-[32px] p-6 h-full hover:border-cyan-500 transition-all group">
              <div className="absolute -top-3 -left-3 w-20 h-20 bg-cyan-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-pink-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Canvas
                roomId={roomId}
                isDrawer={isDrawer}
              />
            </div>
          </div>

          {/* CHAT AREA - CRAZY STYLE */}
          <div className="xl:col-span-3">
            <div className="bg-black/40 backdrop-blur-2xl border-2 border-purple-500/30 rounded-[32px] p-6 h-full min-h-[650px] hover:border-purple-500 transition-all">
              <Chat
                roomId={roomId}
                isDrawer={isDrawer}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations - Add to your global CSS */}
      <style jsx>{`
        @keyframes grid-scroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes border-pulse {
          0%, 100% { border-color: rgba(0, 255, 255, 0.3); box-shadow: 0 0 20px rgba(0, 255, 255, 0.1); }
          50% { border-color: rgba(255, 0, 255, 0.5); box-shadow: 0 0 40px rgba(255, 0, 255, 0.3); }
        }
        @keyframes glitch {
          0%, 100% { transform: skew(0deg); opacity: 1; }
          95% { transform: skew(0deg); opacity: 1; }
          96% { transform: skew(5deg); opacity: 0.8; }
          97% { transform: skew(-5deg); opacity: 0.9; }
          98% { transform: skew(2deg); opacity: 0.95; }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes particle {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-grid-scroll { animation: grid-scroll 20s linear infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-text-shimmer { background-size: 200% auto; animation: text-shimmer 3s linear infinite; }
        .animate-border-pulse { animation: border-pulse 2s ease-in-out infinite; }
        .animate-glitch { animation: glitch 3s infinite; }
        .animate-rotate-slow { animation: rotate-slow 10s linear infinite; }
        .animate-particle { animation: particle 0.5s ease-out forwards; }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
        .animate-rainbow {
          animation: rainbow 3s linear infinite;
          background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes scan {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        .animate-scan { animation: scan 3s linear infinite; }
        .animate-scan-reverse { animation: scan 3s linear infinite reverse; }
      `}</style>
    </div>
  );
}

export default GameRoom;