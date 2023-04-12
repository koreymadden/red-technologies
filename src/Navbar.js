import { AppBar, Toolbar } from '@mui/material';
import RedTechnologies from './assets/images/red-technologies.png';
import SettingsIcon from '@mui/icons-material/Settings';
import { AccountCircle } from '@mui/icons-material';

export default function Navbar() {
	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: '#000',
			}}
		>
			<div
				style={{
					display: 'flex',
					padding: '5px 15px',
					justifyContent: 'center',
				}}
			>
				Welcome to Korey's Project!
			</div>
			<Toolbar
				sx={{
					bgcolor: '#fafafa',
					padding: '5px 20px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<div>
					<img src={RedTechnologies} alt='Red Technologies Logo' height={50} />
				</div>
				{/* Right side of nav where icons could go. */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '15px',
					}}
				>
					<SettingsIcon
						sx={{
							fontSize: '28px',
							color: '#4f4f4f',
						}}
					/>
					<AccountCircle
						sx={{
							fontSize: '28px',
							color: '#4f4f4f',
						}}
					/>
				</div>
			</Toolbar>
		</AppBar>
	);
}
