import { useEffect } from 'react';

const Speak: React.FC<{
  src: string;
}> = ({ src }) => {
  useEffect(() => {
    const audio = new Audio(src);
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  return null;
};

export default Speak;
