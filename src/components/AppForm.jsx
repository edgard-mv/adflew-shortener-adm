import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const AppForm = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Paper
            elevation={2}
            sx={{
              width: 1,
              py: { xs: 4, md: 8 },
              px: { xs: 3, md: 6 },
            }}
          >
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default AppForm;
