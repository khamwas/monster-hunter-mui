// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const mc = require('../server/controllers/monster_controller');
// const port = process.env.PORT || 3001;
const port = 3001;

const app = express();

app.use(json());
app.use(cors());

// app.use(express.static(`${__dirname}/../build`));

app.get('/api/index', mc.getIndex);

app.get('/api/monsters', mc.getMonsters);

app.post('/api/monsters', mc.postMonsters);

app.put('/api/monsters/edit', mc.putMonsters);

app.delete('/api/monsters/:id', mc.deleteMonsters);

app.get('/api/battlefield/', mc.getBattleField);

app.post('/api/battlefield/:id', mc.postBattleField);

app.put('/api/battlefield/edit', mc.putBattleField);

app.delete('/api/battlefield/:id', mc.deleteBattleField);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
