# Supinfo 4WEBD

- Rudy Turpin
- Enguerrand Harmel
- Clément Eischen
- Nathan Rodet

# Description

An event manager allowing you to create and sell tickets.

## Technical description

A microservice development project constitued of 1 API Gateway interacting with users requests and responding by consumming 3 microservices.
Microservices and API gateway built with Nest.js, services and gateway interact using REST endpoints.
Payment solution implement Stripe which store product and invoice.

### Loadbalancing

Services and gateway are stateless, they use a JWT token or data in request to share informations.
So, they don't need particular configuration for loadbalancing. In our case, it could be great using a cloud managed Kubernetes cluster and a namespace for each of the services and gateway to separate them.
Then, doing loadbalancing with NGINX for each of the services would be an efficient approach.

### Security

Only API gateway endpoints should be accessible from the public.
The microservices should be protected in a different network and accessed with certificate or secrets.

The API endpoint 'admin' for the users service is just here because this is a fake project.

We used a Role Based Access Control (RBAC) with 2 roles 'USER' and 'ADMIN' and decorators on endpoint to chose access.

### Documentation

Documentation is present in README.MD and the `documentations` folder.
The file contains the Postman endpoints for each services and the API gateway and prefilled mock data.

Please ensure to set a bearer token generated with the login endpoint if you get forbidden.

## How to start ?

Start all microservices database using `docker compose up -d` or `docker compose up` for logs.
docker-compose.yml file can be found inside the `database` folder.

Then, for each service you will need to install package using `npm install`.
If you want to run it with logs use `npm run start:dev`.
