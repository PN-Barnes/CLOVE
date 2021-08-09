# CLOVE: Community Local Organic Vegetable Exchange

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Short Description

CLOVE, pronounced ‘see love’, is a community engagement application for backyard gardeners and lovers of fresh local produce.Producers can list their harvests for others to see, and consumers can use the interface to search for local produce. Additionally, you’ll find links to resources that can put you in touch with local charities that accept food donations, as well as food banks that are active in your area.

## Application Walkthrough

To be inserted after completion

## Using the App Locally - Installation

To begin installing the application on your local device, first clone the repository to your desired directory

```
git clone https://github.com/PN-Barnes/CLOVE.git
```
Next, open up the folder and create a .env file in the root directory. Inside the file, fill in the following:

```
DB_NAME='clove_db'
DB_USER='root'
DB_PASSWORD='<your mySQL password goes here>'
```

Once that's done, install the required packages using <mark>npm i</mark>

After that, source the clove database using the following commands (one line at a time).

```
mysql -u root -p
source ./db/schema.sql
```
Finally, run the following two node commands to load the application:

```
npm run seed
npm run start
```

You can now go to http://localhost:3001 and browse our application!


## Using the App via Heroku

If you don't want to go through all that trouble to view CLOVE, you could simply follow <a href="#">this link</a> to view the application from heroku.

## Technologies Used

- HTML
- CSS
- Javascript
- Node
- mySQL
- Bootstrap
- Handlebars
- Heroku
- JawsDB

## Authors (+ Github Profiles)
- Nathan Bachelder: <a href="https://github.com/NateBatchelder">Github</a>
- Paul Barnes: <a href="https://github.com/PN-Barnes">Github</a>
- Pranav Byakod: <a href="https://github.com/pbyakod">Github</a>
- Qiushuang Tian: <a href="https://github.com/qtian13">Github</a>

