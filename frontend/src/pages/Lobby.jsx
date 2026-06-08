// import {
//   useContext,
//   useEffect,
//   useState
// } from "react";
// import CreateRoomModal from "../components/CreateRoomModal";
// import { useNavigate } from "react-router-dom";

// import socket from "../socket/socket";

// import { GameContext } from "../context/GameContext";

// import {
//   Gamepad2,
//   Users,
//   Lock,
//   ArrowRight,
//   Copy
// } from "lucide-react";

// function Lobby() {
//   const [openModal, setOpenModal] =useState(false);
//   const navigate = useNavigate();

//   const {
//     playerName,
//     setRoomId,
//     setPlayerName
//   } = useContext(GameContext);

//   const [privateCode, setPrivateCode] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   // =========================
//   // SOCKET LISTENERS
//   // =========================
//   useEffect(() => {

//     // ROOM JOINED
//     socket.on(
//       "roomJoined",
//       (roomId) => {

//         setLoading(false);

//         setRoomId(roomId);

//         navigate("/game");

//       }
//     );

//     // PRIVATE ROOM CREATED
//     socket.on(
//       "privateRoomCreated",
//       (roomId) => {

//         setLoading(false);

//         setRoomId(roomId);

//         navigate("/game");

//       }
//     );

//     // ROOM ERROR
//     socket.on(
//       "roomError",
//       (message) => {

//         setLoading(false);

//         setError(message);

//       }
//     );

//     return () => {

//       socket.off("roomJoined");

//       socket.off("privateRoomCreated");

//       socket.off("roomError");

//     };

//   }, []);

//   // =========================
//   // JOIN PUBLIC
//   // =========================
//   const joinPublic = () => {

//     if (!playerName.trim()) {

//       setError(
//         "Please enter your name"
//       );

//       return;

//     }

//     setError("");

//     setLoading(true);

//     socket.emit(
//       "joinPublicRoom",
//       playerName
//     );

//   };

//   // =========================
//   // CREATE PRIVATE
//   // =========================
//   const createPrivate = () => {

//     if (!playerName.trim()) {

//       setError(
//         "Please enter your name"
//       );

//       return;

//     }

//     setError("");

//     setLoading(true);

//     socket.emit(
//       "createPrivateRoom",
//       playerName
//     );

//   };

//   // =========================
//   // JOIN PRIVATE
//   // =========================
//   const joinPrivate = () => {

//     if (!playerName.trim()) {

//       setError(
//         "Please enter your name"
//       );

//       return;

//     }

//     if (!privateCode.trim()) {

//       setError(
//         "Enter room code"
//       );

//       return;

//     }

//     setError("");

//     setLoading(true);

//     socket.emit(
//       "joinPrivateRoom",
//       {
//         roomId:
//           privateCode.toUpperCase(),
//         playerName
//       }
//     );

//   };

//   return (
//     <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">

//       <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6">

//         {/* LEFT SIDE */}
//         <div className="hidden lg:flex flex-col justify-center">

//           <div className="space-y-6">

//             <div className="flex items-center gap-4">

//               <div className="p-5 rounded-3xl bg-primary text-primary-content shadow-2xl">

//                 <Gamepad2 size={50} />

//               </div>

//               <div>

//                 <h1 className="text-6xl font-black">
//                   Skribbl
//                 </h1>

//                 <p className="text-xl opacity-70">
//                   Multiplayer Drawing Game
//                 </p>

//               </div>

//             </div>

//             <div className="space-y-4 text-lg opacity-80">

//               <div className="flex items-center gap-3">

//                 🎨 Draw and guess words

//               </div>

//               <div className="flex items-center gap-3">

//                 ⚡ Realtime multiplayer

//               </div>

//               <div className="flex items-center gap-3">

//                 🏆 Compete with friends

//               </div>

//               <div className="flex items-center gap-3">

//                 🌎 Public & private rooms

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="card bg-base-100 shadow-2xl border border-base-300">

//           <div className="card-body p-8">

//             {/* MOBILE LOGO */}
//             <div className="lg:hidden text-center mb-6">

//               <div className="inline-flex p-4 rounded-3xl bg-primary text-primary-content mb-4">

//                 <Gamepad2 size={40} />

//               </div>

//               <h1 className="text-4xl font-black">
//                 Skribbl
//               </h1>

//             </div>

//             {/* TITLE */}
//             <div className="mb-8">

//               <h2 className="text-4xl font-black">
//                 Join Game
//               </h2>

//               <p className="opacity-70 mt-2">
//                 Play with friends in realtime
//               </p>

//             </div>

//             {/* ERROR */}
//             {
//               error && (

//                 <div className="alert alert-error mb-5">

