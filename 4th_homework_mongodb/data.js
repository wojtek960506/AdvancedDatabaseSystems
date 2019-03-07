
// -----------------------------------------------------------------------------

db.actors.save({
    _id: "trojan",
    name: { first: "Ivan", last: "Trojan" }, year: 1964,
    movies: [ "samotari", "medvidek", "karamazovi" ]
});
db.actors.save({
    _id: "machacek",
    name: { first: "Jiri", last: "Machacek" }, year: 1966,
    movies: [ "medvidek", "vratnelahve", "samotari" ]
});
db.actors.save({
    _id: "schneiderova",
    name: { first: "Jitka", last: "Schneiderova" }, year: 1973,
    movies: [ "samotari" ]
});
db.actors.save({
    _id: "sverak",
    name: { first: "Zdenek", last: "Sverak" }, year: 1936,
    movies: [ "vratnelahve" ]
});
db.actors.save({
    _id: "geislerova",
    name: { first: "Anna", last: "Geislerova" }, year: 1976
});
db.actors.save({
    _id: "vilhelmova",
    name: { first: "Tatiana", last: "Vilhelmova" }, year: 1978,
    movies: [ "medvidek"]
});
db.actors.save({
    _id: "menzel",
    name: { last: "Menzel", first: "Jiri" }, year: 1938,
    movies: "medvidek"
});

db.movies.save({
    _id: "samotari",
    title: { cs: "Samotari", en: "Loners" },
    year: 2000, rating: 84,
    actors: [ "trojan", "machacek", "schneiderova" ],
    genres: [ "comedy", "drama" ], country: [ "CZ", "SI" ], length: 103
});
db.movies.save({
    _id: "medvidek",
    title: "Medvidek",
    year: 2007, director: { first: "Jan", last: "Hrebejk" }, rating: 53,
    actors: [ "trojan", "machacek", "vilhelmova", "issova", "menzel" ],
    genres: [ "comedy", "drama" ], country: [ "CZ" ], length: 100
});
db.movies.save({
    _id: "vratnelahve",
    title: { cs: "Vratne lahve", en: "Empties" },
    year: 2006, director: { first: "Jan", last: "Sverak" }, rating: 76,
    actors: [ "sverak", "machacek", "schneiderova" ],
    genres: "comedy", country: "CZ", length: 99
});
db.movies.save({
    _id: "zelary",
    title: "Zelary",
    year: 2003, director: { last: "Trojan", first: "Ondrej" }, rating: 81,
    actors: [ ],
    genres: [ "romance", "drama" ], country: [ "CZ", "SK", "AT" ], length: 142
});
db.movies.save({
    _id: "stesti",
    title: "Stesti",
    year: 2005, director: { last: "Slama", first: "Bohdan" }, rating: 72,
    length: 100,
    awards: [
        { type: "Czech Lion", year: 2005 }
    ]
});
db.movies.save({
    _id: "kolja",
    title: "Kolja",
    year: 1996, rating: 86,
    length: 105,
    awards: [
        { type: "Czech Lion", year: 1996 },
        { type: "Noname Awards", category: "A", year: 2005 }
    ]
});

// -----------------------------------------------------------------------------
