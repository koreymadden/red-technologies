import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Orders from './components/Orders/Orders';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
	// Custom theme colors.
	const theme = createTheme({
		palette: {
			primary: {
				main: '#DB3534',
			},
			secondary: {
				main: '#444444',
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Navbar />
				<Orders />
			</div>
		</ThemeProvider>
	);
}

export default App;
