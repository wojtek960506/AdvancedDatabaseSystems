(: Create a summary of all players :)

<players>
	<count>{ count(//player) }</count>
    {
    for $p in //player
    return
    	<player birth="{ data($p/birth) }">{ $p/legal_name/text() }
        </player>
	}
</players>