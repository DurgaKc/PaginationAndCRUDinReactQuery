import { motion } from 'framer-motion';
import { 
  Box,
  Typography,
  Paper,
  CircularProgress,
  useTheme
} from '@mui/material';
import { CheckCircle, Lock, HourglassTop, WavingHand } from '@mui/icons-material';

const Logout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{
          p: 8,
          maxWidth: 'md',
          width: '100%',
          textAlign: 'center',
          borderRadius: 4
        }}
        elevation={3}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'error.light',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 6
          }}
        >
          <WavingHand sx={{ fontSize: 32 }} />
        </Box>

        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          See you soon! 😊
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your session has ended securely <Lock fontSize="small" />
        </Typography>

        <Box
          component={motion.div}
          animate={{ opacity: [0.6, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          sx={{ mt: 6, color: 'primary.main' }}
        >
          <Typography variant="body2">
            Redirecting to login... <HourglassTop fontSize="small" />
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Logout;