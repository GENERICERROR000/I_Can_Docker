# I Can Docker

1. What is this Docker?
2. Contain Errs
3. Docker World<sup>TM</sup>
4. Running your first container
5. Containerizing an application
6. Managing Docker via CLI: How your life can be improved with just a few hundred of hours practice...
7. What’s that? Ah - Production? Don’t talk about - production? You kidding me? Production? I just hope we can run this container!

## 1. What is this Docker?

### Docker and containers

* Docker helps you create a reproducible environment.
    - Your application is run inside an isolated environment.
* You are able to specify the OS, the exact version of different libraries, different environment variables and their values among other things.
    - Containers contain everything you need to run an application, including the source code you wrote.

### Why should you use it?

* Local environment setup is annoying
    - (`brew install <app>` more like `"brew is upgrading - maybe find something else todo"`)
* Environments looks the same
* Works on my machine
* Modularization and separation of concerns
* Makes it easy to create multiple micro-services that are written in different programming languages and that are using different versions of the same lib and even the same OS.

## 2. Contain Errs

* Container != Virtual Machine (VM)
    - Containers and VMs are similar in their goals: to isolate an application and its dependencies into a self-contained unit that can run anywhere.
    - Remove the need for physical hardware, allowing for more efficient use of computing resources
* A VM is essentially an emulation of a real computer that executes programs like a real computer. VMs run on top of a physical machine using a “hypervisor”. A hypervisor, in turn, runs on either a host machine or on “bare-metal”.
* A container provides operating-system-level virtualization by abstracting the “user space”.


### Container

* Docker containers are self-dependent.
    - All dependencies required by the container, including platforms and the actual application code, are packaged inside the container (different from standard Linux containers - for what it's worth).
* Those dependencies are provided by the image that the container runs on top of. For our purposes, a container is a running instance of an image.

### Image

* An image is simply an ordered list of layers, which represent changes to the filesystem.
* Since everything in Linux is a file, what these filesystem changes really represents are operations, such as the running of installation scripts.
    - An image is really just an environment that resulted from sequential operations that are run to set up the environment.

### Layer

* Each of these operation produces a layer.
    - Can be viewed as a point-in-time snapshot of the image at time of process.
    - The next operation operates on the last layer, and builds on top of it.
* In the end, you get an ordered list of sequentially-dependent layers, which make up the image.

### A Running Container

* When running a container, a new writable container layer is created on top of the read-only image (composed of read-only layers). Any file changes are contained within this new "top" container layer.
    - **These changes will not persist when the container is removed!**
* Image layers are never changed.

## 3. Docker World<sup>TM</sup>

* [Want install? Click here and act now!](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
* Container Registry ([Docker Hub](https://hub.docker.com/))
* Docker Engine
    - The Docker daemon and client, together, makes up the Docker Engine

## 4. Running your first container

```bash
# Just run it
docker run -it docker/surprise

# Get image
docker pull nginx:1.15.12

# Run container
docker run \
    --rm \
    -d \
    --name nginx \
    -p 80:80 \
    nginx:1.15.12

# Run container with custom content to be served by nginx
docker run \
    --rm \
    -it \
    --name \
    nginx \
    -p 80:80 \
    -v ~/zcode/quartz/I_Can_Docker/html:/usr/share/nginx/html:ro \
    nginx:1.15.12

# This is the part where one "exec's" into the container, and tries to
# delete a photo in the mounted dir but can't because it's "read only"
docker run \
    --rm \
    -it \
    --name nginx \
    -p 80:80 \
    -v ~/zcode/quartz/I_Can_Docker/html:/usr/share/nginx/html:ro nginx:1.15.12 \
    /bin/bash
```

### Port syntax

`-p [external (host) port]:[internal (container) port]`

## 5. Containerizing an application

### Dockerfile and Building Images

```dockerfile
FROM
# Specifies the image (OS) used for the "base image"
# The first instruction in any Dockerfile

RUN
# The command(s) to run at build time.
# Each RUN instruction creates a new layer in the image.

ENTRYPOINT
# Path to the executable (with arguments) that should be run when the container is initiated
# If this is not specified, it defaults to the shell (/bin/sh -c)

CMD
# Specifies the default command to pass to the ENTRYPOINT when you run docker run.
# There should only be one, and only one in a Dockerfile.
```

### Build Image

```bash
# cd into the correct dir
cd ./build_me

# Build image
docker build -t dockers:0.0.1 .

# Run it
docker run \
    --rm \
    -it \
    --name dockers \
    -p 3000:3000 \
    dockers:0.0.1

# Run it and set an environment variable
docker run \
    --rm \
    -it \
    --name dockers \
    -p 3000:3000 \
    -e SECRET="IsSafe?" \
    dockers:0.0.1
```

### Other Dockerfile instructions to know

```dockerfile
ENV
# Set environment variables that are available during build and run-time

COPY
# Copy the files from the build context to the directory specified
# Use over ADD when possible

WORKDIR
# Changes the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that comes after WORKDIR

EXPOSE
# Tells Docker which port(s) the container listens on at runtime.
# EXPOSE does not expose the port from the container to the host, it just tells Docker that the container is listening on that port.

USER
# Specify the user name or UID to use when building or running the image.
```

## 6. Managing Docker via CLI: How your life can be improved with just a few hundred hours of practice...

```bash
# List all images
docker image ls

# List all containers
docker ps -a

# Remove image
dr rmi

# Remove container
docker rm

# Stop container
docker stop
# SIGTERM

# Kill container
docker kill
# SIGKILL

# Get into running container
docker exec

# Inspect an image or container
docker inspect

# Get logs for container
docker logs -f
```

## 7. What’s that? Ah - Production? Don’t talk about - production? You kidding me? Production? I just hope we can run this container!

* Small images
* No baking your secrets
* Don't run as `root` user

# Sources (but what about open source...)

https://dev.to/softchris/5-part-docker-series-beginner-to-master-3m1b

https://medium.freecodecamp.org/a-beginner-friendly-introduction-to-containers-vms-and-docker-79a9e3e119b

https://stackedit.io/viewer#!url=https://gist.githubusercontent.com/d4nyll/7267c1f88bf4f0e6ab5c4c4f72cdc2a4/raw/fcd9c12634dc3d1d25f847427a9774dac6747078/The%2520Comprehensive%2520Introduction%2520to%2520Docker

https://docs.docker.com/engine/docker-overview/

https://docs.docker.com/get-started/

https://github.com/smore-inc/clippy.js (Clippy Code)
