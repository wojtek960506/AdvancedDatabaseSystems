//------------------------------------------------
//-------------INSERT-------SAVE------------------
//------------------------------------------------

//players
db.players.insert({
	_id: "ws1",
	name: { first: "Wojciech", last: "Szczesny" },
	year: 1990,
	position : "goalkeeper",
	height : 196,
	weight: 90,
	nationality : "Polish"
});

db.players.save({
    _id: "cr7",
	name : "Cristiano Ronaldo"
});

db.players.save({
    _id: "lm10",
    name: { first: "Lionel", last: "Messi" },
	year: 1987,
    position : "forward",
	height : 169,
	weight: 72,
	nationality : "Argentine"
});

db.players.save({
    _id: "rl9",
    name: { first: "Robert", last: "Lewandowski" },
	year: 1988,
    position : "forward",
	height : 185,
	weight: 79,
	nationality : "Polish"
});



db.players.insert({
	_id: "sr4",
	name: { first: "Sergio", last: "Ramos" },
	year: 1986,
	position : "defender",
	height : 184,
	weight: 82,
	nationality : "Spanish"
});

//---------------------------------------------------------------------------------------------

//matches
db.matches.save({
	date: new Date("2018-10-28"),
	stadium: "Camp Nou",
	spectators: 95382,
	clubs: [ { name: "F.C. Barcelona", score: 1 }, { name: "Real Madrid C.F.", score: 2 } ],
	goals: 	[ 
				{ player: "lm10", type: "G", minute: 15 },
				{ player: "sr4", type: "P", minute: 49 },
				{ player: "lm10", type: "O", minute: 83 }
			],
	cards:	[ 
				{ player: "sr4", type: "R", minute: 60 },
				{ player: "lm10", type: "Y", minute: 85 }
			]
});

db.matches.insert({
	date: new Date("2018-11-03"),
	stadium: "Allianz Stadium",
	spectators: 38551,
	clubs: [ { name: "Juventus F.C.", score: 3 }, { name: "FC Bayern Munich", score: 1 } ],
	goals: 	[ 
				{ player: "cr7", type: "G", minute: 14 },
				{ player: "cr7", type: "P", minute: 39 },
				{ player: "rl9", type: "P", minute: 55 },
				{ player: "cr7", type: "G", minute: 66 }
			],
	cards:	[ 
				{ player: "rl9", type: "Y", minute: 56 },
				{ player: "rl9", type: "R", minute: 77 }
			]
});

db.matches.insert({
	date: new Date("2018-12-15"),
	stadium: "Santiago Bernabeu",
	spectators: 80123,
	clubs: [ { name: "Real Madrid C.F.", score: 1 }, { name: "Juventus F.C.", score: 1 } ],
	goals: 	[ 
				{ player: "cr7", type: "P", minute: 20 },
				{ player: "ws1", type: "O", minute: 40 }
			],
	cards:	[ 
				{ player: "ws1", type: "Y", minute: 42 }
			]
});

db.matches.insert({

	date: new Date("2018-12-17"),
	stadium: "Allianz Arena",
	spectators: 66996,
	clubs: [ { name: "FC Bayern Munich", score: 0 }, { name: "F.C. Barcelona", score: 1 } ],
	goals: 	[ 
				{ player: "lm10", type: "G", minute: 90 }
			],
	cards:	[ 
				{ player: "rl9", type: "R", minute: 50 }
			]
});

db.matches.save({
	date: new Date("2018-12-20"),
	stadium: "Santiago Bernabeu",
	spectators: 78175,
	clubs: [ { name: "Real Madrid C.F.", score: 2 }, { name: "FC Bayern Munich", score: 4 } ],
	goals: 	[ 
				{ player: "rl9", type: "G", minute: 10 },
				{ player: "rl9", type: "G", minute: 20 },
				{ player: "sr4", type: "G", minute: 30 },
				{ player: "sr4", type: "P", minute: 40 },
				{ player: "rl9", type: "P", minute: 50 },
				{ player: "rl9", type: "G", minute: 60 }
			],
	cards:	[ 
				{ player: "sr4", type: "R", minute: 50 }
			]
});

//--------------------------------------------------------------
//-----------------------------UPDATES--------------------------
//--------------------------------------------------------------

//without update operators
db.players.update(
	{ _id: "cr7" },
	{ 	name: { first: "Cristiano", last: "Ronaldo" },
		year: 1985,
		position : "forward",
		height : 187,
		weight: 84,
		nationality : "Portuguese" 
});

//with at least 2 different update operators
db.matches.update(
	{ spectators: { $gt: 78000, $lt: 81000 } },
	{
		$inc: { spectators: -100 },
		$addToSet: { cards: { player: "sr4", type: "Y", minute: 1 } }
	},
	{ multi: true }
);


//based in the 'upsert' mode
db.players.update(
	{ year: { $gt: 1990 } },
	{
		$set: {
			_id: "km7",
			name: { first: "Kylian", last: "Mbappe" },
			year: 1998,
			position : "forward",
			height: 178,
			weight: 78,
			nationality: "French"
		}
	},
	{ upsert: true }
);
	
//--------------------------------------------------------------------
//---------------------------FIND-------------------------------------
//--------------------------------------------------------------------

//find players which are taller than 180 cm and heavier than 80 kg
//return name, height and weight of players
db.players.find({ $and: [ { height: { $gt: 180 } }, { weight: { $gt: 80 } } ] },
				{ _id: 0, name: 1, height: 1, weight: 1 }).forEach(printjson);
	
//find matches in which Robert Lewandowski got a red card
// ("rl9" is his id) and type "R" indicate red card
// return date of the match, stadium where it was played,
// number of spectators which took part and clubs which played
db.matches.find({ cards: { $elemMatch: { type: "R", player: "rl9" } } },
				{ _id: 0, date: 1, stadium: 1, spectators: 1, clubs: 1}).forEach(printjson);

//find matches which have 3 goals or 3 cards
//return match date, clubs which were playing, at most 2 cards and at most 2 goals
db.matches.find({$or: [{goals: {$size: 3}}, {cards: {$size: 3}}]},
			{_id: 0, date: 1, clubs: 1, cards: {$slice: 2}, goals: {$slice: 2}}).forEach(printjson);

//find players which have Polish nationality
//order the result by descending height 
db.players.find({ nationality: "Polish" }).sort({ height: -1}).forEach(printjson);
			
//find matches on which there was more or equal than 70000 spectators
//return date,clubs, spectators and stadium
db.matches.find({spectators: {$gte: 70000}},
				{_id:0,date:1,spectators:1,clubs:1,stadium:1}).forEach(printjson);	

//--------------------------------------------------------------------
//----------------------------MAP REDUCE------------------------------
//--------------------------------------------------------------------

//I count number of card collected by a single player
//if player didn't get a card in any match then he is not in the list
//I save intermediate key-value pair for every card from cards array
//then in reduce cards stored by one player are collected
//as an output I have player id and number of card which he got in matches
db.matches.mapReduce(
function() {
	var sum = 0;
	this.cards.forEach(function(m){ emit(m.player, 1)})	
},
function(key, values) {
return Array.sum(values);
},
{
out: {inline:1}
}
);
				
//---------------------------------------------------------------