//                   <span>{error}</span>

//                 </div>

//               )
//             }

//             {/* NAME INPUT */}
//             <div className="form-control mb-6">

//               <label className="label">

//                 <span className="label-text text-lg font-semibold">

//                   Your Name

//                 </span>

//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="input input-bordered input-lg rounded-2xl"
//                 value={playerName}
//                 onChange={(e) =>
//                   setPlayerName(
//                     e.target.value
//                   )
//                 }
//               />

//             </div>

//             {/* PUBLIC BUTTON */}
//             <button
//               className={`btn btn-primary btn-lg rounded-2xl w-full mb-5 ${
//                 loading
//                   ? "btn-disabled"
//                   : ""
//               }`}
//               onClick={joinPublic}
//             >

//               <Users size={22} />

//               Play Public

//             </button>

//             {/* DIVIDER */}
//             <div className="divider text-sm opacity-60">
//               OR
//             </div>

//             {/* CREATE PRIVATE */}
//             <button     className={`btn btn-accent btn-lg rounded-2xl w-full bg-green-700 border-green-700 text-gray-300 mb-10 `}
//   onClick={() =>
//     setOpenModal(true)
//   }
// >
//   Create Private Room
// </button>

//             {/* ROOM CODE */}
//             <div className="form-control mb-5">

//               <label className="label">

//                 <span className="label-text text-lg font-semibold pr-2">

//                   Room Code

//                 </span>

//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter room code"
//                 className="input input-bordered input-lg rounded-2xl uppercase"
//                 value={privateCode}
//                 onChange={(e) =>
//                   setPrivateCode(
//                     e.target.value
//                   )
//                 }
//               />

//             </div>

//             {/* JOIN PRIVATE */}
//             <button
//               className={`btn btn-accent btn-lg rounded-2xl w-full ${
//                 loading
//                   ? "btn-disabled"
//                   : ""
//               }`}
//               onClick={joinPrivate}
//             >

//               <ArrowRight size={22} />

//               Join Private Room

//             </button>

//           </div>

//         </div>

//       </div>

//     <CreateRoomModal
//   open={openModal}
//   onClose={() =>
//     setOpenModal(false)
//   }
//   onCreate={(settings) => {

//     socket.emit(
//       "createPrivateRoom",
//       {
//         playerName,
//         settings
//       }
//     );

//     setOpenModal(false);

//   }}
// />
//     </div>
  
  
  
// );
// }

// export default Lobby;

import {
  useContext,
  useEffect,
  useState
} from "react";
import CreateRoomModal from "../components/CreateRoomModal";
import { useNavigate } from "react-router-dom";

import socket from "../socket/socket";

import { GameContext } from "../context/GameContext";

import {
  Gamepad2,
  Users,
  Lock,
  ArrowRight,
  Copy,
  Zap,
  Flame,
  Crown,
  Sparkles,
  Palette,
  Brush,
  Skull,
  Star,
  Rocket,
  Shield
} from "lucide-react";

