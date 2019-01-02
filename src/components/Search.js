import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		width: '100%',
		color: 'white'
	},
	textField: {
		color: 'palette.text'
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},

	inputRoot: {
		color: 'white',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
});

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

function Search(props) {
	const { classes } = props;

	return (
		<Paper elevation={2}>
			{' '}
			<TextField
				select
				className={classNames(classes.margin)}
				InputLabelProps={{
					shrink: true
				}}
				color='inherit'
				margin='normal'
				variant='outlined'
				label='Type'
				value={props.monsterType}
				onChange={(e) => props.handleChange(e, 'monsterType')}
			>
				{types.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.type}
					</MenuItem>
				))}
			</TextField>
			<TextField
				color='inherit'
				id='outlined-number'
				label='Name'
				value={props.search}
				onChange={(e) => props.handleChange(e, 'search')}
				type='string'
				className={classes.textField}
				InputLabelProps={{
					shrink: true
				}}
				margin='normal'
				variant='outlined'
			/>
			<TextField
				color='inherit'
				id='outlined-number'
				label='Min CR'
				value={props.min}
				onChange={(e) => props.handleChange(e, 'min')}
				type='number'
				className={classes.textField}
				InputLabelProps={{
					shrink: true
				}}
				margin='normal'
				variant='outlined'
			/>
			<TextField
				color='light'
				id='outlined-number'
				label='Max CR'
				value={props.max}
				onChange={(e) => props.handleChange(e, 'max')}
				type='number'
				className={classes.textField}
				InputLabelProps={{
					shrink: true
				}}
				margin='normal'
				variant='outlined'
			/>
		</Paper>
	);
}

export default withStyles(styles)(Search);
