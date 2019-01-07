import React, { Component } from 'react';
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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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

const types = [
	{ type: 'All', value: '' },
	{ type: 'Abberation', value: 'aberration' },
	{ type: 'Beast', value: 'beast' },
	{ type: 'Celestial', value: 'celestial' },
	{ type: 'Construct', value: 'construct' },
	{ type: 'Dragon', value: 'dragon' },
	{ type: 'Elemental', value: 'elemental' },
	{ type: 'Fey', value: 'fey' },
	{ type: 'Fiend', value: 'fiend' },
	{ type: 'Giant', value: 'giant' },
	{ type: 'Humanoid', value: 'humanoid' },
	{ type: 'Monstrosity', value: 'monstrosity' },
	{ type: 'Ooze', value: 'ooze' },
	{ type: 'Plant', value: 'plant' },
	{ type: 'Undead', value: 'undead' }
];

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

class EditPopout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			challenge_rating: 0,
			name: '',
			type: '',
			speed: '',
			size: '',
			armor_class: 0,
			hit_points: 0,
			img: ''
		};
	}

	componentDidMount() {
		this.setEdit(this.props.monster);
	}

	setEdit(monster) {
		this.setState({
			challenge_rating: monster.challenge_rating,
			name: monster.name,
			type: monster.type,
			speed: monster.speed,
			size: monster.size,
			armor_class: monster.armor_class,
			hit_points: monster.hit_points
		});
		// this.props.statusChanger();
	}

	handleChange(e, name) {
		this.setState({ [name]: e.target.value });
	}

	render() {
		return (
			<div>
				<MuiThemeProvider style={Black}>
					<Dialog
						onClose={this.props.showStatus}
						aria-labelledby='customized-dialog-title'
						open={this.props.showStatus}
						fullWidth='true'
					>
						<DialogTitle
							id='customized-dialog-title'
							onClose={this.props.showStatus}
						>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Challenge Rating'
								value={this.state.challenge_rating}
								onChange={(e) => this.handleChange(e, 'challenge_rating')}
								type='number'
								fullWidth
							/>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Name'
								value={this.state.name}
								onChange={(e) => this.handleChange(e, 'name')}
								type='string'
								fullWidth
							/>
							<TextField
								select
								InputLabelProps={{
									shrink: true
								}}
								color='inherit'
								margin='normal'
								variant='outlined'
								label='Type'
								value={this.state.type}
								onChange={(e) => this.handleChange(e, 'type')}
							>
								{types.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.type}
									</MenuItem>
								))}
							</TextField>
						</DialogTitle>
						<DialogContent>
							{this.state.img ? (
								<img alt={this.state.name} src={this.state.img} />
							) : (
								<img
									alt={this.state.name}
									style={
										window.visualViewport.width > 550
											? { width: '500px' }
											: { width: `${window.visualViewport.width * 0.7}px` }
									}
									src='https://altvr-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/DD-Transparent.png'
								/>
							)}

							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Image URL'
								value={this.state.img}
								onChange={(e) => this.handleChange(e, 'img')}
								type='string'
								fullWidth
							/>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Speed'
								value={this.state.speed}
								onChange={(e) => this.handleChange(e, 'speed')}
								type='string'
								fullWidth
							/>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Size'
								value={this.state.size}
								onChange={(e) => this.handleChange(e, 'size')}
								type='string'
								fullWidth
							/>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Armor Class'
								value={this.state.armor_class}
								onChange={(e) => this.handleChange(e, 'armor_class')}
								type='number'
								fullWidth
							/>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Hit Points'
								value={this.state.hit_points}
								onChange={(e) => this.handleChange(e, 'hit_points')}
								type='number'
								fullWidth
							/>
							<Typography style={{ color: '#d50000' }} variant='h6'>
								Special Abilities
							</Typography>
							{this.props.monster.special_abilities
								? this.props.monster.special_abilities.map((element, i) => (
										<Typography variant='p'>
											{Object.entries(element) + '    '}
										</Typography>
								  ))
								: 'None'}
							<Typography style={{ color: '#d50000' }} variant='h6'>
								Legendary Actions
							</Typography>
							{this.props.monster.legendary_actions
								? this.props.monster.legendary_actions.map((element, i) => (
										<Typography variant='p'>
											{Object.entries(element) + '    '}
										</Typography>
								  ))
								: 'None'}
						</DialogContent>
						<DialogActions>
							<Button
								// variant='contained'
								onClick={this.props.editChanger}
								// color='primary'
							>
								Submit Clone
							</Button>
							<Button onClick={this.props.editChanger} variant='contained'>
								Submit Edit
							</Button>
						</DialogActions>
					</Dialog>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default EditPopout;
