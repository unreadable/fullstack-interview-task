# Moneyhub Tech Test - Investments and Holdings

This repository serves as a solution for the Moneyhub tech challenge.

## Getting Started

To run the app, execute the following commands:

    $ git clone https://github.com/unreadable/fullstack-interview-task.git
    $ cd fullstack-interview-task
    $ npm install --prefix admin
    $ npm install --prefix financial-companies
    $ npm install --prefix financial-companies
    # to this for inside service: admin, i
    $ npm start

The services will try to use ports 8081, 8082 and 8083.
You can query directly into your browser of choice.

## Q&A

Q: How might you make this service more secure?
    - Add user authentication and restrict endpoints permissions based on user type.

Q: How would you make this solution scale to millions of records?
    - Initially by using a cluster module such as PM2 and if it's not enough, horizontally scaling.    

Q: What else would you have liked to improve given more time?
    - Adding Typescript to ease development, Docker to ease devops ans Swagger UI to better understand
    the API.

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- GET `/investments` get all investments
- GET `/investments/:id` get an investment record by id
- GET `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- GET `/companies` get all companies details
- GET `/companies/:id` get company by id

Admin - localhost:8083
- GET `/investments/:id` get an investment record by id
- POST `/report` generate a csv formatted report and sends it to `localhost:8081/investments/export`
