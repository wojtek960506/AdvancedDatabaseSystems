
// -----------------------------------------------------------------------------
// #1

db.actors.find(
    { year: 1966, "name.first": "Jiri" }
);

db.actors.find(
    { year: { $eq: 1966 }, "name.first": { $eq: "Jiri" } }
);

db.actors.find(
    { year: { $eq: 1966 }, "name.first": "Jiri" }
);

// -----------------------------------------------------------------------------
// #2

/*INCORRECT*/
db.movies.find(
    { director: { first: "Jan", last: "Hrebejk" } }
);

/*INCORRECT*/
db.movies.find(
    { director: { last: "Hrebejk", first: "Jan" } }
);

db.movies.find(
    { "director.first": "Jan", "director.last": "Hrebejk" }
);

// -----------------------------------------------------------------------------
// #3

db.actors.find(
    { "name.first": "Jiri", movies: "medvidek" },
    { name: 1, _id: 0 }
);

db.actors.find(
    { "name.first": "Jiri", movies: { $in : [ "medvidek" ] } },
    { name: 1, _id: 0 }
);

// -----------------------------------------------------------------------------
// #4

db.movies.find(
    {
        year: { $gte: 2000, $lte: 2005 },
        director: { $exists: 1 }
    },
    { _id: 1 }
).sort(
    { rating: -1, year: 1 }
);

// -----------------------------------------------------------------------------
// #5

db.actors.find(
    { movies: { $in: [ "medvidek", "samotari" ] } },
    { _id: 1 }
);

db.actors.find(
    {
        $or: [
            { movies: "medvidek" },
            { movies: "samotari" }
        ]
    },
    { _id: 1 }
);

// -----------------------------------------------------------------------------
// #6

db.actors.find(
    { movies: { $all: [ "medvidek", "samotari" ] } },
    { _id: 1 }
);

db.actors.find(
    { $and: [ { movies: "medvidek" }, { movies: "samotari" } ] },
    { _id: 1 }
);

db.actors.find(
    { $and: [
        { movies: { $eq: "medvidek" } },
        { movies: { $eq: "samotari" } }
    ] },
    { _id: 1 }
);

db.actors.find(
    { $and: [
        { movies: { $in: [ "medvidek" ] } },
        { movies: { $in: [ "samotari" ] } }
    ] },
    { _id: 1 }
);

/*INCORRECT*/
db.actors.find(
    { movies: "medvidek", movies: "samotari" },
    { _id: 1 }
);

// -----------------------------------------------------------------------------
// #7

db.movies.find(
    { $or: [
        { title: "Vratne lahve" },
        { "title.cs": "Vratne lahve" }
    ] },
    { title: 1, _id: 0 }
);

db.movies.find(
    { $or: [
        { title: { $eq: "Vratne lahve" } },
        { "title.cs": { $eq: "Vratne lahve" } }
    ] },
    { title: 1, _id: 0 }
);

// -----------------------------------------------------------------------------
// #8

/*INCORRECT*/
db.movies.find(
    { awards: { type: "Czech Lion", year: 2005 } },
    { _id: 1, awards: 1 }
);

/*INCORRECT*/
db.movies.find(
    { "awards.type": "Czech Lion", "awards.year": 2005 },
    { _id: 1, awards: 1 }
);

/*INCORRECT*/
db.movies.find(
    { $and: [
        { "awards.type": "Czech Lion" },
        { "awards.year": 2005 }
    ] },
    { _id: 1, awards: 1 }
);

db.movies.find(
    {
        awards: { $elemMatch: { type: "Czech Lion", year: 2005 } }
    },
    { _id: 1, awards: 1 }
);

// -----------------------------------------------------------------------------
// #9

db.movies.find(
    {
        $or: [
            { genres: { $all: [ "comedy", "drama" ] } },
            { rating: { $gte: 80 } }
        ]
    },
    { _id: 1, country: { $slice: 2 } }
);

// -----------------------------------------------------------------------------
// MapReduce

db.actors.mapReduce(
    function() {
        emit(this.year, this.name);
    },
    function(key, values) {
        return values.sort();
    },
    {
        query: { year: { $lte: 2000 } },
        out: { inline: 1 }
    }
);

db.actors.mapReduce(
    function() {
        if (this.movies) {
            this.movies.forEach(
                function(m) { emit(m, 1); }
            );
        }
    },
    function(key, values) {
        return Array.sum(values);
    },
    { out: { inline: 1 } }
);

db.actors.mapReduce(
    function() {
        this.movies.forEach(
            function(m) { emit(m, 1); }
        );
    },
    function(key, values) {
        return Array.sum(values);
    },
    {
        query: { movies: { $exists: true } },
        out: { inline: 1 }
    }
);

// -----------------------------------------------------------------------------
