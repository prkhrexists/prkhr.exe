interface IslandProps {
  id: number;
  name: string;
  level: number;
  image: string;
  position: string;
  color: string;
  tailDirection: 'bottom' | 'top-left' | 'right';
  bubbleWidth: string;
  bubbleMargin?: string;
  bubbleSide?: 'top' | 'bottom' | 'left' | 'right'; // controls if bubble is before or after the image
  onEnter: (id: number) => void;
}

export function IslandButton({
  id,
  name,
  level,
  image,
  position,
  color,
  tailDirection,
  bubbleWidth,
  bubbleMargin,
  bubbleSide = 'top',
  onEnter,
}: IslandProps) {
  const isHorizontal = bubbleSide === 'left' || bubbleSide === 'right';
  const flexDirection = isHorizontal ? 'flex-row' : 'flex-col';

  const Bubble = () => (
    <div
      className={`speech-bubble border-retro-${color} tail-${tailDirection} ${bubbleWidth} text-left ${
        bubbleMargin || ''
      } ${bubbleSide === 'top' ? 'mb-4' : ''} ${bubbleSide === 'right' ? 'mt-12' : ''}`}
    >
      <p className={`text-retro-${color} text-[10px] mb-2 uppercase`}>Level {level}</p>
      <p className="text-white text-xs uppercase leading-tight">{name}</p>
    </div>
  );

  const ImageBox = () => (
    <div
      className={`w-[200px] h-[200px] bg-black/50 border-2 border-retro-${color} rounded-md flex items-center justify-center overflow-hidden ${
        bubbleSide === 'bottom' ? 'mb-4' : ''
      } ${bubbleSide === 'right' ? 'mr-4' : ''}`}
    >
      <img src={image} alt={name} className="w-[180px] h-auto object-contain pointer-events-none" />
    </div>
  );

  return (
    <button
      onClick={() => onEnter(id)}
      className={`absolute ${position} island-container island-${color} group flex ${flexDirection} ${
        isHorizontal ? 'items-start' : 'items-center'
      } cursor-pointer bg-transparent border-none p-0 outline-none`}
    >
      {bubbleSide === 'top' && <Bubble />}
      {bubbleSide === 'left' && <Bubble />}
      {bubbleSide === 'bottom' && <ImageBox />}
      {bubbleSide === 'right' && <ImageBox />}

      {bubbleSide === 'top' && <ImageBox />}
      {bubbleSide === 'left' && <ImageBox />}
      {bubbleSide === 'bottom' && <Bubble />}
      {bubbleSide === 'right' && <Bubble />}
    </button>
  );
}
