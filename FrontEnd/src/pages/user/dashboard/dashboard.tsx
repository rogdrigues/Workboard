import { Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const DashboardCombined = () => {
    const statCards = [
        {
            title: 'Total Users',
            value: 0,
            change: 0,
            positive: true,
            icon: <PeopleIcon />,
        },
        {
            title: 'Total Bubbles',
            value: 0,
            change: 0,
            positive: true,
            icon: <TrendingUpIcon />,
        },
        {
            title: 'Total Tasks',
            value: 0,
            change: 0,
            positive: true,
            icon: <WorkIcon />,
        },
        {
            title: 'Total Review',
            value: 0,
            change: 0,
            positive: true,
            icon: <FileCopyIcon />,
        },
    ];

    return (
        <>
            <Box sx={{
                paddingLeft: 2,
                paddingTop: 2,
            }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', mb: 2 }}>
                    Dashboard
                </Typography>

                <Typography variant="body1" sx={{ color: 'gray', mb: 4 }}>
                    Provides an overview of important metrics and their changes over the last week.
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ padding: 2 }}>
                {statCards.map((card) => (
                    <Grid item xs={12} md={6} lg={6} key={card.title}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(115, 103, 240, 0.2)',
                                            marginRight: 2,
                                        }}
                                    >
                                        {card.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {card.title}
                                    </Typography>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {card.value}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: card.positive ? 'green' : 'red',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {card.positive ? '+' : '-'}
                                    {Math.abs(card.change)}%{' '}
                                    {card.positive ? 'more' : 'less'} than previous week
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Placeholder sections for future charts */}
                <Grid item xs={12} md={6} lg={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Placeholder for Bubbles Summary
                            </Typography>
                            <Divider />
                            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                    No data available
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Placeholder for Tasks Summary
                            </Typography>
                            <Divider />
                            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                    No data available
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );


};

export default DashboardCombined;
