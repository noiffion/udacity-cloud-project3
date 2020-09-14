# Udagram Image Filtering Application
## Monolith to Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](/udacity-c3-frontend)
A basic Ionic client web application which consumes the RestAPI Backend.
2. [The RestAPI Feed Backend](/udacity-c3-restapi-feed), a Node-Express feed microservice.
3. [The RestAPI User Backend](/udacity-c3-restapi-user), a Node-Express user microservice.

Getting Started

    Tip: it's recommended that you start with getting the backend API running since the frontend web application depends on the API.

Prerequisites

  1) Node (LTS version) and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).
  2) The Ionic Command Line Interface. Instructions for installing the CLI can be found in the [Ionic Framework Docs](https://ionicframework.com/docs/installation/cli).
  5) Database: Create a PostgreSQL database either locally or on AWS RDS. Config values for shell / environment variables should be prefixed with POSTGRES_.
  4) S3 Create an AWS S3 bucket. Config values for shell / environment variables should be prefixed with AWS_.
  5) Environment variables mentioned above will need to be set in udacity-c3-deployment/docker/.env. These environment variables include database and S3 connection details. (See 'Setup Docker Environment' section).

***

## Travis
### Set up Travis
The CI tool used for the project is TravisCI (you need to connect your repo to Travis at its website).
Add .travis.yml file with the appropriate settings (after each commit to the 'main' branch a build process start automatically).

***

## Docker
### Set up Docker Environment

You'll need to install [Docker](https://docs.docker.com/install/). Open a new terminal within the project directory (in the udacity-c3-deployment folder):

```
cd udacity-c3-deployment
```
The following shell variables need to be set (in a .env file in the folder above with the appropriate values).
```
PORT
POSTGRES_USERNAME
POSTGRES_PASSWORD
POSTGRES_HOST
POSTGRES_DB
AWS_BUCKET
AWS_REGION
AWS_PROFILE
AWS_ACCESS_KEY
AWS_SECRET_KEY
JWT_SECRET
FRONT_URL
```
Build the images:
```
docker-compose -f docker-compose-build.yaml build --parallel
```
Push the images:
```
docker logout
docker login
docker-compose -f docker-compose-build.yaml push
```
Run the containers:
```
docker-compose up
```
Stop the containers:
```
docker-compose stop
```

On a Linux system each of the docker commands above should be run as root (e.g. sudo docker-compose up).


The [DockerHub](https://hub.docker.com/u/noiffion) images:
- [frontend](https://hub.docker.com/r/noiffion/udacity-frontend)
- [restapi-feed](https://hub.docker.com/r/noiffion/udacity-restapi-feed)
- [restapi-user](https://hub.docker.com/r/noiffion/udacity-restapi-user)
- [reverseproxy](https://hub.docker.com/r/noiffion/reverseproxy)

***
## Kubernetes
### Deploy to Kubernetes cluster

You'll need to install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

Connect the kubernetes cluster created on AWS to kubectl:
```
aws eks --region eu-central-1 update-kubeconfig --name <project_name>
```

Set the correct values in env-secret.yaml and env-configmap.yaml files.
Go the folder udacity-c3-deployment/k8s and run the following commands in the order below.
```
kubectl apply -f env-secret.yaml
kubectl apply -f env-configmap.yaml

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

kubectl apply -f backend-feed-deployment.yaml
kubectl apply -f backend-feed-service.yaml

kubectl apply -f backend-user-deployment.yaml
kubectl apply -f backend-user-service.yaml

kubectl apply -f reverseproxy-deployment.yaml
kubectl apply -f reverseproxy-service.yaml
```

Verify that every container deployed correctly, the services have been set up and all pods are running:
```
kubectl get all
```
