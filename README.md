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

### Loadbalancing

Services and gateway are stateless, they use a JWT token or data in request to share informations.
So, they don't need particular configuration for loadbalancing. In our case, it could be great using a cloud managed Kubernetes cluster and a namespace for each of the services and gateway to separate them.
Then, doing loadbalancing with NGINX for each of the services would be an efficient approach.