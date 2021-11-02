# Personal Website (Archived)
_Project was archived on 3 Nov 2021 due to the lack of need for dynamic portfolio website.
New website will be at [mattdocherty314.github.io](https://mattdocherty314.github.io)_.

## Overview
This is the repo that is used to show my development of my website [mattdocherty.tech](https://mattdocherty.tech). It does not include any sensitive information like the data in the database or the login credentials to the data. It also will not show how I put the website into production.

## Dependencies
* Node.JS (developed with v10.20.1)
* MongoDB (developed with v4.2.7)
* React (developed with v16.13.1)
* Express (developed with v4.16.4)
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

### v1.1.0
* Added `/test` route

### v1.2.0
* Added `/contact` route
  * Added contact page & form
  * Added mail script on backend
* Added `/login` route

### v1.3.0
* Added `servers` route
  * Able to control AWS Instances
    * Only Minecraft for now
* Decided to use `mongo-express` as MongoDB management tool

### v1.4.0
* Added 404 page on frontend
* Added 404 page on backend
* Made more meaningful error messages

## TODO
* Make API docs
  * API needs to be relatively complete
* Refactoring & commenting of code
* Directory tidy-up
* Restyling web pages