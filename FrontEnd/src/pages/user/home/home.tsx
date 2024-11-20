import { Box, Typography } from '@mui/material';

const Home = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '100%',
                flexGrow: 1,
                margin: 'auto',
                height: '750px',
                p: 3,
            }}
        >
            <Box sx={{ margin: 'auto' }}>
                <img
                    src="/images/maintain.gif"
                    alt="Under Development"
                    width={200}
                    height={200}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <Typography variant="body1" sx={{ color: 'gray', mb: 2 }}>
                    Welcome to Work Estimate Board
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;
