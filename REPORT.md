# My Docker Assignment Report

Name: _______ruba safsaf_____________

Repository URL: ____https://github.com/rubasaf/docker-assignment-starter________________

Use short sentences. Add the answers requested in the assignment PDF.
Keep passwords, tokens, and private keys out of this report.

## Mission 1 - First Container

Commands used:

_________________docker pull nginx:alpine
docker run -d --name web-server -p 8080:80 nginx:alpine
docker ps
docker logs web-server
docker inspect web-server

What happened:

______________to open http://localhost:8080______

What I learned:
How to use a ready-made image
____________________

Problem I faced:

_________no problem___________

How I fixed it:

____________________

## Mission 2 - Build Your Own Image

Commands used:

_______________docker build -t devops-node-app:v1 .
docker run -d --name node-app -p 8080:3000 devops-node-app:v1
cd 02-node-app
nano Dockerfile__
docker exec -it node-app sh___

What happened:
I built an image and then created a container.
____________________

What I learned:
How to create and run an image, and include build commands in a Dockerfile
When you modify a specific file within an image, the change will not be reflected directly in the container; you must rebuild the container to see the modification.
____________________

Problem I faced:
Not knowing the foundation from which the image will emerge
____________________

How I fixed it:
I searched Docker Hub to find it.
____________________

## Mission 3 - Broken Port

Commands used:

_______cd 03-broken-port
chmod +x start-broken.sh
./start-broken.sh
docker ps
docker ps -a
docker logs broken-app
docker inspect broken-app_____________

What happened:

___________________The site appeared

What I learned:

____________________

Problem I faced:
Port conflict between the old and new containers
____________________

How I fixed it:

_________Delete the old container

## Mission 4 - Environment Variables

Commands used:
docker run -d --name env-app -p 8082:3000 
-e APP_MESSAGE="Hello from the Docker assignment" 
devops-node-app:v1
docker exec -it env-app sh
printenv APP_MESSAGE
____________________

What happened:
Changing the message on the website
____________________

What I learned:
The application is designed to use a runtime variable; you can provide a value for it during execution, or it will default to the value specified in the Dockerfile.
____________________

Problem I faced:

____________________

How I fixed it:

____________________

## Mission 5 - Docker Hub

Commands used:
docker login
docker tag devops-node-app:v1 rubasaf/devops-node-app:v1
docker push rubasaf/devops-node-app:v1
____________________

What happened:
Push the image to my repository on Docker Hub
____________________

What I learned:

____________________

Problem I faced:

____________________

How I fixed it:

____________________

## Mission 6 - Remote Deployment

Commands used:
docker login
docker pull rubasaf/devops-node-app:v1
docker run -d --name remote-app -p 8080:3000 rubasaf/devops-node-app:v1
docker ps
curl http://localhost:8080
____________________

What happened:
Downloading an image from Docker Hub and running a new container
____________________

What I learned:
When an image is uploaded to Docker Hub, it is stored there, allowing all developers to download and use it.
____________________

Problem I faced:

____________________

How I fixed it:

____________________

## Mission 7 - Volumes

Commands used:
docker run -d --name mongo-lab mongo:7
docker logs mongo-lab
docker exec mongo-lab mongosh --quiet --eval 'db.getSiblingDB("devops").messages.insertOne({text:"keep-me"})
docker exec mongo-lab mongosh --quiet --eval 'db.getSiblingDB("devops").messages.find().toArray()
docker rm -fv mongo-lab
docker run -d --name mongo-lab mongo:7
docker rm -f mongo-lab
docker volume create mongo-data
docker run -d --name mongo-lab -v mongo-data:/data/db mongo:7
____________________

What happened:
Modifications made to a container before creating a volume were not preserved when the container was deleted; however, when modifications were made after the volume was created, they were preserved even after the container was deleted.
____________________

What I learned:
When a container is deleted, any modifications made to it are also lost, as they are only stored during its runtime. In contrast, when using a volume, modifications are saved to the device's storage, ensuring that they persist.
____________________

Problem I faced:

____________________

How I fixed it:

____________________

## Mission 8 - Docker Networking

Commands used:
cd 08-networking-challenge
docker compose up --build -d
docker compose ps
docker compose logs app
____________________

What happened:
Connecting containers to a specific network and communicating via their names
____________________

What I learned:

____________________

Problem I faced:
When I typed "localhost," it didn't recognize the container name, because "localhost" refers to the application itself.
____________________

How I fixed it:
I entered the name of the container I wanted to access, and the DNS protocol translated it to an IP address.
____________________

## Mission 9 - Docker Compose

Commands used:
cp .env.example .env
nano .env.example
docker compose up -d
docker compose ps
docker compose logs
docker compose down
____________________

What happened:
Data appearing on a web page and being persisted, thanks to the use of volumes in Docker Compose.
____________________

What I learned:

____________________

Problem I faced:
I was deleting the volume by mistake.
____________________

How I fixed it:

____________________

## Bonus Mission

Commands used:
git add 
git commit -m ""
git push -u origin 
docker-assignment
____________________

What happened:

____________________

What I learned:

____________________

Problem I faced:

____________________

How I fixed it:

____________________
