import React from 'react';
//--------------COMPONENTS-------------------------------
// import Card from './Card';
//--------------MUI-------------------------------

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Black from '../Black';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const styles = {
	card: {
		width: 300,
		margin: 15
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	media: {
		height: 140
	}
};

const DialogTitle = withStyles((theme) => ({
	root: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		margin: 0,
		padding: theme.spacing.unit * 2
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing.unit,
		top: theme.spacing.unit,
		color: theme.palette.grey[500]
	}
}))((props) => {
	const { children, classes, onClose } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography variant='h5' component='h2'>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label='Close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing.unit * 2
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		borderTop: `1px solid ${theme.palette.divider}`,
		margin: 0,
		padding: theme.spacing.unit
	}
}))(MuiDialogActions);

function Popout(props) {
	const { classes } = props;
	return (
		<div>
			<MuiThemeProvider style={Black}>
				{/* <Button variant='outlined' color='secondary'>
					Open dialog
				</Button> */}
				<Dialog
					onClose={props.showStatus}
					aria-labelledby='customized-dialog-title'
					open={props.showStatus}
					fullWidth='true'
				>
					<DialogTitle id='customized-dialog-title' onClose={props.showStatus}>
						<Typography
							className={styles.title}
							color='textSecondary'
							gutterBottom
						>
							Challenge Rating: {props.monster.challenge_rating}
						</Typography>

						{props.monster.name}
						<Typography
							className={styles.title}
							color='textSecondary'
							gutterBottom
						>
							Type: {props.monster.type}
						</Typography>
					</DialogTitle>
					<DialogContent>
						{props.monster.img ? (
							<img alt={props.monster.name} src={props.monster.img} />
						) : (
							<img
								alt={props.monster.name}
								style={
									window.visualViewport.width > 550
										? { width: '500px' }
										: { width: `${window.visualViewport.width * 0.7}px` }
								}
								src='https://altvr-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/DD-Transparent.png'
							/>
						)}

						<Typography variant='h6'>Speed: {props.monster.speed}</Typography>
						<Typography variant='h6'>Size: {props.monster.size}</Typography>
						<Typography variant='h6'>
							Armor Class: {props.monster.armor_class}
						</Typography>
						<Typography variant='h6'>
							Hit Points: {props.monster.hit_points}
						</Typography>
						<Typography style={{ color: '#d50000' }} variant='h6'>
							Special Abilities
						</Typography>
						{props.monster.special_abilities
							? props.monster.special_abilities.map((element, i) => (
									<Typography variant='p'>
										{Object.entries(element) + '    '}
									</Typography>
							  ))
							: 'None'}
						<Typography style={{ color: '#d50000' }} variant='h6'>
							Legendary Actions
						</Typography>
						{props.monster.legendary_actions
							? props.monster.legendary_actions.map((element, i) => (
									<Typography variant='p'>
										{Object.entries(element) + '    '}
									</Typography>
							  ))
							: 'None'}
					</DialogContent>
					<DialogActions>
						<Button
							// variant='contained'
							onClick={props.showStatus}
							// color='primary'
						>
							Clone
						</Button>
						<Button onClick={props.showStatus} variant='contained'>
							Edit
						</Button>
					</DialogActions>
				</Dialog>
			</MuiThemeProvider>
		</div>
	);
}

export default Popout;
