#!/bin/bash

#u may have to run chmod +x $thisfilename first


#run this from inside the bitpoker directory OR
##cd Desktop/bitpoker cd to the bitpoker directory if needed
cp public/js/pokertable.min.js src/pokertable.js -v
uglifyjs src/pokertable.js -o public/js/pokertable.min.js -v
git add -A -v
git commit
#edit your push command as u like here to include usernames/password
git push -v
#line below if u want to include plaintext username/pass
#git push --repo https://mohammaud:derkaderka@github.com/bitpoker.git
cp src/pokertable.js public/js/pokertable.min.js -v
read 'press any key to exit' response
exit
