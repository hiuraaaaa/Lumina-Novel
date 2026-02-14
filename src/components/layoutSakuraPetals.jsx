import React from 'react';

const SakuraPetal = ({ index }) => {
  const randomDelay = Math.random() * 5;
  const randomDuration = 8 + Math.random() * 4;
  const randomLeft = Math.random() * 100;
  const randomSize = 20 + Math.random() * 20;

  return (
    <div
      className="absolute opacity-30 pointer-events-none animate-fall"
      style={{
        left: `${randomLeft}%`,
        top: '-50px',
        fontSize: `${randomSize}px`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
      }}
    >
      🌸
    </div>
  );
};

const SakuraPetals = ({ count = 10 }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(count)].map((_, i) => (
        <SakuraPetal key={i} index={i} />
      ))}
    </div>
  );
};

export default SakuraPetals;
