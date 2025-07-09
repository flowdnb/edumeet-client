import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import edumeetConfig from '../../utils/edumeetConfig';
import React from 'react';

const LandingPageTitle = (): React.JSX.Element => {
	const logo = useAppSelector((state) => state.room.logo);
	// const loginEnabled = useAppSelector((state) => state.permissions.loginEnabled); // Removed
	// const loggedIn = useAppSelector((state) => state.permissions.loggedIn); // Removed

	// useEffect(() => { // Removed
	// 	dispatch(checkJWT());
	// }, []);

	return (
		<Grid container spacing={2}>
			<Grid size={8}>
				{logo ?
					<img alt='Logo' src={logo} /> :
					<Typography variant='h5'> {edumeetConfig.title} </Typography>}
			</Grid>
			<Grid size={4} style={{ display: 'flex', justifyContent: 'end' }} >
				{/* Login/Logout button and label logic removed */}
			</Grid>
		</Grid>
	);
};

export default LandingPageTitle;
