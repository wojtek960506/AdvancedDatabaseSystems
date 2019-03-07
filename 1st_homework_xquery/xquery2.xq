(:  Find matches where was more than 2 goals. 
    If capacity of stadium, on which matched is taken,
    is bigger than average capacity than show goals scored after 15 minute,
    if not show cards showed before 70 minute.
    Order by descending time of match in main for loop
	Order by ascending name of club in if statement
	Order by descending name of club in else statement
:)
  

let $c := avg(//clubs/club/stadium/text())
for $m in //match[count(goals/goal) > 2]
order by $m/fixture/time descending
return
    <match date="{$m/fixture/date/text()}" stadium="{$m/stadium/text()}">
    {
    	if (//clubs/club/stadium[@name = $m/stadium/text()]/text() > $c)
    	then
        	for $g in $m/goals/goal
            let $p := //players/player[@number = $g/@player]/legal_name/text()
            where ($g/text() > 15)
            order by $g/@club ascending
            return
              	<goal player="{$p}">{ $g/text() }
                </goal>
    	else
        	for $ca in $m/cards/card
            let $p := //players/player[@number = $ca/@player]/legal_name/text()
            where ($ca/text() > 15)
            order by $ca/@club ascending
            return
              	<card player="{$p}">{ $ca/text() }
                </card>
        	
    }
</match>
