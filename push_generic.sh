#!/bin/bash

#u may have to run chmod +x $thisfilename first


#run this from inside the bitpoker directory OR
##cd Desktop/bitpoker cd to the bitpoker directory if needed


#check game_table to see if it is minified
lines=$(wc -l < public/js/game_table.min.js)
echo $lines
if(($lines > $minified_lines))
	then
	#we copy it to src, and minify original
cp public/js/game_table.min.js src/game_table.js -v
echo 'we are uglifying pokertable.min.js'
uglifyjs src/game_table.js -o public/js/game_table.min.js -v
else
	echo 'pokertable.min.js is already minified'
fi

#check holdem_table see if it is minified
lines=$(wc -l < public/js/holdem_table.min.js)
echo $lines
if(($lines > $minified_lines))
	then
	#we copy it to src, and minify original
cp public/js/holdem_table.min.js src/holdem_table.js -v
echo 'we are uglifying holdem_table.min.js'
uglifyjs src/holdem_table.js -o public/js/holdem_table.min.js -v
else
	echo 'holdem_table.min.js is already minified'
fi

git add -A -v
git commit
#edit your push command as u like here to include usernames/password
git push -v
#line below if u want to include plaintext username/pass
#git push --repo https://username:darthvader@github.com/username/bitpoker.git

#if [ "$minified" == "minified" ];
#	then
cp src/pokertable.js public/js/pokertable.min.js -v
#fi

echo 'press any key then enter to exit: WTB JQUERY'
read response
exit