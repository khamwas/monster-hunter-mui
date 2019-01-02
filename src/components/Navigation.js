import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon'
import Badge from '@material-ui/core/Badge';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Black from '../Black';

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
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		textColor: theme.palette.common.white,
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 3,
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
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

class PrimarySearchAppBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			labelWidth: 0
		};
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<MuiThemeProvider theme={Black} >
					<AppBar position="static" color='primary'>
						<Toolbar>
							<img
								style={{ width: '100px' }}
								src='https://www.logolynx.com/images/logolynx/51/517dccbc6c88e146124619c16e335769.png'
							/>

							<div className={classes.grow} />
							<div>
								<IconButton color='inherit'>
									<Badge color='inherit' badgeContent={this.props.battleField.length}>
                    <SvgIcon>
                    <path fill="none" d="M0 0h24v24H0V0z"/><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"/>
                    </SvgIcon>
									</Badge>
								</IconButton>
							</div>
							
						</Toolbar>
					</AppBar>
				</MuiThemeProvider>
			</div>
		);
	}
}

PrimarySearchAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
