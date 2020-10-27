# shopping-app-microservices
Microservices arch example with nodejs to illustrate async data management between services and clustering with pm2.

## How to run:
  - Clone the git repo.
  - Use "npm install" command inside the cloned repo to install dependencies for all services/servers.
  - Create ".env" file inside every service folder and put "DB_URL" key with value of mongodb database.
  - Use "npm start" command inside the repo to start all services/servers. It will create 2 instances of each service using pm2, which will occupy 8 cores of the machine.
  - To change number of instances for a service, edit the value of "instances" inside ecosystem.config.js of that service.
  - Create requests using postman.
