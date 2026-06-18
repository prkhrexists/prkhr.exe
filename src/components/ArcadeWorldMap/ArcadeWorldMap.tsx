import { motion, MotionValue, useTransform } from 'framer-motion';
import { useZone } from '../../context/ZoneContext';
import { IslandButton } from './IslandButton';

interface ArcadeWorldMapProps {
  scrollProgress: MotionValue<number>;
}

export default function ArcadeWorldMap({ scrollProgress }: ArcadeWorldMapProps) {
  const { enterZone } = useZone();

  // Fade in the map when scroll gets past 50%
  const opacity = useTransform(scrollProgress, [0.5, 0.8], [0, 1]);
  const pointerEvents = useTransform(scrollProgress, (v) => (v > 0.6 ? 'auto' : 'none'));

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        opacity,
        pointerEvents: pointerEvents as any,
        backgroundImage: `
          radial-gradient(1px 1px at 10% 20%, #00FFFF 100%, transparent),
          radial-gradient(1px 1px at 80% 10%, #FF00FF 100%, transparent),
          radial-gradient(1px 1px at 30% 70%, #00FFFF 100%, transparent),
          radial-gradient(1px 1px at 90% 80%, #FF00FF 100%, transparent),
          radial-gradient(2px 2px at 50% 50%, #FFFFFF 100%, transparent)
        `,
        backgroundSize: '100% 100%',
        backgroundColor: '#05001A',
        color: 'white',
      }}
      className="font-pixel flex flex-col items-center justify-center overflow-hidden"
    >
      {/* BEGIN: Main Content Area */}
      <main className="relative w-full max-w-[1200px] h-[800px] mx-auto pt-12">
        {/* BEGIN: Header */}
        <header className="text-center absolute w-full top-8 z-20">
          <h1 className="text-4xl md:text-5xl text-retro-magenta glow-magenta mb-4 tracking-widest uppercase">Select Level</h1>
          <h2 className="text-lg md:text-xl text-retro-cyan pixel-text uppercase">Pick Your Destination</h2>
        </header>
        {/* END: Header */}

        {/* BEGIN: Connections Background */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" fill="none" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <path className="dash-line opacity-70" d="M 200,400 C 300,400 300,650 400,650 C 500,650 500,250 600,250 C 700,250 700,650 800,650 C 900,650 900,400 1000,400" fill="none" stroke="#EAB308" strokeWidth="4"></path>
        </svg>
        {/* END: Connections Background */}

        {/* BEGIN: Island Area */}
        <div className="absolute inset-0 w-full h-full z-10">
          {[
            {
              id: 1,
              name: 'Code Cave',
              level: 1,
              image: '/cave.png',
              position: 'top-[300px] left-[100px]',
              color: 'purple',
              tailDirection: 'bottom' as const,
              bubbleWidth: 'w-48',
              bubbleSide: 'top' as const,
            },
            {
              id: 2,
              name: 'Projects Hangar',
              level: 2,
              image: '/project.png',
              position: 'top-[550px] left-[300px]',
              color: 'cyan',
              tailDirection: 'top-left' as const,
              bubbleWidth: 'w-56',
              bubbleMargin: '-ml-16',
              bubbleSide: 'bottom' as const,
            },
            {
              id: 3,
              name: 'The Bunker Lab',
              level: 3,
              image: '/bunker.png',
              position: 'top-[150px] left-[500px]',
              color: 'red',
              tailDirection: 'bottom' as const,
              bubbleWidth: 'w-56',
              bubbleMargin: '-ml-8',
              bubbleSide: 'top' as const,
            },
            {
              id: 4,
              name: 'Yellowduck HQ',
              level: 4,
              image: '/hq.png',
              position: 'top-[300px] left-[900px]',
              color: 'yellow',
              tailDirection: 'bottom' as const,
              bubbleWidth: 'w-56',
              bubbleMargin: '-ml-24',
              bubbleSide: 'top' as const,
            },
            {
              id: 5,
              name: 'Arena',
              level: 5,
              image: '/arena.png',
              position: 'top-[550px] left-[700px]',
              color: 'blue',
              tailDirection: 'right' as const,
              bubbleWidth: 'w-32',
              bubbleSide: 'right' as const,
            },
          ].map((island) => (
            <IslandButton key={island.id} onEnter={enterZone} {...island} />
          ))}
        </div>
        {/* END: Island Area */}

        {/* BEGIN: Footer Controls */}
        <footer className="absolute bottom-4 w-full flex justify-center z-20 pointer-events-none">
          <div className="border-2 border-retro-cyan rounded-md bg-black/50 px-6 py-4 text-center">
            <p className="text-xs text-white uppercase leading-loose mb-2">Use <span className="text-retro-cyan">Arrows</span> To Move</p>
            <p className="text-xs text-white uppercase">Enter To Select</p>
          </div>
        </footer>
        {/* END: Footer Controls */}
      </main>
      {/* END: Main Content Area */}
    </motion.div>
  );
}
