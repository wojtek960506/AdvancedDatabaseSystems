MATCH ()-[r]-() DELETE r;
MATCH (n) DELETE n;

CREATE
	(p1:PLAYER { id: "ws1", name: "Wojciech Szczesny", year: 1990, height: 196, weight: 90, nationality: "Polish"}),
	(p2:PLAYER { id: "cr7", name: "Cristiano Ronaldo", year: 1985, height: 187, weight: 84, nationality: "Portuguese"}),
	(p3:PLAYER { id: "lm10", name: "Lionel Messi", year: 1987, height: 169, weight: 72, nationality: "Argentine"}),
	(p4:PLAYER { id: "rl9", name: "Robert Lewandowski", year: 1988, height: 185, weight: 79, nationality: "Polish"}),
	(p5:PLAYER { id: "sr4", name: "Sergio Ramos", year: 1986, height: 184, weight: 82, nationality: "Spanish"}),
	(p6:PLAYER { id: "ma20", name: "Marco Asencio", year: 1996, height: 182, weight: 76, nationality: "Spanish"}),
	
	(c1:CLUB { id: "juve", name: "Juventus F.C.", founded: 1897, stadium: "Allianz Stadium", coach: "Massimilliano Allegri"}),
	(c2:CLUB { id: "realmadrid", name: "Real Madrid C.F.", founded: 1902, stadium: "Santiago Bernabeu", coach: "Santiago Scolari"}),
	(c3:CLUB { id: "barca", name: "FC Barcelona", founded: 1899, stadium: "Camp Nou", coach: "Ernesto Valverde"}),
	(c4:CLUB { id: "bayern", name: "FC Bayern Munich", founded: 1900, stadium: "Allianz Arena", coach: "Niko Kovac"}),
	
	(c1)-[s1:PLAY {number: 7, position: "goalkeeper"}]->(p1),
	(c1)-[s2:PLAY {number: 1, position: "forward"}]->(p2),
	(c2)-[s3:PLAY {number: 4, position: "defender", role:"captain"}]->(p5),
	(c2)-[s4:PLAY {number: 20, position: "midfielder"}]->(p6),
	(c3)-[s5:PLAY {number: 10, position: "forward", role:"captain"}]->(p3),
	(c4)-[s6:PLAY {number: 9, position: "forward"}]->(p4),
	
	(c1)-[m1:AGAINST {host:1, guest:2, date: "2018-09-18"}]->(c2),
	(c3)-[m2:AGAINST {host:0, guest:1, date: "2018-09-18"}]->(c4),
	(c1)-[m3:AGAINST {host:3, guest:1, date: "2018-10-03"}]->(c3),
	(c2)-[m4:AGAINST {host:3, guest:0, date: "2018-10-03"}]->(c4),
	(c1)-[m5:AGAINST {host:1, guest:1, date: "2018-10-24"}]->(c4),
	(c2)-[m6:AGAINST {host:4, guest:0, date: "2018-10-24"}]->(c3),
	(c2)-[m7:AGAINST {host:0, guest:4, date: "2018-11-06"}]->(c1),
	(c4)-[m8:AGAINST {host:2, guest:0, date: "2018-11-06"}]->(c3),
	(c3)-[m9:AGAINST {host:2, guest:0, date: "2018-11-28"}]->(c1),
	(c4)-[m10:AGAINST {host:0, guest:0, date: "2018-11-28"}]->(c2),
	(c4)-[m11:AGAINST {host:0, guest:0, date: "2018-12-11"}]->(c1),
	(c3)-[m12:AGAINST {host:0, guest:2, date: "2018-12-11"}]->(c2);

//Use at least once +MATCH, +OPTIONAL MATCH, +RETURN, WITH, +WHERE
//and ORDER BY (sub)clauses (all of them)
//Aggregation in at least one query
	
//1
//find players which play in Juventus
//return name and nationality
//sort results using nationality (in descending order) and then weight( in ascending order)
MATCH (c:CLUB)-[:PLAY]->(p:PLAYER)
	WHERE c.name = "Juventus F.C."
RETURN p.name as name, p.nationality as nationality
	ORDER BY p.nationality DESCENDING, p.weight ASCENDING;

//2
//find clubs which were founded before 1900
//return club name and number of players in every club
//order by this number ascending
MATCH (c:CLUB)
	WHERE c.founded < 1900
WITH c, SIZE( (c)-[:PLAY]->(:PLAYER) ) as number_of_players
RETURN c.name as name, number_of_players
	ORDER BY number_of_players ASCENDING;

//3
//find players with height lower than 185cm.
//Return name and role of the player in the club (not every player has a role)
MATCH (p:PLAYER)
	WHERE p.height < 185
OPTIONAL MATCH (:CLUB)-[s:PLAY]->(p)
RETURN p.name, s.role;

//4
//find on which stadium was playing every match (it is the stadium of host)
//return the date and the stadium name
MATCH ( (c:CLUB)-[a:AGAINST]->(:CLUB) )
	RETURN a.date as date, c.stadium as stadium
	ORDER BY a.date;


//5
//Count the average number of goals scored by hosts and by guests
MATCH ((:CLUB)-[a:AGAINST]->(:CLUB))
WITH AVG(a.host) as average_host_goals, AVG(a.guest) as average_guest_goals
RETURN average_host_goals, average_guest_goals;


