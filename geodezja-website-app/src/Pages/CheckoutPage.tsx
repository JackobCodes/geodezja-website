import React, { useState } from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import SeatPopup from '../components/Seats/SeatPopup.tsx';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import StadiumPlanner from '../components/StadiumPlanner/stadiumPlanner.tsx';

const CheckoutPage: React.FC = () => {
  const rows = 5;
  const cols = 12;
  const seatRadius = 10;
  const spacing = 30;
  const allSectors = [
    'None',
    'A1',
    'A1 Invalids',
    'A2',
    'B2',
    'C1',
    'C2',
    'D1',
    'D2',
    'E1',
    'E2',
    'F1',
    'F2',
    'G1',
    'G2',
    'H2',
    'I1',
    'I2',
    'I2 Invalids',
    'Media',
  ];
  const occupiedSeats = [
    'A1B12',
    'A1G7',
    'A1E15',
    'A1G8',
    'A1G6',
    'A1D19',
    'A1C7',
    'A1F13',
    'A1F2',
    'A1A4',
    'A1F8',
    'A1C19',
  ];

  const sectorBackgrounds: Record<string, string> = {
    None: '/trybuny.jpg', // domyślny obraz
    A1: '/sektory/A1.png',
    'A1 Invalids': '/sektory/A1-niepelnosprawni.png',
    A2: '/sektory/A2.png',
    B2: '/sektory/B2.png',
    C1: '/sektory/C1.png',
    C2: '/sektory/C2.png',
    D1: '/sektory/D1.png',
    D2: '/sektory/D2.png',
    E1: '/sektory/E1.png',
    E2: '/sektory/E2.png',
    F1: '/sektory/F1.png',
    F2: '/sektory/F2.png',
    G1: '/sektory/G1.png',
    G2: '/sektory/G2.png',
    H2: '/sektory/H2.png',
    I1: '/sektory/I1.png',
    I2: '/sektory/I2.png',
    'I2 Invalids': '/sektory/I2-niepelnosprawni.png',
    Media: '/sektory/Media.png',
  };

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedDropValue, setSelectedDropValue] = useState<string>('None');

  const handleDropChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedDropValue(event.target.value as string);
  };

  const handleSeatClick = (sector: string, row: string, col: number) => {
    const seatId = `${sector}${row}${col}`;
    if (occupiedSeats.includes(seatId)) return;

    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>, seatId: string) => {
    setHoveredSeat(seatId);
    setPopupPosition({ x: e.evt.clientX, y: e.evt.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredSeat(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className="bg-center bg-cover"
        style={{
          backgroundImage: `url('${sectorBackgrounds[selectedDropValue]}')`,
          width: '100%',
          height: '300px',
        }}
      ></div>

      <div
        className={`p-8 ${
          selectedDropValue === 'None'
            ? 'grid-cols-1 grid'
            : 'grid-cols-2 grid gap-8'
        }`}
      >
        {/* Sekcja z planem stadionu */}
        <div
          className={`flex flex-col justify-center items-center ${
            selectedDropValue === 'None' ? 'mx-auto' : ''
          }`}
        >
          <StadiumPlanner />
          <div className="w-full max-w-xs">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="stadium-plan-label">Select Sector</InputLabel>
              <Select
                labelId="stadium-plan-label"
                value={selectedDropValue}
                onChange={handleDropChange}
                label="Select Sector"
                fullWidth
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: '35vh',
                      overflowY: 'auto',
                    },
                  },
                }}
              >
                {allSectors.map((sector) => (
                  <MenuItem key={sector} value={sector}>
                    {sector}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Sekcja z sektorami */}
        {selectedDropValue !== 'None' && (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
            <div className="text-sm p-4 w-auto mx-auto">
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Available</span>
                <div className="border-l-2 h-4 border-gray-200"></div>

                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span>Occupied</span>
                <div className="border-l-2 h-4 border-gray-200"></div>

                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Selected</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 justify-center items-start">
              <div
                className="bg-gray-100 p-4 rounded-lg shadow-md flex items-start"
                style={{
                  width: cols * spacing + 100,
                  height: rows * spacing + 120,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold text-center mb-2">
                    Sector {selectedDropValue}
                  </div>
                  <Stage
                    width={cols * spacing + 50}
                    height={rows * spacing + 50}
                    style={{ margin: '0 auto' }}
                  >
                    <Layer>
                      {Array.from({ length: rows }, (_, rowIndex) => (
                        <Text
                          key={`row-${rowIndex}`}
                          text={String.fromCharCode(65 + rowIndex)} // Letters A-E
                          fontSize={14}
                          x={5}
                          y={rowIndex * spacing + spacing / 2}
                          fill="black"
                        />
                      ))}

                      {Array.from({ length: cols }, (_, colIndex) => (
                        <Text
                          key={`col-${colIndex}`}
                          text={`${colIndex + 1}`}
                          fontSize={14}
                          x={colIndex * spacing + spacing / 2 + 30}
                          y={rows * spacing + 10}
                          fill="black"
                        />
                      ))}

                      {Array.from({ length: rows }, (_, rowIndex) =>
                        Array.from({ length: cols }, (_, colIndex) => {
                          const x = colIndex * spacing + 50;
                          const y = rowIndex * spacing + 20;
                          const seatId = `${selectedDropValue}${String.fromCharCode(
                            65 + rowIndex
                          )}${colIndex + 1}`;
                          const isOccupied = occupiedSeats.includes(seatId);
                          const isSelected = selectedSeats.includes(seatId);

                          return (
                            <Circle
                              key={seatId}
                              x={x}
                              y={y}
                              radius={seatRadius}
                              fill={
                                isOccupied
                                  ? 'lightgray'
                                  : isSelected
                                    ? 'red'
                                    : 'blue'
                              }
                              stroke="black"
                              strokeWidth={1}
                              onClick={() =>
                                handleSeatClick(
                                  selectedDropValue,
                                  String.fromCharCode(65 + rowIndex),
                                  colIndex + 1
                                )
                              }
                              onMouseMove={(e) => handleMouseMove(e, seatId)}
                              onMouseLeave={handleMouseLeave}
                            />
                          );
                        })
                      )}
                    </Layer>
                  </Stage>
                </div>
              </div>
            </div>

            <div className="my-4 px-6 py-4 rounded-md w-full max-w-lg mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selected Seats:
              </h3>
              <p className="text-gray-600 text-sm">
                {selectedSeats.length > 0 ? (
                  <span className="font-semibold">
                    {selectedSeats.join(', ')}
                  </span>
                ) : (
                  <span className="italic text-gray-400">
                    No seats selected
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {hoveredSeat && (
        <SeatPopup
          position={popupPosition}
          seatId={hoveredSeat}
          onClose={handleMouseLeave}
        />
      )}

      <Footer />
    </div>
  );
};

export default CheckoutPage;
