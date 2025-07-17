import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ThreeDText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#fff',
  textShadow: `
    1px 1px 0 #999,
    2px 2px 0 #888,
    3px 3px 0 #777,
    4px 4px 0 #666,
    5px 5px 5px rgba(0,0,0,0.6)
  `,
  transform: 'perspective(500px) translateZ(0px)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'perspective(500px) translateZ(30px)'
  }
}));

const FunnySubtitle = styled(Typography)({
  textAlign: 'center',
  color: '#fff',
  marginTop: '16px',
  fontSize: '1.5rem',
  opacity: 0.9,
});

function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}
    >
      <ThreeDText variant="h1" component="h1">
        Welcome to React Query Land! 🎉
      </ThreeDText>
      
      <FunnySubtitle>
        Where data fetching isn't just efficient... it's addictive! 💉
      </FunnySubtitle>
      
      <FunnySubtitle sx={{ mt: 1 }}>
        Say goodbye to stale data 👋... and hello to automatic background updates! 🔄
      </FunnySubtitle>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        mt: 4,
        fontSize: '3rem'
      }}>
        <span title="React Query">⚛️🔥</span>
        <span title="Fast fetching">⚡</span>
        <span title="No more loading spinners!">🎪</span>
        <span title="Caching magic">🪄</span>
        <span title="Pagination made easy">📖</span>
      </Box>
      
      <FunnySubtitle sx={{ mt: 4, fontStyle: 'italic' }}>
        Warning: After using React Query, you might refuse to work with plain fetch() ever again! 🚨
      </FunnySubtitle>
    </Box>
  );
}

export default Home;