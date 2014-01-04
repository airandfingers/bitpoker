#!/bin/bash

#u may have to run chmod +x $thisfilename
#one time before being able to execute this file

#1. checks to see if pokertable.min.js is minified
#2. if it is not, it copies to src/pokertable.js, the minifies pokertable.min.js
#3. git commits local changes
#4. git fetches from everyone
#5. git merges with everyone
#6. copies pokertable.js ---> pokertable.min.js


#run this from inside the bitpoker directory OR
##cd Desktop/bitpoker cd to the bitpoker directory if needed

#check number of lines to see if it is minified
lines=$(wc -l < public/js/pokertable.min.js)
echo $lines
read $gorb
if(($lines > 300))
	then
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
git fetch user1 -v
git fetch user2 -v
git fetch user3 -v
#line below if u want to include plaintext username/pass
git fetch https://username:password@github.com/user1/bitpoker.git -v
git fetch https://username:password@github.com/user2/bitpoker.git -v
git fetch https://username:password@github.com/user3/bitpoker.git -v
#git push --repo https://bobbyinfj:darthvader@github.com/bobbyinfj/bitpoker.git
git merge user1/master -v
git merge user2/master -v
git merge user3/master -v

cp src/pokertable.js public/js/pokertable.min.js -v
echo 'press any key then enter to exit: WTB JQUERY'
read response
exit