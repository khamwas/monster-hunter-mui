import React, { Component } from 'react';
//--------------COMPONENTS-------------------------------
import Navigation from './components/Navigation';
import SimpleCard from './components/Card';
import Search from './components/Search';
import Popout from './components/Popout';
import EditPopout from './components/EditPopout';
//--------------MUI-------------------------------
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Black from './Black';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//--------------Tech-------------------------------
import axios from 'axios';
import './App.css';

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: 140,
		width: 100
	},
	control: {
		padding: theme.spacing.unit * 2
	}
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			min: 0.25,
			max: 30,
			monsterType: '',
			pageStart: 0,
			monsters: [],
			battleField: [],
			currentCard: [],
			toggleBattleField: false,
			edit: false,
			showPopout: false
		};
		this.showStatus = this.showStatus.bind(this);
		this.showMore = this.showMore.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addToBattleField = this.addToBattleField.bind(this);
		this.editChanger = this.editChanger.bind(this);
		this.editFalse = this.editFalse.bind(this);
		this.close = this.close.bind(this);
	}
	//--------------life cycle-------------------------------

	componentDidMount() {
		this.getMonsters();
	}
	//--------------initialize-------------------------------
	getMonsters() {
		axios
			.get('/api/monsters')
			.then((data) => this.setState({ monsters: data.data }));
	}
	//--------------pagination & handlers-------------------------------

	changePage(direction, length) {
		if (direction === 'up' && this.state.pageStart < length - 8) {
			this.setState({ pageStart: this.state.pageStart + 8 });
		} else if (direction === 'down' && this.state.pageStart > 7) {
			this.setState({ pageStart: this.state.pageStart - 8 });
		}
	}

	handleChange(e, name) {
		this.setState({ [name]: e.target.value }, () => this.resetPage());
	}

	resetPage() {
		this.setState({ pageStart: 0 });
	}

	editChanger() {
		this.setState({ edit: !this.state.edit });
	}
	editFalse() {
		this.setState({ edit: false });
	}
	close() {
		this.showStatus();
		this.editFalse();
	}

	showStatus() {
		this.setState({ showPopout: !this.state.showPopout });
	}
	showMore(monsterIndex) {
		let newCurrentCard = [];
		let monsterId = this.state.monsters.findIndex(
			(monster) => monster.index === monsterIndex
		);
		newCurrentCard.push(this.state.monsters[monsterId]);
		this.setState({ currentCard: newCurrentCard }, () => this.showStatus());
	}
	//--------------Server Requests-------------------------------
	deleteCard(monsterIndex) {
		// console.log(monsterIndex);
		let deleteId = monsterIndex;
		let monsterId = this.state.monsters.findIndex(
			(monster) => monster.index === deleteId
		);
		let newMonsters = this.state.monsters.slice();
		newMonsters.splice(monsterId, 1);
		this.setState({ monsters: newMonsters });
		axios
			.delete(`http://localhost:3001/api/monsters/:${monsterIndex}`)
			.then(() => this.getMonsters());
	}
	addToBattleField(monsterIndex) {
		let newBattleField = this.state.battleField.slice();
		let monsterCopy = this.state.monsters.slice();
		let pushId = monsterIndex;
		let monsterId = this.state.monsters.findIndex(
			(monster) => monster.index === pushId
		);
		let newMonster = monsterCopy[monsterId];
		newBattleField.push(newMonster);
		this.setState({ battleField: newBattleField });
		console.log(this.state.battleField);
		axios
			.post(`http://localhost:3001/api/battlefield/:${monsterIndex}`)
			.then(
				axios
					.get('http://localhost:3001/api/battlefield/')
					.then((result) => this.setState({ battleField: result.data }))
			);
	}

	showBattleCard(monsterIndex) {
		let newBattleCard = [];
		let monsterId = this.state.battleField.findIndex(
			(monster) => monster.index === monsterIndex
		);
		newBattleCard.push(this.state.battleField[monsterId]);
		this.setState({ battleCard: newBattleCard });
	}

	battleFieldtoggle() {
		this.setState({ toggleBattleField: !this.state.toggleBattleField });
		console.log(this.state.toggleBattleField);
	}
	render() {
		const { classes } = this.props;
		let filtered = this.state.monsters
			.filter((elem) =>
				elem.name.toUpperCase().includes(this.state.search.toUpperCase())
			)
			.filter((elem) => elem.type.includes(this.state.monsterType))
			.filter((elem) => elem.challenge_rating >= this.state.min)
			.filter((elem) => elem.challenge_rating <= this.state.max);
		let cards = filtered
			.slice(this.state.pageStart, this.state.pageStart + 8)
			.map((monster, index) => (
				<SimpleCard
					showStatus={this.showStatus}
					showMore={this.showMore}
					deleteCard={this.deleteCard}
					addToBattleField={this.addToBattleField}
					monster={monster}
					index={index}
				/>
			));
		return (
			<div className='App'>
				{this.state.showPopout &&
					(this.state.edit ? (
						<EditPopout
							monster={this.state.currentCard[0]}
							showStatus={this.showStatus}
							editChanger={this.editChanger}
							close={this.close}
						/>
					) : (
						<Popout
							monster={this.state.currentCard[0]}
							showStatus={this.showStatus}
							editChanger={this.editChanger}
						/>
					))}
				<MuiThemeProvider theme={Black}>
					<Navigation battleField={this.state.battleField} />
					<Search
						handleChange={this.handleChange}
						min={this.state.min}
						max={this.state.max}
						search={this.state.search}
						monsterType={this.state.monsterType}
					/>
					<Grid
						container
						justify='space-around'
						alignItems='flex-start'
						className={classes.root}
						spacing={16}
					>
						{cards}

						<Grid
							container
							justify='space-around'
							alignItems='center'
							className={classes.root}
							// spacing={24}
						>
							<Button onClick={() => this.changePage('down')} size='small'>
								Prev Page
							</Button>
							<>
								{1 + this.state.pageStart / 8} of{' '}
								{Math.ceil(filtered.length / 8)} Pages
							</>

							<Button
								onClick={() => this.changePage('up', filtered.length)}
								color='secondary'
								size='small'
								variant='contained'
							>
								Next Page
							</Button>
						</Grid>
					</Grid>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles)(App);
