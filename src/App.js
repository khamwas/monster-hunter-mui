import React, { Component } from 'react';
import Navigation from './components/Navigation';
import axios from 'axios';
import SimpleCard from './components/Card';
import Search from './components/Search';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button'
import Black from './Black';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

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
			min: 0,
			max: 30,
			monsterType: '',
      pageStart: 0,
			monsters: [],
			battleField: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		axios
			.get('/api/monsters')
			.then((data) => this.setState({ monsters: data.data }));
	}

  changePage(direction,length){
    if(direction==='up' && this.state.pageStart<length-8){
      this.setState({pageStart: this.state.pageStart+8})
    }else if(direction==='down' && this.state.pageStart>7){
      this.setState({pageStart: this.state.pageStart-8})
    }
  }

	handleChange(e, name) {
		this.setState({ [name]: e.target.value });
	}
	render() {
		const { classes } = this.props;
    let filtered = this.state.monsters
    .filter((elem) =>
      elem.name.toUpperCase().includes(this.state.search.toUpperCase())
    )
    .filter((elem) => elem.type.includes(this.state.monsterType))
    .filter((elem) => elem.challenge_rating >= this.state.min)
    .filter((elem) => elem.challenge_rating <= this.state.max)
		let cards = filtered.slice(this.state.pageStart, this.state.pageStart + 8)
			.map((monster) => <SimpleCard monster={monster} />);
		return (
			<div className='App'>
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
					<Button onClick={()=>this.changePage('down')} size='small'>Prev Page</Button>
          <>{1+this.state.pageStart/8} of {Math.ceil(filtered.length/8)} Pages</>

          <Button onClick={()=>this.changePage('up',filtered.length)} color='secondary' size='small' variant='contained'>
						Next Page
					</Button></Grid>
				</Grid>
        </MuiThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles)(App);
