import { motion } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal, Cpu, Database, Wifi } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-glitch-black relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden selection:bg-glitch-magenta selection:text-black">
      <div className="noise" />
      <div className="crt-lines" />

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-6xl flex justify-between items-center mb-12 z-10 border-b border-glitch-cyan/20 pb-4"
      >
        <div className="flex items-center gap-3">
          <Terminal className="text-glitch-cyan flicker" size={24} />
          <h1 className="text-3xl font-bold tracking-tighter uppercase glitch-text" data-text="VOID_OS_v0.9.4">
            VOID_OS_v0.9.4
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-glitch-cyan/40">
          <span className="hover:text-glitch-magenta cursor-wait transition-colors">PROCESS_MGR</span>
          <span className="hover:text-glitch-magenta cursor-wait transition-colors">MEMORY_DUMP</span>
          <span className="hover:text-glitch-magenta cursor-wait transition-colors">UPLINK_STABLE</span>
        </div>

        <div className="flex items-center gap-6 text-glitch-magenta">
          <div className="flex items-center gap-2">
            <Wifi size={14} className="animate-pulse" />
            <span className="text-[10px] tracking-widest">CONNECTED</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
        {/* Left Column: System Logs */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-4"
        >
          <div className="p-4 bg-black border border-glitch-cyan/30">
            <h2 className="text-xs uppercase tracking-widest text-glitch-cyan mb-3 flex items-center gap-2">
              <Cpu size={12} /> SYS_METRICS
            </h2>
            <div className="space-y-2 font-pixel text-[14px]">
              <div className="flex justify-between">
                <span className="text-glitch-cyan/40">CPU_LOAD</span>
                <span className="text-glitch-magenta">44.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-glitch-cyan/40">MEM_ALLOC</span>
                <span className="text-glitch-magenta">12.8GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-glitch-cyan/40">ENTROPY</span>
                <span className="text-glitch-magenta">MAX_LEVEL</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-black border border-glitch-magenta/30">
            <h2 className="text-xs uppercase tracking-widest text-glitch-magenta mb-3 flex items-center gap-2">
              <Database size={12} /> LOG_STREAM
            </h2>
            <div className="space-y-1 text-[10px] text-glitch-magenta/60 uppercase leading-tight">
              <p className="flicker">[06:47:30] INITIALIZING_CORE...</p>
              <p>[06:47:31] LOADING_NEURAL_NETS...</p>
              <p className="text-glitch-cyan">[06:47:32] HANDSHAKE_SUCCESS</p>
              <p>[06:47:33] WAITING_FOR_INPUT</p>
            </div>
          </div>
        </motion.div>

        {/* Center Column: Game */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <SnakeGame />
        </motion.div>

        {/* Right Column: Music Player */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 flex flex-col gap-4"
        >
          <MusicPlayer />
          
          <div className="p-4 bg-black border border-glitch-cyan/30">
            <h2 className="text-xs uppercase tracking-widest text-glitch-cyan mb-3">OPERATIONAL_GUIDE</h2>
            <ul className="text-[12px] text-glitch-cyan/60 space-y-2 uppercase">
              <li>{'>'} NAVIGATE: ARROW_KEYS</li>
              <li>{'>'} HARVEST: MAGENTA_NODES</li>
              <li>{'>'} AVOID: SELF_COLLISION</li>
              <li>{'>'} AUDIO: VOID_ENGINE_ACTIVE</li>
            </ul>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="mt-12 text-[10px] uppercase tracking-[0.8em]"
      >
        END_OF_TRANSMISSION // 2026_VOID_CORP
      </motion.footer>
    </div>
  );
}
