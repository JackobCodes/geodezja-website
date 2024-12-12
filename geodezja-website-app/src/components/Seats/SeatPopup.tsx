import React, { useEffect, useRef, useState } from 'react';

interface SeatPopupProps {
  position: { x: number; y: number };
  seatId: string;
  onClose: () => void;
}

const SeatPopup: React.FC<SeatPopupProps> = ({ position, seatId, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const adjustedPosition = {
    x: Math.min(position.x + 20, windowWidth - 200),
    y: Math.min(position.y + 20, windowHeight - 100),
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  const sector = seatId[0];
  const row = seatId[1];
  const seat = seatId.slice(2);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: adjustedPosition.y + 'px',
        left: adjustedPosition.x + 'px',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        backgroundColor: 'white',
        zIndex: 100,
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Selected Seat
      </div>
      <div className="text-sm flex flex-col gap-[2px] mb-[8px]">
        <div>Sector {sector}</div>
        <div>Row {row}</div>
        <div>Seat {seat}</div>
      </div>
      <div style={{ fontSize: '12px', color: '#555' }}>
        Click to select or deselect
      </div>
    </div>
  );
};

export default SeatPopup;
