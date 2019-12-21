# Personal Website
## Overview
This is the repo that is used to show my development of my website [mattdocherty.tech](https://mattdocherty.tech). It does not include any sensitive information like the data in the database or the login credentials to the data. It also will not show how I put the website into production.

## Dependencies
* Node.JS (developed with v8.12.0)
* MongoDB (developed with v4.0.3)
* React (developed with v16.12.0)
* Express (developed with v4.16.0)
* Other packages, located within both `package.json` files)

## Debugging
This program has been tested on the above dependencies, without any issues. If you run into any errors please make sure you are on this version because it is known to work. If you still are having issues on the aforementioned version, just send me a message on my [GitHub](https://github.com/matdocherty314)

## Program Use
* Clone the repository
* Install the dependencies
* Add the data to the database
* Modify `mongo-config-SAMPLE.json` to match the settings of your database and rename it to `mongo-config.json`
* Run the frontend with `npm start` in the `/frontend` directory
* Run the backend with `npm start` in the `/backend` directory
* Should be working

## Version History
### v1.0.0
* Put onto AWS EC2 instance

## TODO
* Make a login system
* Make a content editor
* Make API docs
    * API needs to be relatively complete
* Refactoring & commenting of code
* Directory tidy-up
* Restyling web pages