# I Can Docker And You Can Too

1. What is Docker?
2. Why should you use it?
3. Contain Errs
4. Docker World<sup>TM</sup>
5. Running your first container
6. Docker and the CLI: How your life can be improved with just a few hundreds of hours practice...
7. Containerizing an app
8. What’s that? Ah - Production? Don’t talk about - production? You kidding me? Production? I just hope we can run this container!

## 1. What is Docker?

* Ensures consistency across your deployed application instances, minimizes errors, and makes managing scalable infrastructure much easier.
* Modularization / Separation of concerns
* By modularizing our code into standalone units with a single concern, our code become much more reusable and easier to manage. If we want to replace an old feature, all we need to do is remove the old module and replace it with a new one, without it affecting the entire codebase.

## 2. Why should you use it?

* Local environment setup is annoying (`brew install <app>` more like `"brew is upgrading - maybe find something else todo"`)

## 3. Contain Errs

* Container != Virtual Machine (VM)

### Container

* Docker containers must be self-dependent. This means all dependencies required by the container, including platforms and the actual application code, are packaged inside the container (different from standard Linux containers - for what it's worth).
* Those dependancies are provided by the image that the container runs on top of. For our purposes, a container is a running instance of an image.

### Image

* An image is simply an ordered list of layers, which are each representations of the changes to the filesystem.
* Since everything in Linux is a file, what these filesystem changes really represents are operations, such as the running of installation scripts. Therefore, an image is really just an environment that resulted from sequential operations that was ran to set up the environment.

### Layer

* Each of these operation produces a layer, which can be view as a snapshot of the image at this point of the set-up process. The next operation would then operate on the last layer, and builds on top of it.

In the end, you get an ordered list of sequentially-dependent layers, which makes up the image.

### A Running Container

* When running a container, a new writable container layer is created on top of the read-only image (composed of read-only layers). Any file changes are contained within the container layer.
* If a file from the image is needed to be changed, the diff is stored in the container layer - the image layers are never changed.

## 4. Docker World<sup>TM</sup>

* [Want install? Click here and act now!](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
* Container Registry ([Docker Hub](https://hub.docker.com/))
* Docker Engine
    - The Docker daemon and client, together, makes up the Docker Engine

## 5. Running your first container

```bash
# Just run it
docker run -it docker/surprise

# Get Image
docker pull nginx:1.15.12

# Run Container
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

## 5. Containerizing an app

### Dockerfile


```dockerfile
FROM ubuntu
# Specifies the image used for the "base image"
# The first instruction in any Dockerfile

RUN
# specifies the command(s) to run at build time. Each RUN command would be a new layer in our image.
ENTRYPOINT
# specifies the path to the executable (along with its arguments) that should be ran when initiated with docker run <your-image>. If this is not specified, it defaults to the shell (/bin/sh -c)
CMD
# specifies the default command to pass to the ENTRYPOINT when you run docker run. There should only be one, and only one, CMD instruction in a Dockerfile. If multiple are provided, the last one will be used.
```

## 6. Docker and the CLI: How your life can be improved with just a few hundred of hours practice...

## 7. What’s that? Ah - Production? Don’t talk about - production? You kidding me? Production? I just hope we can run this container!

## 8. Somethin' Extra - Linux, Cgroups, and Namespaces

* Container != Virtual Machine (VM)
* Processes which run inside a container are isolated by namespaces and control group, and not by an entire operating system running on emulated hardware. This means processes in a container are run on the kernel of the host system (this is efficient)

* Linux Containers rely on two Linux kernel mechanisms - control groups and namespaces.
* Control groups (cgroups) separates processes by groups, and attaches to different subsystems which restricts the resource usage of each group.
* Namespaces package system resources, such as filesystems, network access e.t.c., and present them to a process. From the view of the process, it does not even know there are resources outside of its allocation.

* Linux Containers have been around for a decade. Docker isn’t reinventing the wheel (nor is it trying to), but is providing a standard way to define, build and run containers. Docker have also nurtured the container ecosystem, by providing tools that abstracts low-level process (like managing control groups) away from the end-user.

## Sources (but what about open source...)

https://stackedit.io/viewer#!url=https://gist.githubusercontent.com/d4nyll/7267c1f88bf4f0e6ab5c4c4f72cdc2a4/raw/fcd9c12634dc3d1d25f847427a9774dac6747078/The%2520Comprehensive%2520Introduction%2520to%2520Docker

https://dev.to/softchris/5-part-docker-series-beginner-to-master-3m1b (5 part series)

https://docs.docker.com/engine/docker-overview/
https://docs.docker.com/get-started/

Clippy Code: https://github.com/smore-inc/clippy.js
