// components/ProgressCard.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  CircularProgress,
} from '@mui/material';
import DialogComponent from './DialogComponent';

interface ProgressCardProps {
  subject: string;
  score: string;
  percentage: number;
  date: string;
  paragraph: React.ReactNode;  // Accepts JSX elements now

}

const ProgressCard: React.FC<ProgressCardProps> = ({ subject, score, percentage, date,paragraph }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          padding: '10px',
          width: '80%',
          margin: 'auto',
          backgroundColor: "#f9f9f9",
          position:"relative"
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <Typography variant="h6">λ</Typography>
          </Avatar>
          <Typography variant="h5" textAlign="center" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
            {subject}
          </Typography>
        </Box>
        <Box>
        <Typography variant="body2" textAlign="center" sx={{ marginLeft: '10px' }}>
            {paragraph}
          </Typography>
        </Box>
        <Box sx={{display:"flex",justifyContent:"center"}}> 
            <Typography variant="h4" textAlign="center" sx={{ marginY: 1,fontWeight:"bold"}}>
            {score}
            </Typography>
           

        </Box>
        <Box
        onClick={handleClickOpen}
        sx={{
            width: '60px',        // Reduce the width
            height: '24px',        // Reduce the height
            border: '1px solid black',
            borderRadius: '12px',  // Smaller border-radius for a compact look
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
            cursor: 'pointer',
            padding: '2px',        // Add minimal padding for inner spacing
            alignSelf: 'flex-end',  // Align to the end in a flex container
            position:"absolute",
            right:0,
            bottom:"50%"
        }}
       >
        <Typography
            variant="body2"        // Use a smaller variant for the text
            color="text.secondary"
            sx={{ fontWeight: 'bold', fontSize: '12px' }}  // Smaller font size
        >
            More▽
        </Typography>
            </Box>

      
        <Box display="flex" justifyContent="center" alignItems="center" position="relative">
          <CircularProgress variant="determinate" value={percentage} size={100} />
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6">{`${percentage}%`}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Dialog Component */}
      <DialogComponent open={open} handleClose={handleClose} subject={subject} />
    </>
  );
};

export default ProgressCard;
