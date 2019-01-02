const axios = require('axios');

let battleField = [];
let monsters = [];
let id = 326;

axios.get('http://www.dnd5eapi.co/api/monsters/').then((response) => {
	for (let i = 0; i < response.data.results.length; i++) {
		axios.get(response.data.results[i].url).then((val) => {
			monsters.push(val.data);
		});
	}
});

module.exports = {
	getIndex: (req, res, next) => {
		res.status(200).json(id);
		// .catch((err) => res.status(500).send(err));
		// .catch(err => res.status(500).send(err));
	},
	getMonsters: (req, res, next) => {
		res.status(200).json(monsters);
		// .catch((err) => res.status(500).send(err));
	},

	postMonsters: (req, res, next) => {
		monsters.push(req.body);
		id++;
		// console.log(monsters[monsters.length - 1]);
		res.status(200).json(monsters);
		// .catch((err) => res.status(500).send(err));
	},
	putMonsters: (req, res, next) => {
		monsters.push(req.body);
		let editId = req.body.index;
		let monsterId = monsters.findIndex((monster) => monster.index == editId);

		monsters.splice(monsterId, 1);
		//edit code here
		// console.log(req.body.index);
		res.status(200).json(monsters);
		// .catch((err) => res.status(500).send(err));
	},
	deleteMonsters: (req, res, next) => {
		// console.log(":" + monsters[0].index);
		let deleteId = req.params.id;
		let monsterId = monsters.findIndex(
			(monster) => ':' + monster.index == deleteId
		);
		monsters.splice(monsterId, 1);
		res.status(200).json(monsters);
		// .catch((err) => res.status(500).send(err));
		// console.log('delete successful', monsters.map((elem) => elem.name));
	},

	getBattleField: (req, res, next) => {
		res.status(200).json(battleField);
		// .catch((err) => res.status(500).send(err));
	},
	postBattleField: (req, res, next) => {
		let pushId = req.params.id;
		let monsterId = monsters.findIndex(
			(monster) => ':' + monster.index == pushId
		);
		battleField.push(monsters[monsterId]);
		res.status(200).json(battleField);
		// .catch((err) => res.status(500).send(err));
		// console.log(battleField.map((elem) => elem.name));
	},

	putBattleField: (req, res, next) => {
		battleField.push(req.body);
		let editId = req.body.index;
		let monsterId = battleField.findIndex((monster) => monster.index == editId);

		battleField.splice(monsterId, 1);
		//edit code here
		// console.log(battleField);
		res.status(200).json(monsters);
		// .catch((err) => res.status(500).send(err));
	},

	deleteBattleField: (req, res, next) => {
		let deleteId = req.params.id;
		let monsterId = battleField.findIndex(
			(monster) => ':' + monster.index == deleteId
		);
		battleField.splice(monsterId, 1);
		res.status(200).json(battleField);
		// .catch((err) => res.status(500).send(err));
		// console.log(battleField.map((elem) => elem.name));
	}
};
