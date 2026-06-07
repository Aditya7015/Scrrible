import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

import {
  Pencil,
  Gamepad2,
  Sparkles,
  Palette,
  Brush,
  Trophy,
  Users,
  Zap,
  Crown,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const { playerName, setPlayerName } = useContext(GameContext);

  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }

    navigate("/lobby");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Animated Background */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,#7c3aed20,transparent_40%),radial-gradient(circle_at_bottom_right,#06b6d420,transparent_40%),radial-gradient(circle_at_center,#ec489920,transparent_50%)]"></div>

        <div className="absolute top-24 left-20 text-cyan-500/10 animate-bounce">
          <Palette size={140} />
        </div>

        <div className="absolute bottom-20 left-1/4 text-pink-500/10 animate-pulse">
          <Brush size={160} />
        </div>

        <div className="absolute top-40 right-24 text-purple-500/10 animate-bounce">
          <Pencil size={120} />
        </div>

        <div className="absolute bottom-20 right-20 text-yellow-500/10 animate-pulse">
          <Crown size={120} />
        </div>

      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">

        {/* LEFT SECTION */}
        <div className="flex-1 flex items-center px-8 lg:px-20 py-10">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-8">

              <Zap size={18} />

              <span className="font-semibold tracking-wider">
                REAL-TIME MULTIPLAYER DRAWING BATTLE
              </span>

            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">

              <span className="block">
                DRAW
              </span>

              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                GUESS
              </span>

              <span className="block">
                DOMINATE
              </span>

            </h1>

            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">

              Challenge friends in an intense creative arena.
              Sketch hidden words, guess before everyone else,
              earn points, and become the ultimate drawing champion.

            </p>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:scale-105 transition-all duration-300">

                <Palette
                  className="text-cyan-400 mb-4"
                  size={34}
                />

                <h3 className="font-bold text-xl mb-2">
                  Live Drawing
                </h3>

                <p className="text-slate-400">
                  Realtime synchronized canvas shared with everyone.
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:scale-105 transition-all duration-300">

                <Users
                  className="text-purple-400 mb-4"
                  size={34}
                />

                <h3 className="font-bold text-xl mb-2">
                  Multiplayer Rooms
                </h3>

                <p className="text-slate-400">
                  Create private rooms or join public matches.
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:scale-105 transition-all duration-300">

                <Brush
                  className="text-pink-400 mb-4"
                  size={34}
                />

                <h3 className="font-bold text-xl mb-2">
                  Creative Tools
                </h3>

                <p className="text-slate-400">
                  Colors, brushes, eraser, and advanced drawing controls.
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:scale-105 transition-all duration-300">

                <Trophy
                  className="text-yellow-400 mb-4"
                  size={34}
                />

                <h3 className="font-bold text-xl mb-2">
                  Competitive Scoring
                </h3>

                <p className="text-slate-400">
                  Guess faster, score higher, and top the leaderboard.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[520px] flex items-center justify-center p-8">

          <div className="w-full bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 shadow-[0_0_80px_rgba(168,85,247,0.3)]">

            <div className="text-center mb-8">

              <div className="w-28 h-28 mx-auto rounded-[32px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.5)] mb-6">

                <Gamepad2 size={52} />

              </div>

              <h2 className="text-5xl font-black mb-2">
                SKETCH ARENA
              </h2>

              <p className="text-slate-400">
                Enter your nickname and start playing
              </p>

            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-4 text-red-300 mb-5">
                {error}
              </div>
            )}

            <div className="mb-6">

              <label className="block mb-3 text-sm uppercase tracking-widest text-slate-400 font-semibold">
                Player Name
              </label>

              <input
                type="text"
                placeholder="Enter your nickname..."
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleContinue();
                  }
                }}
                className="w-full h-16 px-5 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-cyan-400 text-lg transition-all"
              />

            </div>

            <button
              onClick={handleContinue}
              className="w-full h-16 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 font-black text-lg tracking-wider hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(168,85,247,0.5)]"
            >

              <Pencil size={22} />

              ENTER THE ARENA

            </button>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

                <div className="text-2xl font-black text-cyan-400">
                  12K+
                </div>

                <div className="text-xs text-slate-400">
                  Players
                </div>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

                <div className="text-2xl font-black text-purple-400">
                  2.4K
                </div>

                <div className="text-xs text-slate-400">
                  Rooms
                </div>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

                <div className="text-2xl font-black text-pink-400">
                  LIVE
                </div>

                <div className="text-xs text-slate-400">
                  Matches
                </div>

              </div>

            </div>

            {/* Fake Activity Feed */}
            <div className="mt-8 bg-black/20 rounded-2xl border border-white/10 p-4">

              <div className="flex items-center gap-2 mb-3">
                <Sparkles
                  size={16}
                  className="text-yellow-400"
                />
                <span className="font-semibold">
                  Live Activity
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-400">

                <p>🎨 Alex guessed the word correctly</p>

                <p>🏆 Sarah reached 250 points</p>

                <p>👥 New room created</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;