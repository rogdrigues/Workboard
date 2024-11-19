import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorComponent = ({ error, reset }: { error: string; reset?: () => void }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f8d7da',
                color: '#842029',
                padding: 4,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Oops! Something went wrong.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
                {error || 'An unexpected error has occurred.'}
            </Typography>
            <Box>
                {reset ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={reset}
                        sx={{ marginRight: 2 }}
                    >
                        Try Again
                    </Button>
                ) : null}
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </Button>
            </Box>
        </Box>
    );
};

export default ErrorComponent;
