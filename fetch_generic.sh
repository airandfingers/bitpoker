#!/bin/bash

#u may have to run chmod +x $thisfilename
#one time before being able to execute this file

#run this from inside the bitpoker directory OR
##cd Desktop/bitpoker cd to the bitpoker directory if needed

#check number of lines to see if it is minified
lines=$(wc -l public/js/pokertable.min.js)
if($lines > 200);then
	#we copy it to src, and minify original
cp public/js/pokertable.min.js src/pokertable.js -v
uglifyjs src/pokertable.js -o public/js/pokertable.min.js -v
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

echo 'press any key then enter to exit: WTB JQUERY'
read response
exit