# CLOVE: Community Local Organic Vegetable Exchange

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Table of Contents

1. [Short Description](#shortDescription)
2. [Application Walkthrough](#applicationWalkthrough)
3. [Using the App Loaclly](#usingLocally)
4. [Using the App via Heroku](#usingHeroku)
5. [Project Presentation](#projectPresentation)
6. [Technologies Used](#technologiesUsed)
7. [Authors (+ Github Profiles)](#authorsGithub)

<div id='shortDescription'></div>

## Short Description 

CLOVE, pronounced ‘see love’, is a community engagement application for backyard gardeners and lovers of fresh local produce.Producers can list their harvests for others to see, and consumers can use the interface to search for local produce. Additionally, you’ll find links to resources that can put you in touch with local charities that accept food donations, as well as food banks that are active in your area.

<div id='applicationWalkthrough'></div>

## Application Walkthrough

![Application Walkthrough](media/appwalkthrough.gif)

<div id='usingLocally'></div>

## Using the App Locally

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

Once that's done, install the required packages using <b>npm i</b>

After that, source the clove database using the following commands.

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

<div id='usingHeroku'></div>


## Using the App via Heroku

If you don't want to go through all that trouble to view CLOVE, you could simply follow <a href="https://still-reef-24172.herokuapp.com/">this link</a> to view the application from heroku.

<div id='projectPresentation'></div>

## Project Presentation 

If you would like to view our project presentation, simply <a href="https://docs.google.com/presentation/d/1kDyBMr2H-pKnD-CegKxbTljECvFaDWJ09x_cjna5yM0/edit?usp=sharing">click here!</a>

<div id='technologiesUsed'></div>

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
- Cloudinary (API)

<div id='authorsGithub'></div>

## Authors (+ Github Profiles) 
- Nathan Bachelder: <a href="https://github.com/NateBatchelder">Github</a>
- Paul Barnes: <a href="https://github.com/PN-Barnes">Github</a>
- Pranav Byakod: <a href="https://github.com/pbyakod">Github</a>
- Qiushuang Tian: <a href="https://github.com/qtian13">Github</a>

