
 Buccs 5 stuff
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/invegat/mauraders

# change directory to our repo
cd mauraders

# install the repo with npm
npm install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr
