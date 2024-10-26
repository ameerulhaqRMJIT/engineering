import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fetchCardDetails } from '@/modules/api';
import { DIGITAL_CAMPUS_BASE_URL} from '@/modules/apiConfig';
import {AlertColor} from '@mui/material';
import CustomSnackbar from '@/components/CustomSnackbar';
import Spline from '@splinetool/react-spline/next';
import Three3D from '@/components/loginComponents/threeD'
import LoginPage from '@/components/loginComponents/login'
import Image from 'next/image'

const page: React.FC = () => {

  return (
    <>
      <Grid container>
        <Grid item xs={6} md={7} sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
          {/* Left Grid (visible on larger screens) */}
          <div style={{backgroundColor:"black",width:"17%",height:"7%",position:"absolute",bottom:"2%",right:"2%",borderRadius:"10px"   }}>
          <Typography
              variant="h4"
              gutterBottom
              color="white"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontFamily: ' sans-serif',
              }}
            >
             <Image
                src="https://www.rmjit.com/images/rmj.png"
                width={500}
                height={500}
                alt="Picture of the author"
              />            
            </Typography>
            
          </div>
          <Box >
          <Three3D/>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          {/* Right Grid (visible on all screens) */}
          <LoginPage/>
        </Grid>
      </Grid>
    </>
  );
}

export default page;











