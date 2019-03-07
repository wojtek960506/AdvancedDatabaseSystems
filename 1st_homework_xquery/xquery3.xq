(: Find matches in which Cristiano Ronaldo (his number is "7" scored goal from penalty (type="P") and show scores :)

for $m in //match
where
	some $g in $m/goals/goal satisfies $g/@player="7" and $g/@type="P"
return
   	<match date="{date($m/fixture/date)}">
    {
    	for $s in $m/scores/score
        return
        	<score club="{$s/@club}">{$s/text()}</score>
    }
    </match>