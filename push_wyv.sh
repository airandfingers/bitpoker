#!/bin/bash

#u may have to run chmod +x $thisfilename first


#run this from inside the bitpoker directory OR
##cd Desktop/bitpoker cd to the bitpoker directory if needed
cp public/js/pokertable.min.js src/pokertable.js
uglifyjs src/pokertable.js -o public/js/pokertable.min.js
git add -A
git commit
#edit your push command as u like here to include usernames/password
git push
#line below if u want to include plaintext username/pass
#sudo git push --repo https://name:password@bitbucket.org/name/repo.git
cp src/pokertable.js public/js/pokertable.min.js
