#!/bin/bash

#u may have to run chmod +x $thisfilename first


#run this from inside the bitpoker directory OR
##cd Desktop/bitpoker cd to the bitpoker directory if needed


#check number of lines to see if it is minified
lines=$(wc -l < public/js/pokertable.min.js)
echo $lines
if(($lines > 300))
	then
	minified="minified"
	#we copy it to src, and minify original
cp public/js/pokertable.min.js src/pokertable.js -v
echo 'we are uglifying pokertable.min.js'
uglifyjs src/pokertable.js -o public/js/pokertable.min.js -v

else
	echo 'pokertable.min.js is already minified'
fi

git add -A -v
git commit
#edit your push command as u like here to include usernames/password
git push -v
#line below if u want to include plaintext username/pass
#git push --repo https://username:darthvader@github.com/username/bitpoker.git

if [ "$minified" == "minified" ];
	then
cp src/pokertable.js public/js/pokertable.min.js -v
fi

echo 'press any key then enter to exit: WTB JQUERY'
read response
exit