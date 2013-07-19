!#/usr/bin/env bash

# Make sure nodejs is installed
sudo apt-get update
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

# Add postgres 
sudo apt-get install postgresql postgresql-client

# Make sure the db doesn't already exist
dropdb ascii_chan

# Create and deploy the  db
createdb ascii_chan
psql -d ascii_chan -a -f deploy_db.sql

# Manage node packages
npm install
npm update