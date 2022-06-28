import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const AppForm = ({ children }) => {
  return (
    <Box
      id="hello, there"
      sx={{
        display: 'flex',
        width: 1,
        mx: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ height: 1, display: 'flex', alignItems: 'center', flex: 1 }}>
        <Paper
          elevation={2}
          sx={{
            width: 1,
            py: { xs: 4, md: 6 },
            px: { xs: 3, md: 6 },
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default AppForm;