function Lobby() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const {
    playerName,
    setRoomId,
    setPlayerName
  } = useContext(GameContext);

  const [privateCode, setPrivateCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null);
  const [floatingParticles, setFloatingParticles] = useState([]);

  // Create floating particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      });
    }
    setFloatingParticles(particles);
  }, []);

  // =========================
  // SOCKET LISTENERS
  // =========================
  useEffect(() => {

    // ROOM JOINED
    socket.on("roomJoined", (roomId) => {
      setLoading(false);
      setRoomId(roomId);
      navigate("/game");
    });

    // PRIVATE ROOM CREATED
    socket.on("privateRoomCreated", (roomId) => {
      setLoading(false);
      setRoomId(roomId);
      navigate("/game");
    });

    // ROOM ERROR
    socket.on("roomError", (message) => {
      setLoading(false);
      setError(message);
      setTimeout(() => setError(""), 3000);
    });

    return () => {
      socket.off("roomJoined");
      socket.off("privateRoomCreated");
      socket.off("roomError");
    };
  }, []);

  // =========================
  // JOIN PUBLIC
  // =========================
  const joinPublic = () => {
    if (!playerName.trim()) {
      setError("⚡ ENTER YOUR WARRIOR NAME!");
      return;
    }
    setError("");
    setLoading(true);
    socket.emit("joinPublicRoom", playerName);
  };

  // =========================
  // JOIN PRIVATE
  // =========================
  const joinPrivate = () => {
    if (!playerName.trim()) {
      setError("⚡ ENTER YOUR WARRIOR NAME!");
      return;
    }
    if (!privateCode.trim()) {
      setError("🔑 ENTER ROOM CODE!");
      return;
    }
    setError("");
    setLoading(true);
    socket.emit("joinPrivateRoom", {
      roomId: privateCode.toUpperCase(),
      playerName
    });
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* INSANE BACKGROUND EFFECTS */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#ff006630,transparent_50%),radial-gradient(circle_at_80%_70%,#00ffcc30,transparent_50%),radial-gradient(circle_at_40%_80%,#ff00ff30,transparent_50%)]"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-scroll"></div>
        
        {/* Floating Particles */}
        {floatingParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400 animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
        
        {/* Floating Icons */}
        <div className="absolute top-10 left-10 text-cyan-500/20 animate-float-slow"><Palette size={100} /></div>
        <div className="absolute bottom-20 right-20 text-purple-500/20 animate-float-medium"><Brush size={120} /></div>
        <div className="absolute top-40 right-40 text-pink-500/20 animate-float-fast"><Skull size={80} /></div>
        <div className="absolute bottom-40 left-40 text-yellow-500/20 animate-float-slow"><Flame size={90} /></div>
        <div className="absolute top-1/2 left-5 text-cyan-500/10 animate-pulse-slow"><Star size={50} /></div>
        <div className="absolute top-1/2 right-5 text-purple-500/10 animate-spin-slow"><Crown size={60} /></div>
        
        {/* Neon Lines */}
        <div className="absolute top-20 left-0 w-64 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan"></div>
        <div className="absolute bottom-20 right-0 w-64 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-scan-reverse"></div>
        <div className="absolute top-1/2 left-0 w-0.5 h-64 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-scan-vertical"></div>
        
        {/* Animated Rings */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-cyan-500/20 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-purple-500/20 animate-spin-reverse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8">
          
          {/* LEFT SIDE - EPIC GAMING SECTION */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="space-y-8">
              {/* Animated Logo */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative flex items-center gap-5 p-6 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl animate-pulse"></div>
                    <div className="relative p-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_60px_rgba(0,255,255,0.5)] animate-rotate-slow">
                      <Gamepad2 size={60} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer">
                      SKETCH
                    </h1>
                    <p className="text-2xl text-cyan-300 animate-pulse mt-2">
                      BATTLE ARENA
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature List - Crazy Style */}
              <div className="space-y-4">
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl animate-bounce-slow">🎨</div>
                  <div>
                    <div className="font-bold text-xl text-white">Draw Like a Legend</div>
                    <div className="text-sm text-cyan-400">Unleash your creativity on the battlefield</div>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl animate-pulse">⚡</div>
                  <div>
                    <div className="font-bold text-xl text-white">Realtime Warfare</div>
                    <div className="text-sm text-purple-400">Ultra-fast multiplayer action</div>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl animate-spin-slow">🏆</div>
                  <div>
                    <div className="font-bold text-xl text-white">Climb the Leaderboard</div>
                    <div className="text-sm text-pink-400">Compete and become the ultimate champion</div>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl animate-float-slow">🌎</div>
                  <div>
                    <div className="font-bold text-xl text-white">Global & Private Battles</div>
                    <div className="text-sm text-yellow-400">Join public wars or create private rooms</div>
                  </div>
                </div>
              </div>

              {/* Live Stats Counter */}
              <div className="grid grid-cols-3 gap-4 p-6 rounded-3xl bg-black/50 backdrop-blur-xl border border-cyan-500/30">
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-400 animate-pulse">12K+</div>
                  <div className="text-xs text-slate-400">ACTIVE WARRIORS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400 animate-pulse">2.4K</div>
                  <div className="text-xs text-slate-400">LIVE BATTLES</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-400 animate-pulse">98%</div>
                  <div className="text-xs text-slate-400">WIN RATE</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - EPIC JOIN FORM */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-[50px] blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            
            <div className="relative bg-black/60 backdrop-blur-3xl border-2 border-cyan-500/30 rounded-[50px] p-8 shadow-[0_0_80px_rgba(0,255,255,0.2)] hover:border-cyan-500/60 transition-all duration-500">
              
              {/* MOBILE LOGO */}
              <div className="lg:hidden text-center mb-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-2xl animate-pulse"></div>
                  <div className="relative inline-flex p-5 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mb-4">
                    <Gamepad2 size={50} className="text-white" />
                  </div>
                </div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SKETCH ARENA
                </h1>
              </div>

              {/* TITLE */}
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-text-shimmer">
                  ENTER THE ARENA
                </h2>
                <p className="text-cyan-300 mt-3 flex items-center gap-2 justify-center lg:justify-start">
                  <Zap size={18} className="animate-pulse" />
                  Join the ultimate drawing battle
                  <Zap size={18} className="animate-pulse" />
                </p>
              </div>

              {/* ERROR MESSAGE - CRAZY STYLE */}
              {error && (
                <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 text-red-300 font-bold animate-shake flex items-center gap-3">
                  <Skull size={24} className="animate-pulse" />
                  {error}
                </div>
              )}

              {/* NAME INPUT */}
              <div className="mb-8">
                <label className="block mb-3 text-sm uppercase tracking-widest text-cyan-400 font-black flex items-center gap-2">
                  <Crown size={16} />
                  WARRIOR IDENTITY
                  <Crown size={16} />
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="⚡ Enter your legendary name..."
                    className="w-full h-16 px-6 rounded-2xl bg-black/50 border-2 border-cyan-500/30 outline-none text-white text-lg transition-all focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] placeholder:text-slate-500"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 animate-pulse">
                    ✨
                  </div>
                </div>
              </div>

              {/* PUBLIC BUTTON - EPIC STYLE */}
              <button
                className={`relative w-full h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-black text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(0,255,255,0.4)] overflow-hidden group mb-6 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={joinPublic}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('public')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Users size={24} className="animate-pulse" />
                {loading ? "⚡ JOINING BATTLE..." : "⚡ JOIN PUBLIC WAR"}
                <Flame size={24} className="animate-pulse" />
              </button>

              {/* DIVIDER - CRAZY STYLE */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-cyan-500/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 py-2 bg-black/80 text-cyan-400 text-sm font-bold rounded-full border border-cyan-500/50 backdrop-blur">
                    ⚡ OR ⚡
                  </span>
                </div>
              </div>

              {/* CREATE PRIVATE BUTTON */}
              <button
                className={`relative w-full h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-black text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(128,0,255,0.4)] overflow-hidden group mb-8`}
                onClick={() => setOpenModal(true)}
                onMouseEnter={() => setHoveredButton('create')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Lock size={24} className="animate-pulse" />
                🏰 CREATE PRIVATE KINGDOM
                <Crown size={24} className="animate-pulse" />
              </button>

              {/* ROOM CODE INPUT */}
              <div className="mb-6">
                <label className="block mb-3 text-sm uppercase tracking-widest text-purple-400 font-black flex items-center gap-2">
                  <Shield size={16} />
                  SECRET CODE
                  <Shield size={16} />
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="🔑 Enter room code..."
                    className="w-full h-16 px-6 rounded-2xl bg-black/50 border-2 border-purple-500/30 outline-none text-white text-lg uppercase transition-all focus:border-purple-500 focus:shadow-[0_0_20px_rgba(128,0,255,0.3)] placeholder:text-slate-500"
                    value={privateCode}
                    onChange={(e) => setPrivateCode(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 animate-pulse">
                    🔐
                  </div>
                </div>
              </div>

              {/* JOIN PRIVATE BUTTON */}
              <button
                className={`relative w-full h-16 rounded-2xl bg-gradient-to-r from-pink-600 to-orange-600 font-black text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(255,0,128,0.4)] overflow-hidden group ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={joinPrivate}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('join')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <ArrowRight size={24} className="animate-pulse" />
                {loading ? "🔍 FINDING PORTAL..." : "🔓 ENTER PRIVATE REALM"}
                <Rocket size={24} className="animate-pulse" />
              </button>

              {/* Live Activity Feed */}
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-yellow-400 animate-pulse" />
                  <span className="font-black text-sm text-cyan-400 tracking-wider">⚡ LIVE BATTLE FEED ⚡</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                    🎨 <span className="font-bold text-cyan-400">ShadowWarrior</span> just guessed correctly!
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    🏆 <span className="font-bold text-purple-400">ArtMaster</span> reached 1000 points
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
                    <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                    👥 <span className="font-bold text-pink-400">50+</span> players joined in the last minute
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="mt-6 text-center text-xs text-slate-500">
                <p>⚡ First time? Join a public battle to start your journey ⚡</p>
                <p className="mt-1">🎮 Create a private room to play with friends 🎮</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Room Modal */}
      <CreateRoomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={(settings) => {
          socket.emit("createPrivateRoom", {
            playerName,
            settings
          });
          setOpenModal(false);
        }}
      />

      {/* Custom CSS Animations */}
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
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(20px); opacity: 0.6; }
        }
        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scan {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-grid-scroll { animation: grid-scroll 20s linear infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-text-shimmer { background-size: 200% auto; animation: text-shimmer 3s linear infinite; }
        .animate-scan { animation: scan 3s linear infinite; }
        .animate-scan-reverse { animation: scan 3s linear infinite reverse; }
        .animate-scan-vertical { animation: scan-vertical 4s linear infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Lobby;