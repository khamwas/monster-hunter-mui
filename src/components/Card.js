import React from 'react';
//--------------MUI-------------------------------
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

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

function SimpleCard(props) {
	const { classes } = props;

	return (
		<MuiThemeProvider theme={Black}>
			<div style={{ position: 'relative' }}>
				<div style={{ position: 'absolute', top: '15px', right: '15px' }}>
					<IconButton
						onClick={() => props.showMore(props.monster.index)}
						color='inherit'
					>
						<SvgIcon>
							<path fill='none' d='M0 0h24v24H0V0z' />
							<path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
							{/* <path fill="none" d="M0 0h24v24H0V0z"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/> */}
						</SvgIcon>
					</IconButton>
				</div>
				<Card className={classes.card}>
					<CardContent>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
						>
							Challenge Rating: {props.monster.challenge_rating}
						</Typography>
						<Typography variant='h5' component='h2'>
							{props.monster.name}
						</Typography>
						{props.monster.img ? (
							<CardMedia className={classes.media} image={props.monster.img} />
						) : (
							<CardMedia
								className={classes.media}
								image='https://altvr-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/DD-Transparent.png'
							/>
						)}
						<Typography className={classes.pos} color='textSecondary'>
							Type: {props.monster.type}
						</Typography>
						<Typography component='p'>Speed:{props.monster.speed}</Typography>
						<Typography component='p'>Size:{props.monster.size}</Typography>
						<Typography component='p'>
							Armor Class:{props.monster.armor_class}
						</Typography>
						<Typography component='p'>
							Hit Points:{props.monster.hit_points}
						</Typography>
					</CardContent>

					<CardActions>
						<Button
							onClick={() => props.addToBattleField(props.monster.index)}
							color='secondary'
							size='small'
							variant='contained'
						>
							Add to Battle
						</Button>{' '}
						<Button
							onClick={() => props.deleteCard(props.monster.index)}
							size='small'
						>
							Delete Monster
						</Button>
					</CardActions>
				</Card>
			</div>
		</MuiThemeProvider>
	);
}

SimpleCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
