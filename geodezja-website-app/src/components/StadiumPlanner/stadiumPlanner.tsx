import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { ZoomIn } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const StadiumPlanner = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleImageClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 max-w-4xl mx-auto">
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
        <img
          src="./plan_stadionu.jpeg"
          alt="Planer Stadionu"
          className="w-full h-96 object-contain rounded-lg cursor-zoom-in"
          onClick={handleImageClick}
        />
        <div
          className="absolute top-2 right-2"
          onClick={handleImageClick}
          style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            padding: '8px',
          }}
        >
          <ZoomIn fontSize="large" color="primary" />
        </div>
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <span>Stadium Plan</span>
            <IconButton onClick={handleCloseModal} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <img
            src="./plan_stadionu.jpeg"
            alt="Stadium Plan"
            className="w-full h-auto object-contain"
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseModal}
            className="bg-primary text-white rounded px-4 py-2"
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StadiumPlanner;
