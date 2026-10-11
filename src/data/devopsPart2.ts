import { LessonContent } from "./lessonsData";

export const DEVOPS_PART2: Record<string, LessonContent> = {
  "devops-docker-volumes": {
    "id": "devops-docker-volumes",
    "badge": "Module 6 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Docker Volumes & Persistent Container Storage",
    "subtitle": "Complete DevOps engineering guide to Docker Volumes & Persistent Container Storage — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Docker Volumes provide persistent storage for containers, allowing data to remain available even after a container is stopped, removed, or recreated.\n\n- Managed directly by Docker for storing and preserving container data.\n- Mount a dedicated filesystem or storage location inside the container.\n- Ensure data persists beyond the container's lifecycle.\n- Prevent data loss when containers are stopped, removed, or recreated.\n- Provide a reliable and efficient way to manage persistent application data.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Docker Volumes & Persistent Container Storage."
        }
      },
      {
        "title": "2. Persistent Storage with Docker Volumes",
        "content": "Docker containers are ephemeral, meaning data stored inside a container is lost when the container is removed. Docker Volumes provide persistent storage by keeping data independent of the container's lifecycle.\n\n- **Data Durability:** Data remains available even when a container is stopped, deleted, or updated.\n- **Decoupling:** Keeps application data separate from the container and its application logic.\n- **Seamless Updates:** Allows containers or images to be replaced or upgraded without losing important data such as databases or user uploads."
      },
      {
        "title": "3. Independent Lifecycle of Docker Volumes",
        "content": "Unlike containers, Docker Volumes have an **independent lifecycle**, meaning the data stored in a volume remains available even after the container using it is stopped or removed.\n\n- **Persistence Beyond Containers:** Data stored in a volume remains intact even when the container is destroyed.\n- **Shared Access:** A volume can be mounted to multiple containers, allowing different applications or services to share data.\n- **Volume Cleanup:** Volumes are not automatically removed when unused. You can manually remove unused volumes using `docker volume prune`.\n- **Independent Management:** Volumes can be managed separately from containers, providing greater flexibility and data protection."
      },
      {
        "title": "4. Bind Mounts Vs. Docker Volumes",
        "content": "**Feature****Bind Mounts****Docker Volumes****Storage Location**Any user-specified directory on the host.Managed by Docker in a specific storage area.**Management**Manual (Host filesystem dependent).Automatic (Managed via Docker CLI/API).**Lifecycle**Tied to the host's directory structure.Independent of the container lifecycle.**Performance**High, but varies by host OS.Optimized; generally better I/O in production.**Primary Use Case****Development:** Syncing source code for real-time testing.**Production:** Databases, stateful apps, and persistent data.**Security/Isolation**Low; container can modify sensitive host files.High; isolated from the host's sensitive system files."
      },
      {
        "title": "5. Types Of Mounts in Docker",
        "content": "Mount TypeDescriptionKey CharacteristicsCommon Use**Volumes**Storage managed directly by Docker and stored in a dedicated section of the host filesystem, such as `/var/lib/docker/volumes` on Linux.Docker manages the data; reliable and efficient for persistent storage. Can be created using `docker volume create` or automatically by Docker.**Persistent application data**, databases, and important files**Named Pipes**A mechanism that allows communication between a container and the Docker host.Useful for communication with the Docker Engine API and other host services.**Connecting applications inside containers to the Docker Engine API****Bind Mounts**Maps a specific file or directory from the host filesystem directly into a container.Can be located anywhere on the host and can be modified by both Docker and non-Docker processes.**Sharing host files or directories with containers**"
      },
      {
        "title": "6. Named Vs. Anonymous Volumes",
        "content": "**Named Volumes****Anonymous Volumes**Assigned a custom, human-readable name.Assigned a random, long alphanumeric ID.Easy to track, backup, and remove manually.Difficult to track; often lead to \"volume clutter.\"Can be easily referenced by name across multiple containers.Requires the specific ID to reuse, which is impractical.Long-term data (Databases, config files).Temporary storage or specific state isolation.Persist until explicitly deleted by the user.Deleted automatically if the container is run with the `--rm` flag."
      },
      {
        "title": "7. Docker Volume Plugins",
        "content": "Docker Engine volume plugins link Engine installations with external storage systems such as Amazon EBS, allowing data volumes to survive beyond the lifespan of a single Docker host. For further details, please refer to the plugin documentation."
      },
      {
        "title": "8. Command-Line Changes",
        "content": "Use the --volume and --volume-driver options on the docker container run command to grant a container access to a volume. The host's volume name and path are accepted by the --volume (or -v) flag, whereas the driver type is accepted by the --volume-driver flag.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Command-Line Changes",
          "snippet": "$ docker volume create --driver=flocker volumename $ docker container run -it --volume volumename:/data busybox sh"
        }
      },
      {
        "title": "9. Volume Plugin Protocol",
        "content": "If a plugin registers itself as a VolumeDriver when activated, it must provide the Docker Daemon with writeable paths on the host filesystem. The Docker daemon provides these paths to containers to consume. The Docker daemon makes the volumes available by bind-mounting the provided paths into the containers.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Volume Plugin Protocol",
          "snippet": "{    \"Name\": \"volume_name\",    \"Opts\": {}}"
        }
      },
      {
        "title": "10. Manually Creating and Linking Volumes with Proper Naming And Labeling Conventions",
        "content": "- Make sure you use appropriate name and labelling practices when establishing Docker volumes.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Manually Creating and Linking Volumes with Proper Naming And Labeling Conventions",
          "snippet": "docker volume create \\--label description=\"my_vol\" \\--label version=\"1.0.1\" \\my_vol"
        }
      },
      {
        "title": "11. Using Volumes in Dockerfiles with Controlling Permissions For Volumes",
        "content": "- In order to preserve data security and integrity, make sure the appropriate permissions are specified for Docker volumes.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Using Volumes in Dockerfiles with Controlling Permissions For Volumes",
          "snippet": "FROM baseimageRUN mkdir /app/dataRUN chown -R 1000:1000 /app/dataRUN chmod 755 /app/dataVOLUME /app/data"
        }
      },
      {
        "title": "12. Mounting Volumes as Read-Only",
        "content": "Mounting volumes as read-only in Docker allows for the protection of sensitive or critical data from unintended modifications. By setting the volume option to read-only, you ensure that any changes made within the container are not persisted to the underlying volume, preserving data integrity and security.\n\n- -v /path/on/host:/path/in/container:ro mounts the directory /path/on/host on the host machine to /path/in/container in the container as read-only (ro).\n- --name my_container assigns the name my_container to the Docker container.\n- my_image is the name of the Docker image used to create the container.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Mounting Volumes as Read-Only",
          "snippet": "docker run -d \\  -v /path/on/host:/path/in/container:ro \\  --name my_container \\  my_image"
        }
      },
      {
        "title": "13. Tracking And Controlling Volume Consumption",
        "content": "- To maximise resource consumption, track and adjust Docker volume usage on a regular basis.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. Tracking And Controlling Volume Consumption",
          "snippet": "$ docker system df -v"
        }
      },
      {
        "title": "14. Populating Volume Content",
        "content": "When a volume is mounted to a container path that already contains data, Docker copies the existing data into the volume to help preserve it.\n\n- **Data Preservation:** Existing container data is copied to the new volume instead of being lost.\n- **Shared Data:** Other containers using the same volume can access the copied content.\n- **Data Integrity:** Helps prevent accidental data loss when introducing a volume to an existing container path."
      },
      {
        "title": "15. Reusing Volumes When Containers Start",
        "content": "Instead of manually specifying each volume with the -v flag, you can use --volumes-from to inherit volumes from an existing container when starting a new container:\n\nThis command automatically mounts all volumes from the \"test\" container into the \"backup\" container, simplifying the setup process. It's handy for tasks like backing up data from one container to another.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Reusing Volumes When Containers Start",
          "snippet": "# Create the first container$ docker run -d --name test -v my_vol:/data image:latest# Create the second container$ docker run -d --name backup --volumes-from test image:latest"
        }
      },
      {
        "title": "16. Interacting With Docker Volumes",
        "content": "Each volume's name and the storage driver that supports it will be shown. Use docker volume inspect to obtain more in-depth details about a particular volume instead:"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Docker Volumes & Persistent Container Storage",
      "initialCode": "$ docker volume create --driver=flocker volumename $ docker container run -it --volume volumename:/data busybox sh",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Docker Volumes & Persistent Container Storage",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Docker Volumes & Persistent Container Storage in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Docker Volumes & Persistent Container Storage",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Docker Volumes & Persistent Container Storage enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-docker-networking": {
    "id": "devops-docker-networking",
    "badge": "Module 6 • DevOps & Cloud",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "Basics of Docker Networking (Bridge, Host, Overlay)",
    "subtitle": "Complete DevOps engineering guide to Basics of Docker Networking (Bridge, Host, Overlay) — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Docker networking enables containers to communicate with each other, the Docker host and external systems. Each container runs in its own isolated network environment with a unique IP address and network interface. Containers on the same network can communicate directly without exposing ports to the host, allowing you to build secure, interconnected multi-container applications.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Basics of Docker Networking (Bridge, Host, Overlay)."
        }
      },
      {
        "title": "2. Core Networking Concepts",
        "content": "- **Network Namespaces: **Provide network isolation by giving each container its own interfaces, IP, and routing.\n- **veth pairs:** Connect container networks to the host using virtual links.\n- **iptables**: Manage port mapping and NAT to route traffic between hosts and containers.Core Networking Concepts"
      },
      {
        "title": "3. Network Drivers",
        "content": "Docker uses different network drivers to create and manage various types of networks. Here are the most common drivers and what they do:\n\nNetwork Drivers\n- **bridge (default):** Creates a private network where containers communicate internally and require port mapping for external access.\n- **host:** Shares the host network directly, offering better performance but no isolation.\n- **none:** Provides full isolation with no network access.\n- **overlay:** Enables communication across multiple hosts in distributed setups.\n- **macvlan:** Assigns a MAC address to make containers appear as physical devices.\n- **User-defined bridge:** Allows containers to communicate using names instead of IPs."
      },
      {
        "title": "1. Understanding the Docker Network Command",
        "content": "The Docker Network command is the main command that would allow you to create, manage, and configure your Docker Network. Let's see what the sub-commands can be used with the Docker Network command. to know more about Creating a Network in Docker and Connecting a Container to That Network.\n\nWe will see all the Network sub-commands one by one.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Understanding the Docker Network Command",
          "snippet": "sudo docker network"
        }
      },
      {
        "title": "2. Using Docker Network Create command",
        "content": "With the help of the \"Create\" command, we can create our own docker network and can deploy our containers in **it. **",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Using Docker Network Create command",
          "snippet": "sudo docker network create --driver <driver-name> <bridge-name>"
        }
      },
      {
        "title": "3. Using the Docker Network Connect command",
        "content": "Using the \"Connect\" command, you can connect a running Docker Container to an existing Network.\n\nIn this example, we will connect an Ubuntu Container to the Bridge Network we created in the last step.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Using the Docker Network Connect command",
          "snippet": "sudo docker network connect <network-name> <container-name or id>"
        }
      },
      {
        "title": "4. Using the Docker Network Inspect command",
        "content": "Using the Network Inspect command, you can find out the details of a Docker Network.\n\nYou can also find the list of Containers that are connected to the Network.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Using the Docker Network Inspect command",
          "snippet": "sudo docker network inspect <network-name>"
        }
      },
      {
        "title": "5. Using the Docker Network ls command",
        "content": "To list all the Docker Networks, you can use the list command.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Using the Docker Network ls command",
          "snippet": "sudo docker network ls"
        }
      },
      {
        "title": "6. Using the Docker Network Disconnect command",
        "content": "The disconnect command can be used to remove a Container from the Network.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Using the Docker Network Disconnect command",
          "snippet": "sudo docker network disconnect <network-name> <container-name>"
        }
      },
      {
        "title": "7. Using the Docker Network rm command",
        "content": "You can remove a Docker Network using the **rm** command.\n\nNote that if you want to remove a network, you need to make sure that no container is currently referencing the network.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Using the Docker Network rm command",
          "snippet": "sudo docker network rm <network-name>"
        }
      },
      {
        "title": "8. Using the Docker Network prune command",
        "content": "To remove all the unused Docker Networks, you can use the prune command.\n\nTo know more about Docker-published ports refer to this article Docker – Managing Ports",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Using the Docker Network prune command",
          "snippet": "sudo docker network prune"
        }
      },
      {
        "title": "12. Common Operations",
        "content": "- **docker network inspects: ** We may examine the configuration information of a specific network, such as the name of the network, the containers that have linked to this network, the type of driver used to construct this network, and other characteristics, by using the \"docker network inspect\" command.\n- **docker network ls:** We can see all of the networks that are available on the current host by using \"docker network ls\".\n- **docker network creates: **Using the command \"docker network create\" and the name of the driver, such as bridge, overlay, or macvlan, we can establish a new network.\n- **docker network connects:** In order to use this command, we must first confirm that the appropriate network has already been formed on the host. Then, using docker **\"network connect\"**, we may attach the container to the necessary network.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Basics of Docker Networking (Bridge, Host, Overlay)",
      "initialCode": "sudo docker network",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Basics of Docker Networking (Bridge, Host, Overlay)",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Basics of Docker Networking (Bridge, Host, Overlay) in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Basics of Docker Networking (Bridge, Host, Overlay)",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Basics of Docker Networking (Bridge, Host, Overlay) enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-docker-ports": {
    "id": "devops-docker-ports",
    "badge": "Module 6 • DevOps & Cloud",
    "readingTime": "10 min read",
    "level": "Intermediate",
    "title": "Docker Port Mapping & Container Exposure",
    "subtitle": "Complete DevOps engineering guide to Docker Port Mapping & Container Exposure — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Docker containers run in isolated network namespaces. By default, they are unreachable from the host or the internet. To make a service accessible, we must bridge the gap between the Container Network and the Host Network.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Docker Port Mapping & Container Exposure."
        }
      },
      {
        "title": "2. Port Mapping Syntax",
        "content": "The -p (or --publish) flag is the key. The syntax follows the HOST:CONTAINER pattern: docker run -p <Host_IP>:<Host_Port>:<Container_Port>/<Protocol> <Image>\n\n- Host Port: The port you hit in your browser (e.g., localhost:8080).\n- Container Port: The port the application is listening on inside the container (e.g., Nginx defaults to 80).\n- Protocol: Defaults to tcp, but can be udp (useful for DNS or streaming services)"
      },
      {
        "title": "3. Pulling Image From Docker Hub",
        "content": "Docker Hub is a hosted repository service for finding, storing, and sharing container images. It provides official images along with documentation and commands for pulling them.\n\n- **Image Repository:** Stores and distributes Docker images.\n- **Official Images:** Provides trusted images such as Nginx with official image tags.\n- **Image Information:** Each repository contains details about the image, available tags, and usage instructions.\n- **Docker Pull:** Provides the `docker pull` command to download an image to your local system.docker pull command **Step 1: **Use the command to pull the Nginx image.\n\n**Output**:\n\nOutputRunning A Container From The Pulled Image:\n\n- When we run a container using the docker run command, it does not publish any of its ports to the outside world.\n- To expose our container port to services outside of Docker, or to containers that are not in the same network as our container, use the --publish or -p flag.\n- A typical example of --publish flag:\nLet us break this command to understand better:\n\n- Docker run Nginx: will start the container from the Nginx image.\n- -p 8080:80: will map TCP port 80 in the container to port 8080 on the Docker host.\n- --name webhost: will name our container webhost, if not specified docker will give it a random name.\n- -d: flag will run docker in a detached mode that is,  in the background.-p 8080:80\nThis will list all configurations of the Nginx image, from where we can locate the ExposedPort property.\n\nOutput**Step 2: **This data can be filtered out using the --format flag:\n\nOutput**Step 3:** Now that we know for sure that Nginx runs on TCP port 80 inside the container's virtual network. We can use the docker run command.\n\nOutput** Step 4:** Verify if Nginx is running on port 8080:\n\nOutput",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Pulling Image From Docker Hub",
          "snippet": "$ docker pull nginx"
        }
      },
      {
        "title": "4. Creating And Exposing Local Containers",
        "content": "Well, this was easy, let us create a local docker image for a react app and publish its port:\n\n**Step 1: **For this, I am using a simple react application. Let us initialize the react application first:\n\nOutputIf you don't have NodeJs installed you can clone a react app project from GitHub.\n\n**Step 2:** Create A Dockerfile file in the root directory of the project. Create a Dockerfile named file in your project's root directory and paste this:\n\n**Step 3:** Build An Image.\n\nOutput**Step 4: **Run the Image:.$ docker inspect --format=\"{{.ContainerConfig.ExposedPorts}}\" basic-react-app\n\nThis step will need a little explanation. Ours react app runs on port 3000 inside the container -p 3000:3000 maps this port to the host port.\n\nOutput**Step 5:** Verify in your browser\n\nbrowser",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Creating And Exposing Local Containers",
          "snippet": "$ npx create-react-app gfg"
        }
      },
      {
        "title": "5. Common Commands for Debugging",
        "content": "CommandPurposedocker psThe go-to command. Shows all running containers and their PORT mappings.docker port <container_id>Lists all port mappings for a specific container in a clean format.docker inspect --format='{{.NetworkSettings.Ports}}' <id>Returns a JSON map of all port bindings for that specific container.docker image inspect --format='{{.Config.ExposedPorts}}' <image>Shows which ports the image author intended to be used (the EXPOSE instruction).docker run -P <image>Publish all: Maps all exposed ports in the Dockerfile to random high-range ports on the host.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Docker Port Mapping & Container Exposure",
      "initialCode": "$ docker pull nginx",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Docker Port Mapping & Container Exposure",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Docker Port Mapping & Container Exposure in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Docker Port Mapping & Container Exposure",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Docker Port Mapping & Container Exposure enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-docker-registry": {
    "id": "devops-docker-registry",
    "badge": "Module 6 • DevOps & Cloud",
    "readingTime": "12 min read",
    "level": "Intermediate",
    "title": "Docker Registry (Docker Hub & Private Registries)",
    "subtitle": "Complete DevOps engineering guide to Docker Registry (Docker Hub & Private Registries) — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A Docker Registry is a centralized system for storing, managing, and distributing Docker images. It helps streamline the deployment and management of containerized applications.\n\n- Designed to be stateless and scalable.\n- Organizes images into repositories, with multiple versions managed using tags.\n- Allows users to upload (push) and download (pull) Docker images.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Docker Registry (Docker Hub & Private Registries)."
        }
      },
      {
        "title": "2. Components",
        "content": "- **Docker Image**: A Docker Image is a template (blueprint) used to create Docker Containers.\n- **Docker Images Registry**: A Docker Registry is a storage system where Docker Images are pushed (uploaded) and pulled (downloaded).\n- **Docker Hub: **It is the official cloud-based Docker Registry service provided by Docker Inc. It is the default registry where Docker looks for images when you run docker pull or docker run without specifying a registry.\n- **Docker Login**: It is a Docker CLI command used to authenticate your local Docker client with a Docker Registry (like Docker Hub, AWS ECR, GCP GCR, Azure ACR, or a private registry). It allows you to push (upload) and pull (download) Docker images securely by verifying your username and password or access token.\n- **Authentication of Dockerhub**: Authentication in Docker Hub ensures secure pushing and pulling of Docker images, especially when dealing with private repositories and DevOps pipelines."
      },
      {
        "title": "3. Different Types of Docker Registries",
        "content": "TypeRegistryDescription**Cloud-Hosted / Public**Docker HubDefault and largest public registry with millions of official and community images.**Cloud-Hosted / Public**Amazon ECRAWS-managed registry integrated with the AWS ecosystem.**Cloud-Hosted / Public**Google Artifact Registry (GAR)Google Cloud's recommended registry for container images and other artifacts.**Cloud-Hosted / Public**Azure Container Registry (ACR)Microsoft's managed registry service for Azure.**Cloud-Hosted / Public**GitLab Container RegistryIntegrated with the GitLab CI/CD platform.**Private / Self-Hosted**Docker RegistryOfficial open-source `registry:2` image for running a basic private registry.**Private / Self-Hosted**HarborEnterprise-grade open-source registry with features such as vulnerability scanning and role-based access control."
      },
      {
        "title": "4. Basic commands for Docker registry",
        "content": "The following are the basic commands for Docker registry:\n\n**1. Starting your registry**\n\n- This command effectively starts a Docker registry on your local machine or server, accessible via port 5000.\n- It instructs Docker to start a registry named registry:2 in detached mode with the name registry. Map the registry's port 5000 to a local port 5000 and restart it immediately if it dies.\n**2. Pulling some images from the hub**\n\n**3. Tagging that image and point to your registry**\n\n**4. Pushing the image**\n\n**5. Pulling that image back**\n\n**6. Stop the registry**\n\n**7. Stop the registry and remove the data**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Basic commands for Docker registry",
          "snippet": "docker run -d -p 5000:5000 --restart=always --name registry registry:2"
        }
      },
      {
        "title": "5. Docker Registry Working",
        "content": "A Docker Registry stores and distributes Docker images. Users can push images to the registry and pull them when needed.\n\n- Docker Registry provides a storage and distribution platform for Docker images.\n- Users can upload their Docker images to the registry, and these images can be tagged with a version number and a name.\n- Other users can then search for and download these images from the registry.\n- Docker Registry can be self-hosted or used as a cloud-based service.\n- Docker Registry helps the administrators to implement access controls and permissions ensuring only authorized users and systems.\n- Docker Registry facilitates with seamless integration through Continuous Integration/Continuous Deployment (CI/CD) pipelines."
      },
      {
        "title": "6. Importance of Registries",
        "content": "Docker registries are a cornerstone of modern software development for several key reasons:\n\n- Stores images built by CI for deployment by CD.\n- Provides a shared location for Docker images.\n- Uses tags to manage image versions and rollbacks.\n- Controls access to private images.\n- Scans images for potential vulnerabilities.\n- Makes images available across different environments.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Docker Registry (Docker Hub & Private Registries)",
      "initialCode": "docker run -d -p 5000:5000 --restart=always --name registry registry:2",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Docker Registry (Docker Hub & Private Registries)",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Docker Registry (Docker Hub & Private Registries) in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Docker Registry (Docker Hub & Private Registries)",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Docker Registry (Docker Hub & Private Registries) enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-intro": {
    "id": "devops-k8s-intro",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Introduction to Kubernetes (K8s) Container Orchestration",
    "subtitle": "Complete DevOps engineering guide to Introduction to Kubernetes (K8s) Container Orchestration — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![Docker & Kubernetes Architecture](/images/devops/docker-k8s-arch.svg)\n\n- Before Kubernetes, Docker made application deployment easier by packaging applications and their dependencies into portable **containers**. As applications grew to hundreds or thousands of containers, managing them manually became increasingly complex.\n\n- Managing and scaling large numbers of containers becomes difficult.\n- Maintaining consistent applications across multiple cloud environments is challenging.\n- Managing access, resources, and security across large container environments becomes complex.\n- Updating applications without downtime requires automated deployment and coordination.\n- Kubernetes automates container deployment, scaling, networking, and lifecycle management across a cluster.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Introduction to Kubernetes (K8s) Container Orchestration."
        }
      },
      {
        "title": "2. Features of K8s",
        "content": "- **Automated Scheduling:** Efficiently places containers on nodes for optimal resource use.\n- **Self Healing: ** Automatically restarts, replaces, and reschedules failed containers.\n- **Rollouts & Rollbacks:** Manages application updates and reverts when needed.\n- **Scaling & Load Balancing:** Supports horizontal scaling and distributes traffic.\n- **Resource Optimization:** Monitors and ensures efficient resource utilization."
      },
      {
        "title": "3. Monolithic Vs Microservices",
        "content": "Monolithic Vs Microservices Architecture**Monolithic****Microservices**Single, unified code base and executable.Collection of small, independent services.Scaled by replicating the entire app.Each service can be scaled independently.All-or-nothing; entire app must be redeployed.Services can be deployed individually.A crash in one module can take down the app.Failure in one service is usually isolated.Forced to use one language/framework.Each service can use a different stack.Simple to start; complex as it grows.High initial setup and operational complexity."
      },
      {
        "title": "4. Terminologies in K8s",
        "content": "Think of Kubernetes as a well organized company where different teams and systems work together to run applications efficiently. Here’s how the key terms fit into this system:"
      },
      {
        "title": "1. Pod",
        "content": "A Pod is the smallest unit you can deploy in Kubernetes. It wraps one or more containers that need to run together, sharing the same network and storage. Containers inside a Pod can easily communicate and work as a single unit."
      },
      {
        "title": "2. Node",
        "content": "A Node is a machine (physical or virtual) in a Kubernetes cluster that runs your applications. Each Node contains the tools needed to run Pods, including the container runtime (like Docker), the Kubelet (agent), and the Kube proxy (networking)."
      },
      {
        "title": "3. Cluster",
        "content": "A Kubernetes cluster is a group of computers (called nodes) that work together to run your containerized applications. These nodes can be real machines or virtual ones.\n\nThere are two types of nodes in a Kubernetes cluster:\n\n**Master node (Control Plane):**\n\n- Think of it as the brain of the cluster.\n- It makes decisions, like where to run applications, handles scheduling, and keeps track of everything.**Worker nodes:**\n\n- These are the machines that actually run your apps inside containers.\n- Each worker node has a Kubelet (agent), a container runtime (like Docker or containerd), and tools for networking and monitoring."
      },
      {
        "title": "4. Deployment",
        "content": "A Deployment is a Kubernetes object used to manage a set of Pods running your containerized applications. It provides declarative updates, meaning you tell Kubernetes what you want, and it figures out how to get there."
      },
      {
        "title": "5. ReplicaSet",
        "content": "A ReplicaSet ensures that the right number of identical Pods are running."
      },
      {
        "title": "6. Service",
        "content": "A Service in Kubernetes is a way to connect applications running inside your cluster. It gives your Pods a stable way to communicate, even if the Pods themselves keep changing."
      },
      {
        "title": "7. Ingress",
        "content": "Ingress is a way to manage external access to your services in a Kubernetes cluster. It provides HTTP and HTTPS routing to your services, acting as a reverse proxy."
      },
      {
        "title": "8. ConfigMap",
        "content": "- A ConfigMap stores configuration settings separately from the application, so changes can be made without modifying the actual code.\n- Imagine you have an application that needs some settings, like a database password or an API key.\n- Instead of hardcoding these settings into your app, you store them in a ConfigMap.\n- Your application can then read these settings from the ConfigMap at runtime, which makes it easy to update the settings without changing the app code."
      },
      {
        "title": "9. Secret",
        "content": "A Secret is a way to store sensitive information (like passwords, API keys, or tokens) securely in a Kubernetes cluster."
      },
      {
        "title": "10. Persistent Volume (PV)",
        "content": "A Persistent Volume (PV) in Kubernetes is a piece of storage in the cluster that you can use to store data and it doesn’t get deleted when a Pod is removed or restarted."
      },
      {
        "title": "11. Kubelet",
        "content": "A Kubelet runs on each Worker Node and ensures Pods are running as expected."
      },
      {
        "title": "12. Kube-proxy",
        "content": "Kube-proxy manages networking inside the cluster, ensuring different Pods can communicate.\n\nComment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Introduction to Kubernetes (K8s) Container Orchestration",
      "initialCode": "# Introduction to Kubernetes (K8s) Container Orchestration\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Introduction to Kubernetes (K8s) Container Orchestration",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Introduction to Kubernetes (K8s) Container Orchestration in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Introduction to Kubernetes (K8s) Container Orchestration",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Introduction to Kubernetes (K8s) Container Orchestration enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-arch": {
    "id": "devops-k8s-arch",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "Kubernetes Cluster Architecture (API Server, etcd, Kubelet)",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Cluster Architecture (API Server, etcd, Kubelet) — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![Docker & Kubernetes Architecture](/images/devops/docker-k8s-arch.svg)\n\n- Kubernetes follows a client–server architecture consisting of a control plane (master) and worker nodes. The control plane includes components such as the API Server, Scheduler, Controller Manager, and etcd for cluster state storage.\n\nWorker nodes run application workloads and include kubelet for communication with the control plane, kube-proxy for networking, and a container runtime (such as containerd or Docker) to manage containers.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Cluster Architecture (API Server, etcd, Kubelet)."
        }
      },
      {
        "title": "2. Control Plane Components",
        "content": "It is basically a collection of various components that help us in managing the overall health of a cluster.  For example, if you want to set up new pods, destroy pods, scale pods, etc. Basically, 4 services run on the Control Plane:"
      },
      {
        "title": "1. Kube-API server",
        "content": "The API server is a component of the Kubernetes control plane that exposes the Kubernetes API. It is like an initial gateway to the cluster that listens to updates or queries via CLI like Kubectl.\n\n- Kubectl communicates with API Server to inform what needs to be done like creating pods or deleting pods etc. It also works as a gatekeeper.\n- It generally validates requests received and then forwards them to other processes.\n- No request can be directly passed to the cluster, it has to be passed through the API Server."
      },
      {
        "title": "2. Kube-Scheduler",
        "content": "- Watches for newly created Pods that have no assigned node.\n- Selects the best Worker Node for a Pod based on resource requirements, policy constraints, and hardware/software limits."
      },
      {
        "title": "3. Kube-Controller-Manager",
        "content": "- Runs controller processes that maintain the \"desired state\" of the cluster.\n- **Node Controller:** Monitors node health.\n- **Replication Controller:** Ensures the correct number of Pod replicas are running."
      },
      {
        "title": "4. etcd",
        "content": "- A consistent, high-availability key-value store.\n- Stores all cluster data (the \"Source of Truth\"). If it isn't in etcd, it doesn't exist in Kubernetes."
      },
      {
        "title": "7. Worker Node Components",
        "content": "These are the nodes where the actual work happens. Each Node can have multiple pods and pods have containers running inside them. There are 3 processes in every Node that are used to Schedule and manage those pods. The following are the some of the components related to Node:"
      },
      {
        "title": "1. Container runtime",
        "content": "- The software responsible for actually running the containers (e.g., **containerd**, **CRI-O**).\n- It pulls images from a registry and starts/stops the containers."
      },
      {
        "title": "2. kubelet",
        "content": "- An agent that runs on each node in the cluster.\n- Ensures that containers are running in a Pod by following instructions (PodSpecs) from the Control Plane.\n- Reports the health and status of the node back to the API server."
      },
      {
        "title": "3. kube-proxy",
        "content": "- A network proxy that maintains network rules on nodes.\n- Allows network communication to your Pods from inside or outside of the cluster.\n- Handles service discovery and load balancing."
      },
      {
        "title": "11. Addons Plug-in",
        "content": "Kubernetes add-ons are additional components that extend the functionality of a Kubernetes cluster. They are typically deployed as Kubernetes resources and provide capabilities such as DNS, networking, virtualization, and cluster management.\n\n- **CoreDNS:** Provides DNS-based service discovery and name resolution within the Kubernetes cluster.\n- **KubeVirt:** Enables virtual machines to run alongside containers, allowing both workloads to be managed through Kubernetes.\n- **ACI (Application Containerization Interface):** Helps integrate and manage containerized applications across different environments.\n- **Calico:** Provides high-performance networking and network policy enforcement, helping secure communication between workloads."
      },
      {
        "title": "12. Commands for Kubectl",
        "content": "Here are some common commands for interacting with a Kubernetes cluster:\n\nTo view a list of all the pods in the cluster, you can use the following command:\n\nlist of all the pods in the clusterTo view a list of all the nodes in the cluster, you can use the following command:\n\nlist of all the nodes in the clusterTo view a list of all the services in the cluster, you can use the following command:\n\nlist of all the services in the clusterComment",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Commands for Kubectl",
          "snippet": "kubectl get pods"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Cluster Architecture (API Server, etcd, Kubelet)",
      "initialCode": "kubectl get pods",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Cluster Architecture (API Server, etcd, Kubelet)",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Cluster Architecture (API Server, etcd, Kubelet) in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Cluster Architecture (API Server, etcd, Kubelet)",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Cluster Architecture (API Server, etcd, Kubelet) enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-components": {
    "id": "devops-k8s-components",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Fundamental Kubernetes Components & Their Roles",
    "subtitle": "Complete DevOps engineering guide to Fundamental Kubernetes Components & Their Roles — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Kubernetes or K8s is an open-sourced container orchestration technology that is used for automating the manual processes of deploying, managing and scaling applications by the help of containers. Kubernetes was originally developed by engineers at Google and In 2015, it was donated to CNCF (Cloud Native Computing Foundation)\n\nTo understand Kubernetes, one must understand its basic components and its building blocks. In this article, we will be discussing the most fundamental components of Kubernetes as well as what are they used for.\n\nKubernetes has tons of components but most of the time we are going to be working with just a handful of them. Following is the list of all the important components of Kubernetes along with their roles in Kubernetes.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Fundamental Kubernetes Components & Their Roles."
        }
      },
      {
        "title": "1. Pods",
        "content": "Pod is the smallest or fundamental component of a Kubernetes architecture. One very important feature of Pod is that it is ephemeral. This means that if a Pod fails, then Kubernetes can automatically create its new replica."
      },
      {
        "title": "3. Role of a Pod",
        "content": "The pod is an abstraction over a container. Pod creates a running environment or a layer on top of the Container. The reason is that Kubernetes wants to abstract away the container runtime or container technologies so that we can replace them if we want to. This is also so that we don't have to directly work with Docker or whatever container technology we use in Kubernetes. so we only interact with the Kubernetes layer.\n\nThe pod is usually meant to run one application container inside of it. You can run multiple containers inside one Pod but usually, it's only the case if you have one main application container and a helper container or some side service that has to run inside of that pod.\n\nIn the diagram above we have an application Pod which is our own application and that also uses a database Pod with its own container. We have one server and two containers running on it with a abstraction layer on top of it."
      },
      {
        "title": "2. Virtual Network",
        "content": "Virtual Network is the component of Kubernetes which enables the worker nodes and the master nodes to talk to each other. Virtual Network actually turns all the nodes inside of the cluster into one powerful machine that has the sum of all the resources of individual nodes."
      },
      {
        "title": "5. Role of Virtual Network",
        "content": "Role of Virtual Network inside a Kubernetes Cluster is to enable the worker nodes and the master node to communicate with each other enabling them to act as one single powerful machine."
      },
      {
        "title": "3. IP addresses",
        "content": "In Kubernetes, inside the virtual network, each Pod gets its own IP address (note that Pod gets the IP address not the container) and each Pod can communicate with each other using that IP address."
      },
      {
        "title": "7. Role of IP addresses",
        "content": "In a Kubernetes Cluster, Pods communicate can communicate with each other by the help of their IP addresses. It is an internal IP address so it's not the public. Let's say that our application container can communicate with database using the IP address. However, Pod components in Kubernetes are ephemeral (which means that they can die very easily). Have a look at the diagram.\n\nWhen the Pods die, for example, if we lose a base container because the container crashed because the application crashed inside or because the Nodes that we are running them on ran out resources, the Pod will die and a new one will get created in its place. When that happens it will get assigned a new IP address. This is very inconvenient because now we have to adjust the IP address every time the Pod restarts. And that is why we use another Kubernetes component called service."
      },
      {
        "title": "4. Service",
        "content": "The official definition on services says that \"a Service is a method for exposing a network application that is running as one or more Pods in your cluster.\" Service is basically a static IP address or permanent IP address that can be attached to the Pod. That means that \"my app\" will have its own Service and database Pod will have its own Service."
      },
      {
        "title": "9. Role of Service",
        "content": "The Role of Service is that the life cycles of Service and the Pod are not connected so even if the pod dies the Service and its IP address will stay so we don't have to change that endpoints every time the Pod dies.\n\nNow we want our application to be accessible through a browser and for this we would have to create an external service. External service is a service that opens the communication from external sources. But we would not want our database to be open to the public requests (because of security reasons). So for that we would create an internal service - this is a type of a service that you specify when creating one.\n\nExample of Internal Service:\n\nExample of External Service:\n\nhowever this URL of the external service is not very practical, it is good for test purposes but not for the end product so usually you will want your URL to look like this if you want to talk to your application with a secure protocol and a domain name -\n\nAnd for that we use Ingress.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Role of Service",
          "snippet": "http://db-service-ip:port"
        }
      },
      {
        "title": "5. Ingress",
        "content": "The official definition of Ingress says \"Ingress is an API object that manages external access to the services in a cluster\"."
      },
      {
        "title": "11. Role of Ingress",
        "content": "The role of Ingress is that instead of Service, the request goes first to Ingress and it does the forwarding then to the Service."
      },
      {
        "title": "6. Config Map",
        "content": "Config Map is the external configuration to your application. Config Map usually contains configuration data like URLs of database or URLs of some other services that we are using."
      },
      {
        "title": "13. Role of Config Map",
        "content": "Pods communicate with each other using a Service. Our application will have a database end point, For example, mongo-db-service will have a database end point that it uses to communicate with the database. Now the problem is where should we configure? Usually we would keep this database URL or endpoints inside of the built image of the application. And there is an issue with that - For example, if the endpoint of the Service or Service name in this case changed to mongo-db. We will have to adjust that URL in the application and we would have to rebuild the application with a new version, then push it to the repository and then pull that new image in our pod and then restart the whole thing. This you can see is very tedious for a small change like database URL. To solve this problem Kubernetes has a component called Config Map. Diagram of Config map along with Secret is available in the next section.\n\nIn Kubernetes, we just connect Config Map to the Pod so that the Pod actually gets the data that Config Map contains. Now if we want to change the name of the service, or the endpoint of the service, we just have to edit the config map and that's it. We don't have to build a new image and go through that whole cycle again."
      },
      {
        "title": "6. Secret",
        "content": "Secret is just like config map but the difference is that it's used to store secret data credentials and it stores this data not a plain text format but in base64 encoded format."
      },
      {
        "title": "15. Role of Secret",
        "content": "Role of Secret like we just discussed is similar to that of a Config map. Secret is used to store the data and credentials that we would not want to share with others.\n\nDatabase Username and Password can also be part of the external configuration. Username and Password may also change in the application deployment process but putting a password or other credentials in a Config Map in plain text format would be insecure. For this purpose Kubernetes has the component called Secret. The passwords, certificates, etc that you don't want other people to have access to would go in the Secret. Just like Config Map you can just connect it to your Pod so that the Pod can actually see those data and read from the Secret."
      },
      {
        "title": "7. Volumes",
        "content": "A Volume in Kubernetes is a data storing feature with the help of which we can store data that is persistent and can be accessed by containers in a Kubernetes pod."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Fundamental Kubernetes Components & Their Roles",
      "initialCode": "http://db-service-ip:port",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Fundamental Kubernetes Components & Their Roles",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Fundamental Kubernetes Components & Their Roles in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Fundamental Kubernetes Components & Their Roles",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Fundamental Kubernetes Components & Their Roles enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-pods": {
    "id": "devops-k8s-pods",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "Kubernetes Pods: Lifecycle, Init Containers & Sidecars",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Pods: Lifecycle, Init Containers & Sidecars — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A Pod represents a single instance of a running process in your cluster and can contain one or more containers. Think of a Pod as a lightweight, application-specific \"logical host\". All containers within a single Pod are guaranteed to be co-located on the same worker node, and they share the same environment. This shared context is the magic of the Pod abstraction and includes:\n\n- **Shared Networking:** Every Pod is assigned a unique IP address. All containers within that Pod share this IP address and port space, meaning they can communicate with each other using localhost.\n- **Shared Storage:** Containers within a Pod can share storage volumes, allowing them to have a common filesystem and exchange data seamlessly.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Pods: Lifecycle, Init Containers & Sidecars."
        }
      },
      {
        "title": "2. Kubernetes Pods",
        "content": "In the following diagram, you can see cube-like structures representing containers. A pod can contain one or more containers. The cylinder-like structures represent volumes, which are used to store data for containers. The large circles represent pods, which are the smallest deployable units in Kubernetes.\n\nA Pod can contain one or more containers, and all containers inside a Pod share:\n\n- The same IP address\n- Storage volumes\n- Network resources\n- Other required configurationsPods allow easy movement of containers within a cluster. They are created and managed by controllers, which handle:\n\n- Rollouts (new versions of Pods)\n- Replication (keeping the right number of Pods running)\n- Health monitoring (restarting or replacing failed Pods)If a node fails in the cluster, the controller detects the unresponsive Pod and replicates it on another node to continue the same function.\n\nThe three commonly used controllers are:\n\n- **Jobs** → For batch tasks that run once and complete (ephemeral).\n- **Deployments** → For stateless and persistent applications, such as web services.\n- **StatefulSets** → For stateful and persistent applications, like databases"
      },
      {
        "title": "3. The Pod Lifecycle",
        "content": "A Pod follows a defined lifecycle and exists in one of several high-level phases.\n\n- **Pending:** The Pod has been accepted by the Kubernetes system, but one or more of the container images has not been created. This could be due to image download time or waiting for the scheduler to find a suitable node.\n- **Running:** The Pod has been bound to a node, and all of the containers have been created. At least one container is still running, or is in the process of starting or restarting.\n- **Succeeded:** All containers in the Pod have terminated in success (exited with status 0), and will not be restarted. This is a terminal phase for Pods that run finite tasks, like those managed by a Job.\n- **Failed:** All containers in the Pod have terminated, and at least one container has terminated in failure (exited with a non-zero status).\n- **Unknown:** For some reason the state of the Pod could not be obtained, typically due to a network communication problem with the node where the Pod is supposed to be running"
      },
      {
        "title": "4. Pod Operating System",
        "content": "The operating system (OS) running inside pods is typically determined by the container image used to create the pod's containers. Pods in Kubernetes can run containers based on various Linux distributions, such as Ubuntu, Alpine Linux, or CentOS, among others."
      },
      {
        "title": "5. Pods and controllers on Kubernetes",
        "content": "The pod will not be rescheduled to a different node when it expires because it is ephemeral (lasting only a very brief time). , we shouldn't directly construct or use pods; instead, we should deploy pod-like deployment, replica sets, and daemon sets to maintain the pod with the aid of Kubernetes services. We have to deploy the pods with the help of objects. The main objects are\n\n- Deployment.\n- Replication Controller.\n- Replica Set."
      },
      {
        "title": "6. Getting Started with Kubernetes Pod",
        "content": "**1. Create a Pod Imperatively**\n\nFor a quick test, you can create a simple Nginx Pod with a single command. This is a great way to verify that your cluster is working.\n\nThis command instructs Kubernetes to create a Pod named nginx using the official nginx container image.\n\n**2. Generate a Declarative Manifest**\n\nWriting YAML from scratch can be tedious. A powerful technique is to use an imperative command to generate the YAML for you. The --dry-run=client -o yaml flags tell kubectl to output the YAML representation of the object without actually creating it in the cluster.\n\nNow, open the pod.yaml file. It will look something like this:\n\nLet's break down the key fields:\n\n- apiVersion: The version of the Kubernetes API you're using to create this object. `v1` is the core API group.\n- kind: The type of object you want to create. In this case, a `Pod`.\n- metadata: Data that helps uniquely identify the object, including its `name` and `labels`.\n- spec: The most important section, which defines the desired state for the object. For a Pod, this includes the list of `containers` to run, their images, ports, and more.   **3. Create a Pod Declaratively**\n\nFirst, let's clean up the Pod we created imperatively.\n\nNow, apply the configuration from the manifest file you just created. The kubectl apply command is the cornerstone of the declarative approach. It tells Kubernetes to make the cluster's live state match the state defined in the file.\n\nKubernetes will read the file and create the Pod. If you were to change the file and run kubectl apply again, Kubernetes would intelligently update the existing Pod to match your new desired state.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Getting Started with Kubernetes Pod",
          "snippet": "kubectl run nginx --image=nginx"
        }
      },
      {
        "title": "7. Inspecting and Interacting with Your Pod",
        "content": "Once a Pod is running, you'll need a set of commands to check its status, view its logs, and debug any issues.\n\n- **Get Pod Status:** To see a list of your Pods and their current status, use kubectl get pods.\n\n- **Describe the Pod:** For a detailed, human-readable view of the Pod's state, kubectl describe is your most powerful tool. It shows labels, resource requirements, events (like image pulling and scheduling), IP address, and more. It is often the first command you run when a Pod isn't behaving as expected.\n\n- **View Container Logs:** To see the standard output from a container inside the Pod, use kubectl logs.\n\n- **Execute a Command Inside a Container:** To debug interactively, you can get a shell inside a running container with kubectl exec. The `-it` flags connect your terminal to the container's standard input and output.   Once inside, you have a shell where you can run commands like ls, cat, or ps to inspect the container's environment from within.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Inspecting and Interacting with Your Pod",
          "snippet": "kubectl get pods# NAME    READY   STATUS    RESTARTS   AGE# nginx   1/1     Running   0          60s"
        }
      },
      {
        "title": "8. Advanced Patterns: Multi-Container Pods",
        "content": "Containers in a Pod are so tightly coupled, you can use them to create powerful, cohesive application units. Two common patterns are Init Containers and Sidecar Containers."
      },
      {
        "title": "9. Init Containers",
        "content": "An Init Container is a specialized container that runs and completes before the main application containers are started. They are defined in a separate initContainers block in the Pod manifest. You can have multiple Init Containers, and they will run sequentially. Each one must exit successfully before the next one is started.\n\n**Use cases for Init Containers:**\n\n- Waiting for a backend service like a database to become available.\n- Running a setup script to prepare a database schema or pre-load data.\n- Cloning a Git repository into a shared volume for the main application to use.\n- Registering the Pod with a central directory before the main application starts."
      },
      {
        "title": "10. Sidecar Containers",
        "content": "A Sidecar container runs alongside your main application container within the same Pod. Unlike an Init Container, it starts with and continues to run for the full life of the application container. This pattern allows you to extend or enhance the functionality of the main container without adding complexity to the application's own codebase.\n\n**Use cases for Sidecar Containers:**\n\n- **Logging:** A sidecar can tail log files from a shared volume and forward them to a centralized logging system.\n- **Monitoring:** A sidecar can collect metrics from the main application and expose them to a monitoring system like Prometheus.\n- **Service Mesh Proxy:** In a service mesh like Istio, a sidecar proxy handles all inbound and outbound network traffic for the main container, enabling features like traffic management, security, and observability.\n- **Data Synchronization:** A sidecar can sync files from a central source (like an S3 bucket or a Git repository) into a shared volume for the main application to consume."
      },
      {
        "title": "11. Communication between Kubernetes pods",
        "content": "- **Intra-Pod (Same Pod):** Containers within the same Pod share a network namespace and a single IP address. They communicate with each other via **localhost** using different port numbers.\n- **Inter-Pod (Same Node):** Pods on the same worker node communicate through a **virtual bridge** (like `cbr0`). Each Pod has a unique private IP, allowing them to send packets directly to one another without NAT.\n- **Inter-Pod (Different Nodes):** Communication across nodes is managed by a **CNI plugin** (like Calico or Flannel). It creates an \"overlay network\" that routes traffic from one node to the IP of a Pod on another node.\n- **Service-Level Discovery:** Since Pod IPs are temporary, a **Service** provides a stable \"Virtual IP.\" Other Pods talk to the Service, which then load-balances the traffic to the correct backend Pods.\n- **External Access:** To reach Pods from outside the cluster, you use an **Ingress** or a **LoadBalancer** service, which maps external traffic to the internal Pod network."
      },
      {
        "title": "12. Kubernetes Pod update and replacement",
        "content": "In Kubernetes, updating and swapping out pods is like applying an additional application of create to your application.\n\n- **Updating Pods**: It's like making changes to your application while it's still running. You can tweak settings or replace the code without interrupting service. Think of it as a smooth, rolling upgrade that keeps everything running smoothly.\n- **Pod Replacement**: This happens when a pod needs to be swapped out entirely, maybe because it's crashed or needs an update. Kubernetes automatically replaces it with a new one to keep your application running without missing a beat. It's like changing a flat tire while your car is still moving, ensuring you keep going without any down"
      },
      {
        "title": "13. Kubernetes Static Pods",
        "content": "**Static Pods in Kubernetes**\n\nStatic pods are managed directly by the kubelet on a specific node rather than through the API server. You define them using a pod manifest file placed in a folder like /etc/kubernetes/manifests, and the kubelet automatically starts the pod. They are node-specific, cannot be managed by Deployments or ReplicaSets, and are often used for critical system components like `kube-apiserver` or monitoring agents."
      },
      {
        "title": "14. Basic Kubectl Commands for Kubernetes Pods",
        "content": "**Create Pod: **A pod can be created by using the create command format.\n\nIn the [FILENAME], you need to insert the required filename with which you want to create your file, and then a new pod with the name GeeksforGeeks will be created.\n\n**To Delete Kubernetes Pod: ** Delete the pod using the below command.,\n\nHere the pod named GeeksforGeeks will be deleted\n\n**To Get Kubernetes Pod: **To see the number of pods available in the particular namespace can be seen using the below command.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Basic Kubectl Commands for Kubernetes Pods",
          "snippet": "kubectl create -f [FILENAME]"
        }
      },
      {
        "title": "15. Troubleshooting with kubectl",
        "content": "- kubectl get pods**:** Lists all pods in the current namespace.\n- kubectl describe pod <pod-name>: Provides detailed information about a specific pod.\n- kubectl logs <pod-name>**:** Retrieves the logs from a specific pod.  Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Pods: Lifecycle, Init Containers & Sidecars",
      "initialCode": "kubectl run nginx --image=nginx",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Pods: Lifecycle, Init Containers & Sidecars",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Pods: Lifecycle, Init Containers & Sidecars in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Pods: Lifecycle, Init Containers & Sidecars",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Pods: Lifecycle, Init Containers & Sidecars enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-deployments": {
    "id": "devops-k8s-deployments",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Kubernetes Deployments & ReplicaSets",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Deployments & ReplicaSets — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A Kubernetes Deployment is a Kubernetes resource used to manage and update applications running in Pods. It helps to:\n\n- Create and manage Pods.\n- Maintain the desired number of Pod replicas.\n- Scale applications.\n- Perform rolling updates.\n- Roll back to previous versions.\n- Maintain the desired state of an application.A Deployment manages a ReplicaSet, which in turn manages the Pods. The basic relationship is:",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Deployments & ReplicaSets."
        }
      },
      {
        "title": "2. Use Cases",
        "content": "- **Application Deployment:** Creates and manages application Pods.\n- **Scaling:** Increases or decreases the number of Pod replicas.\n- **Rolling Updates:** Updates applications without stopping all Pods at once.\n- **Rollback:** Reverts an application to a previous version.\n- **Self-Healing:** Creates replacement Pods when existing Pods fail.\n- **Version Management:** Maintains different revisions of a Deployment.\n- **Rollout Control:** Allows rollouts to be paused and resumed.\n- **Monitoring:** Provides status information about the Deployment and its rollout."
      },
      {
        "title": "3. Components",
        "content": "A Kubernetes Deployment mainly contains the following components:\n\n- **Metadata:** Contains the Deployment name, labels, and other identifying information.\n- **Specification:** Defines the desired state, replicas, Pod template, container image, and other settings.\n- **Status:** Shows the current state of the Deployment, including available and updated replicas.The Deployment controller continuously compares the desired state with the current state and takes corrective action when required."
      },
      {
        "title": "4. Kubernetes Deployment YAML",
        "content": "A Deployment can be created using a YAML manifest.\n\nThe following example creates an Nginx Deployment with three replicas:\n\n`\n`\nNow first open the directory where you have created nginx.yaml file in your terminal and create deployment using the command:\n\nNow check the status of your deployment if it is ready or not by running the command\n\nHence we have successfully deployed created a deployment for Nginx.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Kubernetes Deployment YAML",
          "snippet": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.28\n        ports:\n        - containerPort: 80"
        }
      },
      {
        "title": "5. Updating a Kubernetes Deployment",
        "content": "To update a Kubernetes deployment we can simply update its config file using 2 methods:"
      },
      {
        "title": "6. Method 1: Using the kubectl edit command from the terminal",
        "content": "Now you can edit the deployment configuration by pressing \"**i\"** for inserting and after editing it you can just press the escape key and then** \":wq\"** to save your changes and exit.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Method 1: Using the kubectl edit command from the terminal",
          "snippet": "kubectl edit deployment deployment-name"
        }
      },
      {
        "title": "7. Method 2: Updating Configuration Directly",
        "content": "You can open your config file in an IDE like VS Code and edit the config there and apply the config by using the command\n\nLet's say in this case we are updating the container port from 80 to 800.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Method 2: Updating Configuration Directly",
          "snippet": "kubectl apply -f deployment_config.yaml"
        }
      },
      {
        "title": "8. Rolling Back a Kubernetes Deployment",
        "content": "Kubernetes allows you to roll back a Deployment to a previous version if the current version has bugs or issues. This helps restore the application to a stable version and reduce the impact on users."
      },
      {
        "title": "9. Step 1: View the Deployment revision history:",
        "content": "Select the revision to which you want to roll back.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Step 1: View the Deployment revision history:",
          "snippet": "kubectl rollout history deployment/nginx-deployment"
        }
      },
      {
        "title": "10. Step 2: Roll back to a specific revision:",
        "content": "Replace `1` with the required revision number.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Step 2: Roll back to a specific revision:",
          "snippet": "kubectl rollout undo deployment/nginx-deployment --to-revision=1"
        }
      },
      {
        "title": "11. Step 3: Verify the rollback:",
        "content": "Regularly testing the rollback process helps ensure that applications can be quickly restored when deployment issues occur.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Step 3: Verify the rollback:",
          "snippet": "kubectl rollout status deployment/nginx-deployment"
        }
      },
      {
        "title": "12. Checking the Rollout History",
        "content": "Rollout history can be seen by using the following command.\n\nThis command allows you to view the no.of revisions available in the kubernetes cluster and changes made to them. If you want to see the detailed history of a specific version then you use the following command.\n\nRollout history will help you to roll to previous versions of the application if you find bugs or problems in the currently deployed version of the application.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Checking the Rollout History",
          "snippet": "kubectl rollout history <name of the deployment>"
        }
      },
      {
        "title": "13. Horizontal Pod Autoscaling",
        "content": "Horizontal Pod Autoscaler (HPA) automatically adjusts the number of Pod replicas based on resource utilization or other supported metrics.\n\nFor example:\n\nHere:\n\n- `--min=2` → Minimum number of replicas.\n- `--max=8` → Maximum number of replicas.\n- `--cpu-percent=75` → Target average CPU utilization.HPA can increase the number of Pods when demand increases and reduce them when demand decreases.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. Horizontal Pod Autoscaling",
          "snippet": "kubectl autoscale deployment nginx --min=2 --max=8 --cpu-percent=75"
        }
      },
      {
        "title": "14. Pausing and Resuming a Kubernetes Deployment",
        "content": "A Deployment rollout can be paused when multiple changes need to be made before starting the rollout.\n\nPause the rollout:\n\nMake the required changes.\n\nResume the rollout:\n\nPausing a rollout allows multiple changes to be grouped into a single rollout.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Pausing and Resuming a Kubernetes Deployment",
          "snippet": "kubectl rollout pause deployment/nginx"
        }
      },
      {
        "title": "15. Kubernetes Deployment Status",
        "content": "The deployment will pass different stages while it was in deploying. Each stage will say the health of the pods and shows us if any problems are arising.\n\nThere are a few deployment statuses as follows which will show the health of the pods there are.\n\n- **Pending: **Deployment is pending representing that it going to start or it is facing some issues to start.\n- **Progressing: **Deployment was in progress it was going to be deployed.\n- **Succeeded:** Deployment was deployed successfully without any errors or bugs.\n- **Failed: **Deployment was not deployed successfully it failed due to some issues.\n- **Unknown: **This happens if the kubernetes API is not reached for deployment or the problem with the deployment itself. Deployment status will help you to monitor the pods and you can take action immediately if you found any trouble or bugs in it."
      },
      {
        "title": "16. Progressing Kubernetes Deployment",
        "content": "If any deployment is in progress it is meant to be that deployment is in the stage of updating or creating a new replicaset. Following are some of the reasons that deployment is in progress.\n\n- The deployment is creating for the first time or it was creating a new replicaset.\n- If the deployment is going under the updation or scaling then it will be in progress.\n- The deployment will be in progress when the pods are scaling down or the pod is getting started. If you want to troubleshoot the deployment then you can use the following command.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 16. Progressing Kubernetes Deployment",
          "snippet": "kubectl describe deployments"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Deployments & ReplicaSets",
      "initialCode": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.28\n        ports:\n        - containerPort: 80",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Deployments & ReplicaSets",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Deployments & ReplicaSets in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Deployments & ReplicaSets",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Deployments & ReplicaSets enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-strategies": {
    "id": "devops-k8s-strategies",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "Kubernetes Deployment Strategies (Rolling, Recreate, Canary)",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Deployment Strategies (Rolling, Recreate, Canary) — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Deployment strategies in Kubernetes help update applications safely while minimizing downtime and reducing risk.\nBy using deployment strategies, teams can ensure smooth updates, reduce production errors, and improve overall application reliability.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Deployment Strategies (Rolling, Recreate, Canary)."
        }
      },
      {
        "title": "2. Deployment Strategies In Kubernetes",
        "content": "There are different approaches through which we can manage our containerized applications. These different deployment strategies allow us to roll out the updates to the applications with minimal downtime. The following are the some of the popularly known kubernetes Deployment Strategies:\n\n- Recreate Deployment Strategy\n- Rolling Update Deployment Strategy\n- Blue Green Deployment Strategy\n- Canary Deployment Strategy\n- A/B Testing Deployment Strategy\n- Shadow Deployment Strategy"
      },
      {
        "title": "3. Recreate Deployment Strategy",
        "content": "- **Complete Replacement:** Terminates all existing pods of the old version simultaneously before starting any pods of the new version.\n- **Service Downtime:** Guaranteed period of downtime occurs between the deletion of old instances and the readiness of new ones, as no pods are available to serve traffic.\n- **State Consistency:** Ideal for applications that do not support multiple versions running at once or require exclusive access to a database or persistent volume.\n- **Simplicity:** The most straightforward strategy to manage, as it avoids the complexity of backward compatibility or traffic splitting between different versions.\n- The following YAML can be used to implement this kind of deployment:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Recreate Deployment Strategy",
          "snippet": "apiVersion: apps/v1kind: Deploymentmetadata:  name: my-appspec:  replicas: 3  strategy:    type: Recreate  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app    spec:      containers:      - name: my-app-container        image: my-image:latest"
        }
      },
      {
        "title": "4. Rolling Update Deployment Strategy",
        "content": "- **Phased Replacement:** Gradually replaces old pods with new ones in small batches, ensuring a minimum number of instances are always available to serve traffic.\n- **Zero Downtime:** By keeping the service active throughout the transition, it maintains continuous availability and avoids the \"blackout\" period seen in Recreate deployments.\n- **Version Coexistence:** During the update window, both the old and new versions run simultaneously, requiring the application to be backward compatible with databases and APIs.\n- **Resource Efficient:** Updates occur within the existing infrastructure capacity (or with a small temporary \"surge\"), making it more cost-effective than Blue/Green deployments.\n\n- The following YAML can be used to implement this kind of deployment:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Rolling Update Deployment Strategy",
          "snippet": "apiVersion: apps/v1kind: Deploymentmetadata:  name: my-appspec:  replicas: 3  strategy:    type: RollingUpdate    rollingUpdate:      maxSurge: 1      maxUnavailable: 1  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app    spec:      containers:      - name: my-app-container        image: my-image:latest"
        }
      },
      {
        "title": "5. Blue-Green Deployment Strategy",
        "content": "- **Identical Environments:** Maintains two full-scale production environments; one serves live traffic (Blue) while the other hosts the new version (Green).\n- **Atomic Switch:** Traffic is flipped 100% from Blue to Green at the load balancer level, resulting in near-zero downtime.\n- **Instant Recovery:** If an issue is found after the switch, traffic is immediately routed back to the still-running Blue environment.\n- **Infrastructure Overhead:** More expensive than other methods because it requires doubling the server resources during the transition.\n\n- The following YAML can be used to implement this kind of deployment:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Blue-Green Deployment Strategy",
          "snippet": "apiVersion: v1kind: Servicemetadata:  name: my-app-service  labels:    app: my-appspec:  ports:  - port: 80    targetPort: 8080  selector:    app: my-app---apiVersion: apps/v1kind: Deploymentmetadata:  name: my-app-bluespec:  replicas: 3  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app        color: blue    spec:      containers:      - name: my-app-container        image: my-image:blue---apiVersion: apps/v1kind: Deploymentmetadata:  name: my-app-greenspec:  replicas: 0  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app        color: green    spec:      containers:      - name: my-app-container        image: my-image:green"
        }
      },
      {
        "title": "6. Canary Deployment Strategy",
        "content": "- **Incremental Risk:** Introduces the new version to a small percentage of users (e.g., 5%) to validate stability before a wider rollout.\n- **Metric-Based Promotion:** Traffic increases only if specific KPIs (latency, error rates) remain healthy on the \"canary\" instance.\n- **Granular Routing:** Often managed via a service mesh (like Istio) to split traffic based on percentages or specific user attributes.\n- **Small Blast Radius:** Limits the impact of a failed release to a tiny fraction of the user base.\n\n- The following YAML can be used to implement this kind of deployment:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Canary Deployment Strategy",
          "snippet": "apiVersion: apps/v1kind: Deploymentmetadata:  name: my-appspec:  replicas: 3  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app  spec:    containers:    - name: my-app-container      image: my-image:latest---apiVersion: v1kind: Servicemetadata:  name: my-app-servicespec:  ports:  - port: 80    targetPort: 8080  selector:    app: my-app"
        }
      },
      {
        "title": "7. A/B Testing Deployment Strategy",
        "content": "- **Data-Driven Comparison:** Specifically designed to measure business outcomes (e.g., conversion rates, user engagement) rather than just technical stability.\n- **Targeted Segmentation:** Routes traffic based on specific user attributes like geography, device type, or browser cookies to see how different demographics react.\n- **Version Coexistence:** Multiple versions (A and B) run in production simultaneously for an extended period to collect statistically significant data.\n- **Logical Routing:** Requires an advanced load balancer or feature flag system to ensure a consistent experience (so a user doesn't flip between versions on refresh).\n\n- The following YAML can be used to implement this kind of deployment:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. A/B Testing Deployment Strategy",
          "snippet": "apiVersion: apps/v1kind: Deploymentmetadata:  name: my-appspec:  replicas: 3  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app  spec:    containers:    - name: my-app-container      image: my-image:version-a---apiVersion: v1kind: Servicemetadata:  name: my-app-servicespec:  ports:  - port: 80    targetPort: 8080  selector:    app: my-app"
        }
      },
      {
        "title": "8. Shadow Deployment Strategy",
        "content": "- **Traffic Mirroring:** Duplicates real production traffic and sends a copy to the \"shadow\" version while the live version continues to handle the actual user requests.\n- **Zero User Impact:** The shadow version's responses are discarded; any errors, crashes, or latency issues in the new code are invisible to the end-user.\n- **Production Validation:** Provides the most realistic testing possible by exposing the new version to actual production load, data, and concurrency patterns without risk.\n- **Complex Data Handling:** Requires careful management of \"side effects,\" such as ensuring the shadow version doesn't trigger duplicate emails, payments, or database writes.\n\n- The following YAML can be used to implement this kind of deployment:\nComment",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Shadow Deployment Strategy",
          "snippet": "apiVersion: apps/v1kind: Deploymentmetadata:  name: my-app-shadowspec:  replicas: 3  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app  spec:    containers:    - name: my-app-container      image: my-image:latest---apiVersion: v1kind: Servicemetadata:  name: my-app-shadow-servicespec:  ports:  - port: 80    targetPort: 8080  selector:    app: my-app"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Deployment Strategies (Rolling, Recreate, Canary)",
      "initialCode": "apiVersion: apps/v1kind: Deploymentmetadata:  name: my-appspec:  replicas: 3  strategy:    type: Recreate  selector:    matchLabels:      app: my-app  template:    metadata:      labels:        app: my-app    spec:      containers:      - name: my-app-container        image: my-image:latest",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Deployment Strategies (Rolling, Recreate, Canary)",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Deployment Strategies (Rolling, Recreate, Canary) in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Deployment Strategies (Rolling, Recreate, Canary)",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Deployment Strategies (Rolling, Recreate, Canary) enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-services": {
    "id": "devops-k8s-services",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Kubernetes Services (ClusterIP, NodePort, LoadBalancer)",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Services (ClusterIP, NodePort, LoadBalancer) — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A Kubernetes Service is a stable networking abstraction that exposes a group of Pods as a single network endpoint. Pods in Kubernetes are ephemeral ; they can restart, crash, or move across nodes. Pod IP addresses are not permanent, which makes direct communication unreliable, applications in a cluster need a stable way to communicate with each other. Kubernetes Services solve this problem by providing:\n\n- Stable virtual IP (ClusterIP).\n- Built-in load balancing.\n- Service discovery via DNS.\n- Decoupling between clients and Pods.Virtual Network",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Services (ClusterIP, NodePort, LoadBalancer)."
        }
      },
      {
        "title": "2. Types of Services",
        "content": "There are four major types of services which are having their advantages in their perspective as explained following."
      },
      {
        "title": "1. ClusterIP",
        "content": "- Stable Virtual IP: Provides a single, permanent IP address for a group of Pods, preventing communication breakdown when individual Pods are replaced.\n- DNS Registration: Automatically maps the Service Name to the ClusterIP via CoreDNS, enabling Pods to find each other using hostnames.\n- The \"Brain\" (kube-proxy): Runs on every node to manage network rules (iptables/IPVS), transforming the logical Service into functional traffic paths.\n- Load Balancing: Intercepts requests sent to the ClusterIP and transparently redirects them to a healthy backend Pod's actual IP.\n- Internal Access Only: Restricts connectivity to within the cluster boundaries, ensuring secure, private microservice communication.Example:\n\napiVersion: v1\nkind: Service\nmetadata:\nname: nginx-service\nspec:\ntype: ClusterIP\nselector:\napp: nginx\nports:\n- port: 80\ntargetPort: 80\n\nExplanation:\n\n- type: ClusterIP → Default Service type. Exposes the service only inside the cluster.\n- selector: app: nginx → Routes traffic to Pods with the label app=nginx.\n- port: 80 → The port on which the Service is exposed internally.\n- targetPort: 80 → The container port inside the Pod where NGINX is running.Now we can create this service by applying the following command:\n\n$ kubectl apply -f [file-name]"
      },
      {
        "title": "2. NodePort Service (External Service)",
        "content": "- External Entry Point: Opens a specific port (range 30000–32767) on every Worker Node's IP address, allowing external traffic to reach the cluster without an Ingress controller.\n- Layered Routing: Traffic follows a chain: External Client >> NodeIP:NodePort >> ClusterIP >> PodIP.\n- Kube-proxy Coordination: Like ClusterIP, kube-proxy handles the heavy lifting by routing incoming traffic from the node's port to the appropriate backend Pods.\n- Uniform Access: The service is accessible via the IP of any node in the cluster, regardless of whether the target Pod is actually running on that specific node.Example:\n\napiVersion: v1\nkind: Service\nmetadata:\nname: nginx-service\nspec:\ntype: NodePort\nselector:\napp: nginx\nports:\n- port: 80\ntargetPort: 80\nnodePort: 30000\n\nExplanation:\n\n- type: NodePort → Exposes the service on each Node’s IP at a static port (30000).\n- port: 80 → Service port inside the cluster.\n- targetPort: 80 → Container port inside the Pod.\n- nodePort: 30000 → External port accessible via <NodeIP>:30000Now we can create this service by applying the following command\n\n$ kubectl apply -f [file-name]"
      },
      {
        "title": "3. LoadBalancer",
        "content": "- Cloud Integration: Automatically provisions a native load balancer (e.g., AWS ELB, GCP LB) provided by the cloud infrastructure to manage external traffic.\n- Hierarchical Setup: Built on top of the other types; it automatically creates a NodePort and a ClusterIP to bridge the gap between the external world and the internal Pods.\n- Single Entry Point: Provides a public IP address or DNS name that serves as the unique gateway for users, abstracting away the individual Node IPs.\n- Managed Routing: The cloud provider's balancer monitors node health and distributes incoming traffic across the cluster's NodePorts before reaching the Pods.\n- Bare-Metal Limitation: Without a cloud-provider plugin (like in minikube or kubeadm), the service will stay in a \"Pending\" state unless an external tool like MetalLB is installed.Example:\n\napiVersion: v1\nkind: Service\nmetadata:\nname: javawebappsvc\nspec:\ntype: LoadBalancer\nselector:\napp: javawebapp\nports:\n- port: 80\ntargetPort: 8080\n\nExplanation:\n\n- type: LoadBalancer → Exposes the service externally using a cloud provider’s load balancer.\n- port: 80 → Port exposed by the Service.\n- targetPort: 8080 → Port on which the container inside the Pod is running.\n- selector: app: javawebapp → Routes traffic to Pods with this label."
      },
      {
        "title": "4. ExternalName",
        "content": "An ExternalName is a type of service in kubernetes that maps the service to a DNS name outside the cluster. It redirects the requests to the specified DNS name.\n\nExample:\n\napiVersion: v1\nkind: Service\nmetadata:\nname: my-external-service\nspec:\ntype: ExternalName\nexternalName: example.com\n\nExplanation:\n\n- type: ExternalName → Maps the Service to an external DNS name instead of routing to Pods.\n- externalName: example.com → Redirects traffic to this external domain.\n- No selector or ports are required because it does not forward traffic to Pods.\n- Useful when you want to reference external services (like external APIs or databases) using internal Kubernetes DNS."
      },
      {
        "title": "5. Headless Service",
        "content": "- No Virtual IP: Configured with clusterIP: None, it skips assigning a single stable Service IP.\n- Direct DNS Resolution: A DNS lookup returns the list of individual Pod IPs instead of one Service IP.\n- Individual Pod Identity: Allows clients to discover and connect directly to specific Pods, bypassing the internal load balancer.\n- Peer-to-Peer Focus: Essential for stateful applications (like Kafka or MongoDB) where Pods must identify and talk to specific peers.\n- Client-Side Control: Moves the logic of choosing which Pod to talk to from Kubernetes to the application itself.Example:\n\napiVersion: v1\nkind: Service\nmetadata:\nname: my-headless-service\nspec:\nclusterIP: None\nselector:\napp: my-app\nports:\n- protocol: TCP\nport: 80\ntargetPort: 8080\n\nExplanation:\n\n- clusterIP: None → Creates a Headless Service (no load balancing, no virtual IP).\n- Traffic is routed directly to individual Pod IPs.\n- Useful for StatefulSets, databases, and applications needing direct Pod-to-Pod communication.\n- Each Pod gets its own DNS record instead of a single Service IP."
      },
      {
        "title": "8. Kubernetes Service Working",
        "content": "- A Kubernetes Service selects Pods using labels and selectors, creating a stable endpoint for a dynamic set of Pods.\n- It provides a stable ClusterIP and DNS name, so applications communicate with the Service instead of changing Pod IPs.\n- kube-proxy routes traffic to healthy Pods using iptables/IPVS rules, enabling automatic load balancing and high availability.\n- As Pods scale or restart, the Service automatically updates its endpoints, ensuring reliable and seamless communication inside the cluster."
      },
      {
        "title": "9. Defining a Kubernetes Service",
        "content": "In the kubernetes cluster, there are no of objects which are having there own use cases and individual advantages. Same way service is part of objects which are present in kubernetes. To create an object or operate an object you can use the kubectl tool."
      },
      {
        "title": "10. Example",
        "content": "In the above we are exposing the Tomcat application deployed in the kubernetes cluster with labels of Tomcat: deployment app port: 80 is the port exposed internally in the cluster and port 8080 is the port of the Tomcat application.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Example",
          "snippet": "apiVersion: v1kind: Servicemetadata:  name: deployment-servicespec:  selector:    Tomcat: deploymentapp  ports:    - protocol: TCP      port: 80      targetPort: 8080"
        }
      },
      {
        "title": "11. Port Definitions",
        "content": "Kubernetes Services define three important port fields:\n\n- Port: Port exposed by the Service.\n- targetport: port inside the container\n- nodeport: External port on Node. (NodePort type only)."
      },
      {
        "title": "12. Using Named Ports",
        "content": "Instead of using numeric targetPort, you can use a named container port.\n\nExample:\n\nFor example, we can see that instead of using the \"targetPortnumber\" you can use the name of the container as mentioned below. The target port is the port number that the service or pod is forwarding requests to.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Using Named Ports",
          "snippet": "kind: Podmetadata:  name: tomcat  labels:    deployemnt: deployemnet-javaspec:  containers:  - name: tomcat    image: tomact:latest    ports:      - containerPort: 8080        name: http-deplyment-port---apiVersion: v1kind: Servicemetadata:  name:tomcat-servicespec:  selector:    deployemnt: deployemnet-java  ports:  - name: name-of-service-port    protocol: TCP    port: 80    targetPort:http-deplyment-port"
        }
      },
      {
        "title": "13. Services Without Selectors",
        "content": "This type of service will be exposed to all the pods in the kubernetes cluster. If the service is having selectors then that service will be exposed to only certain pods in the kubernetes cluster. We can use this special case of pods for different situations as the following:"
      },
      {
        "title": "14. Example",
        "content": "You can map the service to the required object by using the network address and port with the help of the Endpoint slice object manually.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Example",
          "snippet": "apiVersion: v1kind: Servicemetadata:  name: tomcat-servicespec:  ports:    - protocol: TCP      port: 80      targetPort: 8080"
        }
      },
      {
        "title": "15. EndpointSlices",
        "content": "- Scalability: Replaces the monolithic \"Endpoints\" object by breaking Pod IP lists into multiple smaller chunks, preventing performance bottlenecks in large clusters.\n- 100-Endpoint Limit: Each slice is capped at 100 endpoints; once full, Kubernetes automatically generates a new slice to accommodate additional Pods.\n- Reduced Network Traffic: When a single Pod changes, Kubernetes only updates and syncs the specific affected slice rather than re-transmitting the entire list of every Pod IP to every node.\n- Efficient Control Plane: Minimizes the CPU and memory load on the API server and kube-proxy by handling manageable data segments instead of massive, bloated objects.\n- Enhanced Metadata: Supports extra information beyond just IPs, such as topology (location) and dual-stack (IPv4/IPv6) addresses, for smarter traffic routing."
      },
      {
        "title": "16. Custom EndpointSlices",
        "content": "The custom name can be given to endpoint slices when you create a new endpoint slice. By using the following EndpointSlices you can create custom Endpoint Slices."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Services (ClusterIP, NodePort, LoadBalancer)",
      "initialCode": "apiVersion: v1kind: Servicemetadata:  name: deployment-servicespec:  selector:    Tomcat: deploymentapp  ports:    - protocol: TCP      port: 80      targetPort: 8080",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Services (ClusterIP, NodePort, LoadBalancer)",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Services (ClusterIP, NodePort, LoadBalancer) in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Services (ClusterIP, NodePort, LoadBalancer)",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Services (ClusterIP, NodePort, LoadBalancer) enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-ingress": {
    "id": "devops-k8s-ingress",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Kubernetes Ingress & Ingress Controllers",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Ingress & Ingress Controllers — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Ingress is an API object that manages external access to services within a cluster, typically via HTTP and HTTPS. It acts as a smart router or entry point, consolidating multiple routing rules into a single resource.\n\n- **Host-based Routing: **Directs traffic based on domain names (e.g., api.example.com vs. web.example.com).\n- **Path-based Routing: **Directs traffic based on URL paths (e.g., /login vs. /search).\n- **TLS/SSL Termination: **Handles certificates at the edge to secure connections before traffic reaches internal services.\n- **Load Balancing:** Distributes incoming requests across multiple backend Pods.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Ingress & Ingress Controllers."
        }
      },
      {
        "title": "2. Key Components",
        "content": "- **Ingress Resource**: Defines the routing rules for directing external traffic to internal services. This component holds all the configuration details like host-based and path-based routing.\n- **Ingress Controller**: Implements the rules defined in the Ingress Resource. It watches for changes and updates, ensuring traffic flows according to the defined configuration. Popular Ingress Controllers include NGINX, HAProxy, and Traefik.\n- **Backend Services**: The services receiving the traffic directed by Ingress. These could be any internal applications or APIs within your Kubernetes cluster."
      },
      {
        "title": "3. Architecture of Kubernetes Ingress",
        "content": "Kubernetes Ingress acts like a traffic controller for managing the income traffic to the Kubernetes cluster. It manages the external access to the services within the kubernetes. The following are its internal concepts and terminologies:\n\n- **Routing**: Kubernetes Ingress defines the rules in the Routing table for external HTTP and HTTPS traffic to the inside kubernetes cluster services based on the hostname and paths.\n- **Load Balancing:** Load Balancing facilitates in distributing the income traffic to multiple backend servers providing scalability and reliability to the cluster.\n- **TLS Termination: **Ingress handles the TLS/SSL termination for providing a secured communication between the clients and services.\n- **Path-Based Routing: **In Routing Table we can define the rules based on the URL paths also. With this the traffic will be distributed to backend servers based on the paths accordingly.\n- **Virtual Hosts:** Ingress facilitates virtual hosting i.e., hosting multiple domains on the same cluster and directs the traffic to different services based on the domain name.Kubernetes Ingress Architecture"
      },
      {
        "title": "4. Working",
        "content": "Ingress serves as a reverse proxy that helps direct incoming traffic to the correct services within a Kubernetes cluster. It operates based on two key components:"
      },
      {
        "title": "1. Ingress Controllers",
        "content": "- Ingress Controllers are pods running inside the Kubernetes cluster that handle incoming traffic.\n- Act as reverse proxies, enforcing the rules defined in Ingress resources.\n- Manage the flow of inbound requests, directing them to the appropriate service inside the cluster.\n- Support HTTP and HTTPS traffic, including TLS termination using Kubernetes Secrets.\n- Can provide additional features like load balancing, URL rewriting, authentication, and metrics.\n- Popular examples include NGINX Ingress Controller, Traefik and HAProxy."
      },
      {
        "title": "2. Ingress Rules",
        "content": "- Ingress Rules define how incoming traffic should be directed to services within the cluster.\n- The Ingress Controller checks these rules and forwards requests to the appropriate service.\n- Traffic can be routed based on hostnames:\n- `serviceA.example.com` → Service A\n- `serviceB.example.com` → Service B\n- Traffic can also be routed based on URL paths:\n- `example.com/serviceA` → Service A\n- `example.com/serviceB` → Service B\n- SSL/TLS management:\n- The Ingress Controller uses Kubernetes Secrets to decrypt secure traffic.\n- Ensures HTTPS requests are safely forwarded to the correct service."
      },
      {
        "title": "7. Kubernetes Ingress Resources",
        "content": "In Kubernetes, an Ingress is an API object that manages the external access to the services within the kubernetes cluster. It acts an abstraction layer for routing traffic from outside the cluster to services inside the cluster. The following are its main concepts and terminologies:\n\n- **Routing Rules:** Ingress facilitates you to define the rules for routing HTTP and HTTPS traffic based on the hostnmes or paths to different services in your cluster.\n- **Load Balancing**: It provides the load balancing capabilities, distributing the incoming traffic across multiple pods or services.\n- **TLS Termination: **Ingress can also able to handle the SSL/TLS termination by allowing you to encrypt the traffic from outside the cluster to your services.\n- **Reverse Proxy:** It functions as a Reverse proxy, forwarding the requests from the clients to appropriate services based on the defined rules."
      },
      {
        "title": "8. Types of Ingress",
        "content": "Ingress refers to an unauthorized entry or access into your system, network or physical spaces that presents the security risks and potential harm. The following are the types of ingress, each presents its own risks and challenges:\n\n- **Physical Ingress**: It involves gaining the physical access to a system or network bypassing the physical security measures such as locked doors, security guards. It also involves stealing of devices like laptops or USB drivers.\n- **Network Ingress**: Network ingress occurs when the attackers gains the access of a network through vulnerabilities in the infrastructure such as unsecured wifi networks, open ports or weak passwords. This leads to unauthorized security access to sensitive data.\n- **Software Ingress:** It involves in exploiting the vulnerabilities in software applications or operating systems to unauthorized access to a system or network. This can include exploiting the bugs, malware or with techniques like phishing to trick users to reveal sensitive information."
      },
      {
        "title": "9. Updating an Ingress",
        "content": "Updating the Ingress involves in modifying the configuration file of the Routing Table. Routing rules of how external traffic is routed to services within the kubernetes cluster as to be modified. The following are steps for updating an Ingress to define rules for HTTP and HTTPS traffic to different services based on criteria like hostname and paths."
      },
      {
        "title": "10. Step 1: Modify the YAML Configuration",
        "content": "Here, we can modify the yaml configuration file that defines the ingress resources using `kubectl edit**` **or by directly modifying the YAML file.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Step 1: Modify the YAML Configuration",
          "snippet": "kubectl edit ingress <ingress-name>"
        }
      },
      {
        "title": "11. Step 2: Apply Changes",
        "content": "After once the changes are made in the configuration file, you can apply the changes using the following command in the kubernetes cluster.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Step 2: Apply Changes",
          "snippet": "kubectl apply -f ingress.yml"
        }
      },
      {
        "title": "12. Step 3: Verfiication",
        "content": "Once we applied the changes, we should verify whether the ingress is updated correctly or not using the following command.\n\nOr we can also verify it by checking the status in our kubernetes dashboard.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Step 3: Verfiication",
          "snippet": "kubectl get ingress"
        }
      },
      {
        "title": "13. Step 4: Testing",
        "content": "It is important to test the updated configuration of ingress to ensure the traffic is routed as per expected or not. we can perform this by sending the requests to the associated services and verifying its responses.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. Step 4: Testing",
          "snippet": "curl http://<host-or-ip>/<path>curl -k https://<host-or-ip>/<path>  # for HTTPS testing"
        }
      },
      {
        "title": "14. Step 5: Rollback ( if necessary )",
        "content": "If the update leads to any issues or anying unexpected behaviour, we can rollback it to the previous configuration by reapplying the older YAML file.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Step 5: Rollback ( if necessary )",
          "snippet": "kubectl apply -f old-ingress.yml"
        }
      },
      {
        "title": "15. Ingress Configuration File Example",
        "content": "In this configuration file of Ingress, specification is where the whole configuration happens, we have rules** **or routing rules** **attribute which defines that all the requests to \"shubham.com\" must be forwarded to the internal service \"myapp-internal-service**\"**.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Ingress Configuration File Example",
          "snippet": "apiVersion: networking.k8s.io/v1beta1kind: Ingressmetadata:  name: myapp-ingressspec:  rules:    - host: shubham.com      http:        paths:          - backend:              serviceName: myapp-internal-service              servicePort: 8080"
        }
      },
      {
        "title": "16. Ingress, Services, and Endpoint Resources in Kubernetes",
        "content": "Ingress, Services, and Endpoint Resources work together to manage traffic routing in a Kubernetes environment."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Ingress & Ingress Controllers",
      "initialCode": "kubectl edit ingress <ingress-name>",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Ingress & Ingress Controllers",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Ingress & Ingress Controllers in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Ingress & Ingress Controllers",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Ingress & Ingress Controllers enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-scheduling": {
    "id": "devops-k8s-scheduling",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "12 min read",
    "level": "Advanced",
    "title": "Pod Scheduling & Node Affinity in Kubernetes",
    "subtitle": "Complete DevOps engineering guide to Pod Scheduling & Node Affinity in Kubernetes — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- The Kubernetes Scheduler is the control plane's master strategist, determining the best home for every Pod within the cluster. While its automated, two-stage process of filtering and scoring is incredibly powerful, there are times when a user might need to take direct control.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Pod Scheduling & Node Affinity in Kubernetes."
        }
      },
      {
        "title": "2. Automated Scheduler",
        "content": "For 99% of workloads, you'll rely on the default Kubernetes scheduler. It's a highly intelligent component that watches for new Pods and assigns them to the best possible Node in a two-stage process."
      },
      {
        "title": "3. Stage 1: Filtering",
        "content": "In this stage, the scheduler finds a set of feasible Nodes where the Pod could run. It applies a series of tests, called **predicates**. If a Node fails any of these tests, it is removed from consideration for this Pod.\n\nCommon filters include:\n\n- **PodFitsResources:** Does the Node have enough available CPU and memory to satisfy the Pod's resource requests?\n- **PodFitsHostPorts:** If the Pod requests to bind to a specific port on the Node, is that port already in use?\n- **NodeSelector:** Does the Node have the labels specified in the Pod's nodeSelector field?\n- **Taints and Tolerations:** A Node can be \"tainted\" to repel certain Pods. This check ensures the Pod has a \"toleration\" for the Node's taints.If no nodes pass the filtering stage, the Pod remains in a Pending state until a suitable Node becomes available."
      },
      {
        "title": "4. Stage 2: Scoring",
        "content": "After filtering, the scheduler might have a list of several feasible Nodes. In the scoring stage, it ranks these Nodes from best to worst to find the most suitable one. It does this by applying a set of **priority functions**.\n\nCommon scoring rules include:\n\n- **LeastRequestedPriority:** Favors Nodes that are less utilized. This strategy helps to spread workloads evenly across the cluster.\n- **ImageLocalityPriority:** Gives a higher score to Nodes that already have the container image the Pod needs, leading to faster Pod startup.\n- **NodeAffinity / Anti-Affinity:** These are advanced rules that attract or repel Pods based on Node labels (e.g., \"prefer Nodes with SSD storage\").\n- **PodAffinity / Anti-Affinity:** Considers other Pods already running on the Nodes (e.g., \"try to run this frontend Pod on the same Node as its cache\").The Node with the highest final score is chosen, and the scheduler **binds** the Pod to that Node."
      },
      {
        "title": "5. Manual Scheduling with nodeName",
        "content": "**Step 1: **First create a config file for kind to create a cluster . Here mention the number of worker nodes you want to create in the cluster.\n\n**config.yml**\n\n**Step 2:** Create a cluster using the config file.\n\n**Step 3:** Now check the nodes in the cluster using the command below .\n\n**Step 4:** Now write a YAML file to create a pod and run in one of the nodes on the cluster . Here in the nodeName field mention the name of node on which you want to schedule the pod for running.\n\n**pod.yml**\n\n**Step 5:** Now create a pod on the cluster using the command below.\n\n**Step 6:** After this check in which node pod is running , using the command below . Here you will see the same node as we have mentioned in the nodeName field in pod.yml.\n\nLike this you can change the node name and can manually schedule the running of a pod on any node.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Manual Scheduling with nodeName",
          "snippet": "kind: ClusterapiVersion: kind.x-k8s.io/v1alpha4nodes:- role: control-plane- role: worker- role: worker"
        }
      },
      {
        "title": "6. Moving a Running Pod",
        "content": "A critical concept in Kubernetes is that a Pod's placement is immutable. Once the scheduler binds a Pod to a Node (or you do it manually with nodeName), that decision is final for the entire lifecycle of that Pod. You cannot change the nodeName of a running Pod.\n\nIf you need to move an application from one node to another (for example, to perform maintenance on the old node), you cannot simply \"migrate\" the live Pod. The correct Kubernetes-native approach is:\n\n- **Use a Controller:** Your Pods should be managed by a higher-level controller like a Deployment or StatefulSet.\n- **Delete the Pod:** When you delete the Pod, the controller detects that the desired number of replicas is no longer met.\n- **Re-creation and Re-scheduling:** The controller immediately creates a new Pod to replace the old one. This new Pod is then picked up by the scheduler, which runs its filtering and scoring logic again to place it on the best available Node.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Pod Scheduling & Node Affinity in Kubernetes",
      "initialCode": "kind: ClusterapiVersion: kind.x-k8s.io/v1alpha4nodes:- role: control-plane- role: worker- role: worker",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Pod Scheduling & Node Affinity in Kubernetes",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Pod Scheduling & Node Affinity in Kubernetes in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Pod Scheduling & Node Affinity in Kubernetes",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Pod Scheduling & Node Affinity in Kubernetes enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-taints": {
    "id": "devops-k8s-taints",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Kubernetes Taints and Tolerations",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Taints and Tolerations — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- In Kubernetes, taints and tolerations control which Pods can be scheduled on specific Nodes. Taints repel Pods from Nodes, while tolerations allow selected Pods to be scheduled on tainted Nodes.\n\n- Node Restrictions (Taints) are applied to Nodes to repel Pods and consist of a key, value, and effect such as `NoSchedule`.\n- Pod Exceptions (Tolerations) are defined in the Pod specification to allow Pods to be scheduled on Nodes with matching taints.\n- Selective Admission ensures that specialized Nodes, such as GPU or high-security Nodes, can host only Pods with the required tolerations.\n- Flexible Enforcement with effects such as `NoExecute` can also evict running Pods that do not tolerate a Node's taint.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Taints and Tolerations."
        }
      },
      {
        "title": "2. Understanding Their Effects",
        "content": "A Taint is a label applied to a Node that instructs the scheduler to repel certain Pods. The Taint itself consists of three parts: a key, a value, and an effect.\n\nkey=value:Effect\n\nThe Effect is the most important part, as it defines what happens to Pods that do not tolerate the taint. There are three types of effects."
      },
      {
        "title": "1. NoSchedule",
        "content": "- This is the most common effect. It tells the scheduler: \"Do not place any new Pods on this Node unless they have a matching toleration.\"\n- This effect only applies to new Pods during the scheduling phase. It does not affect any Pods that are already running on the Node."
      },
      {
        "title": "2. PreferNoSchedule",
        "content": "- This is a \"soft\" or advisory version of NoSchedule. The scheduler will try to avoid placing a Pod without a matching toleration on the tainted Node.\n- It's a preference, not a requirement. If the cluster is under pressure and there are no other available Nodes for the Pod, the scheduler may still place the Pod on the tainted Node."
      },
      {
        "title": "3. NoExecute",
        "content": "- This is the most powerful and immediate effect. It not only prevents new Pods from being scheduled but also evicts any Pods that are already running on the Node if they do not tolerate the taint.\n- This is often used for draining a Node for maintenance or in response to node-level problems (like the disk being full). You can also specify a tolerationSeconds field on a Pod's toleration, which gives it a grace period to continue running on the Node before it is evicted.ws"
      },
      {
        "title": "6. Use Cases",
        "content": "- Tainting a set of nodes with powerful hardware (like GPUs or fast SSDs) ensures that only workloads that specifically tolerate those taints can run there, preventing them from being used by general-purpose applications.\n- Before performing maintenance on a node, an administrator can apply a NoExecute taint. This will safely drain all the Pods from the node (respecting their termination grace periods), and NoSchedule will prevent any new Pods from landing there while the work is being done.\n- Kubernetes itself uses this system. When a node becomes unreachable or its disk is full, the system automatically adds a NoExecute taint. This triggers the eviction of Pods from the unhealthy node after a default grace period."
      },
      {
        "title": "7. Setup multi-node kind cluster",
        "content": "1. Create a multi-node-cluster.yaml manifest file\n\n2. Set k as an alias to kubectl so that we've to type less (Optional)\n\n3. Check details of our cluster\n\n(k is an alias to kubectl and no is shorthand for nodes)\n\nAs we can see above our cluster is ready",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Setup multi-node kind cluster",
          "snippet": "# three nodes (two workers) cluster configapiVersion: kind.x-k8s.io/v1alpha4kind: Clusternodes:  - role: control-plane  - role: worker  - role: worker"
        }
      },
      {
        "title": "8. Taints and Tolerations",
        "content": "Let's dig deep into our control-plane details,\n\nAs we can see that the control-plane node has a single taint with the effect of NoSchedule. This taint prevents pods from being scheduled on this node unless those pod(s) can tolerate this taint.\n\nNow let's check taint on other worker nodes,\n\nThe worker node has no taint which means any pod can schedule on it.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Taints and Tolerations",
          "snippet": "$ k describe no kind-control-plane | grep -i taints"
        }
      },
      {
        "title": "9. Adding custom taints to a node",
        "content": "Let's consider our first worker node as the production node so that only production deployment pods can schedule it. To do so we need to add a taint with key node-type, value production, and with NoSchedule effect.\n\ncheck the node's taint\n\nAs we can see above our first node has been tainted with the NoSchedule effect which means only pods that can tolerate this taint can schedule on it.\n\nLet's deploy a regular deployment with 5 replicas and see what will happen\n\nlet's check where the pods get scheduled\n\nWe can see all the pods are scheduled on the worker2 node because of taint on the production node. Now let's see how we can deploy production pods on production nodes.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Adding custom taints to a node",
          "snippet": "$ k taint no kind-worker node-type=production:NoSchedule"
        }
      },
      {
        "title": "10. Adding Tolerations to Pods",
        "content": "To deploy production pods to production nodes they need to tolerate the production nodes' taint. Let's create a production deployment webserver-prod.yaml manifest file.\n\nWe add the toleration so that these production pods are scheduled on the production nodes. Let's create this workload,\n\nlet's again check where the pods get scheduled\n\nAs we can see that these production pods get scheduled to regular nodes as well. To make sure production pods are only scheduled to production nodes we've to taint the regular nodes to reject the production pods by adding key node-type, value non-production, and with NoSchedule effect.\n\nagain deploy our production deployment, before deploying Delete previous deployments\n\ncheck where the pods get scheduled\n\nthis time all of our production pods are scheduled only on production workloads that are on a first worker node.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Adding Tolerations to Pods",
          "snippet": "apiVersion: apps/v1kind: Deploymentmetadata:  name: webserver-prod  labels:    env: prodspec:  replicas: 5  selector:    matchLabels:      env: prod  template:    metadata:      labels:        env: prod    spec:      containers:       - name: nginx         image: nginx:1.23-alpine         imagePullPolicy: IfNotPresent      tolerations:       - key: \"node-type\"         value: \"production\"         operator: \"Equal\"         effect: \"NoSchedule\""
        }
      },
      {
        "title": "11. Remove Taints from Nodes",
        "content": "To remove the taint from a node we just need to append - (dash) with the effect and the taint will be removed from that node, but removing the taint from a node will not affect any running workloads it will affect only new workloads after that.\n\nagain check the taint on the node.\n\nAs we can see above the taint is removed from the node.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Remove Taints from Nodes",
          "snippet": "$ k taint no kind-worker node-type=production:NoSchedule-"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Taints and Tolerations",
      "initialCode": "# three nodes (two workers) cluster configapiVersion: kind.x-k8s.io/v1alpha4kind: Clusternodes:  - role: control-plane  - role: worker  - role: worker",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Taints and Tolerations",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Taints and Tolerations in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Taints and Tolerations",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Taints and Tolerations enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-namespaces": {
    "id": "devops-k8s-namespaces",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "28 min read",
    "level": "Advanced",
    "title": "Kubernetes Namespaces & Resource Isolation",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Namespaces & Resource Isolation — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- In Kubernetes, Namespaces act as virtual clusters within a physical Kubernetes cluster, enabling logical isolation and resource management for different teams or projects.\n\n- **Isolation and Uniqueness**: Namespaces provide a scope for names, allowing resources (like Pods or Services) to share the same name as long as they reside in different namespaces.\n- **default**: The landing zone for all user resources that are created without an explicitly defined namespace.\n- **kube-system**: A highly restricted area reserved for objects created by the Kubernetes system itself, such as the API server and scheduler.\n- k**ube-public**: A readable-by-all namespace used for cluster-wide public information, such as cluster certificates or metadata needed before authentication.\n- **kube-node-lease**: A dedicated space for \"Lease\" objects that help the cluster monitor node heartbeats and detect failures efficiently.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Namespaces & Resource Isolation."
        }
      },
      {
        "title": "2. Default Namespaces",
        "content": "Default Namespaces are the four Namespaces that are present by default in any Kubernetes Cluster. To see these in your Namespaces you can simply enter this command:\n\nAnd you will see that we have 4 default namespaces:\n\nBefore learning about the 4 default Namespaces, let's first briefly discuss kubernetes dashboard namespace, which is a Namespace that comes built-in with Minikube.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Default Namespaces",
          "snippet": "kubectl get namespaces"
        }
      },
      {
        "title": "3. kubernetes dashboard namespace:",
        "content": "\"kubernetes dashboard namespace\" is shipped automatically in Minikube. So it is specific to Minikube installation. We will not have this namespace in a standard Cluster."
      },
      {
        "title": "1. kube-system",
        "content": "kube-system is the namespace that includes objects created by the Kubernetes system. The components that are deployed in this Namespace are the system processes - they are from Master managing processes or Kubectl etc. kube-system Namespace is not meant for our (developer's) use. so we do not have to create anything or modify anything in this namespace."
      },
      {
        "title": "2. kube-public",
        "content": "kube-public contains the publicly accessible data. It has a config map that contains the Cluster information which is accessible even without authentication.\n\nyou can simply type:\n\nYou will get the data stored in kube-public namespace.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. kube-public",
          "snippet": "kubectl cluster-info"
        }
      },
      {
        "title": "3. kube-node-lease",
        "content": "kube-node-lease Namespace is a new addition to Kubernetes. The purpose of this namespace is that it holds information about the heartbeats of Nodes. So each Node basically gets its own lease object in the Namespace. This object contains the information about that nodes availability."
      },
      {
        "title": "4. default",
        "content": "default Namespace is the Namespace that we use in order to create the resources when we create a Namespace in the beginning."
      },
      {
        "title": "8. Creating Namespaces",
        "content": "We can create a Namespace in two ways:"
      },
      {
        "title": "1. CLI Commands",
        "content": "Namespaces can be added to your Cluster by CLI commands. You can simply enter the following command to create a new Namespace:\n\nThis will create a new Namespace called \"my-ns\". And we can simply checkout our namespaces by the following command:\n\nWe can see that the \"my-ns\" Namespace was created.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. CLI Commands",
          "snippet": "kubectl create namespace my-ns"
        }
      },
      {
        "title": "2. Configuration file",
        "content": "Another better way to create a Namespace is creating a Namespaces configuration file. You can call it a better way of creating Namespaces because you have a history in your Configuration File Repository of what resources you created in the Cluster. Here is how a sample Namespace configuration file would appear to be:\n\nNow you can apply this configuration file using the following command:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Configuration file",
          "snippet": "apiVersion: v1kind: Namespacemetadata:  name: development  labels:    name: development"
        }
      },
      {
        "title": "11. Creating Components in the default Namespace",
        "content": "By default if you do not provide a Namespace to a component, then it creates them in a default namespace. So if we apply this config map component:\n\nIf we apply this Config Map file:\n\nAnd check the namespace it belongs to by this command, actually this command will list down all the Config Maps within the Namespace default:\n\nAnd we can find our my-configmap in the list.\n\nOr you can also check it by getting details about my-configmap using the following command:\n\nYou will get a long output which will include these lines:\n\nAnd here we can see the namespace to be default.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Creating Components in the default Namespace",
          "snippet": "apiVersion: v1kind: ConfigMapmetadata:    name: my-configmapdata:    db_url: my-service.database"
        }
      },
      {
        "title": "12. Creating Components in a new Namespace",
        "content": "There are two ways of creating components, we can either do it in the CLI or we configure it in the Configuration file itself:"
      },
      {
        "title": "1. Specifying Namespace in the CLI",
        "content": "This can be done by specifying the name of the Namespace while applying the Config Map:\n\nNote that we have already created my-ns in the previous sections. Otherwise it would give us an error.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Specifying Namespace in the CLI",
          "snippet": "kubectl apply -f my-config-map.yaml --namespace=my-"
        }
      },
      {
        "title": "2. Specifying Namespace in the Configuration file",
        "content": "We can simply specify which namespace we want the component to be a part of it's configuration file. For that we can simply take our my-configuration.yaml file and edit it. We are simply adding the line \"namespace: my-ns\"\n\nNow if we apply it:\n\nand if we check out our Config Map:\n\nWe will get that same long output, but this would also include a line which says that the Namespace is now my-ns.\n\nChanging the Active Namespace\n\nThe default namespace is our active namespace. In order to change the active namespace to any other namespace we can use kubens from kubectx. For that we will have to download kubectx by entering the following command\n\nnow if we enter the command\n\nwe will get the list of namespaces present and the active namespace will be highlighted in green:\n\nand then simply use kubens for changing the active namespace.\n\nNow the active namespace has been changed to kubens. This means that by default if we do not specify the namespace the components will be created in the my-ns namespace.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Specifying Namespace in the Configuration file",
          "snippet": "apiVersion: v1kind: ConfigMapmetadata:    name: my-configmap    namespace: my-nsdata:    db_url: my-service.database"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Namespaces & Resource Isolation",
      "initialCode": "kubectl get namespaces",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Namespaces & Resource Isolation",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Namespaces & Resource Isolation in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Namespaces & Resource Isolation",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Namespaces & Resource Isolation enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-configmap": {
    "id": "devops-k8s-configmap",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Kubernetes ConfigMaps: Decoupling Configuration",
    "subtitle": "Complete DevOps engineering guide to Kubernetes ConfigMaps: Decoupling Configuration — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A **ConfigMap** stores non-sensitive configuration data (like URLs, hostnames, or settings) in key-value pairs, separate from application code. It helps make applications portable and easy to manage across different environments. ConfigMaps can be used as:\n\n- Environment variables\n- Command-line arguments\n- Mounted configuration files inside containersExample: DATABASE_HOST=localhost locally, and DATABASE_HOST=my-service in the cloud.\n\n**Note:** ConfigMaps are not secure (use Secrets for sensitive data) and have a **1 MB size limit**. For larger files, use Kubernetes Volumes.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes ConfigMaps: Decoupling Configuration."
        }
      },
      {
        "title": "2. Creating a ConfigMap",
        "content": "In Kubernetes, you can create a ConfigMap either using kubectl commands or a YAML manifest.\n\n1. Using kubectl (imperative commands):\n\n- From literal values:\n**\n\n- From a file:\n2. Using a YAML manifest (declarative approach):**\nCreate a file config.yaml with the following content:\n\nThen apply it to your cluster:\n\nThis creates a ConfigMap named demo-config that stores your configuration data as key-value pairs, ready to be used by Pods in your cluster.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Creating a ConfigMap",
          "snippet": "kubectl create configmap demo-config --from-literal=database_host=172.138.0.1 --from-literal=debug_mode=1 --from-literal=log_level=verbose"
        }
      },
      {
        "title": "3. Best Practices for ConfigMaps",
        "content": "- **Use for non-sensitive data only** – Do not store passwords, API keys, or other confidential information; use Secrets instead.\n- **Keep ConfigMaps small** – ConfigMaps have a 1 MB size limit. For large files or data, use Volumes instead.\n- **Use immutable ConfigMaps when possible** – Prevents accidental changes and ensures consistent configuration.\n- **Name clearly and consistently** – Use descriptive names that indicate purpose and environment (e.g., dev-db-config).\n- **Version your ConfigMaps** – When updating configuration, create a new ConfigMap instead of modifying the existing one to avoid conflicts in running Pods.\n- **Mount carefully** – When mounting ConfigMaps as volumes, ensure file paths inside Pods do not conflict with container files.\n- **Monitor updates** – Remember that Pods do not automatically reload updated ConfigMaps; plan for Pod restarts if needed."
      },
      {
        "title": "4. ConfigMaps stored in Kubernetes",
        "content": "- ConfigMaps are stored as API objects in the cluster’s etcd datastore.\n- They are managed by the Kubernetes API server and can be accessed or modified using kubectl or the Kubernetes API."
      },
      {
        "title": "1. Using data and binaryData fields",
        "content": "When defining ConfigMaps in Kubernetes YAML manifests, note that the values within the data field must be strings. However, if you need to store binary data, you can utilize the binaryData field instead. Here's an example illustrating this concept:\n\nIn this YAML manifest, the data field contains a string value, while the binaryData field stores binary data represented by a base64-encoded string. This allows you to store both text and binary data within the same ConfigMap object.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Using data and binaryData fields",
          "snippet": "apiVersion: v1kind: ConfigMapmetadata:  name: binary-configdata:  text-data: \"This is a string value\"binaryData:  binary-file: |    U29tZSBiaW5hcnkgZGF0YQ=="
        }
      },
      {
        "title": "2: Listing and inspecting ConfigMaps",
        "content": "To view the ConfigMaps you've created in Kubernetes, you can use the kubectl get command. Here's how you can do it:\n\nThis command will list every ConfigMap in your Kubernetes cluster, along with their names and other pertinent details, when it is executed in your terminal or command prompt.\n\nYou can use the kubectl describe command in Kubernetes to view the key-value pairs that are kept in a ConfigMap. This is how you do it:\n\nThe name of the ConfigMap you wish to investigate should be substituted for <configmap-name>. This command will enable you to confirm the configuration data that has been stored by giving you comprehensive details about the given ConfigMap, including its key-value pairs.\n\nGetting a ConfigMap’s Content as JSON\n\nThis command retrieves the ConfigMap named \"test-config\", extracts its data field, and formats the output using JSONPath. Then, the output is piped to the jq tool for better formatting and readability.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2: Listing and inspecting ConfigMaps",
          "snippet": "kubectl get configmaps"
        }
      },
      {
        "title": "3. Mounting ConfigMaps into Pods as volumes",
        "content": "We must first construct a ConfigMap in order to use it as a file in a pod. The command kubectl create configmap can be used to accomplish this. The ConfigMap must be mounted as a volume in the Pod once it has been generated. The volumes part of the Pod specification can be used to accomplish this.\n\nFor instance, the following Pod specification mounts a volume named my-configmap at the path **/etc/configmap** for a ConfigMap with the name my-configmap:\n\nThe containers in the Pod can access the files in the ConfigMap once the ConfigMap has been mounted into the Pod. These files can then be used by the containers to launch and operate.\n\nHere is an illustration of how to use a container to access the files in a ConfigMap:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Mounting ConfigMaps into Pods as volumes",
          "snippet": "apiVersion: v1kind: Podmetadata:  name: my-podspec:  containers:  - name: my-container    image: my-image    volumeMounts:    - name: configmap-volume      mountPath: /etc/configmap  volumes:  - name: configmap-volume    configMap:      name: my-configmap"
        }
      },
      {
        "title": "4. Mounting ConfigMaps into Pods as command line arguments",
        "content": "In Kubernetes, you can mount ConfigMaps into Pods as files and then access those files as command-line arguments. This allows you to pass configuration data to your application without hardcoding it into your container image. Here's how you can achieve this:\n\n- Mount the ConfigMap into your Pod as a volume.\n- Access the configuration files from the mounted volume as command-line arguments.Here's an example YAML configuration to illustrate this:\n\n- A ConfigMap named \"test-config\" is defined with a single key \"config.properties\", containing the application configuration.\n- The Pod \"test-pod\" mounts the ConfigMap as a volume at \"/mnt/test-config\".\n- The application container in the Pod executes a command that includes the configuration file \"/mnt/test-config/config.properties\" as a command-line argument.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Mounting ConfigMaps into Pods as command line arguments",
          "snippet": "apiVersion: v1kind: Podmetadata:  name: test-podspec:  containers:  - name: test-container    image: <your-app-image>    command: [\"/bin/sh\", \"-c\", \"your-app-binary --config /mnt/test-config/config.properties\"]    volumeMounts:    - name: config-volume      mountPath: /mnt/test-config  volumes:  - name: config-volume    configMap:      name: test-config"
        }
      },
      {
        "title": "5. Using Immutable ConfigMaps",
        "content": "Read-only ConfigMaps that are unmodifiable once created are known as immutable ConfigMaps in Kubernetes. They come in handy when you want to make sure that the configuration data does not alter or become inconsistent during the course of your application. Here is an example of using immutable ConfigMaps:\n\n- Create a ConfigMap with the immutable flag set to true.\n- Once created, you cannot modify the data or metadata of the ConfigMap.\n- If you need to update the configuration data, create a new ConfigMap with the updated values.\n- Update your Pods to use the new ConfigMap.Here's an example YAML configuration to illustrate using immutable ConfigMaps:\n\n- A ConfigMap named \"test-config\" is defined with the immutable flag set to true.\n- The configuration data is specified under the \"data\" section as key-value pairs.\n- Once created, any attempt to modify the \"test-config\" ConfigMap will result in an error.\n- To update the configuration data, create a new ConfigMap with the desired changes and update your Pods to use the new ConfigMap.By using immutable ConfigMaps, you can help prevent inadvertent modifications that can compromise the stability of your application and guarantee that its configuration stays consistent and dependable.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Using Immutable ConfigMaps",
          "snippet": "apiVersion: v1kind: ConfigMapmetadata:  name: test-config  annotations:    immutable: \"true\" # Set the immutable flag to truedata:  config.properties: |    database_url=http://example.com/db    debug_mode=true    log_level=debug"
        }
      },
      {
        "title": "10. ConfigMap Updates",
        "content": "The ConfigMaps can be edited by using two ways one is by changing the config maps in the config file and by using the command **kubectl edit configmap **command. It will open the kubernetes configmaps file and there you can make the changes required in that file.\n\nYou can also use kubectl update configmap command. to update the config maps for example as shown below.\n\n- **Data Mutation**: Kubernetes applies modifications made to an updated ConfigMap to the current ConfigMap object. This implies that rather than producing a new item, the existing one is altered in-place. The modified configuration data is automatically sent to any pods referencing the updated ConfigMap.\n- **Pod Updates**: When the ConfigMap is updated, pods that use ConfigMaps as environment variables or mount them as volumes are not automatically restarted. Consequently, until they are restarted or terminated, running pods continue to operate under the previous configuration.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. ConfigMap Updates",
          "snippet": "kubectl update configmap my-configmap --from-literal=key1=value1 --from-literal=key2=value2"
        }
      },
      {
        "title": "11. ConfigMap V/s Secrets",
        "content": "FeatureConfigMapSecretsPurposeStores non-sensitive configuration dataStores sensitive or confidential informationData EncryptionData is not encryptedData is encryptedUse CasesStoring environment variables, configuration files, etc.Storing sensitive data like passwords, API keys, certificatesAccess ControlAccessible to all pods within the clusterRestricted access based on RBAC policiesKubernetes APIKubernetes API object of type ConfigMapKubernetes API object of type SecretVisibilityConfigurations are visible in plain textEncrypted data is not visible in plain textUsageSuitable for non-sensitive data that needs to be sharedSuitable for sensitive data that requires encryption\n\nComment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes ConfigMaps: Decoupling Configuration",
      "initialCode": "kubectl create configmap demo-config --from-literal=database_host=172.138.0.1 --from-literal=debug_mode=1 --from-literal=log_level=verbose",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes ConfigMaps: Decoupling Configuration",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes ConfigMaps: Decoupling Configuration in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes ConfigMaps: Decoupling Configuration",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes ConfigMaps: Decoupling Configuration enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-secrets": {
    "id": "devops-k8s-secrets",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Kubernetes Secrets: Managing Sensitive Credentials",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Secrets: Managing Sensitive Credentials — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A secret in Kubernetes can be defined as an object that contains a small quantity of sensitive data like a password, a token, or a key.\n\n- Reduces the risk of losing or exposing sensitive data during the workflow of creating, viewing, and editing Pods.\n- Secrets are created independently of the Pods in which they are used.\n- Secrets are similar to ConfigMaps, but are specifically designed to store confidential data.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Secrets: Managing Sensitive Credentials."
        }
      },
      {
        "title": "2. Using A Kubernetes Secret",
        "content": "- Secrets can be consumed by Pods as environment variables or mounted volumes, and can also be used directly by system components without exposing them to Pods. A common example is storing credentials for external systems.\n- The secret volume sources are validated to ensure that the specific object's reference actually points to an object of a particular object of secret type. Due to this, the secret should be created before any pods that depend on it.  If the required secret cannot be fetched due to its non-existence or due to the temporary lack of connection to the AOI server the kubelet periodically retires running that specific Pod. Kubelet also reports the event for that Pod including all the details of the problems fetching the secret.\n- When defining environment variables from Secrets, they are required by default. Pods will not start until all non-optional Secrets are available. You can mark them as optional, but if a Pod references a missing key in a Secret, startup will fail."
      },
      {
        "title": "3. Dotfiles in a Kubernetes Secret Volume",
        "content": "In this example, the dotfiles .api_key1 and .api_key2 stores the sensitive API keys within api-keys-secret** **secret. These keys remains hidden and secured when mounted with api-keys-container ensuring only authorized processes can access them.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Dotfiles in a Kubernetes Secret Volume",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: api-keys-secrettype: OpaquestringData:  .api_key1: abcdefg  .api_key2: defghijklm---apiVersion: v1kind: Podmetadata:  name: api-keys-podspec:  volumes:    - name: secret-volume      secret:        secretName: api-keys-secret  containers:    - name: api-keys-container      image: registry.k8s.io/busybox      command: [\"ls\", \"-la\", \"/etc/secret-volume\"]      volumeMounts:        - name: secret-volume          readOnly: true          mountPath: \"/etc/secret-volume\""
        }
      },
      {
        "title": "4. Kubernetes Secret Visible to One Container in a Pod",
        "content": "- Sensitive information in a Pod can be restricted to only the container that needs it.\n- Example scenario:-\n- **Frontend container** → handles user interaction and business logic.\n- **Backend (signer) container** → responsible for message signing.\n- The signer container requires access to a private key stored in a Kubernetes Secret.\n- The frontend container does **not** need access to this secret.\n- By mounting the secret only in the signer container:-\n- The signer has secure access to .private-key.\n- The frontend is fully isolated from sensitive data.\n- This setup ensures **least privilege access** within the Pod.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Kubernetes Secret Visible to One Container in a Pod",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: signing-secrettype: OpaquestringData:  .private-key: password---apiVersion: v1kind: Podmetadata:  name: secure-podspec:  containers:    - name: frontend-container      image: myregistry.io/frontend-app      # Frontend does NOT get secret access    - name: signer-container      image: myregistry.io/signer-app      command: [\"ls\", \"-la\", \"/etc/signing\"]      volumeMounts:        - name: signing-volume          readOnly: true          mountPath: \"/etc/signing\"  # Only signer sees the secret  volumes:    - name: signing-volume      secret:        secretName: signing-secret"
        }
      },
      {
        "title": "5. Types Of Kubernetes Secrets",
        "content": "The following are the types of kubernetes Secrets and Its Usage inshort:\n\nBuilt-in Type\n\nUsage\n\nOpaque\n\nIt is used for storing user-defined data\n\nk8s.io/service-account-token\n\nIt is used for storing ServiceAccount Token\n\nk8s.io/dockercfg\n\nIt is used for storing serialized ~/.dockercfg file\n\nk8s.io/dockerconfigjson\n\nIt is used for storing serialized ~/.docker/config.json file\n\nk8s.io/basic-auth\n\nIt is for storing basic authentication credentials"
      },
      {
        "title": "1. Opaque Secrets",
        "content": "- These are the default secret types i.e., if don't specify any type while creating, this Opaque secrets type is used default. It is used for storing general user-defined data values. We have to generic as subcommand to use this type, if want to specify. The following is an empty\n- **Example:** Used for storing API keys or database passwords\n- The following command creates a empty secret type Opaque:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Opaque Secrets",
          "snippet": "kubect create secret generic mysecret"
        }
      },
      {
        "title": "2. ServiceAccount Token Secrets",
        "content": "- This type of secret type is used to identify the serviceAccount It is used for storing credentials that are used by pods to authenitcate with the kubernetes API Server.\n- **Example:** Used for storing Access Tokens for communicating with kubernetes resources.\n- The following yaml code illustrates it clearly:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. ServiceAccount Token Secrets",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: sa-token-secret  annotations:    kubernetes.io/service-account.name: \"sa-name\"type: kubernetes.io/service-account-token"
        }
      },
      {
        "title": "3.Docker Config Secrets",
        "content": "- It used for serializing the docker configuration files that are used for authenticating with docker registries.\n- **Example:** Used for storing credentials for accessing private docker repositories.\n- The following yaml code helps in you better understanding of docker config secrets:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3.Docker Config Secrets",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: docker-config-secrettype: kubernetes.io/dockerconfigjsonstringData:  .dockerconfigjson: |    {      \"auths\": {        \"https://index.docker.io/v1/\": {          \"username\": \"my-username\",          \"password\": \"my-password\",          \"auth\": \"bXktdXNlcm5hbWU6bXktcGFzc3dvcmQ=\"        }      }    }"
        }
      },
      {
        "title": "4. Basic Authentication Secrets",
        "content": "- It is used for storing credentials of basic HTTP authentication. The following yaml code illustrates you clearly about creating basic Authentication secrets types with yaml code:\n- **Example:** It is used for storing Username and Password for accessing a web service.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Basic Authentication Secrets",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: basic-auth-secrettype: kubernetes.io/basic-authstringData:  username: myuser  password: mypassword"
        }
      },
      {
        "title": "5. SSH Authentication Secrets",
        "content": "- It is used for storing credentials for SSH Authentication.The following yaml code helps you in better understanding the ssh Authentication secrets creation.\n- **Example:** Used for storing Username and passwords for accessing a web service.\n**Using the SSH Secret in a Pod**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. SSH Authentication Secrets",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: ssh-auth-secrettype: kubernetes.io/ssh-authstringData:  ssh-privatekey: |    -----BEGIN RSA PRIVATE KEY-----    MIIEpAIBAAKCAQEA7xyzasv..    -----END RSA PRIVATE KEY-----"
        }
      },
      {
        "title": "6. TLS Secrets",
        "content": "- It is used for storing data that is used for TLS encryption and decryption. The following yaml code helps you in better understanding of creating TLS secrets type:\n- **Example**: Stores TLS certificates and keys for securing communication between services.\nUsing in a Pod:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. TLS Secrets",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: tls-secrettype: kubernetes.io/tlsstringData:  tls.crt: |    -----BEGIN CERTIFICATE-----    MIIC+zCCAeOgAwIBAgIJAK6EXAMPLECERTIFICATE    -----END CERTIFICATE-----  tls.key: |    -----BEGIN PRIVATE KEY-----    MIIEvAIBADANBgkqhkiG9w0BAQEFAASCEXAMPLEPRIVATEKEY    -----END PRIVATE KEY-----"
        }
      },
      {
        "title": "7. BootStrap Token Secrets",
        "content": "- This secret type is used for storing tokens that are used during the node bootstrap process to sign. The following yaml code helps in understanding and creating the bootstrap token secrets:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. BootStrap Token Secrets",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: bootstrap-token-abcdef  namespace: kube-systemtype: bootstrap.kubernetes.io/tokenstringData:  description: \"Bootstrap token for joining nodes\"  token-id: abcdef  token-secret: 0123456789abcdef  usage-bootstrap-authentication: \"true\"  usage-bootstrap-signing: \"true\""
        }
      },
      {
        "title": "13. Ways To Create Kubernetes Secrets",
        "content": "When we working with kubernetes, the management of passwords, tokens and certificaties are important. Kubernetes comes up with multi mode of solutions for securly store and access the data. Here, lets discuss the 3 general methods for creating kubernetes secrets.\n\n1. Create kubernetes secrets using kubectl\n\n2. Create kubernetes secrets using A manifest file"
      },
      {
        "title": "14. Creating Kubernetes Secrets Using Kubectl",
        "content": "- It is a quick and straightforward way of creating kubernetes secrets from command line. It is suitable for creating secrets on the fly during development or testing phases.\n- In this secrets creation, it supports accessing data from literals, files offering flexibility of handling sensitive data. The following command is used for creating secrets with string literals:\n\n- The following command is used for creating secrets from one or more files:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Creating Kubernetes Secrets Using Kubectl",
          "snippet": "kubectl create secret generic my-secret --from-literal=username=admin --from-literal=password=secretpassword"
        }
      },
      {
        "title": "15. Create Kubernetes Secrets Using A Manifest File",
        "content": "- It comes with facilitating a declarative way of defining secrets using YAML or JSON manifest files. It facilitates with easy sharing and replication of secrets configurations on different environments.\n- The following is the simple Yaml file for creating kubernetes secrets.\n\n- After the saving the above file code as mysecret-file.yaml execute the file and create secrets using following command:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Create Kubernetes Secrets Using A Manifest File",
          "snippet": "apiVersion: v1kind: Secretmetadata:  name: my-secrettype: Opaquedata:  username: YWRtaW4= # base64 encoded username  password: cGFzc3dvcmQ= # base64 encoded password"
        }
      },
      {
        "title": "16. Manage Kubernetes Secrets",
        "content": "Management of kubernetes secrets involves steps for securly handing sensitive data within the kubernetes cluster. Some of the managing kubernetes secrets are discussed as follows:\n\n- **Creation:** On using kubectl commands create secrets for storing sentive data such as passwords, tokens or certificates.\n- **Access Control:** Implement Role Based Access Control ( RBAC ) to restrict the access of secrets based on users.\n- **Encryption: **Consider on using external solutions like Hashicorp Vault for enhancing security of secret data at rest and in transit.\n- **Rotation:** Regularly rotating the secrets helps in minimizing the risk of unauthorization and maintaining the security policies.To know more about this, refer this - Article"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Secrets: Managing Sensitive Credentials",
      "initialCode": "apiVersion: v1kind: Secretmetadata:  name: api-keys-secrettype: OpaquestringData:  .api_key1: abcdefg  .api_key2: defghijklm---apiVersion: v1kind: Podmetadata:  name: api-keys-podspec:  volumes:    - name: secret-volume      secret:        secretName: api-keys-secret  containers:    - name: api-keys-container      image: registry.k8s.io/busybox      command: [\"ls\", \"-la\", \"/etc/secret-volume\"]      volumeMounts:        - name: secret-volume          readOnly: true          mountPath: \"/etc/secret-volume\"",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Secrets: Managing Sensitive Credentials",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Secrets: Managing Sensitive Credentials in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Secrets: Managing Sensitive Credentials",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Secrets: Managing Sensitive Credentials enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-volumes": {
    "id": "devops-k8s-volumes",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "Kubernetes Volumes, PV & PVC Storage",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Volumes, PV & PVC Storage — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Kubernetes Volumes provide a persistent storage abstraction that decouples data from the individual container's lifecycle.\n\n- **Persistence**: Volumes prevent data loss by ensuring files remain intact even if a container crashes or is restarted by the kubelet.\n- **Container Sharing**: They act as a shared directory accessible by all containers within a single Pod, enabling efficient intra-Pod file exchange.\n- **Lifecycle Coupling**: Unlike ephemeral container storage, a Volume’s lifetime is tied to the Pod itself; data survives container restarts but is typically deleted if the Pod is destroyed.\n- **Abstraction Layer**: They provide a consistent interface for containers to access diverse storage backends, ranging from local disk and empty directories to cloud-based block storage.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Volumes, PV & PVC Storage."
        }
      },
      {
        "title": "2. Kubernetes Storage Plugins",
        "content": "These Kubernetes Storage plugins lay the foundation for the easy management and internal operations of storage solutions in containers. It does the configurational settings on containers that are orchestrated by Kubernetes. These plugins increase the platform's adaptability and guarantee a customized solution for a range of storage requirements.\n\nThe following 2 popular kubernetes storage plugins:\n\n- Network File System Plugin\n- Container Storage Interface ( CSI )"
      },
      {
        "title": "3. Network File System Plugin",
        "content": "- **Effortless Data Sharing: **NFS plugin servers a vital, in establishing the connection between Kubernetes volumes and network file systems without any difficulties for transmission of data.\n- **Cluster-wide Accessibility: **The NFS plugin helps with enabling stable data transmission among the clusters improving the efficiency of resource usage.\n- **Scalable Solutions:** NFS acts as a great option for customizing storage needs facilitating effective data exchange and offering scalable solutions."
      },
      {
        "title": "4. Container Storage Interface, or CSI",
        "content": "- **Standardized Integration:** Container Storage Interface ( CSI ) comes with a standardized Interface with common language storage providers facilitating effortless integration with Kubernetes.\n- **Flexibility And choice:** The CSI plugin provides a method for the users to select the storage options that exactly meet to the needs of their applications.\n- **Interoperability:** CSI comes with adopting a standardized approach for enhancing the interoperability providing a smooth and efficient storage experience with containerized settings."
      },
      {
        "title": "5. PersistentVolume (PV)",
        "content": "A PersistentVolume (PV) is a cluster-level storage resource that provides persistent data storage independent of Pod lifecycles. It is treated as a cluster resource, similar to nodes, and works like a volume plugin whose lifecycle is not tied to any specific Pod.\n\nPVs can be:\n\n- **Dynamically provisioned** using StorageClasses.\n- **Manually provisioned** by an administrator.Without PVs, developers would need to attach multiple files or volumes directly to Pods for storage, which:\n\n- Increases Pod complexity.\n- Tightly couples storage with the Pod lifecycle.\n- Risks data loss, since Pod storage is ephemeral and not designed for persistence.PVs solve this problem by offering a dedicated, persistent storage layer that remains intact even if Pods crash, fail, or restart. They can represent a variety of storage backends such as NFS, iSCSI, or cloud storage (AWS EBS, GCP Persistent Disk, Azure Disk, etc.).\n\nThe PV API object stores the implementation details of the storage, abstracting away the complexity from developers and ensuring consistent, reliable storage across the cluster."
      },
      {
        "title": "6. PersistentVolume Claim(PVC)",
        "content": "A PersistentVolumeClaim (PVC) is a request made by a user or application to access persistent storage in a Kubernetes cluster.\n\nSince Pods cannot directly manage or provision storage, PVCs act as a bridge between Pods and PersistentVolumes (PVs), ensuring applications get the storage they need without dealing with the underlying implementation details. PVCs can specify:\n\nStorage size requirements, such as 5Gi or 10Gi. Access modes, including:\n\n- **ReadWriteOnce (RWO)** – mounted as read-write by a single node.\n- **ReadOnlyMany (ROX)** – mounted as read-only by multiple nodes.\n- **ReadWriteMany (RWX)** – mounted as read-write by multiple nodes.If dynamic provisioning is enabled through a StorageClass, PVCs can automatically create new PVs without administrator involvement. This makes storage portable and reusable across different backends such as NFS, AWS EBS, or GCP Persistent Disk.\n\nWhen a Pod uses a PVC, it automatically connects to the bound PV. This ensures that data remains safe and persistent even if the Pod is restarted or reschedule."
      },
      {
        "title": "7. PV and PVC Working Together",
        "content": "The relationship between **PersistentVolumes (PV)** and **PersistentVolumeClaims (PVC)** ensures that storage is provisioned and consumed in a seamless way. The workflow can be understood as follows:\n\n- The cluster administrator defines PersistentVolumes (PVs) or configures StorageClasses to enable dynamic provisioning.\n- Developers or applications create PersistentVolumeClaims (PVCs) by requesting storage with requirements such as size, access mode, and optionally a StorageClass.\n- The Kubernetes control plane matches each PVC with a suitable PV that meets the requirements and binds them together.\n- If dynamic provisioning is enabled, a new PV is created automatically.\n- Once bound, the Pod mounts the PVC and uses it like any other volume.\n- The application running inside the Pod has persistent storage even if the Pod restarts."
      },
      {
        "title": "8. Creating a Pod Yaml File with PV and PVC",
        "content": "Whenever developer deploying an Application using Kubernetes to make the data in this application Persistent , he raise the request for the persistent Volume it known as PVC. IT Administrators looks over the specifications of the PVC requests and provides Persistent Volumes (PV) as per required needs."
      },
      {
        "title": "9. Step 1: Creating a PV ( Persistent Volume ) with a Yaml file",
        "content": "Based on the PVC specification , the Persistent Volume is created and allocated to it , here we are going to the manual way instead of precreated storage classes for better understanding of workflow. Try on writing a yaml code for persistent volume as follow:\n\nIn this file, we providing reclaim policy as Retain, to make the data permant even after the deletion of the pod application.\n\nSave the above specified yaml file with \"**my_pv.yml**\" and then run it with the following command:\n\nThe following screenshots show the implementation of above step3 commands",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Step 1: Creating a PV ( Persistent Volume ) with a Yaml file",
          "snippet": "apiVersion: v1kind: PersistentVolumemetadata:  name: mypvspec:  capacity:    storage: 2Gi  accessModes:    - ReadWriteOnce  persistentVolumeReclaimPolicy: Retain  hostPath:    path: \"/mnt/data\""
        }
      },
      {
        "title": "10. Step 2: Checking the Status of PV",
        "content": "After once completing the step 3 to check the status of the PV try on running the following command:\n\nTo know more about the details of the PV that you created try on running the following command with its specific name of PV\n\nThe following screenshots show the implementation of above step4 commands",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Step 2: Checking the Status of PV",
          "snippet": "kubectl get pv"
        }
      },
      {
        "title": "11. Step 3: Creating a PVC (Persistent Volume Claim) with a Pod Yaml",
        "content": "Here we are creating PVC with name as **mypvc** using Yaml syntax file with specification of storage resource of **5Gib**, having accessmodes Read and Write only Once. Save the file code with name such as **my_pvc.yml**\n\nRun this yaml file with kubectl create command or kubectl apply command as follows\n\nThe following picture show the practical usage of the above commands",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Step 3: Creating a PVC (Persistent Volume Claim) with a Pod Yaml",
          "snippet": "apiVersion: v1kind: PersistentVolumeClaimmetadata:  name: mypvcspec:  accessModes:    - ReadWriteOnce  resources:    requests:      storage: 2Gi"
        }
      },
      {
        "title": "12. Step 4: Check the Status of the PVC",
        "content": "After executing the above step 1 to check the status of PVC creation try on running the following command:\n\nTo know more about the PVC try on seeing the description on running the following command\n\nThe following screenshots show the implementation of above step2 commands",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Step 4: Check the Status of the PVC",
          "snippet": "kubectl get pvc"
        }
      },
      {
        "title": "13. Step 5: Creating Pod Yaml File with PV and PVC",
        "content": "Now create a pod yaml file as referring the following yaml code for using the above created PV and PVC with Pod application with image nginx latest version.\n\nSave this pod yaml file with name my_pod.yml and then run it with the command kubectl create as follow:\n\nThe following screenshots show the implementation of above step 5 commands",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. Step 5: Creating Pod Yaml File with PV and PVC",
          "snippet": "apiVersion: v1kind: Podmetadata:  name: my-podspec:  containers:  - name: my-container    image: nginx:latest    volumeMounts:    - name: my-persistent-storage      mountPath: \"/usr/share/nginx/html\"  volumes:  - name: my-persistent-storage    persistentVolumeClaim:      claimName: my-pvc"
        }
      },
      {
        "title": "14. Step 6: To Check The Status Of Created Pod",
        "content": "to check the creation of the pod check with the following command:\n\nTo know more about the detailing of that pod, run with the following command\n\nThe following screenshots show the implementation of above step6 commands",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Step 6: To Check The Status Of Created Pod",
          "snippet": "kubectl get pods"
        }
      },
      {
        "title": "15. Best Practices for Using PVs and PVCs",
        "content": "**1. Always use StorageClass in cloud environments**\n\n- It enables dynamic provisioning, so you don’t need to manually create PVs.\n- Makes storage portable across different cloud providers**2. Define clear retention (Reclaim) policies**\n\n- Choose between Retain, Recycle, or Delete policies depending on your use case to prevent accidental data loss or unnecessary storage consumption.\n- Monitor PV usage to avoid storage leaks.\n- Regularly check for unbound PVs or unused PVCs to help reclaim resources and reduce costs.\n- Right-size your storage requests by asking only for the capacity your application truly needs.\n- Avoid overprovisioning and wasted storage.\n- Use meaningful labels and annotations to make storage easier to manage, identify, and troubleshoot across namespaces.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Volumes, PV & PVC Storage",
      "initialCode": "apiVersion: v1kind: PersistentVolumemetadata:  name: mypvspec:  capacity:    storage: 2Gi  accessModes:    - ReadWriteOnce  persistentVolumeReclaimPolicy: Retain  hostPath:    path: \"/mnt/data\"",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Volumes, PV & PVC Storage",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Volumes, PV & PVC Storage in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Volumes, PV & PVC Storage",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Volumes, PV & PVC Storage enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-rbac": {
    "id": "devops-k8s-rbac",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Kubernetes Role-Based Access Control (RBAC)",
    "subtitle": "Complete DevOps engineering guide to Kubernetes Role-Based Access Control (RBAC) — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Kubernetes RBAC (Role‑Based Access Control) is a security mechanism used to manage permissions and control access to resources within a Kubernetes cluster. It ensures that users and applications can only perform actions they are authorized for, improving security and governance. Every request made to the Kubernetes API server passes through a sequence of three stages:",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Kubernetes Role-Based Access Control (RBAC)."
        }
      },
      {
        "title": "1. Authentication",
        "content": "This stage identifies **who** is making the request. Kubernetes verifies identity through external methods rather than an internal user database.\n\n- **Client Certificates:** Verified by the cluster’s Certificate Authority (CA), typically for system components.\n- **Service Account Tokens:** Used by applications running inside the cluster’s Pods.\n- **OIDC Tokens:** Used for integration with external identity providers like Okta or Google.\n- **Basic Auth:** Username and password credentials, though rarely used due to security risks.\n- **Identity Mapping:** Successful authentication assigns a **Username**, **UID**, and **Groups** to the request."
      },
      {
        "title": "2. Authorization",
        "content": "This stage determines **what** the authenticated user is allowed to do by checking their specific permissions.\n\n- **Policy Check:** The server evaluates if the user has the rights to perform a specific verb (like `get` or `create`) on a specific resource.\n- **RBAC:** The standard authorization mode where permissions are defined in **Roles** and assigned via **Bindings**.\n- **Rejection:** If the user does not have an explicit permission for the action, the request is denied immediately.\n- 3. Admission Control (Final Checks)"
      },
      {
        "title": "3. Admission Control",
        "content": "This is the final gatekeeper that enforces cluster-wide policies before the request is saved to **etcd**.\n\n- **Mutation:** Some controllers modify the request, such as automatically adding default resource limits to a Pod.\n- **Validation:** Other controllers strictly verify the request, such as ensuring an image comes from a trusted registry.\n- **Enforcement:** This stage can reject requests even if the user is fully authorized, ensuring the cluster remains compliant with global configurations.\n- **Persistence:** Once cleared, the request is finally committed to the cluster’s state."
      },
      {
        "title": "5. The Core Components of RBAC",
        "content": "RBAC is built upon four key API objects. They can be divided into two categories: defining what can be done (Roles) and defining who can do it (Bindings)."
      },
      {
        "title": "6. Roles and ClusterRoles",
        "content": "These objects define a set of permissions. The rules inside them are purely additive (there are no \"deny\" rules).\n\n- **Role:** A **Role** grants permissions **within a single namespace**. It contains rules that define a set of operations (verbs) on a set of resources.\n- **ClusterRole:** A **ClusterRole** is just like a Role, but it is **not namespaced**. It can be used for two main purposes:\n- Granting permissions to cluster-scoped resources like Nodes, PersistentVolumes, or Namespaces themselves.\n- Granting permissions to namespaced resources (like Pods or Deployments) but across **all namespaces** in the cluster."
      },
      {
        "title": "7. RoleBindings and ClusterRoleBindings: Granting Permissions",
        "content": "These objects \"bind\" a Role or ClusterRole to a subject (a user, group, or ServiceAccount), thereby granting them the permissions defined in that role.\n\n- **RoleBinding:** A **RoleBinding** grants the permissions of a Role to a subject **within a specific namespace**.9 You must have a RoleBinding in the same namespace as the Role it is granting.\n- **ClusterRoleBinding:** A **ClusterRoleBinding** grants the permissions of a ClusterRole to a subject **across the entire cluster**."
      },
      {
        "title": "8. Subjects, Verbs, and Resources",
        "content": "- Subjects refer to the entity that performs an action. This can be a user, group, or service account.\n- Verbs represent a subject's actions, such as 'get', 'create', and 'delete'.\n- Resources represent the objects on which the actions can be performed, such as 'pods', 'services', 'and nodes."
      },
      {
        "title": "9. Roles",
        "content": "In Kubernetes, a Role is a declaration of the operations that can be performed on a type of Kubernetes resource within a particular namespace. A simple example of a Role could be: You might need to do some pre-checks as below:\n\n**Roles. yaml: **This Role, named 'pod-reader', provides read-only access to Pods in the default namespace.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Roles",
          "snippet": "kind: RoleapiVersion: rbac.authorization.k8s.io/v1metadata:  namespace: default  name: pod-readerrules:- apiGroups: [\"\"]  resources: [\"pods\"]  verbs: [\"get\", \"watch\", \"list\"]"
        }
      },
      {
        "title": "10. RoleBindings",
        "content": "It actually grants the permissions defined in a Role to a user or set of users. It holds a list of subjects and a reference to the Role being granted. Here's an example of a RoleBinding:\n\n**RoleBindings.yaml: **In this RoleBinding, the 'pod-reader' Role is assigned to the user 'john'. This means that 'john' can now read Pods in the default namespace.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. RoleBindings",
          "snippet": "kind: RoleBindingapiVersion: rbac.authorization.k8s.io/v1metadata:  name: read-pods  namespace: defaultsubjects:- kind: User  name: john  apiGroup: rbac.authorization.k8s.ioroleRef:  kind: Role  name: pod-reader  apiGroup: rbac.authorization.k8s.io"
        }
      },
      {
        "title": "11. ClusterRoles",
        "content": "ClusterRole is similar to Role. However, while a Role is namespace-specific, a ClusterRole is not. This means that you can define permissions that apply across all namespaces in your cluster. Here's an example of a ClusterRole.\n\n**ClusterRoles.yaml: **In this ClusterRole, reading Nodes across the cluster is allowed.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. ClusterRoles",
          "snippet": "kind: ClusterRoleapiVersion: rbac.authorization.k8s.io/v1metadata:  name: node-readerrules:- apiGroups: [\"\"]  resources: [\"nodes\"]  verbs: [\"get\", \"watch\", \"list\"]"
        }
      },
      {
        "title": "12. ClusterRoleBindings",
        "content": "Similar to a RoleBinding, a ClusterRoleBinding grants the permissions defined in a ClusterRole to a set of users, but it applies cluster-wide.\n\n**ClusterRoleBindings.yaml: **In this ClusterRoleBinding, the 'node-reader' ClusterRole is assigned to the user 'john', allowing 'john' to read Node information across the entire cluster.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. ClusterRoleBindings",
          "snippet": "kind: ClusterRoleBindingapiVersion: rbac.authorization.k8s.io/v1metadata:  name: read-nodessubjects:- kind: User  name: john  apiGroup: rbac.authorization.k8s.ioroleRef:  kind: ClusterRole  name: node-reader  apiGroup: rbac.authorization.k8s.io"
        }
      },
      {
        "title": "13. RBAC Usage Scenarios",
        "content": "RBAC can be used in various scenarios to isolate team access, limit resource access, restrict operations, control admin access, and manage service account permissions."
      },
      {
        "title": "14. Isolating Team Access",
        "content": "- Suppose we have multiple teams working in the same Kubernetes cluster but on different applications.\n- You can use RBAC to ensure that the developers from one group don't accidentally (or intentionally) modify the resources of another team.\n- You do this by creating roles that have access to only specific namespaces and binding those roles to the respective teams."
      },
      {
        "title": "15. Limiting Resource Access",
        "content": "- We might have certain sensitive resources in your cluster, like secrets or config maps, that should only be accessed by certain individuals or applications.\n- With RBAC, you can restrict access to these resources to only those who absolutely need it."
      },
      {
        "title": "16. Restricting Operations",
        "content": "- Not every user or application needs to perform every type of operation. For example, you might have a CI/CD pipeline that only needs to be able to create and delete pods, or a monitoring tool that only needs to be able to read the status of all resources.\n- With RBAC, you can create roles that have only the necessary permissions and no more."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Kubernetes Role-Based Access Control (RBAC)",
      "initialCode": "kind: RoleapiVersion: rbac.authorization.k8s.io/v1metadata:  namespace: default  name: pod-readerrules:- apiGroups: [\"\"]  resources: [\"pods\"]  verbs: [\"get\", \"watch\", \"list\"]",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Kubernetes Role-Based Access Control (RBAC)",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Kubernetes Role-Based Access Control (RBAC) in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Kubernetes Role-Based Access Control (RBAC)",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Kubernetes Role-Based Access Control (RBAC) enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-kubectl": {
    "id": "devops-k8s-kubectl",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "kubectl Command Reference for Cluster Management",
    "subtitle": "Complete DevOps engineering guide to kubectl Command Reference for Cluster Management — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Kubectl (often pronounced cube-control or cube-c-t-l) is the command-line interface (CLI) for Kubernetes. It acts as your control panel, allowing you to run commands against a Kubernetes cluster. Behind the scenes, `kubectl` is essentially a translator.\n\n- It takes your command-line instructions, converts them into HTTP/HTTPS API requests and securely passes them to the Kubernetes Master Node (specifically, the API Server).\n- From there, Kubernetes handles the creation, deletion, modification, or viewing of your resources.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for kubectl Command Reference for Cluster Management."
        }
      },
      {
        "title": "2. Kubernetes Internals",
        "content": "To understand `kubectl`, it helps to understand the environment it controls. Kubernetes orchestrates containerised applications using a Master-Worker node architecture:\n\n- **API Server:** The front door of the Kubernetes control plane. This is the exact component `kubectl` talks to.\n- **Etcd:** A highly available key-value store that holds all cluster data and configurations.\n- **Controller Manager:** Maintains the desired state of your applications (e.g., making sure if you want 4 replicas, exactly 4 are running).\n- **Scheduler:** Assigns newly created workloads (Pods) to available Worker Nodes.When you type a command, `kubectl` authenticates with the cluster, sends the request to the API Server, and the API Server coordinates with the Etcd, Controller Manager, and Scheduler to execute your will."
      },
      {
        "title": "3. Architecture of Kubernetes Cluster",
        "content": "The Kubectl is a client-side tool that acts as a bridge between the users and the K8s cluster. It provides an interactive command-line interface for the users to run the commands with kubectl against the Kubernetes cluster.\n\nKubernetes ClusterThe Architecture involves once the users/client executes a command through the command line it is authenticated with the master node of k8s Cluster through the Kubernetes API server. Based on the type of API request Kubernetes API server facilitates the orchestration and coordination of Kubernetes resources such as Control Manager, Kubernetes Scheduler, and Etcd resources."
      },
      {
        "title": "4. Installation of Kubectl",
        "content": "You can setup the installation of Kubectl on any of the following sources of environment.\n\n- Linux\n- macOS\n- WindowsOnce you install Kubectl on kuba respective environment you can cross-check by running the below command.\n\nIn the following screenshot you versioning details of kubectl:\n\n**To know more about of kubectl, please read this cheatsheet: kubectl cheatsheet\n\nSyntax**\n\n- **[command]:** The action you want to perform (e.g., `create`, `get`, `describe`, `delete`, `apply`).\n- **[TYPE]:** The Kubernetes resource you are targeting (e.g., `pod`, `namespace`, `deployment`, `service`). Note: This is case-sensitive.\n- **[NAME]:** The specific name of the resource (e.g., `my-nginx-pod`).\n- **[flags]:** Optional modifiers used to specify environments, output formats, or namespaces (e.g., `-n my-namespace` or `-o yaml`).How to run the commands for resources that kubectl provides.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Installation of Kubectl",
          "snippet": "$ kubectl version"
        }
      },
      {
        "title": "5. Create a Resource Using Kubectl",
        "content": "In Kubernetes, a resource gets created inside a namespace which resource using which we can create other resources in a separate environment.\n\nFirst, we are creating a namespace inside which we will create our Pod.\n\nWe can create a Pod using the below YAML file.\n\nThe above file is a configuration file using which we are creating a pod of name geeksforgeeks in namespace geeksforgeeksnamespace which is an Nginx server. Similarly, we can create other resources like secrets, replica sets, etc by just changing the name in front of the kind and mentioning the key value in metadata and spec accordingly.\n\nThe above discussed commands are implemented in the screenshot, try on implementing this",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Create a Resource Using Kubectl",
          "snippet": "$ kubectl create namespace geeksforgeeks"
        }
      },
      {
        "title": "6. To Get the Resources",
        "content": "Command to see all the namespaces.\n\nTo see the namespace geeksforgeeksnamespace run the below command.\n\nCommand to see the list of all pods.\n\nThis will show the pods in the default namespace. To list all the pods in a particular namespace we can pass the flag -n and the name of the namespace with `kubectl get pods` command.\n\nSo if we have to list down the pod that we have created in namespace geeksforgeeksnamespace, run the below command.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. To Get the Resources",
          "snippet": "kubectl get namespaces"
        }
      },
      {
        "title": "7. Describe a Resource",
        "content": "While `get` gives you a summary, `describe` gives you the deep technical details, status, and event logs of a specific resource. This is crucial for troubleshooting.\n\nSo now we will describe our pod.\n\nCreating namespace with name \"geeksforgeeks\" and creating pod with name \"geeksforgeeks\" inside this namespace is showed in this screenshot:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Describe a Resource",
          "snippet": "$ kubectl describe resource_name -n namespace_name"
        }
      },
      {
        "title": "8. Delete the Resources",
        "content": "kubectl delete command is used to delete the resources by passing their name and namespace if we are deleting other resources other than a namespace.\n\nNow we will delete the pod and namespace.\n\nYou can verify whether the pod is deleted or not by running kubectl get pod -n geeksforgeeksnamespace.\n\nNow we will delete the namespace instead of -n option as follows.\n\n**Note: **If we delete the namespace before the pod then the pod will delete automatically with other resources in that namespace.\n\nThe following screenshot shows the practical deleting pods in namespaces and deleting namespaces:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Delete the Resources",
          "snippet": "$ kubectl delete resource\n resource_name -n namespace_name"
        }
      },
      {
        "title": "9. Popular Commands Usage Of Kubectl",
        "content": "There are many commands in kubectl and their popularity depends on the requirements and its specific Use case. However, here some of the commands list that are some commonly used and popular kubectl commands:\n\n- The following command helps in listing all the pods in the specified namespace.\n\n- The following command is used to describe a Deployment resource in Kubernetes.\n\n- The following command is used to scale/adjust the replicas for a deployment up or down.\n\n- The following command is used to create a Kubernetes service and to expose the pods to the cluster through a YAML file.\n\n- The following command is used for deleting a specific resource in a Kubernetes such as a pod, or deployment.\nThe above specific commands you can use depend on the tasks you are going to perform within your Kubernetes cluster. Additionally it is always a recommended idea to refer the official documentation of Kubernetes for detailed information on kubectl commands and their usage.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Popular Commands Usage Of Kubectl",
          "snippet": "kubectl get pods -n namespace1"
        }
      },
      {
        "title": "10. Run Kubernetes Yaml Code Files With Kubectl",
        "content": "By defining the desired resources with Yaml syntax, you can create and run a Kubernetes YAML file using the 'kubectl' command for configuring those appliances to the Kubernetes cluster. Here is the step-by-step process of guidelines to create and run the k8s file with kubectl:"
      },
      {
        "title": "11. Create a Yaml File",
        "content": "On using a text editor create a YAML file describing the specification of resources that to create or modify. For Example a 'Deployment.yaml' file is created as a sample.\n\nThe following screenshot shows the creation of deployment practically with name \"deployment\" with replicas - 4",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Create a Yaml File",
          "snippet": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: mydeployment\nspec:\n  replicas: 4\n  selector:\n    matchLabels:\n      app: myapp1\n  template:\n    metadata:\n      labels:\n        app: myapp1\n    spec:\n      containers:\n      - name: mycontainer1\n        image: nginx:latest"
        }
      },
      {
        "title": "12. Applying The Configuration",
        "content": "Use the Deployment.yaml file with the 'kubectl apply' command to apply the configurations to the Kubernetes cluster. here I am using default namespace, to specify the use -n namespace_name at the end of the command.\n\nWhen your are applying the configuration for the first time with the specified yaml file we use create option. i.e., kubectl create -f <file_name>. While the option `kubectl apply` can be used for the both creation and updating the configuration of the file ie., kubectl apply -f <file_name>\n\nThe following screenshot shows the practical on updating the deployment configuration file with changing its replicas from 4 to 2.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Applying The Configuration",
          "snippet": "kubectl create -f  Deployment.yaml"
        }
      },
      {
        "title": "13. To Check The Status Of The Resources in K8s",
        "content": "- To verify whether the applied configurations of the resources from the file is created or updated successfully or not. Try on running the kubectl get command with the resource name i.e., kubectl get <resource_name>",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. To Check The Status Of The Resources in K8s",
          "snippet": "kubectl get deployments\n kubectl get pods"
        }
      },
      {
        "title": "14. Describing the Resources ( Optional )",
        "content": "- For knowing the detailed information about a specific resource, try on specifying resource type and resource type name with kubectl command.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Describing the Resources ( Optional )",
          "snippet": "kubectl describe deployment mydeployment"
        }
      },
      {
        "title": "15. Updating The Resources ( Optional )",
        "content": "To make changes any changes to your resources, you can update the YAML file, and then reapply the configuration using `kubectl apply `command with <filename>.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Updating The Resources ( Optional )",
          "snippet": "kubectl apply -f Deployment.yaml"
        }
      },
      {
        "title": "16. Deleting The Resources (Optional)",
        "content": "To delete a specific resource that you created try on running the `kubectl delete` command with resource type and resource type name.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 16. Deleting The Resources (Optional)",
          "snippet": "kubectl delete -f Deployment.yaml"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: kubectl Command Reference for Cluster Management",
      "initialCode": "$ kubectl version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: kubectl Command Reference for Cluster Management",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of kubectl Command Reference for Cluster Management in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via kubectl Command Reference for Cluster Management",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "kubectl Command Reference for Cluster Management enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-k8s-best-practices": {
    "id": "devops-k8s-best-practices",
    "badge": "Module 7 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Production DevOps Best Practices for Kubernetes",
    "subtitle": "Complete DevOps engineering guide to Production DevOps Best Practices for Kubernetes — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- DevOps is the hot topic in the market these days. DevOps is a vague term used for wide number of operations, most agreeable defination of DevOps would be that DevOps is an intersection of development and operations. Certain practices need to be followed during the application release process in DevOps for a more streamline workflow, continuous delivery and continuous integration of the code and proper scaling for the application. In this article we will discuss the best DevOps practice you must know as a DevOps engineer/ DevOps enthusiast for Kubernetes in 2023.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Production DevOps Best Practices for Kubernetes."
        }
      },
      {
        "title": "2. DevOps: What It Is And Why It Matters?",
        "content": "DevOps is the intersection of development and operations. Development and operations are two main components in the whole application release process and a DevOps engineer works closely with both the development and the operations team and ensures that both the team rather than working in silos, work in an agile and collaborative environment understanding each other.\n\nDevOps defines a combination of cultural philosophies practices and tools for a better application release process. DevOps is not just one set of tools or one specific concept, it's a combination of anything that creates the process of releasing the software fast and with high quality. The main part of the concept was that developers and operations people should work together more often and collaborate better to achieve this releasing of software fast and with high quality."
      },
      {
        "title": "3. What Is Kubernetes And Why Should You Care?",
        "content": "Kubernetes is an open source container orchestration framework originally developed by google, released on September 2014 and later donated to CNCF (Cloud Native Community Foundation). Kubernetes helps us manage applications that are made up of hundreds or even thousands of containers and it helps us manage these applications in different environments like physical machines, virtual machines, cloud environments or even hybrid deployment environments.\n\nKubernetes is the most popular and widely used container orchestration tool. It has a lot of use cases, major once are:\n\n**1. High availability of the application: **this means that the application has no downtime so it's always accessible to the users\n\n**2. Scalability: **this means that application has a high performance, it loads fast and users have a very high response rates from the application.\n\n**3. Disaster recovery: **this basically means that if an infrastructure has some problems like data is lost or the servers explode or something bad happens with the server center, the infrastructure has to have some kind of mechanism to pick up the data and to restore it to the latest state so that application doesn't actually lose any data and can run again."
      },
      {
        "title": "4. What is the Need Of DevOps?",
        "content": "The most important part of DevOps practices is tacking the challenge of miscommunication and lack of collaboration between developers and the operations team. Releasing application has two main parts - coding the application and the other part is deploying and maintaining the application. Developers are responsible for coding part while the operations team is responsible for running the application and between these two there might be a gap. The operations team wants to run the application but they don't know how it works on the first place, and the developers would code without considering where or how the code will be deployed. While operations would try to deploy without really understanding what and why they are deploying or how the application even works. this would result in miscommunications between the two teams and causes not just less productivity and releasing the newer versions takes longer time, but also lesser quality applications being deployed without proper collaboration.\n\nThis is where DevOps comes into play. It brings the development and the operations team together to collaborate rather than work in silos and ensures high quality applications and features in lesser release time."
      },
      {
        "title": "5. Key Benefits Of DevOps Practices",
        "content": "Here are some benefits of DevOps Practices:"
      },
      {
        "title": "1. Reducing Miscommunications",
        "content": "DevOps ensures proper communication of the operations and the development team so rather than working in silos, they come together and collaborate. This is very different than the Waterfall model of development where the two teams have least communication.\n\n**Note: **Waterfall model refers to a linear model of developing and deploying applications where engineers works on one thing at a time and both the development and operations team work in silos not considering what the other team is up to."
      },
      {
        "title": "2. Reducing release time",
        "content": "Consider a situation when developers finish coding but the deployment guide for the operations team is not good enough or well documented enough so operations team struggles deploying therefore, release takes longer. Or a situation when developers finish coding but the feature cannot be deployed because it has a lot of issues so the operations team throws it back with improvement suggestions. Even these kind of miscommunication and back and forth could cause stretching the release periods for days and weeks. DevOps team or DevOps engineer looks into this and create a channel of better communication and collaboration between the two teams to reduce the release time."
      },
      {
        "title": "3. Reduces Conflicts of interest",
        "content": "In the traditional setup of **Waterfall model **of development where one team is only responsible for development and other team only for operations, these two have different incentives from the company/startup. These incentives makes it harder for them to work together. Developers want to push out new features fast because that's their incentive. While operations team want to make sure those changes don't break anything because operations team is incentivized to maintain stability in production and their main focus is to make sure the application is available doesn't crash or show errors to the users. DevOps ensures both the team work for a common goal of delivering high quality applications and features in lesser release time rather than teams working for conflicting interests."
      },
      {
        "title": "4. Reduces the application testing time",
        "content": "In many projects there are separate teams or roles for engineers who test the application changes on different levels like testing just the feature, testing the whole application and testing on multiple environments etc. These tests are mostly done manually. After the manual testing is done the change can be released and even though this may not be done by development or operations role but rather a separate role, this is an important part of the release process and also slows it down considerably. Manual work is slow and error prone, DevOps again comes in and automates the testing process and reduces the time taken for testing the features of the application."
      },
      {
        "title": "1. Test Automation",
        "content": "Through test automation we can safely release changes into production without the need for manual testing. many organizations use descriptions of tests that an engineer has to follow, this is slow, low quality, expensive , unreliable and error prone. It also results in hard to understand test cases. Therefore we must have an automated testing strategy. Automated test enables to test every behavior of the system that is important in a much faster, reliable and error free manner."
      },
      {
        "title": "2. Deployment Automation",
        "content": "Deployment Automation means being able to deploy the software for testing in a single click/single step. Through this we want to be able to get our software deployed and available for use quickly. To adopt this practice in the DevOps workflow, we must control the variables. In order to be able to reliably and repeatably deploy the software wherever we want, we need to be able to understand the state and the environment that we are going to put these things into."
      },
      {
        "title": "3. Trunk based development",
        "content": "Trunk based development is basically using of a single code branch or \"Trunk\" for all development work. Trunk is just the main branch where all the code is being merged. Trunk based development means merging changes to Trunk or Origin or Master or Head it at least once per day. You must be wondering why? What difference it makes? It makes a significant difference. State of DevOps report 2015 states that \"Trunk based development predicts higher throughput and better stability\". Having branches or forks with very short lifetimes (this means less than a day) before being merged into Trunk are important aspects of continuous delivery. It contributes to higher performance."
      },
      {
        "title": "4. Security testing as a part of deployment pipeline",
        "content": "Having security testing and validation as a part of the deployment pipeline helps in getting quicker feedback and reducing the time of feedback loop. Though this we want to bring the security testing earlier in the process so that we can work on it early, take feedback and iterate. Bringing the limelight to security in the development and deployment cycle is also referred as DevSecOps by many startups and companies."
      },
      {
        "title": "5. Only testing the part where we made changes",
        "content": "This refers to making changes in one part of the system and not testing the whole system for a change in one part before releasing into production. This can be achieved by dividing the application into independently deployable modules that are each easier to to build, test and evaluate because they are smaller and simpler. Now we can build, test and deploy the pieces independently of one another hence saving time and resources."
      },
      {
        "title": "6. Infrastructure as code (IaC)",
        "content": "Before Infrastructure as code and automation, in order to deploy an application on servers, we need to buy servers, configure them, install required software and basically prepare servers for deploying. This had few problems like\n\n- High human resources cost\n- More effort and time\n- More human possibleThat is what Infrastructure as code (IaC) solves for us. Infrastructure as code is a way of automating all the test end to end instead of doing it manually. With Infrastructure as code all the work of testing application manually by System admins and operations team is now done by set of programs like Ansible, Terraform, puppet etc."
      },
      {
        "title": "7. Monitoring and observability",
        "content": "Monitoring is basically tooling that allows operations team to monitor and understand the state of their systems. It is based on gathering predefined sets of logs or metrics. Monitoring provides a comprehensive picture of the application's behavior and performance with metrics such as network traffic, resource utilization and trends.\n\nWhile observability is a technical solution or tooling that allows operations team to actively debug the system. It provides us the visibility and awareness about what is happening within an application. Both Monitoring and Observability are essential practices for DevOps."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Production DevOps Best Practices for Kubernetes",
      "initialCode": "# Production DevOps Best Practices for Kubernetes\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Production DevOps Best Practices for Kubernetes",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Production DevOps Best Practices for Kubernetes in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Production DevOps Best Practices for Kubernetes",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Production DevOps Best Practices for Kubernetes enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-cicd-intro": {
    "id": "devops-cicd-intro",
    "badge": "Module 8 • DevOps & Cloud",
    "readingTime": "26 min read",
    "level": "Advanced",
    "title": "What is CI/CD (Continuous Integration & Continuous Delivery)?",
    "subtitle": "Complete DevOps engineering guide to What is CI/CD (Continuous Integration & Continuous Delivery)? — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "![DevOps CI/CD Pipeline](/images/devops/devops-cicd-pipeline.svg)\n\n- CI/CD (Continuous Integration and Continuous Delivery/Deployment) is a modern software development practice that automates the process of building, testing, and releasing applications. It plays a key role in DevOps by improving collaboration between development and operations teams.\n\n- Automates code integration, testing, and deployment workflows.\n- Reduces manual effort while improving software quality.\n- Enables faster and more reliable software releases.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for What is CI/CD (Continuous Integration & Continuous Delivery)?."
        }
      },
      {
        "title": "2. CI/CD Before Adoption",
        "content": "Before the adoption of CI/CD, software development and delivery were slow, manual, and prone to errors. Processes lacked automation, making releases time-consuming and risky.\n\nBefore CI/CD\n- Code was merged infrequently, often causing integration conflicts and unstable builds.\n- Testing and building were performed manually, resulting in late bug detection and costly fixes.\n- Deployments were lengthy and risky because changes were released together in large batches.\n- Development, testing, and operations teams worked separately with limited collaboration."
      },
      {
        "title": "3. CI/CD After Adoption",
        "content": "With CI/CD, the development process becomes automated, faster, and more reliable.\n\nAfter CI/CD\n- Developers commit code frequently to a shared repository.\n- CI automatically builds and tests the application.\n- Bugs are detected early and fixed quickly.\n- Continuous Delivery ensures code is always release-ready.\n- Continuous Deployment enables automatic production releases.\n- Smaller, frequent updates replace large risky releases.\n- Improves collaboration and transparency across teams."
      },
      {
        "title": "4. Three Pillars of CI/CD",
        "content": "To effectively implement CI/CD, it is important to understand its three core concepts: Continuous Integration, Continuous Delivery, and Continuous Deployment."
      },
      {
        "title": "5. Continuous Integration (CI)",
        "content": "Continuous Integration focuses on integrating code changes frequently to avoid conflicts and ensure code stability.\n\n- **Goal:** Prevent integration issues caused by delayed code merging.\n- **Process:** Developers merge code changes into the main branch frequently.\n- **Automation:** Each commit triggers automated builds and unit tests.\n- **Outcome:** Failed builds are rejected and developers are notified immediately.**Note: **Both Continuous Delivery and Continuous Deployment are abbreviated as \"CD,\" but they differ in release automation. Continuous Delivery requires manual approval before production release, whereas Continuous Deployment automates the release process completely."
      },
      {
        "title": "6. Continuous Delivery (CD)",
        "content": "Continuous Delivery ensures that the application is always ready for release with minimal manual effort.\n\n- **Goal:** Keep the application in a release-ready state at all times.\n- **Process:** Code is deployed to staging or testing environments after CI succeeds.\n- **Automation:** Integration, system, and performance tests run automatically.\n- **Release:** Deployment to production requires manual approval."
      },
      {
        "title": "7. Continuous Deployment (CD)",
        "content": "Continuous Deployment extends automation by automatically releasing changes to production.\n\n- **Goal:** Enable fully automated and faster software releases.\n- **Process:** Code is automatically deployed to production after all tests pass.\n- **Automation:** The entire release pipeline runs without human intervention.\n- **Requirement:** Requires comprehensive automated testing and effective monitoring."
      },
      {
        "title": "8. CI Workflow",
        "content": "The CI workflow represents the automated process that starts when developers commit code and ends with build validation.\n\nCI workflow\n- **Developer Writes Code:** The developer creates or modifies application code and commits the changes to the repository.\n- **CI Tool:** The CI tool automatically builds the application and runs automated tests to verify code quality.\n- **Problem Detected: **If the build or tests fail, the CI tool reports the issue and sends feedback to the developer.\n- **Changes Needed**: The developer fixes the identified issues and recommits the updated code for validation.\n- **Everything OK: **If the build and tests pass successfully, the code is approved for integration.\n- **Maintainer or Developer Merges Changes:** The validated code is merged into the main branch or shared repository.\n- **Application is Ready for Deployment: **After successful integration, the application becomes ready for deployment to the next environment."
      },
      {
        "title": "9. CI/CD Workflow",
        "content": "This workflow shows how Continuous Integration combined with Continuous Delivery/Deployment enables faster, safer, and more reliable software releases.\n\nCI/CD Workflow\n- CI performs build and test automatically.\n- Code moves to Acceptance Testing.\n- Deployed to Staging Environment.\n- Further validation is done.\n- Continuous Delivery: Manual deployment to production.\n- Continuous Deployment: Automatic deployment to production.\n- Smoke tests validate production release."
      },
      {
        "title": "10. Common CI/CD Tools",
        "content": "Various tools are used to implement CI/CD pipelines effectively.\n\n- **Jenkins:** Open-source automation server widely used for building CI/CD pipelines.\n- **GitHub Actions:** CI/CD tool integrated with GitHub repositories.\n- **GitLab CI/CD:** Built-in CI/CD solution within GitLab.\n- **Concourse:** Open-source tool focused on pipeline automation.\n- **GoCD:** Provides visualization and management of complex pipelines.\n- **Spinnaker:** Continuous delivery platform for multi-cloud deployments.\n- **Screwdriver:** Platform designed for scalable CI/CD workflows."
      },
      {
        "title": "11. CI/CD Pipeline",
        "content": "A CI/CD pipeline is an automated workflow that enables teams to build, test, and deploy software efficiently and reliably. It helps deliver high-quality applications faster while reducing manual effort and deployment risks.\n\n- Developers commit code changes to a version control repository.\n- Code is integrated, compiled, and built automatically.\n- Automated unit and UI tests are executed to verify quality.\n- The application is packaged with deployment instructions.\n- The release pipeline performs additional testing and validation.\n- The validated application is deployed and made available to end users."
      },
      {
        "title": "12. Components of a CI/CD Pipeline",
        "content": "These components define how code moves from development to production.\n\n- **Commit Change:** Developers commit code changes to a version control repository such as Git. This ensures changes are tracked and managed efficiently.\n- **Build Trigger:** The system automatically detects new code commits and initiates the CI/CD pipeline. This removes the need for manual execution.\n- **Build:** The application is compiled and packaged into a deployable artifact. Required dependencies are resolved during this stage.\n- **Build Outcome Notification:** The system notifies developers whether the build succeeded or failed. This helps identify and fix issues early.\n- **Test Execution: **Automated tests are executed to verify the application's functionality and quality. This ensures the code meets defined standards.\n- **Test Outcome Notification:** Developers receive the results of test execution, including any failures. This supports quick debugging and issue resolution.\n- **Deliver Build to Staging**: The application is deployed to a staging environment for final validation. This helps identify issues before production release.\n- **Deploy to Production:** The validated application is deployed to the production environment. New features and updates become available to end users."
      },
      {
        "title": "13. Best Practices for a Healthy Pipeline",
        "content": "Following best practices ensures efficient and reliable CI/CD pipelines.\n\n- Use version control for application code and pipeline configurations.\n- Add code quality and security checks to the pipeline.\n- Monitor pipeline performance and fix flaky tests promptly.\n- Use caching to reduce repeated dependency downloads and build times.\n- Keep logs and reports available for troubleshooting and auditing.\n- Use deployment approvals or automated rollback for safer production releases.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: What is CI/CD (Continuous Integration & Continuous Delivery)?",
      "initialCode": "# What is CI/CD (Continuous Integration & Continuous Delivery)?\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: What is CI/CD (Continuous Integration & Continuous Delivery)?",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of What is CI/CD (Continuous Integration & Continuous Delivery)? in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via What is CI/CD (Continuous Integration & Continuous Delivery)?",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "What is CI/CD (Continuous Integration & Continuous Delivery)? enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-deployment-auto": {
    "id": "devops-deployment-auto",
    "badge": "Module 8 • DevOps & Cloud",
    "readingTime": "5 min read",
    "level": "Advanced",
    "title": "Understanding Deployment Automation",
    "subtitle": "Complete DevOps engineering guide to Understanding Deployment Automation — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "In this article we will discuss deployment automation, categories in Automated Deployment, how automation can be implemented in deployment, how it is assisting DevOps and finally the benefits and drawbacks of Deployment Automation. So, let's start exploring the topic in detail.\n\n**Deployment Automation **:**Deployment Automation refers to a set of automation processes which are used to move a software application/product into several stages of testing and production environments using automated tools and techniques as a result repeatable and reliable deployment occurs across software delivery cycle. It also let us release new applications and features more frequently, without any human interventions. Means it completely aims to bring automation within testing and production phase.\n\nCategories in Automated Deployment :****Automated Deployment can be classified into different categories on the basis of level of automation coverage across environments\n\n- Continuous Deployment -****It is the method where the entire process of deployment pipeline is fully automated. Every process present in the source code is automatically deployed to production.\n- Continuous Integration -****It is the method to regularly integrate the code changes in application that is automatically bug tested. Everything deployed is integrated and then verified and tested to detect possible errors.\n- Continuous Delivery -****It is the practice of keeping the code ready to be deployed at any time. It is a extension from continuous integration which ensures product-ready version at any time.\n\nImplementing Automated Deployment :****A deployment pipeline mainly follows three steps: build, test, deploy where the pipelines ensure that it helps to automate the deployment process.\n\n- Build -****First a server is taken i.e Jenkins or GoCD then it is linked to the source code and a command to build the application.\n- Test -** **Separate build for each suit is created and linked with dominos so that each suit is triggered by one before it. In this way if problem occur it can be solved initially. Once a build is completed it is ready to be released.\n- Deploy -** **In this stage the applications are deployed to test testing environment ensuring that it has passed all the tests.\n\nThe below figure represents typical release process\n\nBenefits in Deployment Automation :**\n\n- **Can be implemented by anyone -****Any member of the team can manually or partially do automated deployments as it is not a rocket sci",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Understanding Deployment Automation."
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Understanding Deployment Automation",
      "initialCode": "# Understanding Deployment Automation\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Understanding Deployment Automation",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Understanding Deployment Automation in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Understanding Deployment Automation",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Understanding Deployment Automation enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-jenkins-intro": {
    "id": "devops-jenkins-intro",
    "badge": "Module 8 • DevOps & Cloud",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "What is Jenkins? Architecture & Master-Agent Model",
    "subtitle": "Complete DevOps engineering guide to What is Jenkins? Architecture & Master-Agent Model — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Jenkins is an open-source automation server that streamlines the software development lifecycle by automating build, test, and deployment processes. It is widely used in Continuous Integration and Continuous Delivery/Deployment (CI/CD) to improve development efficiency and software quality.\n\n- Open-source and platform-independent automation server for modern software development.\n- Extensible through thousands of plugins that integrate with Git, Docker, Kubernetes, Maven, Selenium, and more.\n- Supports distributed builds and pipeline automation for scalable and efficient development workflows.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for What is Jenkins? Architecture & Master-Agent Model."
        }
      },
      {
        "title": "2. Jenkins Architecture and Core Concepts",
        "content": "Jenkins follows a master-slave architecture, where the Jenkins server (master) manages build jobs and delegates their execution to agent nodes (slaves). This setup ensures efficient resource utilization and parallel execution.\n\nJenkins Architecture"
      },
      {
        "title": "1. Jenkins Server (Controller)",
        "content": "The left section represents the Jenkins Server, which is the central component responsible for managing the Jenkins environment.\n\n- **Jobs:** Creates, schedules, and manages build, test, and deployment jobs.\n- **Users:** Manages user accounts and access permissions.\n- **Plugins:** Extends Jenkins functionality by integrating with external tools.\n- **Nodes/Clouds:** Configures static agents and cloud platforms for job execution.\n- **Credentials:** Securely stores passwords, SSH keys, and API tokens.\n- **Global Configs:** Stores system-wide Jenkins configuration settings.\n- **Jenkins Data:** Maintains jobs, build history, logs, plugins, and configuration files."
      },
      {
        "title": "2. Jenkins Static Agents",
        "content": "The top-right section represents Static Agents.\n\n- These are permanent Linux or Windows machines connected to the Jenkins Server.\n- They continuously wait for jobs from the controller.\n- Once a job is assigned, they execute build, test, and deployment tasks.\n- They communicate with the controller using SSH, WinRM, or JNLP.\n- Since they remain active all the time, they are suitable for frequently executed jobs. **Runs Continuously:** Static agents stay online even after completing a job."
      },
      {
        "title": "3. Jenkins Dynamic Agents (Cloud)",
        "content": "Dynamic agents are temporary resources created only when required.\n\n- Automatically provisioned when a build starts.\n- Execute the assigned job in an isolated environment.\n- Removed automatically after the job completes to optimize resource usage.**Common platforms include:**\n\n- Docker Containers\n- Kubernetes Pods\n- AWS EC2 Instances\n- Amazon EKS"
      },
      {
        "title": "4. Communication Methods",
        "content": "The Jenkins Controller communicates with agents using different protocols.\n\n- **SSH & WinRM:** Connect Linux and Windows static agents.\n- **JNLP:** Enables agents to establish a connection with the Jenkins Controller.\n- **APIs:** Provision and manage cloud-based dynamic agents."
      },
      {
        "title": "7. Jenkins Workflow",
        "content": "Jenkins automates the software delivery process through a sequence of pipeline stages.\n\nJenkins workflow\n- **Development: **Developers write or modify the application code in the local development environment.\n- **Commit:** The source code is committed to a version control system such as Git, triggering the Jenkins pipeline.\n- **Build: **Jenkins retrieves the latest code, compiles the application, and generates build artifacts.\n- **Test:** Automated tests validate the application's functionality, quality, and stability.\n- **Stage:** The validated build is deployed to a staging or QA environment for further verification.\n- **Deploy (Dev/QA):** Jenkins deploys the application to the target development or QA environment.\n- **Production:** After successful validation, the application is deployed to the production environment.\n- **Continuous Integration/Delivery:** Jenkins automates the entire workflow from code commit to deployment, ensuring faster and more reliable software delivery."
      },
      {
        "title": "8. Key Features of Jenkins",
        "content": "- Automates Continuous Integration and Continuous Delivery pipelines.\n- Supports Pipeline as Code using Jenkinsfile.\n- Integrates with Git, Docker, Kubernetes, Maven, Selenium, AWS, and many other tools.\n- Supports distributed builds across multiple agents.\n- Runs on Windows, Linux, and macOS.\n- Supports Java, Python, Node.js, .NET, and many other technologies.\n- Offers thousands of plugins to extend functionality.\n- Provides build history, logs, notifications, and reporting."
      },
      {
        "title": "9. CI/CD in Jenkins",
        "content": "Jenkins automates the software delivery pipeline by integrating code changes, validating applications, and deploying releases efficiently."
      },
      {
        "title": "10. Continuous Integration (CI)",
        "content": "Automatically builds and tests code whenever developers commit changes to the repository.\n\n- Integrates code changes frequently to detect issues early.\n- Runs automated builds and tests after each commit."
      },
      {
        "title": "11. Continuous Delivery (CD)",
        "content": "Prepares validated applications for deployment while allowing manual approval before production.\n\n- Keeps the application in a deployable state.\n- Supports manual approval before production deployment."
      },
      {
        "title": "12. Continuous Deployment",
        "content": "Automatically releases validated applications to production without manual intervention.\n\n- Deploys successful builds directly to production.\n- Enables faster and consistent software releases."
      },
      {
        "title": "13. Jenkins Use Cases",
        "content": "- **Build Automation:** Compiles source code and generates build artifacts.\n- **Test Automation:** Executes automated tests using Selenium, JUnit, TestNG, and other frameworks.\n- **Continuous Integration:** Builds and validates applications whenever code changes are committed.\n- **Continuous Delivery:** Prepares applications for deployment across multiple environments.\n- **Continuous Deployment:** Automatically deploys validated applications to production.\n- **Release Automation:** Streamlines software release and version management.\n- **Cloud Integration:** Integrates with Docker, Kubernetes, AWS, Azure, and Google Cloud.\n- **Monitoring and Reporting:** Tracks build status, test results, and pipeline execution."
      },
      {
        "title": "14. Advantages of Jenkins",
        "content": "- Free and open-source automation server.\n- Reduces manual effort and human errors.\n- Improves software quality through automated testing.\n- Enables faster and more frequent software releases.\n- Supports scalable distributed build environments.\n- Easily integrates with a wide range of development and DevOps tools."
      },
      {
        "title": "15. Limitations of Jenkins",
        "content": "- Initial setup and configuration can be complex.\n- Managing numerous plugins may increase maintenance effort.\n- Large Jenkins environments require regular monitoring and optimization.\n- Pipeline scripting may require knowledge of Groovy.\n- User interface is less modern compared to some newer CI/CD tools.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: What is Jenkins? Architecture & Master-Agent Model",
      "initialCode": "# What is Jenkins? Architecture & Master-Agent Model\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: What is Jenkins? Architecture & Master-Agent Model",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of What is Jenkins? Architecture & Master-Agent Model in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via What is Jenkins? Architecture & Master-Agent Model",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "What is Jenkins? Architecture & Master-Agent Model enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-jenkins-install": {
    "id": "devops-jenkins-install",
    "badge": "Module 8 • DevOps & Cloud",
    "readingTime": "26 min read",
    "level": "Advanced",
    "title": "Installing and Configuring Jenkins on Ubuntu Linux",
    "subtitle": "Complete DevOps engineering guide to Installing and Configuring Jenkins on Ubuntu Linux — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Jenkins is an open-source automation server used to automate software development processes such as building, testing, and deploying applications. It is widely used for implementing CI/CD pipelines.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Installing and Configuring Jenkins on Ubuntu Linux."
        }
      },
      {
        "title": "2. Step-by-Step Guide",
        "content": "Before installing Jenkins, ensure that the following requirements are met:\n\n- An Ubuntu server (22.04)\n- Root or sudo privileges\n- 1 GB RAM works, but 2 GB RAM is recommended for smooth usage. and 1 CPU core\n- Jenkins LTS officially supports Java 17 and Java 21"
      },
      {
        "title": "3. Step 1: Update your system",
        "content": "Before installing any packages, ensure your system is up to date. Open a terminal and run:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Step 1: Update your system",
          "snippet": "sudo apt updatesudo apt upgrade -y"
        }
      },
      {
        "title": "4. Step 2: Install Java",
        "content": "Jenkins requires Java to run. Jenkins LTS officially supports Java 17 and Java 21. Install the OpenJDK 21 package: (Skip this step if Java is already installed).\n\nVerify the Java installation by running:\n\n**Output:**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Step 2: Install Java",
          "snippet": "sudo apt install openjdk-21-jdk -y"
        }
      },
      {
        "title": "5. Step 3: Add Jenkins Repository",
        "content": "Import Jenkins key to authenticate the repository:\n\nAdd Jenkins repository to your system's package list:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Step 3: Add Jenkins Repository",
          "snippet": "curl -fsSL https://pkg.origin.jenkins.io/debian-stable/jenkins.io-2026.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null"
        }
      },
      {
        "title": "6. Step 4: Install Jenkins",
        "content": "Now that Jenkins' repository is added, update the package list again:\n\nThen install Jenkins:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Step 4: Install Jenkins",
          "snippet": "sudo apt update"
        }
      },
      {
        "title": "7. Step 5: Start and Enable Jenkins",
        "content": "Once the installation is complete, start the Jenkins service:\n\nEnable the Jenkins service to start on boot:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Step 5: Start and Enable Jenkins",
          "snippet": "sudo systemctl start jenkins"
        }
      },
      {
        "title": "8. Step 6: Adjust the Firewall",
        "content": "Jenkins runs on port 8080 by default. If you are using a firewall (e.g., ufw), you'll need to allow traffic on that port.\n\n- Allow port 8080 through the firewall:\n\n- Reload the firewall to apply changes:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Step 6: Adjust the Firewall",
          "snippet": "sudo ufw allow 8080"
        }
      },
      {
        "title": "9. Step 7: Access Jenkins Web Interface",
        "content": "To access Jenkins, open your web browser and enter your server's IP address or domain name, followed by port 8080:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Step 7: Access Jenkins Web Interface",
          "snippet": "http://your_server_ip_or_domain:8080"
        }
      },
      {
        "title": "10. Step 8: Unlock Jenkins",
        "content": "- When you first access Jenkins, it will ask you for an admin password.\n- Retrieve the password by running this command:\n\n- Copy the password from the terminal and paste it into the \"Administrator password\" field in the Jenkins web interface.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Step 8: Unlock Jenkins",
          "snippet": "sudo cat /var/lib/jenkins/secrets/initialAdminPassword"
        }
      },
      {
        "title": "11. Step 9: Install Suggested Plugins",
        "content": "After entering the password, Jenkins will guide you through the initial setup.\n\n- Click Install suggested plugins for a default setup.\n- Wait while Jenkins installs the plugins."
      },
      {
        "title": "12. Step 10: Create an Admin User",
        "content": "Once the plugins are installed, Jenkins will prompt you to create your first admin user.\n\n- Fill in the required fields (username, password, etc.) to create the admin user.\n- Click Save and Finish."
      },
      {
        "title": "13. Step 11: Start Using Jenkins",
        "content": "After completing the setup, Jenkins will be ready to use. You should see the Jenkins dashboard where you can start creating jobs, configuring builds, and more.\n\nComment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Installing and Configuring Jenkins on Ubuntu Linux",
      "initialCode": "sudo apt updatesudo apt upgrade -y",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Installing and Configuring Jenkins on Ubuntu Linux",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Installing and Configuring Jenkins on Ubuntu Linux in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Installing and Configuring Jenkins on Ubuntu Linux",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Installing and Configuring Jenkins on Ubuntu Linux enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-jenkins-plugins": {
    "id": "devops-jenkins-plugins",
    "badge": "Module 8 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Working with Jenkins Plugins & Integrations",
    "subtitle": "Complete DevOps engineering guide to Working with Jenkins Plugins & Integrations — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Jenkins plugins are essential for enhancing the functionality of the Jenkins CI/CD tool. They serve as the building blocks that allow Jenkins to expand beyond its basic setup, offering over 2,000 community-contributed tools to customize your automation.\n\n- Plugins bridge the gap between Jenkins and the rest of your tech stack, connecting it to tools like GitHub, Docker, Slack, and AWS to create a unified workflow.\n- You can easily search, install, and update plugins directly through the Jenkins Dashboard, allowing you to add complex features with just a few clicks.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Working with Jenkins Plugins & Integrations."
        }
      },
      {
        "title": "1. Test Execution Integration",
        "content": "- Integrates with tools like Selenium, Cucumber, TestNG, and JUnit.\n- Automatically generates and publishes test reports."
      },
      {
        "title": "2. Reporting",
        "content": "- Provides detailed insights into test results with plugins like Allure and HTML Publisher.\n- Visualizes build trends, pass/fail ratios, and test execution details."
      },
      {
        "title": "3. CI/CD Integration",
        "content": "- Accelerates feedback loops.\n- Identifies defects early by integrating tools like Git and Maven."
      },
      {
        "title": "4. Notification and Collaboration",
        "content": "- Sends automated alerts using email or communication tools like Slack and Microsoft Teams.\n- Accessing Plugins in Jenkins"
      },
      {
        "title": "6. Key Plugins for Test Automation",
        "content": "The following are the key plugins used for Test Automation:"
      },
      {
        "title": "1. JUnit Plugin",
        "content": "- Publishes test results from JUnit or other xUnit test frameworks.\n- Displays test reports in the Jenkins UI and tracks test pass/fail history across builds."
      },
      {
        "title": "2. TestNG Results Plugin",
        "content": "- Publishes and displays results for TestNG-based tests.\n- Includes detailed reports on passed, failed, and skipped tests."
      },
      {
        "title": "3. Maven Integration Plugin",
        "content": "- Automates building and testing for Maven projects.\n- Manages the build lifecycle, dependencies, and report generation."
      },
      {
        "title": "4. HTML Publisher Plugin",
        "content": "- Allows Jenkins to publish and display custom HTML reports, such as those generated by frameworks like Selenium or JUnit.\n- Useful for visualizing test automation results."
      },
      {
        "title": "5. Allure Report Plugin",
        "content": "- Integrates with Allure to generate detailed and visually appealing reports for various test frameworks, including JUnit, TestNG, and Selenium.\n- Provides insights into test execution, including duration, environment, and failure analysis."
      },
      {
        "title": "12. Plugin Purpose",
        "content": "- JUnit Plugin Parses test results from JUnit and displays pass/fail statistics in Jenkins.\n- TestNG Plugin Integrates TestNG results with Jenkins, showing method-level execution statistics.\n- Maven Integration Simplifies the creation of Maven-based Jenkins jobs.\n- HTML Publisher Publishes HTML reports generated by automation frameworks.\n- Allure Reports Generates visually appealing and detailed test execution reports.\n- Cucumber Reports Publishes JSON-based Cucumber reports in an easy-to-read HTML format.\n- Git Plugin Integrates Jenkins with Git repositories.\n- Email Extension Sends email notifications based on test results or build statuses."
      },
      {
        "title": "13. How to Use Jenkins Plugins",
        "content": "**Publishing Cucumber Reports**\n\n**Objective: **Generate a readable report from Cucumber's JSON output."
      },
      {
        "title": "14. Step 1: Install the Cucumber Reports Plugin",
        "content": "- Install Cucumber Reports Plugin:\n- Navigate to Available Plugins and search for \"Cucumber Reports.\"Available Plugins and search for \"Cucumber Reports.\"\n- Install the plugin."
      },
      {
        "title": "15. Step 2: Configure Jenkins Job",
        "content": "- Firstly check the cucumber project run locally as expectedcucumber project run locally\n- Add a build step to execute your Cucumber project.build step to execute your Cucumber project.\n- Copy the project from existing project which you are already created:Copy the project from existing project\n- Updates the goal as per our requirement:Updates the goal as per our requiremen\n- Ensure the test runner generates a cucumber.json file."
      },
      {
        "title": "16. Step 3: Post-Build Actions",
        "content": "- Select Cucumber Reports.Select Cucumber Reports\n- After that save the project and build the project."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Working with Jenkins Plugins & Integrations",
      "initialCode": "# Working with Jenkins Plugins & Integrations\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Working with Jenkins Plugins & Integrations",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Working with Jenkins Plugins & Integrations in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Working with Jenkins Plugins & Integrations",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Working with Jenkins Plugins & Integrations enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-jenkins-pipeline": {
    "id": "devops-jenkins-pipeline",
    "badge": "Module 8 • DevOps & Cloud",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "How to Build a CI/CD Pipeline in Jenkins",
    "subtitle": "Complete DevOps engineering guide to How to Build a CI/CD Pipeline in Jenkins — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- A CI/CD pipeline in Jenkins automates the process of building, testing, and deploying code. It helps developers integrate changes and deploy them quickly and reliably. Jenkins makes this automation easy and efficient.\n\n- Defines pipelines in a Jenkinsfile for version-controlled build, test, and deploy steps.\n- Breaks workflows into automated stages like build, test, and deploy.\n- Triggers runs on code commits to provide quick feedback.\n- Uses agents for parallel and scalable execution.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for How to Build a CI/CD Pipeline in Jenkins."
        }
      },
      {
        "title": "2. Step 1: Log In to Jenkins",
        "content": "Log in to your Jenkins account. This is where all your Jenkins jobs and pipelines will be configured and monitored.\n\nLogin Window Jenkins"
      },
      {
        "title": "3. Step 2: Redirected to the Jenkins Dashboard",
        "content": "When you logged in, you will be redirected to the Jenkins console or dashboard. This is where you can manage all your Jenkins jobs, pipelines, and settings."
      },
      {
        "title": "4. Step 3: Create a New Project",
        "content": "On the Jenkins dashboard, click on the \"New Item\" option to create a new project select the option available in the Dashboard."
      },
      {
        "title": "5. Step 4: Configure the Project Type",
        "content": "On the next screen, list of options will be visible, along with a field to name the pipeline. Add a suitable name and select the \"Pipeline\" option to proceed."
      },
      {
        "title": "6. Step 5: Configure the General Section",
        "content": "The pipeline configuration page will open. In the General section:\n\n- Provide a description of the pipeline, describing the purpose or what it will do.\n- Establish the connection to the repository where Jenkins can access the project to trigger the pipeline."
      },
      {
        "title": "7. Step 6: Set Build Triggers",
        "content": "In the Build Triggers section:\n\nWe need to specify the branch and repository and give the credentials too. And add additional behaviors if required so far. Refer to the screenshot to have a better understanding."
      },
      {
        "title": "8. Step 7: Advanced Project Options",
        "content": "In the Advanced Project Options section:\n\n- This section is primarily used for advanced configurations and special pipeline settings.\n- For simpler projects, no configuration is required in this section, so you can leave it as is or adjust it based on your project's needs."
      },
      {
        "title": "9. Step 8: Configure the Pipeline Section",
        "content": "This is the most critical part of the configuration process. In the Pipeline section:\n\n- Define the Jenkinsfile that Jenkins will use to build and deploy your application. The Jenkinsfile contains the pipeline script with all the stages and steps for the CI/CD process.\n- Specify where Jenkins should retrieve the pipeline script (either from the repository or from a file stored locally).\n- Provide any required credentials or paths to the Jenkinsfile. Sample Jenkins Pipeline Script\n\ngroovy\n\n`\n`",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Step 8: Configure the Pipeline Section",
          "snippet": "node {\n    // Define the Maven tool used for the build process\n    def mavenHome = tool name: 'Maven 3.8.6'\n\n    // Configure build properties (e.g., log rotation and SCM polling)\n    properties([\n        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: '5')),\n        pipelineTriggers([pollSCM('* * * * *')])\n    ])\n\n    // Checkout code from the Git repository\n    stage('Checkout Code') {\n        git branch: 'development', credentialsId: 'github-credentials-id', url: 'https://github.com/your-username/your-repository.git'\n    }\n\n    // Build the project using Maven\n    stage('Build') {\n        sh \"${mavenHome}/bin/mvn clean package\"\n    }\n\n    // Execute code quality analysis with SonarQube\n    stage('Execute SonarQube Analysis') {\n        sh \"${mavenHome}/bin/mvn clean sonar:sonar\"\n    }\n\n    // Upload the build artifact to Nexus repository\n    stage('Upload Build Artifact') {\n        sh \"${mavenHome}/bin/mvn clean deploy\"\n    }\n\n    // Deploy the application to Tomcat using SCP\n    stage('Deploy to Tomcat') {\n        sshagent(['your-ssh-credentials-id']) {\n            sh \"scp -o StrictHostKeyChecking=no target/maven-w"
        }
      },
      {
        "title": "10. Step 9: Save the Pipeline and Run It",
        "content": "After writing the pipeline is done click on save it will be directly redirected to the Dashboard of the project there we can use, the \"Build Now\" option to run the pipeline and check if it is successful or not, by using stage view or console output."
      },
      {
        "title": "11. Step 10: Monitor the Pipeline Execution",
        "content": "Once the pipeline is triggered, you can monitor its progress:\n\n- Go to the Jenkins dashboard and click on your project.\n- Under Build History, click on the build you just triggered.\n- You can monitor the pipeline using the Stage View or Console Output.**Stage View**: Provides a visual representation of the pipeline stages and their status (success, failure, etc.).\n\n**Console Output**: Displays the detailed logs of each stage. This is useful for debugging any issues that may occur during the pipeline execution."
      },
      {
        "title": "12. Step 11: Review the Build Status",
        "content": "At the bottom of the Console Output or Stage View, you will see the status of the pipeline:\n\n- **Success**: If all stages are completed without errors, you will see \"Finished: Success.\"\n- **Failure**: If any stage fails, you will see error messages in the logs, which can help in debugging the issue. Here we successfully created a Jenkins CI/CD pipeline to automate the process of building, testing, and deploying a Java web application `.war` file.\n\nComment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: How to Build a CI/CD Pipeline in Jenkins",
      "initialCode": "node {\n    // Define the Maven tool used for the build process\n    def mavenHome = tool name: 'Maven 3.8.6'\n\n    // Configure build properties (e.g., log rotation and SCM polling)\n    properties([\n        buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: '5')),\n        pipelineTriggers([pollSCM('* * * * *')])\n    ])\n\n    // Checkout code from the Git repository\n    stage('Checkout Code') {\n        git branch: 'development', credentialsId: 'github-credentials-id', url: 'https://github.com/your-username/your-repository.git'\n    }\n\n    // Build the project using Maven\n    stage('Build') {\n        sh \"${mavenHome}/bin/mvn clean package\"\n    }\n\n    // Execute code quality analysis with SonarQube\n    stage('Execute SonarQube Analysis') {\n        sh \"${mavenHome}/bin/mvn clean sonar:sonar\"\n    }\n\n    // Upload the build artifact to Nexus repository\n    stage('Upload Build Artifact') {\n        sh \"${mavenHome}/bin/mvn clean deploy\"",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: How to Build a CI/CD Pipeline in Jenkins",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of How to Build a CI/CD Pipeline in Jenkins in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via How to Build a CI/CD Pipeline in Jenkins",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "How to Build a CI/CD Pipeline in Jenkins enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-jenkinsfile": {
    "id": "devops-jenkinsfile",
    "badge": "Module 8 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Deploying an Application Using a Declarative Jenkinsfile",
    "subtitle": "Complete DevOps engineering guide to Deploying an Application Using a Declarative Jenkinsfile — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Deploying an application with a Jenkinsfile automates building, testing, and deploying the app. It ensures consistent and repeatable deployments, making CI/CD more efficient. ** **Jenkins Pipeline Components:\n\n- **Pipeline: **A series of stages and tasks for automated CI/CD defined in a Jenkinsfile.\n- **Stage: **A part of the pipeline representing a phase, like build, test, or deploy.\n- **Trigger: **An event, like a commit or manual action, that starts the pipeline.\n- **Workspace:** A directory on the Jenkins agent for executing code, building artifacts, and storing temporary files.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Deploying an Application Using a Declarative Jenkinsfile."
        }
      },
      {
        "title": "2. Deploying An Application Using Jenkinsfile",
        "content": "Here are the steps for deploying an application."
      },
      {
        "title": "3. Step 1: Log in to an AWS Account",
        "content": "- Navigate to AWS Console and login in with your credentials.\n- Click on EC2 to go for EC2 Dashboard."
      },
      {
        "title": "4. Step 2: Navigate to EC2 Dashboard",
        "content": "- Click on Running Instance to create a running instance.\n- After landing, click on Create Instance."
      },
      {
        "title": "5. Step 3: Launch Instance",
        "content": "- Define the sections such as providing the instance name as \"my_jenkins_server\" , no of instance as 1 and Choose the AMI as **Amazon Linux 2 **latest AMI."
      },
      {
        "title": "6. Step 4: Configure Instance",
        "content": "- Choose the instance type as t2.micro and choose the existing key pair.\n- If you don't have any key pair, click on create key pair and choose the key pair format type."
      },
      {
        "title": "7. Step 5: Configure Network Security Groups",
        "content": "- Provide the network security groups by configuring them with allowing all traffic, so that they will no restrict of traffic from AWS. The following screenshot clearly illustrates that."
      },
      {
        "title": "8. Step 6: Connect To Instance",
        "content": "- Review the provided definition and value. Once you confirmed with defined value click on Launch Instances."
      },
      {
        "title": "9. Step 7: Connect To EC2 Console",
        "content": "- Wait till the instance come to running state, Once it been into the running state, Go through it and navigate to EC2 Console section.\n- In the EC2 Console section click on connect."
      },
      {
        "title": "10. Step 8: Install Jenkins",
        "content": "Now Install the jenkins and Java, with the following commands:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Step 8: Install Jenkins",
          "snippet": "sudo wget -O /etc/yum.repos.d/jenkins.repo \\    https://pkg.jenkins.io/redhat-stable/jenkins.reposudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.keysudo yum upgrade# Add required dependencies for the jenkins packagesudo yum install java* -y sudo yum install jenkinssudo systemctl daemon-reload"
        }
      },
      {
        "title": "11. Step 9: Verify Java And Jenkins",
        "content": "Verify the successful installation of jenkins and java with following commands:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Step 9: Verify Java And Jenkins",
          "snippet": "java --versionjenkins --version"
        }
      },
      {
        "title": "12. Step 10: Start Jenkins Server",
        "content": "- Now, start the jenkins server with the following command:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Step 10: Start Jenkins Server",
          "snippet": "systemctl enable jenkins --now"
        }
      },
      {
        "title": "13. Step 11: Access Jenkins Server",
        "content": "After successfully starting the jenkins server, go to the browser and enter the following url, you will the see the below jenkins server page.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. Step 11: Access Jenkins Server",
          "snippet": "http:[IP_Address]:8080"
        }
      },
      {
        "title": "14. Step 12: Copy Jenkins Password",
        "content": "- The jenkins server asks for password as for authentication, go through provided directory in the console and copy the password from their and paste in this url.\n- After successful authentication, you will landed to Inside the Jenkins Server."
      },
      {
        "title": "15. Step 13: Install Suggested Plugins",
        "content": "- Click on Install Suggest Plugins options, so it will help you in installing the required plugins already pre available before going for the jobs."
      },
      {
        "title": "16. Step 14: Installation Of Plugins Completely",
        "content": "- The installation of suggested plugins takes some time, In the above page you can see the what are the plugins you are installing."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Deploying an Application Using a Declarative Jenkinsfile",
      "initialCode": "sudo wget -O /etc/yum.repos.d/jenkins.repo \\    https://pkg.jenkins.io/redhat-stable/jenkins.reposudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.keysudo yum upgrade# Add required dependencies for the jenkins packagesudo yum install java* -y sudo yum install jenkinssudo systemctl daemon-reload",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Deploying an Application Using a Declarative Jenkinsfile",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Deploying an Application Using a Declarative Jenkinsfile in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Deploying an Application Using a Declarative Jenkinsfile",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Deploying an Application Using a Declarative Jenkinsfile enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-iac-intro": {
    "id": "devops-iac-intro",
    "badge": "Module 9 • DevOps & Cloud",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "What is Infrastructure as Code (IaC)?",
    "subtitle": "Complete DevOps engineering guide to What is Infrastructure as Code (IaC)? — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Infrastructure as Code (IaC) is a modern DevOps practice where servers, networks, and cloud resources are automatically provisioned and managed using code instead of manual configuration. It helps maintain consistency, speed, and reliability across deployments.\n\n- Automates infrastructure setup using scripts or configuration files.\n- Ensures consistent environments across development, testing, and production.\n- Enables faster and repeatable deployments.\n- Reduces human errors caused by manual configuration.\n- Improves scalability and disaster recovery.\n- Supports version control for infrastructure changes (like Git).It treats infrastructure components like software, allowing you to use development practices like version control, testing, and CI/CD pipelines.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for What is Infrastructure as Code (IaC)?."
        }
      },
      {
        "title": "1. Idempotency",
        "content": "This is a critical concept in IaC. An idempotent operation is one that can be applied multiple times without changing the result beyond the initial application. In IaC terms, this means that running your IaC script over and over will always result in the same defined state. If the infrastructure already matches the desired state, the tool will simply do nothing. This makes applying updates safe and predictable."
      },
      {
        "title": "2. Immutable Vs Mutable Infrastructure",
        "content": "- **Mutable Infrastructure:** This is the traditional \"pet\" model. Servers are provisioned and then updated, patched, and modified in place over their lifetime. This process can lead to configuration drift and makes servers fragile and unique.\n- **Immutable Infrastructure:** This is the modern \"cattle\" model favored by IaC. When a change is needed, the existing server is **not** modified. Instead, a new server is provisioned from a fresh image with the desired changes, and the old one is terminated. This ensures a clean, predictable, and fully reproducible state."
      },
      {
        "title": "4. Declarative Vs Imperative Approaches",
        "content": "IaC tools follow one of two main approaches to defining infrastructure:\n\n**Feature****Declarative Approach****Imperative Approach****Philosophy**Specifies the desired state (the \"what\") of the infrastructure.Details the exact steps or commands (the \"how\") to achieve the desired state.**Execution**The IaC tool determines and performs the actions needed to reach the desired state.Requires the user to execute commands in the correct sequence.**State Management**The tool tracks the current state of the infrastructure, simplifying updates and teardown.Does not inherently track state; the user is responsible for managing changes.**User Focus**Simplifies the process; users define what they want.Demands detailed instructions; the user defines how to achieve the result.**Handling Changes**Automatically calculates and applies the necessary changes to match the new desired state.The user must write a new script to figure out and apply the changes manually.**Example**Defining a resource in a Terraform file: resource \"aws_instance\" \"web\" { ami = \"ami-123\" instance_type = \"t2.micro\"}Writing a shell script: #!/bin/bashaws ec2 run-instances \\ --image-id ami-123 \\ --instance-type t2.micro"
      },
      {
        "title": "5. IaC in the DevOps Lifecycle",
        "content": "IaC is a fundamental enabler of DevOps practices by bridging the gap between development and operations:\n\n- **Enabling CI/CD:** IaC integrates seamlessly into Continuous Integration/Continuous Delivery (CI/CD) pipelines. A code change can trigger a pipeline that not only tests the application but also provisions or updates the necessary infrastructure to run it.\n- **Creating Ephemeral Environments:** Teams can instantly spin up new, production-like environments for development, testing, or user acceptance testing (UAT). This allows developers to test their code in a realistic setting before merging, catching bugs earlier.\n- **Breaking Down Silos:** When infrastructure is code, it lives in the same VCS as the application code. Developers and operations engineers can collaborate on the same files, review changes through pull requests, and gain a shared understanding of the entire system."
      },
      {
        "title": "6. Popular IaC Tools",
        "content": "Different IaC tools are optimized for different tasks. They generally fall into three categories:"
      },
      {
        "title": "1. Infrastructure Provisioning Tools",
        "content": "These tools are primarily used to create, modify, and destroy the foundational infrastructure components like virtual machines, networks, and databases. They are almost always declarative.\n\n- **Terraform:** A widely-used, open-source tool by HashiCorp. Its key feature is being** **cloud-agnostic, supporting AWS, Azure, GCP, and many other providers. It uses a declarative language (HCL) and excels at managing complex, multi-cloud infrastructure.\n- **AWS Cloud Formation:** The native IaC tool for AWS. It allows you to define AWS resources in JSON or YAML templates. Its main strength is its deep integration with all AWS services."
      },
      {
        "title": "2. Configuration Management Tools",
        "content": "These tools specialize in configuring the software on existing servers. They install packages, manage configuration files, and ensure services are running.\n\n- **Ansible:** A very popular open-source tool known for its simplicity and agentless architecture. It uses YAML \"playbooks\" that are easy to read and operates over SSH. It can be used for both imperative (tasks) and declarative (state) management.\n- **Puppet:** A mature, agent-based tool that uses a declarative, model-driven approach. A central \"Puppet Master\" server manages the \"Puppet Agents\" on each machine, enforcing the desired state.\n- **Chef:** A powerful and flexible agent-based tool that uses a Ruby-based DSL (Domain-Specific Language). It's often described as more imperative, giving developers fine-grained control over configuration steps using \"recipes\" and \"cookbooks.\"\n- **Salt Stack (Salt):** A high-speed, event-driven automation tool. It can operate in either an agent-based model or an agentless model over SSH and is known for its performance and scalability."
      },
      {
        "title": "3. Container Orchestration Tools",
        "content": "While not strictly traditional IaC, these tools manage the infrastructure and lifecycle of containerized applications in a declarative way.\n\n- **Kubernetes (K8s):** The de-facto standard for container orchestration. Kubernetes automates the deployment, scaling, and management of containerized applications. Users define the desired state of the application (e.g., \"run 3 replicas of this container and expose it on port 80\") using YAML manifests.**Note on Convergence:** The lines between these categories are blurring. For example, Terraform can use \"provisioners\" to run configuration scripts, and Ansible has modules to provision cloud infrastructure."
      },
      {
        "title": "10. Common Use Cases for IaC",
        "content": "Infrastructure as Code has a wide range of applications across different domains:\n\n- **Cloud Computing:** Provisioning and managing all cloud resources, such as virtual machines, storage, databases, and VPCs.\n- **DevOps & CI/CD:** Automating the creation of development, staging, and production environments as part of a CI/CD pipeline.\n- **Web Application Deployment:** Defining and deploying an entire application stack, including web servers, application servers, load balancers, and databases.\n- **Networking:** Automating the deployment and management of networks, including creating and managing subnets, security groups, and firewalls.\n- **Big Data:** Automating the deployment and management of big data infrastructure, such as setting up clusters for Apache Hadoop or Apache Spark.\n- **Disaster Recovery:** Quickly and reliably recreating an entire production infrastructure in a different region in the event of a failure."
      },
      {
        "title": "11. Common Challenges and Pitfalls",
        "content": "While powerful, IaC is not without its challenges:\n\n- **Learning Curve:** IaC tools and concepts can be complex. Teams need to invest time in learning the specific tool (e.g., Terraform, Ansible) and the declarative/immutable paradigms.\n- **State Management:** The state file can become a bottleneck. If it gets corrupted, lost, or locked, it can be difficult to manage your infrastructure.\n- **Configuration Drift:** This occurs when manual changes are made to the infrastructure, causing it to \"drift\" from the state defined in the code. This breaks the \"single source of truth\" and can cause future IaC runs to fail or have unintended consequences.\n- **Tooling Complexity:** Choosing the right tool (or combination of tools) can be difficult. A common stack is using Terraform for provisioning and Ansible for configuration, but this adds to the complexity."
      },
      {
        "title": "12. The Future of IaC: GitOps and AIOps",
        "content": "- **GitOps:** This is the evolution of IaC. In a GitOps model, the Git repository is the single source of truth. An automated agent (like Argo CD or Flux) continuously monitors the repository and the live infrastructure, automatically applying any changes from Git to the cluster. This makes the CI/CD process even more automated and auditable.\n- **AIOps:** The integration of AI and machine learning with IaC promises self-healing infrastructure. AI models could detect anomalies (e.g., a server crashing), identify the root cause, and automatically trigger an IaC-defined remediation (e.g., provisioning a new server) without human intervention.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: What is Infrastructure as Code (IaC)?",
      "initialCode": "# What is Infrastructure as Code (IaC)?\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: What is Infrastructure as Code (IaC)?",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of What is Infrastructure as Code (IaC)? in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via What is Infrastructure as Code (IaC)?",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "What is Infrastructure as Code (IaC)? enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-terraform-intro": {
    "id": "devops-terraform-intro",
    "badge": "Module 9 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Introduction to HashiCorp Terraform",
    "subtitle": "Complete DevOps engineering guide to Introduction to HashiCorp Terraform — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Terraform, developed by HashiCorp, is an industry-standard Infrastructure as Code (IaC) tool used to build, modify, and manage infrastructure safely and efficiently.\n\n- Automates infrastructure provisioning instead of manual console configuration.\n- Enables version control, collaboration, and repeatable deployments.\n- Reduces human errors while improving scalability and consistency.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Introduction to HashiCorp Terraform."
        }
      },
      {
        "title": "2. Infrastructure as Code (IaC)",
        "content": "IaC is the practice of managing IT infrastructure using configuration files rather than manual, interactive configuration tools.\n\n- **Declarative:** You tell Terraform what you want (e.g., \"I want 5 servers\"), and Terraform figures out how to create them.\n- **Version Controlled:** You can track the history of your infrastructure changes just like application code."
      },
      {
        "title": "3. Key Features",
        "content": "- **Cloud Agnostic:** Unlike CloudFormation (AWS only) or ARM Templates (Azure only), Terraform works with **any** cloud provider (AWS, Google Cloud, Azure, Kubernetes, Alibaba, etc.).\n- **Immutable Infrastructure:** Terraform typically replaces servers rather than changing them, reducing \"configuration drift\" (where servers become inconsistent over time).\n- **State Management:** Terraform keeps track of your real-world resources in a state file, acting as the \"source of truth.\"\n- **Modular:** You can package code into Modules to reuse common patterns (e.g., a standard \"Web Server\" module used by all teams)."
      },
      {
        "title": "4. Working",
        "content": "Terraform uses a declarative configuration language to define infrastructure and manage resources in a predictable, automated workflow. It allows teams to provision, update, and delete infrastructure consistently while supporting multiple cloud providers and environments. This flexibility makes Terraform a widely adopted tool for scalable and reusable infrastructure management.\n\n- Defines infrastructure as code for repeatable and reliable deployments.\n- Provisions, modifies, and destroys resources through an automated workflow.\n- Supports multi-cloud, on-premises, and hybrid environments with a single configuration.\n- Enhances scalability, reusability, and operational efficiency across industries.Terraform Architecture"
      },
      {
        "title": "5. Architecture",
        "content": "To understand how Terraform works, you need to understand its core components."
      },
      {
        "title": "1. The Core (Engine)",
        "content": "This is the binary you run on your laptop. It reads your configuration files and compares them to the current state of your infrastructure to calculate what needs to be done."
      },
      {
        "title": "2. Providers",
        "content": "Terraform doesn't know how to talk to AWS or Azure directly. It uses Providers plugins that translate Terraform code into API calls for specific platforms.\n\n- Examples: AWS Provider, Azure Provider, Kubernetes Provider."
      },
      {
        "title": "3. State File (terraform.tfstate)",
        "content": "- This is the **brain** of Terraform. It maps your code to the real-world resources.\n- If you delete a resource from your code, Terraform looks at the state file to find the ID of the real resource and delete it from the cloud.\n- Note: In teams, this file is stored remotely (e.g., in an AWS S3 bucket) so everyone works off the same map."
      },
      {
        "title": "1. Terraform CLI",
        "content": "Terraform helps you automate the creation and management of infrastructure. To see a list of available commands in Terraform, you can run:\n\nThis command will display all the available commands, with the most commonly used ones listed first. The primary Terraform commands include:\n\n- **init**: Prepares your directory to run other Terraform commands.\n- **validate**: Checks if the configuration is valid.\n- **plan**: Shows what changes will be made to your infrastructure.\n- **apply**: Executes the changes to create or modify your infrastructure.\n- **destroy**: Deletes the infrastructure that was previously created.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Terraform CLI",
          "snippet": "terraform --help"
        }
      },
      {
        "title": "2. Terraform Language",
        "content": "Terraform uses HashiCorp Configuration Language (HCL) to define infrastructure. HCL is designed to be both easy to read by humans and understandable by machines, making it a great fit for DevOps tools.\n\nInfrastructure elements managed by Terraform are called resources. These can include virtual machines, S3 buckets, VPCs, and databases. Each resource is defined in a block, like this example for creating an AWS VPC:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Terraform Language",
          "snippet": "resource \"aws_vpc\" \"default_vpc\" {    cidr_block = \"172.31.0.0/16\"    tags = {        Name = \"example_vpc\"    }}"
        }
      },
      {
        "title": "3. Terraform Provider",
        "content": "Terraform Provider defines the resource types and data sources Terraform can manage for that platform. Providers allow users to provision, configure, and manage cloud services, databases, networks, and more from a single workflow.\n\n**Key Points:**\n\n- Acts as a bridge between Terraform and infrastructure platforms.\n- Defines the resources and data sources available for management.\n- Supports cloud providers, data centers, network devices, and databases.\n- Enables consistent provisioning across multiple environments."
      },
      {
        "title": "4. Terraform Modules",
        "content": "A Terraform module is a container for a set of related resources that perform a specific task, enabling organized and reusable infrastructure code.\n\n- **Module Block**: Defined using the `module` block in Terraform configuration, which includes the following arguments:-\n- **source**: Specifies the location of the module, which can be a local path or a URL.\n- **name**: Provides a name to reference the module within the configuration.\n- **version**: Specifies a particular version of the module to use.\n- **Resources** **and** **Variables**: Within a module block, users can define the resources that make up the module, along with input and output variables. Input variables allow values to be passed into the module when it is called, and output variables allow the module to return values to the calling configuration.\n- **Nesting**: Modules can be nested, enabling the creation of complex infrastructure architectures using a hierarchical structure."
      },
      {
        "title": "5. Terraform Provisioners",
        "content": "Terraform Provisioners are useful for tasks like copying files or installing software on virtual machines. However, provisioners should be used sparingly, as they can introduce complexity and reduce the predictability of deployments.\n\n- Run commands or scripts after resource provisioning.\n- Commonly used for file transfers and software setup.\n- Can increase complexity and require elevated permissions.\n- Recommended only when native Terraform resources cannot achieve the task."
      },
      {
        "title": "6. Terraform State",
        "content": "Terraform state files allows Terraform to compare the current infrastructure with the desired state and apply only the necessary changes. While the state can be stored locally, remote storage is recommended for team environments to maintain consistency and prevent conflicts.\n\n- Tracks real-world resources and their configurations.\n- Enables accurate planning by detecting infrastructure changes.\n- Can be stored locally but is safer when managed remotely.\n- Remote state improves collaboration, consistency, and state locking."
      },
      {
        "title": "15. Local State",
        "content": "By default, Terraform stores the state file locally on the machine where it is executed. This approach is simple and effective for individual use or small projects but can introduce risks in collaborative environments\n\n- Simple to set up with no additional backend configuration\n- Ideal for learning, experimentation, and small-scale deployments\n- Faster access since the state file resides on the local system**Limitations of Local State:**\n\n- Higher risk of accidental deletion or corruption\n- Difficult to share safely across teams\n- No built-in locking, increasing the chance of concurrent update conflicts"
      },
      {
        "title": "16. Remote State",
        "content": "Remote state stores the Terraform state file in a shared backend such as AWS S3, Azure Storage, or Terraform Cloud. It is considered a best practice for production environments because it enhances security, collaboration, and reliability.\n\n- Enables team collaboration through centralized state management\n- Supports state locking to prevent simultaneous modifications\n- Improves security with encryption and controlled access**Common Remote Backends:**\n\n- AWS S3 (often paired with DynamoDB for state locking)\n- Terraform Cloud\n- Azure Blob Storage\n- Google Cloud Storage"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Introduction to HashiCorp Terraform",
      "initialCode": "terraform --help",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Introduction to HashiCorp Terraform",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Introduction to HashiCorp Terraform in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Introduction to HashiCorp Terraform",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Introduction to HashiCorp Terraform enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-terraform-syntax": {
    "id": "devops-terraform-syntax",
    "badge": "Module 9 • DevOps & Cloud",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "Terraform HCL Syntax & Configuration Examples",
    "subtitle": "Complete DevOps engineering guide to Terraform HCL Syntax & Configuration Examples — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Terraform Uses HashiCorp Configuration Language (HCL) which help engineers in designing repeatable and production-ready systems with ease.\n\n- Terraform Eliminates manual provisioning through automated infrastructure management.\n- Uses HCL, a human-readable language to define the desired infrastructure state.\n- Supports multi-cloud and on-premises deployments with consistent workflows.\n- Enables scalable, reliable, and version-controlled infrastructure.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Terraform HCL Syntax & Configuration Examples."
        }
      },
      {
        "title": "2. Language Used In Terraform",
        "content": "HashiCorp Configuration Language (HCL) is the DSL (Domain Specific Language) that Terraform uses to create infrastructure resources. HCL is a human-readable language, designed to be easy to understand while still being expressive.\n\n- It is Declarative rather than procedural.\n- Supports complex data structures.\n- Compatible with JSON."
      },
      {
        "title": "3. Terraform Syntax With Examples",
        "content": "Terraform syntax is built around blocks, arguments, and expressions that define infrastructure resources and their configurations. Terraform follows a declarative model, meaning you specify what your infrastructure should look like, and Terraform determines how to achieve that state by building a dependency graph and executing changes in the correct order."
      },
      {
        "title": "1. Terraform Block Syntax",
        "content": "The terraform block defines project-level settings such as required providers and Terraform version constraints.\n\nterraform {\nrequired_version = \">= 1.5.0\"\nrequired_providers {\n\naws = {\n\nsource = \"hashicorp/aws\"\nversion = \"~> 5.0\"\n\n}\n\n}\n\n}"
      },
      {
        "title": "2. Terraform Resource Block Syntax",
        "content": "The fundamental building block in Terraform is a resource block. It refers to a single piece of infrastructure that you want to control. Here is an illustration of how to create an AWS EC2 instance:\n\nIn the above code we have used the resource type as \"aws_instance\" and given it the name \"gfg-ec2\" and specified the AMI ID and the type of instance we need for it.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Terraform Resource Block Syntax",
          "snippet": "resource \"aws_instance\" \"gfg-ec2\" {  ami           = \"ami-0c94855ba95c286c99\"  instance_type = \"t2.micro\"}"
        }
      },
      {
        "title": "3. Terraform Variable Declaration Syntax",
        "content": "We are able to parameterize our configurations in Terraform with the help of variables, which can make our code much more reusable and adaptable. For example:\n\nIn the above example, we have created a variable region with a default value of \"us-east-1\".",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Terraform Variable Declaration Syntax",
          "snippet": "variable \"region\" {  description = \"AWS region where the resources will be deployed.\"  type        = string  default     = \"us-east-1\"}"
        }
      },
      {
        "title": "4. Terraform Output Values Syntax",
        "content": "You can extract data from your infrastructure and send it to other configurations or use it as a reference by using Terraform's output values. For example:\n\nIn the above code, we are trying to get the public ip of our EC2 instance by creating an output named \"instance_ip\".",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Terraform Output Values Syntax",
          "snippet": "output \"gfg_instance_ip\" {  value       = aws_instance.example.public_ip  description = \"Public IP of the EC2 instance recently deployed.\"}"
        }
      },
      {
        "title": "5. Terraform Modules Syntax",
        "content": "We can encapsulate and reuse setups using Terraform modules. They support the creation of reusable components from our infrastructure code. Here is a usage example for a module\n\nIn the above code, we are creating a VPC and for that, we are using the \"terraform-aws-modules/vpc/aws\" module from the Terraform Registry. Then we are passing the required parameters inside the block. These examples show the basic syntax and applications of Terraform and HCL. Terraform, however, offers a large selection of resource types, providers, and extra tools like data sources, conditional expressions, and loops.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Terraform Modules Syntax",
          "snippet": "module \"vpc\" {  source  = \"terraform-aws-modules/vpc/aws\"  version = \"2.0.1\"  name = \"my-gfg-vpc\"  cidr = \"10.0.0.0/16\"}"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Terraform HCL Syntax & Configuration Examples",
      "initialCode": "resource \"aws_instance\" \"gfg-ec2\" {  ami           = \"ami-0c94855ba95c286c99\"  instance_type = \"t2.micro\"}",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Terraform HCL Syntax & Configuration Examples",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Terraform HCL Syntax & Configuration Examples in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Terraform HCL Syntax & Configuration Examples",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Terraform HCL Syntax & Configuration Examples enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-terraform-resources": {
    "id": "devops-terraform-resources",
    "badge": "Module 9 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Terraform Resources, Providers & State Lifecycle",
    "subtitle": "Complete DevOps engineering guide to Terraform Resources, Providers & State Lifecycle — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Terraform resources are the core building blocks of Infrastructure as Code, representing every infrastructure component Terraform creates and manages.\n\n- It Represent individual infrastructure components like VMs, databases, and networks.\n- It Enable automated, repeatable, and version-controlled deployments.\n- Follow a declarative approach where Terraform determines how to achieve the desired state.\n- Idempotent by design multiple runs apply only the necessary changes without duplicationFor example, if you want to provision a small virtual machine in AWS, you can define it using a resource block:\n\nresource \"aws_instance\" \"my_vm\" {\nami = \"ami-12345678\"\ninstance_type = \"t2.micro\"}\n\nThis configuration tells Terraform to create an EC2 instance using the specified machine image and instance type. When you run Terraform, it compares your configuration with the current infrastructure and takes the required actions to reach the desired state.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Terraform Resources, Providers & State Lifecycle."
        }
      },
      {
        "title": "2. Syntax of Terraform Resource Block",
        "content": "A resource block in Terraform is used to define individual pieces of infrastructure.To create an AWS EC2 instance, you would use a resource block like this:\n\n** resource \"aws_instance\" \"example\" {\n\nami = \"ami-0c55b159cbfafe1f0\"\n\ninstance_type = \"t2.micro\"\n\n}\n\nHere’s how it works:\n\n`Resource**`** keyword**:This indicates that you are defining a resource.\n\n**Type and Name**:\n\n- `aws_instance` is the type of resource you are creating ,in this case an EC2 instance.\n- `\"example\"` is a unique name you assign to this resource so you can reference it later in the configuration.**Arguments**:\n\n- **`ami**`**: **This specifies the Amazon Machine Image (AMI) ID, which is the template for the instance.\n- **`instance_type**`**: **This defines the size or type of the instance, like `t2.micro` for a small instance.Resource blocks always start with the `resource` keyword, followed by the type and name, and then the arguments inside curly braces `{}`. Some blocks may also include additional nested configurations like `network_interface` for networking details.\n\nOnce you’ve written the resource block, you can apply the configuration to create the resource by running the following commands:\n\nThese steps initialize Terraform and provision the EC2 instance using the settings in the resource block.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Syntax of Terraform Resource Block",
          "snippet": "terraform initterraform apply"
        }
      },
      {
        "title": "3. Use of Terraform Resources Documentation",
        "content": "Using Terraform’s resource documentation is a straightforward way to learn how to define and work with specific resources in your infrastructure setup. Here’s how you can use it effectively:"
      },
      {
        "title": "1. Open the terraform documentation",
        "content": "Go to the official Terraform documentation site at https://registry.terraform.io/. This is where you’ll find details about all Terraform providers and their resources."
      },
      {
        "title": "2. Search for the resource you need",
        "content": "- Use the search bar to find the resource you’re interested in, such as `aws_instance` for creating an EC2 instance on AWS.\n- Click on the provider (e.g., AWS, Azure, or Google Cloud) to see a list of all supported resources."
      },
      {
        "title": "3. Understand the key sections of the documentation",
        "content": "Each resource page is divided into important sections:\n\n**Resource Name**: This tells you the name you’ll use to define the resource in your Terraform code, like `aws_instance`.\n\n**Example Usage**: The documentation provides examples to help you get started quickly. For instance, to create an EC2 instance:\n\n**Arguments Reference**: This section lists the options you can set for the resource, including:\n\n**Required arguments**: These must be included (e.g., `ami` and `instance_type` for `aws_instance`).\n\n- **Optional arguments**: These are additional settings you can customize if needed.\n- **Attributes Reference**: These are the values Terraform generates after creating the resource, such as the public IP address (`public_ip`) or resource ID (`id`).**Nested Blocks**: Some resources include blocks for more detailed configurations, like `network_interface` for EC2 instances.\n\n**Import Instructions**: If you have an existing resource outside Terraform, this section explains how to import it into Terraform.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Understand the key sections of the documentation",
          "snippet": "resource \"aws_instance\" \"example\" {  ami           = \"ami-12345678\"  instance_type = \"t2.micro\"}"
        }
      },
      {
        "title": "4. Identify Required and Optional settings",
        "content": "Read the documentation carefully to understand which settings are mandatory and which are optional. For example, to create an EC2 instance, you must provide the `ami` ID and `instance_type`. Optional arguments, like tags, can be added for customization."
      },
      {
        "title": "5. Start with the Examples",
        "content": "Use the examples provided in the documentation as a base for your configuration. Modify them to match your requirements. For example:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Start with the Examples",
          "snippet": "resource \"aws_instance\" \"my_instance\" {  ami           = \"ami-12345678\"  instance_type = \"t2.micro\"  tags = {    Name = \"MyInstance\"  }}"
        }
      },
      {
        "title": "6. Use output attributes in your code",
        "content": "Once a resource is created, you can use its attributes in other parts of your configuration. For example, to output the public IP of an EC2 instance:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Use output attributes in your code",
          "snippet": "output \"instance_ip\" {  value = aws_instance.my_instance.public_ip}"
        }
      },
      {
        "title": "8. Stay updated",
        "content": "Terraform providers are updated regularly. Check the documentation often to ensure you’re using the latest features and arguments for your resources."
      },
      {
        "title": "1. Resource Types",
        "content": "A **resource type** represents a specific infrastructure component, like a virtual machine, storage bucket, or database, that Terraform manages. Each resource type is tied to a provider, such as AWS, Azure, or Google Cloud.\n\n**Examples of Resource Types**\n\n- **`aws_instance**`: Represents an Amazon EC2 instance.\n- **`google_storage_bucket**`: Defines a storage bucket in Google Cloud.\n- **`azurerm_virtual_network**`: Refers to a virtual network in Azure.When using a resource type, you define its properties and configurations based on the provider’s requirements."
      },
      {
        "title": "2. Arguments",
        "content": "**Arguments **are the settings or properties that define the characteristics of a resource. They are specified within the resource block.** **\n\n**1. Required Arguments**: These are mandatory and must be provided. For example, to create an EC2 instance (`aws_instance`), you need to specify the `ami` (Amazon Machine Image ID) and `instance_type`:\n\n**2. Optional Arguments**: These allow for additional customization but are not required. For example, adding tags to an EC2 instance is optional:\n\n**3. Computed Arguments**:These are automatically generated by the provider and can’t be directly set. For instance, the `public_ip` of an EC2 instance is a computed value.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Arguments",
          "snippet": "resource \"aws_instance\" \"my_instance\" {  ami           = \"ami-0c55b159cbfafe1f0\"  instance_type = \"t2.micro\"}"
        }
      },
      {
        "title": "13. Using Output Attributes",
        "content": "After creating a resource, Terraform provides details about it through output attributes. These can be used in other parts of your configuration. For example:\n\n- `public_ip` for an EC2 instance\n- `bucket_domain_name` for an S3 bucket"
      },
      {
        "title": "14. Resource Dependencies in Terraform",
        "content": "In Terraform, resource dependencies help define the order in which resources should be created, updated, or destroyed. These dependencies ensure that resources are provisioned in the correct sequence and prevent issues where one resource depends on another."
      },
      {
        "title": "15. Types of Dependencies",
        "content": "**1. Implicit Dependencies**: Terraform automatically detects dependencies when one resource references another. For instance, if an EC2 instance depends on a security group, Terraform knows to create the security group first.\n\n**2. Explicit Dependencies**: In some cases, Terraform may not automatically detect a dependency, so you can explicitly declare it using the `depends_on` argument.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Types of Dependencies",
          "snippet": "resource \"aws_instance\" \"example\" {  ami = \"ami-0c55b159cbfafe1f0\"  vpc_security_group_ids = [aws_security_group.example.id]}resource \"aws_security_group\" \"example\" { ... }"
        }
      },
      {
        "title": "16. Meta Arguments in Terraform",
        "content": "Meta-arguments in Terraform are special settings that control how Terraform behaves when managing infrastructure. These arguments aren't directly part of the resource or data blocks but help in configuring resources more efficiently, especially in complex scenarios."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Terraform Resources, Providers & State Lifecycle",
      "initialCode": "terraform initterraform apply",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Terraform Resources, Providers & State Lifecycle",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Terraform Resources, Providers & State Lifecycle in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Terraform Resources, Providers & State Lifecycle",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Terraform Resources, Providers & State Lifecycle enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-terraform-modules": {
    "id": "devops-terraform-modules",
    "badge": "Module 9 • DevOps & Cloud",
    "readingTime": "26 min read",
    "level": "Advanced",
    "title": "Reusable Modules Block in Terraform",
    "subtitle": "Complete DevOps engineering guide to Reusable Modules Block in Terraform — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Terraform is an open-source Infrastructure as Code (IaC) tool that allows teams to define and provision infrastructure declaratively across cloud and on-premises environments.\n\n- A Terraform module is a collection of configurations used to create and manage specific infrastructure components.\n- Modules act as reusable building blocks that promote standardization and reduce duplication.\n- They improve maintainability by organizing infrastructure into modular, scalable structures.\n- Using modules helps teams provision resources more efficiently and follow best practices like the DRY principle.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Reusable Modules Block in Terraform."
        }
      },
      {
        "title": "2. Defining a Terraform Module",
        "content": "We make a directory containing a collection of Terraform configuration files in order to define a module."
      },
      {
        "title": "3. Syntax of the Terraform Module Block",
        "content": "Within your primary Terraform setup, you can call and instantiate modules using the modules block. The syntax is:\n\n- **module_name**: The user-defined name for the module instance is module_name.\n- **source**: This identifies the module's location. A remote module registry (like GitHub or Terraform Registry) or a local file path could both be used.\n- **other_arguments**: Optional arguments which module can accept as optional arguments.For example, Let's say we want to set up and provision EC2 instance using a module:\n\nIn a different directory, we first define a module called \"ec2_instance\" with the following structure:\n\n- **main.tf:** Contains the core resource definitions required to provision infrastructure.\n- **variables.tf:** Defines input variables such as instance type or AMI ID, allowing the module to be flexible and reusable.\n- **outputs.tf:** Specifies the values the module should expose, such as resource IDs or public IP addresses.By structuring modules this way, teams can standardize deployments and reuse infrastructure components across multiple environments\n\nNow, we can instantiate this module as follows in our main Terraform configuration file:\n\n- The region is set to \"us-east-2\" and the provider block specifies the AWS provider.\n- The \"gfg_server\" module is created by the module block. The module found in the \"./ec2_instance\" directory is referred to.\n- AMI_id is set to \"ami-98656754364\" and instance_type is set to \"t2.micro\" inside the module block. The module will use these settings to provision the EC2 instance.\n- A \"instance_id\" output variable is defined in the output block. The \"gfg_server\" module is accessed to obtain the instance_id output variable's value.\n- we set the instance_type and ami_id input variables' values inside the module block. To retrieve the output value of the instance_id output variable declared within the module, we lastly use the module.gfg_server.instance_id reference.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Syntax of the Terraform Module Block",
          "snippet": "module \"module_name\" {\n  source = \"path_of_module\"\n  [other_arguments]\n}"
        }
      },
      {
        "title": "4. Root vs Child Modules",
        "content": "Understanding the difference between root modules and child modules is essential for designing scalable and well-structured Terraform configurations. Terraform organizes infrastructure hierarchically, where one main module acts as the entry point and can call other reusable modules."
      },
      {
        "title": "5. Root Module",
        "content": "The root module is the primary working directory where you run Terraform commands such as `terraform init`, `terraform plan`, and `terraform apply`. It typically contains the core configuration files and acts as the orchestrator for your infrastructure.\n\n- Serves as the entry point for Terraform execution\n- Defines provider configurations and backend settings\n- Passes input variables to child modules\n- Combines multiple modules to build complete infrastructure"
      },
      {
        "title": "6. Child Modules",
        "content": "A child module is any module that is called by another module (usually the root module). These modules are designed to be reusable and help organize infrastructure into smaller, manageable components.\n\n- Called using the `module` block\n- Receives inputs from the root module\n- Returns outputs that can be referenced elsewhere\n- Promotes reusability and standardization"
      },
      {
        "title": "7. Example: Calling a Child Module from the Root Module",
        "content": "**How it works:**\n\n- The configuration above is written in the root module.\n- Terraform loads the module from `./modules/vpc`.\n- Input variables customize the VPC configuration.\n- Any outputs from the child module can be referenced as:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Example: Calling a Child Module from the Root Module",
          "snippet": "module \"vpc\" {\n  source     = \"./modules/vpc\"\n  vpc_name   = \"production-vpc\"\n  cidr_block = \"10.0.0.0/16\"\n}"
        }
      },
      {
        "title": "8. Version",
        "content": "The version attribute can be used to express a module's or provider's version constraint. For** **\n\n**Example:**\n\nIn this instance, the \"terraform-aws-modules/vpc/aws\" module repository is being used to source the module. Versions greater than or equal to 2.0 but are less than 3.0 are allowed, as specified in the version attribute.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Version",
          "snippet": "module \"gfg_vpc\" {\n  source  = \"terraform-aws-modules/vpc/aws\"\n  version = \"~> 2.0\"\n  // etc ...\n}"
        }
      },
      {
        "title": "9. Meta-arguments",
        "content": "Let's have a look at the count meta-argument, which enables the creation of many instances of a resource depending on a count value.\n\nBy repeatedly iterating over the resource block with the count value of 2, Terraform will in this instance construct two AWS EC2 instances.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Meta-arguments",
          "snippet": "resource \"aws_instance\" \"gfg_instances\" {\n  count = 2\n  \n  ami           = \"ami-3uir3215678\"\n  instance_type = \"t2.micro\"\n  // etc..\n}"
        }
      },
      {
        "title": "10. Accessing Module Output Values",
        "content": "Let's say you have a module called \"app\" that generates a DNS name for an application load balancer (ALB) that it creates. You can use the name of the module and the output name in the following format to access this output value in your primary configuration:\n\nThe output value alb_dns_name set in the \"app\" module is referred to by the module.gfg_app.alb_dns_name. In order to create an AWS Route 53 DNS record, it fetches the ALB's DNS name.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Accessing Module Output Values",
          "snippet": "module \"gfg_app\" {\n  source = \"./modules/app\"\n  \n  // etc..\n}\n\nresource \"aws_route53_record\" \"app_dns\" {\n  zone_id = \"ABC123456\"\n  name    = \"gfg-app.example.com\"\n  // etc..\n  records = [module.gfg_app.alb_dns_name]\n}"
        }
      },
      {
        "title": "11. Transferring Resource State Into Modules",
        "content": "Assume you currently handle an AWS S3 bucket outside of Terraform. You can use the terraform import command in the following way to import its state into Terraform\n\nWith the help of this command, the current S3 bucket is linked to the Terraform resource aws_s3_bucket.gfg_bucket, enabling Terraform to control its settings.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Transferring Resource State Into Modules",
          "snippet": "terraform import aws_s3_bucket.gfg_bucket gfg-created-bucket"
        }
      },
      {
        "title": "12. Replacing Resources Within a Module",
        "content": "Let's say your \"security_group\" module controls an AWS security group. You may use the Terraform state mv command to swap out the current security group resource by typing the following\n\nThe current security group resource aws_security_group.existing is moved in this example using the Terraform command state mv to a new address sg.new. With this alternative, you can modify the resource without affecting the module's other resources.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Replacing Resources Within a Module",
          "snippet": "terraform state mv aws_security_group.existing sg.new"
        }
      },
      {
        "title": "13. Benefits of Modules",
        "content": "- Modules enable reuse of infrastructure code across projects, reducing duplication.\n- Simplify complex setups by providing abstraction.\n- Separate components for better organization and teamwork.\n- Make updates easier and ensure consistent deployments.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Reusable Modules Block in Terraform",
      "initialCode": "module \"module_name\" {\n  source = \"path_of_module\"\n  [other_arguments]\n}",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Reusable Modules Block in Terraform",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Reusable Modules Block in Terraform in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Reusable Modules Block in Terraform",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Reusable Modules Block in Terraform enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-terraform-ec2": {
    "id": "devops-terraform-ec2",
    "badge": "Module 9 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Provisioning AWS EC2 Infrastructure Using Terraform",
    "subtitle": "Complete DevOps engineering guide to Provisioning AWS EC2 Infrastructure Using Terraform — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Amazon EC2 is a web service presented by Amazon Web Services (AWS) that gives resizable compute capacity in the cloud. It permits clients to run virtual servers, known as EC2 instances, in a versatile and flexible manner. EC2 instances can be handily provisioned and designed to meet changing jobs, making them suitable for a wide range of applications.\n\n- **Scalability:** You can easily increase or decrease the number of instances based on demand.\n- **Instance Types**: Choose from compute-optimized, memory-optimized, or storage-optimized instance types that are optimized for various use cases.\n- **AMI (****Amazon Machine Image**): Launch instances with particular software and operating system configurations by utilizing pre-configured images.\n- **Elastic Load Balancing:** Circulate approaching traffic across different examples to ensure high accessibility and adaptation to non-critical failure.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Provisioning AWS EC2 Infrastructure Using Terraform."
        }
      },
      {
        "title": "2. Now install and configuring Terraform",
        "content": "1. Go to browser and search for terraform official site in that official site is there terraform download link as shown in below commands and Open a terminal or command prompt and run the command terraform version to verify the installation.\n\n2. After installed and configured terraform, Now make a new directory and navigate to it, Terraform file must should be save with **filename.tf.**\n\n3. Additional files can be created to modularize your code or to store provider-specific configurations. You will define the infrastructure resources you want to create in the main.tf file, such as VPCs, subnets, security groups, and AWS EC2 terraform instances.\n\n4. Terraforms declarative language is used to define each resource, allowing you to declare the desired state of the resource.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Now install and configuring Terraform",
          "snippet": "sudo yum install -y yum-utils shadow-utilssudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.reposudo yum -y install terraform"
        }
      },
      {
        "title": "3. Authentication with AWS",
        "content": "1. Go to AWS Management Console.\n\n2. Login with by using your credentials.\n\n3. Generate access key to authenticate Terraform with your AWS account.\n\n4. In AWS management console in home screen search for IAM ( Identity and Access Management ) service. Choose Users and click on Add user. Give a username and select administration access as the access type. Attach necessary permissions to the user.\n\n5. Review the user details and create the user. You will see the access key ID and secret access key. Save this information securely as it will be required when configure Terraform.\n\nFor more detail understanding to install the AWS CLI refer this - Article"
      },
      {
        "title": "4. Create an EC2 instance using Terraform configuration files",
        "content": "Now that we have the networking infrastructure and security groups set up, let’s define the EC2 terraform instance itself. Here’s an example:\n\nIn the above code, we define an AWS EC2 terraform instance resource with the specified AMI (Amazon Machine Image), instance type, subnet, and security group. Also, we assigned a tag to the instance for identification.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Create an EC2 instance using Terraform configuration files",
          "snippet": "resource \"aws_instance\" \"my_instance\" {  ami           = var.ec2_ami  instance_type = var.ec2_instance_type  subnet_id     = aws_subnet.my_subnet.id  vpc_security_group_ids = [aws_security_group.my_sg.id  tags = {    Name = \"my-ec2-instance\"  }}"
        }
      },
      {
        "title": "5. Terraform Block and AWS Provider Configuration",
        "content": "Terraform block it was describe the cloud required version and the required credentials. The following example shows that aws provider",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Terraform Block and AWS Provider Configuration",
          "snippet": "terraform {  required_providers {    aws = {      source  = \"hashicorp/aws\"      version = \"~> 4.16\"    }  }  required_version = \">= 1.2.0\"}provider \"aws\" {  region  = \"us-west-2\"  profile = \"jack.roper\"}resource \"aws_instance\" \"example_server\" {  ami           = \"ami-04e914639d0cca79a\"  instance_type = \"t2.micro\"  tags = {    Name = \"JacksBlogExample\"  }}"
        }
      },
      {
        "title": "6. Creating a VPC Using Terraform",
        "content": "VPC (Virtual Private Cloud) is isolated section in aws cloud where your resources can be launched. We can create VPC by using terraform.\n\nFor example to creating a VPC and Subnet, you would define a resource block like this:\n\nIn this example, we specify the vpc with cidr block, subnet ID, and tags for the EC2 instance. Terraform will use this configuration to create the specified EC2 instance when you apply the configuration.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Creating a VPC Using Terraform",
          "snippet": "resource \"aws_vpc\" \"sada\" {cidr_block = \"10.0.0.0/16\"instance_tenancy = \"default\"tags = {Name = \"siva\"}}"
        }
      },
      {
        "title": "7. Complete Infrastructure Example",
        "content": "Below is a complete Terraform configuration demonstrating provider setup, variables, networking resources, and an EC2 instance.\n\nTerraform will use this configuration to provision the VPC, subnet, security group, and EC2 instance when you run `terraform apply`.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Complete Infrastructure Example",
          "snippet": "# provider block defines the cloud provider and its configurationprovider \"aws\" {  region = \"us-east-1\"}# variable block allows you to define variables for reusabilityvariable \"instance_type\" {  description = \"Type of EC2 instance\"  default     = \"t2.micro\"}variable \"ami\" {  description = \"Amazon Machine Image ID\"  default     = \"ami-12345678\"}# resource block defines the AWS resources to be createdresource \"aws_vpc\" \"my_vpc\" {  cidr_block = \"10.0.0.0/16\"  # other VPC configurations...}resource \"aws_security_group\" \"my_security_group\" {  vpc_id = aws_vpc.my_vpc.id  # other security group configurations...}resource \"aws_instance\" \"my_instance\" {  ami           = var.ami  instance_type = var.instance_type  subnet_id     = aws_subnet.my_subnet.id  security_group = [aws_security_group.my_security_group.id]  # other instance configurations...}resource \"aws_subnet\" \"my_subnet\" {  vpc_id                  = aws_vpc.my_vpc.id  cidr_block              = \"10.0.1.0/24\"  availability_zone       = \"us-east-1a\"  map_public_ip_on_launch = true  # other subnet configurations...}# output block allows you to define values to be displayed after applyoutput \"instance_ip\" {  value = aws_instance.my_inst"
        }
      },
      {
        "title": "8. Providers Block",
        "content": "- Providers block is utilized to design the Providers, which is liable for overseeing assets in a particular cloud environment (e.g., AWS, Azure, and so on.).\n- It remembers subtleties, for example, the district for which assets ought to be made."
      },
      {
        "title": "9. Variable Block",
        "content": "- Input variables that can be used throughout your Terraform configuration can be defined using the variable block.\n- Helps in defining your design and making it more adaptable.\n- You can set default values, depictions, and different qualities for factors."
      },
      {
        "title": "10. Resource Block",
        "content": "- Resource block is the most key structure block in Terraform.\n- It proclaims an asset type (e.g., aws_instance, aws_vpc) and its particular setups.\n- Every asset block makes an occurrence of the asset it depicts."
      },
      {
        "title": "11. Output Block",
        "content": "- Output block characterizes values that will be displayed subsequent to applying the Terraform arrangement.\n- Valuable for showing data like IP addresses, DNS names, and so on.\n- Gives a method for uncovering explicit data for outside use"
      },
      {
        "title": "12. Creating a Security Group Using Terraform",
        "content": "Configuring Security Groups, Security is most important due to it acts as a virtual firewalls, its controlling inbound and outbound traffic for your AWS EC2 terraform instance.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Creating a Security Group Using Terraform",
          "snippet": "resource \"aws_security_group\" \"my_sg\" {  name        = \"my-security-group\"  description = \"Allow inbound SSH and HTTP traffic\"  inbound {    from_port   = 22    to_port     = 22    protocol    = \"tcp\"    cidr_blocks = [\"0.0.0.0/0\"]  }  inbound {    from_port   = 80    to_port     = 80    protocol    = \"tcp\"    cidr_blocks = [\"0.0.0.0/0\"]  }  outbound {    from_port   = 0    to_port     = 0    protocol    = \"-1\"    cidr_blocks = [\"0.0.0.0/0\"]  }}"
        }
      },
      {
        "title": "13. Initialize the Terraform directory",
        "content": "Now it's time to Initializing and applying the terraform configuration after writing the terraform code code by using following code:\n\nWhen using Terraform, the terraform init command is a crucial step. It initializing a working directory, setting up the fundamental parts for Terraform to collaborate with the specified backend (like AWS, Azure , or local), and download any expected supplier modules.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. Initialize the Terraform directory",
          "snippet": "terraform init"
        }
      },
      {
        "title": "14. Run terraform plan and apply",
        "content": "To apply the terraform configuration and create the EC2 terraform instance, to run the following command:\n\nCleaning up and destroying AWS resources is a fundamental stage to prevent unnecessary costs and keep a clean infrastructure. This is the way you can tidy up the assets made by your AWS EC2 terraform example.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Run terraform plan and apply",
          "snippet": "terraform apply"
        }
      },
      {
        "title": "15. Create an EC2 instance with user_data",
        "content": "**Define your Terraform configuration**: Create a `.tf` file, for example, `ec2_instance.tf`, and define your EC2 instance configuration along with user data:\n\nHere is the Terraform code to create the ec2 instance on the aws.\n\nHere is the aws Instance created on the aws console.\n\nHere is the system log the userdata commands executed while creating the container.\n\nThe service status of the nginx was successfully running on the instance.\n\nAccessed the nginx using the IP of the address.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Create an EC2 instance with user_data",
          "snippet": "provider \"aws\" {  region = \"your_aws_region\"}resource \"aws_instance\" \"example\" {  ami             = \"your_ami_id\"  instance_type   = \"t2.micro\"  key_name        = \"your_key_pair_name\"  security_groups = [\"your_security_group_name\"]  subnet_id       = \"your_subnet_id\"    user_data = <<-EOF    #!/bin/bash        # Update package repositories    apt-get update -y        # Install nginx    apt-get install nginx -y        # Start nginx service    systemctl start nginx        # Enable nginx to start on boot    systemctl enable nginx  EOF}"
        }
      },
      {
        "title": "16. Create Multiple EC2 Instances With Different Configurations",
        "content": "To create multiple EC2 instances with different configurations using Terraform, you can define multiple instances within your Terraform configuration, each with its own set of parameters. Here's an example:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 16. Create Multiple EC2 Instances With Different Configurations",
          "snippet": "provider \"aws\" {  region = \"your_aws_region\"}# Define the first EC2 instanceresource \"aws_instance\" \"instance1\" {  ami             = \"ami-xxxxxxxx\"   # AMI ID for the first instance  instance_type   = \"t2.micro\"  key_name        = \"your_key_pair_name\"  security_groups = [\"your_security_group_name\"]  subnet_id       = \"your_subnet_id\"    # User data script for the first instance  user_data = <<-EOF    #!/bin/bash        # User data commands for the first instance  EOF}# Define the second EC2 instanceresource \"aws_instance\" \"instance2\" {  ami             = \"ami-yyyyyyyy\"   # AMI ID for the second instance  instance_type   = \"t2.nano\"  key_name        = \"your_key_pair_name\"  security_groups = [\"your_security_group_name\"]  subnet_id       = \"your_subnet_id\"    # User data script for the second instance  user_data = <<-EOF    #!/bin/bash        # User data commands for the second instance  EOF}# Define more instances as needed..."
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Provisioning AWS EC2 Infrastructure Using Terraform",
      "initialCode": "sudo yum install -y yum-utils shadow-utilssudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.reposudo yum -y install terraform",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Provisioning AWS EC2 Infrastructure Using Terraform",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Provisioning AWS EC2 Infrastructure Using Terraform in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Provisioning AWS EC2 Infrastructure Using Terraform",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Provisioning AWS EC2 Infrastructure Using Terraform enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-cloudformation": {
    "id": "devops-cloudformation",
    "badge": "Module 9 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "AWS CloudFormation Templates & Stack Management",
    "subtitle": "Complete DevOps engineering guide to AWS CloudFormation Templates & Stack Management — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- AWS CloudFormation is an Infrastructure as Code (IaC) service that helps users create and manage AWS resources using code templates.\n\n- It allows you to define AWS resources like EC2 instances, S3 buckets, RDS databases, and networking components in code templates.\n- Automates the provisioning and deployment process, eliminating the need to manually configure resources in the AWS Console.\n- Ensures infrastructure consistency by creating identical environments across multiple regions or accounts using the same template.\n- Supports version control and change management, allowing you to track modifications, roll back updates, and maintain reliable infrastructure.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for AWS CloudFormation Templates & Stack Management."
        }
      },
      {
        "title": "2. Templates and Stacks",
        "content": "CloudFormation works using two main concepts:\n\n- **Template:** A JSON or YAML file that defines the AWS resources to be created.\n- **Stack:** The collection of AWS resources created and managed from the template."
      },
      {
        "title": "3. AWS CloudFormation Working",
        "content": "Amazon Web Services (AWS) provides cloud services such as EC2, S3, Auto Scaling, and Load Balancing. AWS CloudFormation helps automate the provisioning of these services using Infrastructure as Code (IaC), reducing manual configuration.\n\n**Step-by-step process:**\n\n- Define infrastructure in a template.\n- CloudFormation reads the template configuration.\n- AWS APIs are called to create resources.\n- Resources are deployed as a stack.\n- Future updates safely modify the existing stack."
      },
      {
        "title": "4. Benefits",
        "content": "- **Automation:** Automates the creation and management of AWS resources.\n- **Consistency:** Creates identical infrastructure using reusable templates.\n- **Cost Savings:** Reduces manual effort and reuses existing templates.\n- **Security:** Applies security policies and configurations consistently.\n- **Scalability:** Easily scales resources based on demand."
      },
      {
        "title": "5. Getting Started with AWS CloudFormation",
        "content": "CloudFormation templates are written in JSON or YAML format. In this article, we focus on the JSON template format.\n\nJSON (JavaScript Object Notation) is a text-based format used to represent structured data. In AWS CloudFormation, JSON templates define AWS resources and their configurations in a structured way, which CloudFormation uses to create and manage the AWS infrastructure."
      },
      {
        "title": "6. Structure of CloudFormation JSON Template",
        "content": "- **Format Version:** Defines the version of the CloudFormation template.\n- **Description:** Contains additional details or comments about the template.\n- **Metadata:** Provides extra information using JSON objects.\n- **Parameters:** Accepts custom or dynamic input values during stack creation.\n- **Mappings:** Maps keys to corresponding values for conditional use.\n- **Conditions:** Controls whether specific resources or properties are created.\n- **Transform:** Helps reuse template components using declarative macros.\n- **Resources:** Defines AWS resources like EC2, S3, and Lambda in the stack.\n- **Outputs:** Displays values generated after stack creation, such as IDs or URLs."
      },
      {
        "title": "7. Template Terms and Concepts",
        "content": "Understanding The Core Concepts That CloudFormation templates use to organize resources, settings, and functions is key to managing AWS infrastructure efficiently.\n\n- **Template: **A CloudFormation template is a JSON or YAML file that defines the AWS resources and configurations to be created.\n- **Stacks:** A stack is the collection of AWS resources created from a CloudFormation template and managed as a single unit.\n- **Formatting: **CloudFormation templates use JSON or YAML format. YAML is commonly preferred because it is simpler and more readable.\n- **Change Sets: **Change Sets allow you to preview the changes CloudFormation will make before updating a stack, helping reduce deployment risks.\n- **Functions: **CloudFormation provides built-in functions such as `Fn::Sub` and `Fn::Join` to create dynamic and flexible configurations.\n- **Parameters: **Parameters allow users to provide custom input values during stack deployment, making templates reusable and flexible.\n- **Conditions:** Conditions control whether specific resources are created or configured based on certain criteria, such as development or production environments."
      },
      {
        "title": "8. Template Anatomy",
        "content": "A CloudFormation template consists of several standard sections. The most important are:"
      },
      {
        "title": "1. Resources (Mandatory)",
        "content": "The Resources section defines the AWS resources to be created in the stack.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Resources (Mandatory)",
          "snippet": "Resources:\n  MyBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketName: my-app-logs-2025"
        }
      },
      {
        "title": "2. Parameters (Optional but Recommended)",
        "content": "The Parameters section makes your template flexible by allowing user input during stack creation.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Parameters (Optional but Recommended)",
          "snippet": "Parameters:\n  InstanceType:\n    Type: String\n    Default: t2.micro\n    AllowedValues: [t2.micro, m5.large]"
        }
      },
      {
        "title": "3. Outputs (Optional)",
        "content": "The **Outputs** section displays values after stack creation, such as a server IP address or Load Balancer URL."
      },
      {
        "title": "4. Mappings (Optional)",
        "content": "The Mappings section stores fixed values, often used for Region-specific configurations like AMI IDs."
      },
      {
        "title": "13. Deploy a CloudFormation Template",
        "content": "Deploying a CloudFormation template can be done through multiple methods, each catering to different preferences and workflows"
      },
      {
        "title": "1. AWS Management Console",
        "content": "- Log in, navigate to CloudFormation, and click Create Stack.\n- Upload your JSON or YAML template, set parameters, tags, and permissions.\n- Click Create Stack to deploy."
      },
      {
        "title": "2. CloudFormation Designer",
        "content": "- Use a drag-and-drop interface to visually build or modify templates.\n- Click Create Stack to deploy the designed template."
      },
      {
        "title": "3. AWS CLI (Command Line Interface)",
        "content": "- Install and configure the AWS CLI on your system.\n- Run CloudFormation commands to deploy templates from the terminal.\n- Useful for automation, scripting, and CI/CD pipelines."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: AWS CloudFormation Templates & Stack Management",
      "initialCode": "Resources:\n  MyBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketName: my-app-logs-2025",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: AWS CloudFormation Templates & Stack Management",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of AWS CloudFormation Templates & Stack Management in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via AWS CloudFormation Templates & Stack Management",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "AWS CloudFormation Templates & Stack Management enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-monitoring-types": {
    "id": "devops-monitoring-types",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Types of Monitoring & Observability in System Design",
    "subtitle": "Complete DevOps engineering guide to Types of Monitoring & Observability in System Design — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Monitoring in system design ensures a system remains healthy, reliable, and high-performing. It continuously collects and analyzes data to provide real-time visibility into the internal state of distributed applications.\n\n- Monitoring helps detect issues before they affect users, ensuring high system reliability and smooth performance.\n- It provides real-time visibility into system health, turning a complex system from a black box into a glass box for better decision-making.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Types of Monitoring & Observability in System Design."
        }
      },
      {
        "title": "2. Three Pillars Of Monitoring",
        "content": "A comprehensive monitoring strategy is built on collecting three distinct types of data.\n\nThree Pillars of Monitoring"
      },
      {
        "title": "1. Metrics",
        "content": "Metrics are numerical, time-series data points measured over intervals. They are lightweight, easy to store, and excellent for dashboards and alerts. They tell you what is happening and how much.\n\n**Purpose**\n\n- Detect performance issues using thresholds and trends.\n- Monitor system health and resource utilization.**Examples**\n\n- CPU utilization (e.g., `85%`)\n- Request latency (e.g., `250ms`)\n- HTTP error rate (e.g., `5% 5xx errors`)\n- Disk I/O, memory usage, network bandwidth**Tools**\n\n- Prometheus, InfluxDB, Grafana (for visualization).**Note: **Metrics give a quick, high-level overview of the system."
      },
      {
        "title": "2. Logs",
        "content": "Logs are immutable, timestamped text records of discrete events. They are verbose and provide detailed, human-readable context. If a metric tells you \"error rate spiked,\" a log will tell you the exact error message for a specific failed request.\n\n**Purpose**\n\n- Troubleshoot failures and unexpected behaviour.\n- Audit security-related events.\n- Perform deep investigation after incident.**Examples**\n\npgsql\n\n`\n`\n**Tools**\n\n- ELK Stack (Elasticsearch, Logstash, Kibana), Splunk, Graylog, Loki.**Note: **Metrics alert you to a problem; logs help you understand the problem.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Logs",
          "snippet": "[2025-10-24 07:15:01] ERROR: User login failed — invalid password\n[2025-10-24 07:16:05] INFO: Payment service connected to database"
        }
      },
      {
        "title": "3. Traces",
        "content": "Traces are the \"secret sauce\" for microservices. A single trace shows the end-to-end journey of a request as it \"traces\" its path through multiple, distributed services. It's a \"log of logs\" for a single request, showing how long it spent in each service.\n\n**Purpose**\n\n- Identify performance bottlenecks.\n- Debug latency in distributed system.**Examples**\n\nA user request took 500ms total:\n\n- Load Balancer: 50ms\n- Auth Service: 150ms\n- Order Service: 300ms - bottleneckThis reveals where optimization is needed.\n\n**Tools**\n\n- Jaeger, Zipkin, OpenTelemetry.**Note: **Traces give a microservices map, showing exactly where slowdown or failure occurs."
      },
      {
        "title": "6. Monitoring Philosophies",
        "content": "Monitoring philosophies define whether issues are detected after they occur (reactive) or prevented before they impact users (proactive)."
      },
      {
        "title": "1. Reactive monitoring",
        "content": "Reactive monitoring alerts you after something has already gone wrong in the system. It focuses on detecting known issues and notifying teams quickly.\n\n**Purpose**\n\n- Minimize downtime by responding fast to failures**Example**\n\n- CPU usage reaches 100% → Alert triggers → Engineer fixes it**Benefits**\n\n- Simple to implement\n- Helps with critical issue response**Challenges**\n\n- Alerts come after users are impacted\n- Doesn’t prevent failures\n- Can cause reputation/financial loss if slow to react.**Note: **Effective, but only as a first line of defense."
      },
      {
        "title": "2. Proactive Monitoring - “Weather Forecast Approach\"",
        "content": "Proactive monitoring identifies early warning signs and prevents failures before they happen. It uses trend analysis and predictions.\n\n**Purpose**\n\n- Prevent performance degradation and outages.\n- Improve long-term system reliability.**Example**\n\n- Disk usage increasing steadily - Alert: “Disk will be full in 3 days” - Fix before failure**Benefits**\n\n- Reduces downtime and user impact.\n- Supports capacity planning and resource optimization.**Challenges**\n\n- Requires smart analytics and accurate thresholds.\n- Risk of false alerts if poorly configure.**Note:** Helps build highly reliable and self-aware system."
      },
      {
        "title": "9. Reactive monitoring Vs Proactive Monitoring",
        "content": "A comparison of detecting failures after they occur versus preventing them before they impact users.\n\nFeatureReactive MonitoringProactive MonitoringWhen alert triggersAfter failureBefore failureUser ImpactAlready affectedNot affectedDifficulty levelEasyComplexBest forIncident responseReliability + prevention"
      },
      {
        "title": "10. Key Monitoring Domains",
        "content": "Monitoring spans different layers of the system. Each domain focuses on specific components to ensure complete visibility and reliability."
      },
      {
        "title": "1. Infrastructure (Health) Monitoring",
        "content": "This is the foundation. It involves monitoring the health and performance of your physical or virtual hardware.\n\n**Purpose**\n\n- To ensure the underlying compute, storage, and network resources are healthy.**Metrics**\n\n- CPU, RAM, disk space, disk I/O, network in/out.**Tools**\n\n- Prometheus, Nagios, Zabbix, Datadog."
      },
      {
        "title": "2. Application Performance Monitoring (APM)",
        "content": "APM focuses on monitoring the performance of the software application itself, from the code level.\n\n**Purpose**\n\n-  To identify application-level bottlenecks, code inefficiencies, and errors.**Metrics:**\n\n- Request/transaction latency, error rates (HTTP 500s), throughput (requests per second), database query times.**Tools**\n\n- New Relic, Dynatrace, AppDynamics."
      },
      {
        "title": "3. Log Monitoring (Log Management)",
        "content": "This involves collecting, centralizing, and analyzing log data from all parts of your system.\n\n**Purpose**\n\n- To enable troubleshooting, auditing, and querying of historical event data.**Benefits**\n\n- Helps find exact failure reasons.\n- Useful for auditing and tracing user actions.**Challenges**\n\n- Log volume can be massive, making storage and analysis expensive. Parsing unstructured logs is difficult.**Tools**\n\n- ELK Stack, Splunk, Loki, Graylog**.**"
      },
      {
        "title": "4. Security Monitoring (SIEM)",
        "content": "This involves monitoring system activities to detect, respond to, and neutralize security threats.\n\n**Purpose**\n\n- To protect systems and data from unauthorized access, breaches, and malicious activities.**Activities**\n\n- Monitoring for suspicious login attempts, analyzing network traffic for intrusions, and checking file integrity.**Tools**\n\n- Security Information and Event Management (SIEM) platforms, Intrusion Detection Systems (IDS), Wazuh."
      },
      {
        "title": "5. User Experience Monitoring (Frontend/Client-Side)",
        "content": "This is critical as it measures what the user actually experiences. It has two main sub-types:\n\n**Real User Monitoring (RUM)**\n\n- Measures the actual performance of your application from the browsers of your real end-users. It answers, \"How long did the page take to load for users in India on a mobile device?\"**Synthetic Monitoring**\n\n- Uses scripts or bots to simulate user journeys (e.g., \"log in,\" \"add to cart,\" \"checkout\") from different locations around the world, 24/7. This helps you catch problems before real users do."
      },
      {
        "title": "6. Business Monitoring",
        "content": "This involves tracking high-level business metrics (Key Performance Indicators or KPIs) alongside technical metrics.\n\n**Purpose**\n\n- To connect system health directly to business outcomes.**Examples**\n\n- Monitoring \"user signups per hour,\" \"items sold per minute,\" or \"cart abandonment rate.\" A drop in \"signups per hour\" is a much more powerful alert than \"CPU is at 80%.\""
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Types of Monitoring & Observability in System Design",
      "initialCode": "[2025-10-24 07:15:01] ERROR: User login failed — invalid password\n[2025-10-24 07:16:05] INFO: Payment service connected to database",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Types of Monitoring & Observability in System Design",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Types of Monitoring & Observability in System Design in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Types of Monitoring & Observability in System Design",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Types of Monitoring & Observability in System Design enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-prometheus-intro": {
    "id": "devops-prometheus-intro",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "20 min read",
    "level": "Advanced",
    "title": "Prometheus Monitoring Architecture & PromQL",
    "subtitle": "Complete DevOps engineering guide to Prometheus Monitoring Architecture & PromQL — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Prometheus is an open-source monitoring tool designed to capture and process numeric time-series data with associated metrics, labels, and timestamps.\n\n- Captures and stores time-series data with metrics, labels, and timestamps.\n- Uses HTTP scraping to gather metrics from targets like Kubernetes, databases, and applications.\n- Supports diverse infrastructure platforms for comprehensive monitoring.\n- Integrates with Alertmanager to provide powerful alerting capabilities.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Prometheus Monitoring Architecture & PromQL."
        }
      },
      {
        "title": "2. Need of Prometheus",
        "content": "Traditional monitoring tools often struggle to keep up with modern, dynamic infrastructures powered by microservices and containers.\n\nPrometheus solves this challenge by offering:\n\n- Real-time visibility into system performance.\n- Early detection of failures.\n- Improved operational reliability.\n- Data-driven scaling decisions.\n- Strong support for cloud-native architectures."
      },
      {
        "title": "3. Core Components",
        "content": "- **Prometheus Server**: Central component responsible for downloading and storing metric data from various sources on a regular basis. It uses a local time-series database to store these metrics.\n- **Purpose**: Endpoints or services monitored by Prometheus by scraping metrics from them. Each target is identified by a unique URL and can be found dynamically.\n- **Exporters**: Applications that display metrics in the Prometheus format can scrape. Common exports include node exporters (for hardware and OS metrics) and application-specific exports such as MySQL exporters and Apache exporters.\n- **Prom QL (Prometheus Query Language): **This is notifications a powerful and flexible query language for retrieving and manipulating the time of series data stored in a Prometheus. It supports a wide range of functions and applications for data analysis.\n- **Alert manager:** Process that handles the alerts generated by Prometheus. Manages alert to notifications, including deduplication, grouping, and routing through various channels such as email, Slack, or PagerDuty.\n- **Time-Series Database (TSDB):** The repository where Prometheus stores all created metrics data. Each data block is then stored with a timestamp and superimposed with key-value pairs."
      },
      {
        "title": "4. Architecture",
        "content": "- **Metric Collection & Pull Model**: Prometheus server actively pulls metrics from targets (short-lived jobs via Pushgateway, long-lived exporters, and Node) using a pull-based architecture rather than waiting for data to be pushed to it.\n- **Service Discovery**: Prometheus automatically discovers targets through Kubernetes and file_sd (file-based service discovery), enabling dynamic monitoring without manual configuration updates.\n- **Time-Series Database & Storage**: The Prometheus server stores collected metrics in its built-in TSDB (time-series database) on disk (HDFS/HDD), providing efficient storage and querying of historical data.\n- **Alert Generation & Management**: Prometheus evaluates rules and triggers alerts through Alertmanager, which handles routing, grouping, and notification delivery to multiple channels (Email, Slack, etc.).\n- **Multi-Interface Data Access**: Metrics are exposed through HTTP API, PromQL queries, and the web UI, allowing flexible data retrieval and visualization alongside integration with external tools.\n- **Ecosystem Integration**: Prometheus data feeds into Grafana for visualization, external API clients, and other monitoring systems, creating a complete observability platform with pagerduty integration for incident management.Prometheus Architecture"
      },
      {
        "title": "5. Metrics Type of Prometheus",
        "content": "- **Counter: **One of the maximum basic metric kinds is the counter. It is helpful for keeping track of and comparing values which might be only going to upward push. You can reset the value to zero and take some other dimension once it reaches a specific fee.\n- **Gauge**: The Values that upward thrust and fall are measured by gauge metrics. This includes the amount of concurrent requests or the reminiscence utilization in the interim. Usually, the metric is represented by way of an unmarried numerical cost.\n- **Summary**: The Following sampling observations, the summary displays the entire quantity of observations and the sum of determined values. Additionally, it determines variable quantiles over a sliding time window.\n- **Histogram**: They are used to symbolize records inclusive of response times, sample sizes, and related observations. While histogram quantiles may be computed server aspect, quantiles for summaries are computed patron-aspect. Choose the statistical metric type that makes experience for your software due to the fact both strategies have exchange-offs."
      },
      {
        "title": "6. Prometheus Working",
        "content": "- **Pull-based metrics collection:** Prometheus periodically scrapes metrics from configured targets (like servers or apps) over HTTP, instead of receiving pushed data.\n- **Time-series storage:** Each metric is stored as a time series (metric name + labels + timestamp + value) in Prometheus’s built-in database.\n- **Powerful querying with PromQL:** Users query and aggregate metrics using PromQL to analyze system behavior, trends, and anomalies.\n- **Alerting system:** Prometheus evaluates alert rules based on queries and sends alerts to Alertmanager, which handles routing, grouping, and notifications.\n- **Service discovery & labels:** Prometheus dynamically discovers targets (e.g., Kubernetes, cloud providers) and uses labels to flexibly slice and filter metrics."
      },
      {
        "title": "7. Prometheus Kubernetes Monitoring",
        "content": "- Prometheus is widely used for managing Kubernetes environments, addressing the complexity of cloud container applications\n- Kubernetes monitoring enables tracking of cluster health status and resource usage, including memory, CPU, and storage\n- Traditional monitoring tools often fall short with highly dynamic Kubernetes infrastructures\n- Prometheus provides native service discovery and container-level visibility, making it ideal for modern cloud environments"
      },
      {
        "title": "8. Key Features",
        "content": "- A multi-dimensional data model that uses metrics to display time series data.\n- The key/value pairs and name.\n- The simplest query language to use in this dimension is Prom QL.\n- They do not rely on distributed storage; The individual server nodes are independent\n- The pull model over HTTP is used to collect time series.\n- A central table is supported to push the timeline.\n- The objectives are met with static configuration or service discovery."
      },
      {
        "title": "9. Advantages",
        "content": "- Open-source and vendor-neutral.\n- Designed for cloud-native architectures.\n- Highly flexible querying capabilities.\n- Excellent community support.\n- Seamless Kubernetes integration.\n- Reliable alerting system."
      },
      {
        "title": "10. Limitations",
        "content": "- Not ideal for long-term metric storage.\n- Operates primarily as a single-node system.\n- Requires external tools like Grafana for advanced visualization.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Prometheus Monitoring Architecture & PromQL",
      "initialCode": "# Prometheus Monitoring Architecture & PromQL\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Prometheus Monitoring Architecture & PromQL",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Prometheus Monitoring Architecture & PromQL in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Prometheus Monitoring Architecture & PromQL",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Prometheus Monitoring Architecture & PromQL enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-prometheus-scrape": {
    "id": "devops-prometheus-scrape",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Configuring scrape_config in Prometheus",
    "subtitle": "Complete DevOps engineering guide to Configuring scrape_config in Prometheus — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Prometheus follows a pull-based monitoring model, meaning it actively fetches metrics from configured targets rather than waiting for data to be pushed. This process is controlled by scrape configurations, one of the most critical components of a Prometheus setup. Without properly defined scrape configs, Prometheus would not know:\n\n- Which systems to monitor.\n- How frequently to collect metrics.\n- What endpoints expose those metrics.\n- How to label and organize the collected data.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Configuring scrape_config in Prometheus."
        }
      },
      {
        "title": "2. Scrape Configuration",
        "content": "- Scrape configuration defines how Prometheus collects metrics from targets such as applications, services, or endpoints\n- This configuration is vital for effectively tracking your infrastructure and applications"
      },
      {
        "title": "3. Core Elements",
        "content": "- **Job**: A precise identifier for each scrape process. It helps label and organize the metrics gathered from one-of-a-kind sources.\n- **Target**: The endpoints exposing metrics for Prometheus to scrape, These are usually exporters, applications, or services.\n- **Scrape_Interval**: It defines how often Prometheus collects metrics, default value is 15 seconds.\n- **Scrape_Timeout**: The maximum time Prometheus waits for a response before marking the scrape as failed.\n- **metrics_path**: The HTTP path where metrics are exposed."
      },
      {
        "title": "4. Static Configurations:",
        "content": "A method to define a hard and fast set of targets that Prometheus will scrape for metrics. Used to explicitly specify the objectives to be monitored, especially useful in environments for better enterprise and filtering, permitting the amendment, addition, or removal of labels on the fly. Relabeling can be applied to both goal labels\n\nExample:\nstatic_configs:\n- targets: [\"localhost:9100\"]"
      },
      {
        "title": "5. Dynamic Service Discovery:",
        "content": "Modern infrastructures are highly dynamic — containers spin up and down constantly, Prometheus integrates with platforms like kubernetes, AWS ,GCP. Prometheus automatically discovers new pods and begins scraping them without manual updates.\n\nExample:\nkubernetes_sd_configs:\n- role: pod"
      },
      {
        "title": "6. Prometheus can Monitor the Apache Web Server",
        "content": "- **Prometheus: **A central monitoring and alerting tool responsible for amassing, storing, and querying metrics from numerous targets.\n- **Scrape Configuration: **This specifies how Prometheus must scrape metrics from distinct objectives. It consists of process names, scrape intervals, scrape timeouts, metrics paths, schemes, labels, and so on.\n- **Job:** The Represents a set of configurations for scraping a selected endpoint or service. In this example, it's configured to scrape metrics from an Apache2 web server.\n- **Apache2 Web Server:** The goal endpoint from which Prometheus collects metrics. It serves net pages and applications over HTTP.\n- **Apache Exporter: **A middleman thing that exposes Apache2 metrics in a format Prometheus can understand. It listens on a unique port and presents metrics through HTTP.\n- **Metrics Path: **Specifies the URL route in which the Apache Exporter exposes metrics data for Prometheus to scrape.\n- **Scheme:** In Specifies the protocol used for scraping metrics, normally HTTP or HTTPS.\n- **Labels: **They provide additional metadata or context to the scraped metrics, permitting customers to organize and query metrics efficaciously."
      },
      {
        "title": "7. Step 1: Install the Apache Web Server in Ubuntu 22.04 LTS",
        "content": "- Update the package index.\n\n- Install Apache.\n\n- Start the Apache service.\n\n- Enable Apache to start on boot.\n\n- Verify Apache is running.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Step 1: Install the Apache Web Server in Ubuntu 22.04 LTS",
          "snippet": "sudo apt update"
        }
      },
      {
        "title": "8. Step 2: Edit Configuration of Prometheus",
        "content": "- Open the Prometheus. yml configuration file\n\n- Add a new scrape configuration for Apache metrics:\nSave and close the file (Ctrl + X, then Y, then Enter).",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 8. Step 2: Edit Configuration of Prometheus",
          "snippet": "sudo nano /etc/prometheus/prometheus. yml"
        }
      },
      {
        "title": "9. Step 3: Install Apache Exporter In Prometheus",
        "content": "- Download the Apache Exporter binary:\n\n- Extract the downloaded archive:\n\n- Move the binary to /usr/local/bin:\n\n- Change the ownership of the binary:\n\n- Start the Apache Exporter:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 9. Step 3: Install Apache Exporter In Prometheus",
          "snippet": "https://release-assets.githubusercontent.com/github-production-release-asset/44455471/f1009d9d-825a-4618-b742-f73f476b01ed?sp=r&sv=2018-11-09&sr=b&spr=https&se=2025-07-23T13%3A09%3A08Z&rscd=attachment%3B+filename%3Dapache_exporter-0.10.0.linux-amd64.tar.gz&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2025-07-23T12%3A09%3A00Z&ske=2025-07-23T13%3A09%3A08Z&sks=b&skv=2018-11-09&sig=14RL9eoBIQFuejwYCIQCrLpZai8YhgmQcqCXoWj1R%2BU%3D&jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc1MzI3MzAxMSwibmJmIjoxNzUzMjcyNzExLCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.iTaEZZRdCA0kYik2MgVnc-Cd8ff8lNnEiqvPh7QuGBQ&response-content-disposition=attachment%3B%20filename%3Dapache_exporter-0.10.0.linux-amd64.tar.gz&response-content-type=application%2Foctet-stream"
        }
      },
      {
        "title": "10. Step 4: Install Apache Exporter as a System d Service",
        "content": "Create a new system d service unit file using a text editor like nano or vim:\n\nSave the file and exit the text editor.Reload system d to pick up the changes:\n\nNow, you can start the Apache Exporter service using:\n\nYou can also enable the service to start automatically on boot:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 10. Step 4: Install Apache Exporter as a System d Service",
          "snippet": "sudo nano /etc/systemd/system/apache_exporter.service"
        }
      },
      {
        "title": "11. Step 5: Verify Apache Exporter Integration and Prometheus",
        "content": "Configuration and implementation details for **Step 5: Verify Apache Exporter Integration and Prometheus**:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Step 5: Verify Apache Exporter Integration and Prometheus",
          "snippet": "sudo systemctl status Prometheus"
        }
      },
      {
        "title": "12. Using static_configs and file_sd_configs for static targets.",
        "content": "In a static_config allows to specifying list targets and common label set of for them. It is the canonical way to the specify static targets in scrape of configuration.\n\nFor Prometheus.yml in your local directory, to the check syntax, you can run.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Using static_configs and file_sd_configs for static targets.",
          "snippet": "job_name: cluster1    static_configs:      - targets:        - server1.example.com        - server2.example.com        - server3.example.com        labels:          database: mysql          some_carefully_chosen_property: its_value_for_these_targets"
        }
      },
      {
        "title": "13. kubernetes_sd_configs",
        "content": "Configuration and implementation details for **kubernetes_sd_configs**:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. kubernetes_sd_configs",
          "snippet": "- job_name: monitoring/alertmanager/0  honor_timestamps: true  scrape_interval: 30s  scrape_timeout: 10s  metrics_path: /alertmanager/metrics  scheme: http  relabel_configs:    ..."
        }
      },
      {
        "title": "14. consul_sd_configs",
        "content": "Configuration and implementation details for **consul_sd_configs**:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. consul_sd_configs",
          "snippet": "consul_sd_configs:    - server: '{{ env \"NOMAD_IP_prometheus_ui\" }}:8500'      services: ['nomad-client', 'nomad']"
        }
      },
      {
        "title": "15. Step 6: Prometheus scrape interval",
        "content": "By default the scraping of the interval is set to be 60s:\n\nDefaulting container name to the Prometheus.\n\nThis does the trick for the cluster level monitoring:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Step 6: Prometheus scrape interval",
          "snippet": "kc -n cattle-Prometheus exec -it prometheus-cluster-monitoring-0 ‘sh’"
        }
      },
      {
        "title": "16. Step 7: Prometheus scrape timeout",
        "content": "In a the Prometheus configuration I have a job with these specs.\n\nIn the script that creates metrics takes 3 minutes to finish, but from Prometheus I don't see the metrics. What is the operation of the **scrape_timeout** variable.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 16. Step 7: Prometheus scrape timeout",
          "snippet": "- job_name: name_of_my_job     scrape_interval: 5m     scrape_timeout: 30s     metrics_path: /metrics     scheme: http"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Configuring scrape_config in Prometheus",
      "initialCode": "sudo apt update",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Configuring scrape_config in Prometheus",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Configuring scrape_config in Prometheus in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Configuring scrape_config in Prometheus",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Configuring scrape_config in Prometheus enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-prometheus-registry": {
    "id": "devops-prometheus-registry",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Prometheus Collector Registry & Metric Types",
    "subtitle": "Complete DevOps engineering guide to Prometheus Collector Registry & Metric Types — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Prometheus has emerged as a cornerstone in monitoring and alerting for modern cloud-native applications and is the preferred choice for developers and operations teams due to its capabilities and ecosystem.\n\n- Offers robust monitoring and alerting functionality\n- Adapts to various metric types and structures\n- Provides extensive integrations and tools for comprehensive monitoring solutions\n- Trusted by operations and development teams for cloud-native infrastructure monitoring\n- Enables effective tracking and alerting on application and system health",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Prometheus Collector Registry & Metric Types."
        }
      },
      {
        "title": "1. Time Series Database",
        "content": "- **Definition:** All data in Prometheus is stored as time series. Each time series can be identified by means of a metric name and labels combination. It is a sequence of timestamped data points.\n- **Labels:** These are key-value pairs tied down to metrics. Their use allows Prometheus to distinguish dimensions for a specific metric, e.g., http_requests_total that may be separated into method (GET, POST) or status_code (200, 404).\n- **Storage:** Prometheus stores its data within a local time series database. Every data point comprises of a timestamp, label, metric name, and value. Prometheus can also integrate with remote storage solutions in order to offload or back up their data.\nTime Series Database"
      },
      {
        "title": "2. The Pull Model",
        "content": "**Mechanism:** Prometheus uses the pull model by scraping metrics from endpoints exposed through the monitored targets. Each target has a metrics endpoint (e.g., /metrics) that is queried by Prometheus at periods specified.\n\n**Advantages:**\n\n- **Dynamic Service Discovery:** Targets can be dynamically discovered by Prometheus through integrations with systems such as Consul, Kubernetes or directly mentioned in configuration files.\n- **Reduced Load: **The pull model reduces the burden on monitored applications as Prometheus controls the scrape frequency.**Target Configuration:** Prometheus configuration file specifies targets under scrape_configs section. Each target has parameters like job_name, scrape_interval and static_configs or service_discovery_configs.\n\nPrometheus target configuration"
      },
      {
        "title": "3. PromQL",
        "content": "**Purpose:** Use of PromQL to request and analyze time series data stored in Prometheus enabling selection and aggregation.\n\n**Features:**\n\n- **Selectors:** They are used to filter metrics based on their labels just like {job=\"api-server\"} selects all the metrics from the api-server job.\n- **Operators:** support for arithmetic (for instance +, -), comparison (for example >, <) as well as logical (and, or) operations.\n- **Functions:** It has rich functions for aggregation which include sum, avg), rate calculations such as rate, irate and so much more.**Examples:**\n\nProm QL\n- **rate(http_requests_total[5m])**: The number of http_requests_total per second during last 5 minutes\n- **sum by (method) (rate(http_requests_total[1m])):** Sum up request rates grouped by the method label."
      },
      {
        "title": "5. Prometheus Client Libraries",
        "content": "**Role:** Client libraries allow applications to serve internal metrics in a way that can be scraped by Prometheus.\n\n**Features: **\n\n- **Metric Registration:** Describe and create various kinds of forms (counters, gauges, histograms, summaries).\n- **HTTP Endpoint:** An APP makes available a/metrics endpoint; Prometheus scrapes the exported metrics.\n- **Supported Languages:** There are specifically official libraries for Go, Python, Java, Ruby and among the other languages.**Example (Go):**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 5. Prometheus Client Libraries",
          "snippet": "package main\n\nimport (\n    \"github.com/prometheus/client_golang/prometheus\"\n    \"github.com/prometheus/client_golang/prometheus/promhttp\"\n    \"net/http\"\n)\n\nvar (\n    requestsTotal = prometheus.NewCounter(prometheus.CounterOpts{\n        Name: \"http_requests_total\",\n        Help: \"Total number of HTTP requests.\",\n    })\n    requestDuration = prometheus.NewHistogram(prometheus.HistogramOpts{\n        Name:    \"http_request_duration_seconds\",\n        Help:    \"Duration of HTTP requests in seconds.\",\n        Buckets: prometheus.DefBuckets,\n    })\n)\n\nfunc init() {\n    prometheus.MustRegister(requestsTotal)\n    prometheus.MustRegister(requestDuration)\n}\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n    timer := prometheus.NewTimer(requestDuration)\n    defer timer.ObserveDuration()\n\n    requestsTotal.Inc()\n    w.Write([]byte(\"Hello, World!\"))\n}\n\nfunc main() {\n    http.Handle(\"/metrics\", promhttp.Handler())\n    http.HandleFunc(\"/\", handler)\n    http.ListenAndServe(\":8080\", nil)\n}"
        }
      },
      {
        "title": "6. Collector Registry",
        "content": "**Definition:** The collector registry is the central location of all collectors and metrics in an application.\n\n**Usage:**\n\n- **Registration:** All the metrics have to be registered at the registry before they are collected.\n- **Default Registry:** It is worth noting that the majority of client libraries have a default global registry to manage metrics.\n- **Custom Registry:** Not only can users create specific custom registries for metrics they want to exclude or for more detailed results.**Example (Go):**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 6. Collector Registry",
          "snippet": "var customRegistry = prometheus.NewRegistry()\ncustomRegistry.MustRegister(customMetric)\nhttp.Handle(\"/metrics\", promhttp.HandlerFor(customRegistry, promhttp.HandlerOpts{}))"
        }
      },
      {
        "title": "1. Counters:",
        "content": "- **Use Case:** Best used for cases where the metric can only go up, such as the number of requests processed or the number of errors found.\n- **Characteristics:** Increasing only; its value can only be set at this initial value again when the application is off or closed.**Example (Go):**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Counters:",
          "snippet": "var errors = prometheus.NewCounter(prometheus.CounterOpts{\n    Name: \"errors_total\",\n    Help: \"Total number of errors.\",\n})"
        }
      },
      {
        "title": "2. Gauges:",
        "content": "- **Use Case: **Best for values that can change, for example, current memory usage or the number of active sessions.\n- **Characteristics: **May be increased or decreased.**Example (Go):**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Gauges:",
          "snippet": "var temperature = prometheus.NewGauge(prometheus.GaugeOpts{\n    Name: \"current_temperature\",\n    Help: \"Current temperature in Celsius.\",\n})\ntemperature.Set(25.5)"
        }
      },
      {
        "title": "3. Histograms:",
        "content": "- **Use Case:** Applied to track and classify patterns in values, like requests’ latencies, or response sizes.\n- **Characteristics:** Histograms take observations, tally them by an interval, hold a cumulative count, and sum measurements used in calculating averages.**Example (Go):**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Histograms:",
          "snippet": "var requestDuration = prometheus.NewHistogram(prometheus.HistogramOpts{\n    Name:    \"http_request_duration_seconds\",\n    Help:    \"Request duration in seconds.\",\n    Buckets: prometheus.DefBuckets,\n})"
        }
      },
      {
        "title": "4. Summaries:",
        "content": "- **Use Case:** Quantile estimates of observed values, like median, 90th percentile, can be obtained. It's applicable in the context such as latency or request size distributions.\n- **Characteristics:** Quantile calculation has configurable objectives.**Example (Go):**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Summaries:",
          "snippet": "var requestLatencies = prometheus.NewSummary(prometheus.SummaryOpts{\n    Name:       \"request_latencies_seconds\",\n    Help:       \"Request latency in seconds.\",\n    Objectives: map[float64]float64{0.5: 0.05, 0.9: 0.01, 0.99: 0.001},\n})"
        }
      },
      {
        "title": "11. Step 1: Setting Up Prometheus",
        "content": "- Visit the Prometheus download page and download suitable file as per the operating system used. Prometheus **Extract Prometheus**\n\n**Note:** All these commands are being run on Powershell. Users can also go for GitBash, Command Line Terminal.\n\ntar -xvf prometheus-2.31.1.windows-amd64.tar.gz\n\nPrometheus Navigate to the Extracted Directory\n\nRun Prometheus with default settings\n\nAccess Prometheus Web Interface\n\nOpen your web browser and go to http://localhost:9090.\n\nPrometheus Prometheus will start running on http://localhost:9090.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 11. Step 1: Setting Up Prometheus",
          "snippet": "cd $HOME\\Downloads\\prometheus-2.31.1.windows-amd64"
        }
      },
      {
        "title": "12. Step 2: Installation Guide: Node Exporter",
        "content": "Node Exporter download page, download the Node Exporter binary.\n\nPrometheus To collect system metrics, extract and run the Node Exporter.\n\n**Running Node Exporter**\n\nNode Exporter will run on http://localhost:9100/metrics.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Step 2: Installation Guide: Node Exporter",
          "snippet": "tar -xvf node_exporter-*.tar.gz"
        }
      },
      {
        "title": "1. Maintain Uniform Naming",
        "content": "**Standard:** Adopt snake_case concerning metric denominations and labels. This augments readability and uniformity among various metrics.\n\n**Illustrations:**\n\n- **Metric denominations:** http_requests_total, memory_usage_bytes.\n- **Label denominations:** job, instance, method, status_code."
      },
      {
        "title": "2. Exploit Labels",
        "content": "- **Advisories:** Employ labels to introduce dimensions to metrics, whilst circumventing high cardinality. Elevated cardinality (for instance, unique user identifiers) may induce performance and storage complications.**Example (Go):**",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Exploit Labels",
          "snippet": "http_requests_total{method=\"GET\", status_code=\"200\"}"
        }
      },
      {
        "title": "3. Monitor Performance",
        "content": "**Commence:** Undertake regular supervision of the Prometheus server's operational performance and the consumption of resources.\n\n**Metrics to Observe:**\n\n- **- prometheus_tsdb_head_series:** Quantity of active time series.\n- **- prometheus_tsdb_head_chunks:** Count of in-memory chunks.\n- **- prometheus_http_requests_total:** Number of HTTP requests directed at the Prometheus server.**Alert Mechanisms:** Implement alert systems for essential performance metrics to facilitate prompt reactions to emergent issues."
      },
      {
        "title": "4. Constrain Metric Volume",
        "content": "- **Avoidance:** Refrain from high cardinality metrics and an overabundance of metrics to deter performance decline and excessive usage of storage.\n- **Guidance:** Where feasible, amalgamate like metrics and prioritize essential performance indicators.\n- **Illustration:** Employ sum or avg aggregations to lessen the detailedness of the collected data."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Prometheus Collector Registry & Metric Types",
      "initialCode": "package main\n\nimport (\n    \"github.com/prometheus/client_golang/prometheus\"\n    \"github.com/prometheus/client_golang/prometheus/promhttp\"\n    \"net/http\"\n)\n\nvar (\n    requestsTotal = prometheus.NewCounter(prometheus.CounterOpts{\n        Name: \"http_requests_total\",\n        Help: \"Total number of HTTP requests.\",\n    })\n    requestDuration = prometheus.NewHistogram(prometheus.HistogramOpts{\n        Name:    \"http_request_duration_seconds\",\n        Help:    \"Duration of HTTP requests in seconds.\",\n        Buckets: prometheus.DefBuckets,\n    })\n)\n\nfunc init() {\n    prometheus.MustRegister(requestsTotal)\n    prometheus.MustRegister(requestDuration)\n}\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n    timer := prometheus.NewTimer(requestDuration)\n    defer timer.ObserveDuration()\n\n    requestsTotal.Inc()\n    w.Write([]byte(\"Hello, World!\"))\n}\n\nfunc main() {\n    http.Handle(\"/metrics\", promhttp.Handler())\n    http.HandleFunc(\"/\", handler)\n    http.ListenAndServe(\":8080\", nil)\n}",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Prometheus Collector Registry & Metric Types",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Prometheus Collector Registry & Metric Types in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Prometheus Collector Registry & Metric Types",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Prometheus Collector Registry & Metric Types enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-prometheus-blackbox": {
    "id": "devops-prometheus-blackbox",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Endpoint Probing with Prometheus Blackbox Exporter",
    "subtitle": "Complete DevOps engineering guide to Endpoint Probing with Prometheus Blackbox Exporter — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Prometheus Blackbox Exporter is a versatile monitoring tool that checks endpoints over multiple network protocols.\n\n- It monitors the availability and operational status of services from an external perspective, making it a key part of the observability pyramid\n- Designed to test the availability and responsiveness of endpoints across different network protocols\n- Supports probing via HTTP/HTTPS, TCP, ICMP (Ping), and DNS\n- Enables teams to detect outages, network failures, certificate issues, and slow response times before users are impacted\n- Provides external endpoint monitoring to ensure services are accessible and performing as expected",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Endpoint Probing with Prometheus Blackbox Exporter."
        }
      },
      {
        "title": "2. Blackbox Exporter Working",
        "content": "Unlike traditional exporters that expose internal metrics, the Blackbox Exporter actively tests endpoints.\n\n**Step-by-step process:**\n\n- Prometheus sends a request to the `/probe` endpoint.\n- The Blackbox Exporter executes a configured module.\n- The module probes the target (e.g., website or API).\n- Metrics are returned to Prometheus.\n- Prometheus stores and evaluates the results.Blackbox Exporter Working"
      },
      {
        "title": "3. Module",
        "content": "A module defines how a probe should be executed. Each module specifies timeouts, protocols, and validation rules.\nExamples include:\n\n- `http_2xx` → verifies successful HTTP responses\n- `icmp` → checks network reachability\n- `tcp_connect` → validates port accessibility"
      },
      {
        "title": "4. Probe",
        "content": "A probe is a test or check functionality carried out by the Blackbox Exporter to gather metrics from a specified endpoint. These checks can be initiated using different protocols, like HTTP, HTTPS, TCP, DNS, ICMP, and so on\n\n- Response time\n- Status codes\n- SSL validity\n- Packet loss"
      },
      {
        "title": "5. Target",
        "content": "The endpoint being monitored — such as a website, API, load balancer, or DNS server.\nIt can be:\n\n- A website → `https://google.com`\n- An API → `https://api.myapp.com/health`\n- A TCP service → `db:5432`\n- A server → `192.168.1.10`"
      },
      {
        "title": "6. Primary Terminologies",
        "content": "- **Prometheus:** Prometheus is an open-source system and alerting toolkit developed initially at SoundCloud. It scrapes and stores metrics as time-series data and offers a query language (PromQL) for obtaining those metrics.\n- **Exporter:** An exporter is software that pulls out metrics from a certain system and presents the same in a form that Prometheus can grasp. Exporters are useful in collecting data from third-party systems.\n- **Blackbox Exporter:** The Blackbox Exporter is a Prometheus exporter that runs probes towards the endpoints to collect metrics related to availability, latency, and performance over different protocols.\n- **Metrics: **Metrics are the fundamental data gathered through Prometheus. They often take the form of simple numerical figures that express different characterization of system performance, including response time, errors, and system’s throughput."
      },
      {
        "title": "1. Installation and Setup",
        "content": "**Prerequisites:**\n\n- A working Prometheus server.\n- Docker installed on the monitoring server (may not be necessary but much simpler for ease of deployment).**Installation using Docker**\n\nTo deploy the Blackbox Exporter using Docker, you can use the following command:\n\n**Manual Installation**: If you prefer a manual setup, go to the GitHub repository and download the latest version where you will find steps to install and run the exporter.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 1. Installation and Setup",
          "snippet": "docker run -d \\  --name=blackbox_exporter \\  -p 9115:9115 \\  prom/blackbox-exporter"
        }
      },
      {
        "title": "2. Configuration",
        "content": "The Blackbox Exporter requires a configuration file to define the probes. Create a blackbox.yml file with the following content:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 2. Configuration",
          "snippet": "modules:  http_2xx:    prober: http    timeout: 5s    http:      valid_http_versions: [\"HTTP/1.1\", \"HTTP/2\"]      valid_status_codes: []  # Defaults to 2xx      method: GET      no_follow_redirects: false"
        }
      },
      {
        "title": "3. Integrating with Prometheus",
        "content": "Update your Prometheus configuration (prometheus.yml) to scrape metrics from the Blackbox Exporter:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Integrating with Prometheus",
          "snippet": "scrape_configs:  - job_name: 'blackbox'    metrics_path: /probe    params:      module: [http_2xx]  # Module defined in blackbox.yml    static_configs:      - targets:        - http://example.com/    relabel_configs:      - source_labels: [__address__]        target_label: __param_target      - source_labels: [__param_target]        target_label: instance      - target_label: __address__        replacement: 127.0.0.1:9115  # Blackbox exporter address"
        }
      },
      {
        "title": "4. Running the Blackbox Exporter",
        "content": "Start the Blackbox Exporter using the configuration file:\n\nEnsure it is running correctly by accessing http://localhost:9115/probe?target=http://example.com/&module=http_2xx in your browser. You should see metrics related to the probe.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 4. Running the Blackbox Exporter",
          "snippet": "./blackbox_exporter --config.file=blackbox.yml"
        }
      },
      {
        "title": "11. Installing the Blackbox Exporter for Prometheus",
        "content": "To get started, you'll need to download the latest version of the Blackbox exporter for Prometheus."
      },
      {
        "title": "12. Downloading the Blackbox Exporter",
        "content": "**Step 1:** Go to the Prometheus downloads page.\n\nPrometheus downloads page**Step 2:** Filter the results by selecting Linux as the operating system.\n\n**Step 3:** Scroll down to find the Blackbox exporter executable, located just below the Alert Manager section.\n\n**Step 4:** At the time of this tutorial, the Blackbox exporter is at version 0.14.0. Click on the archive to download it. Alternatively, if you prefer using wget, copy the link and execute the following command:\n\n**Step 5:** Once the archive is downloaded, extract it with:\n\nExtracting archive**Step 6:** The extracted archive will contain:\n\n- **blackbox_exporter:** The executable for the Blackbox exporter.\n- **blackbox.yml:** The configuration file for the Blackbox exporter.**Step 7:** For documentation on the blackbox_exporter executable, run:\n\ndocumentation",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 12. Downloading the Blackbox Exporter",
          "snippet": "$ wget https://release-assets.githubusercontent.com/github-production-release-asset/41964498/0723b780-4739-11e9-9689-d107558ef9aa?sp=r&sv=2018-11-09&sr=b&spr=https&se=2025-07-23T13%3A01%3A42Z&rscd=attachment%3B+filename%3Dblackbox_exporter-0.14.0.linux-amd64.tar.gz&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2025-07-23T12%3A00%3A43Z&ske=2025-07-23T13%3A01%3A42Z&sks=b&skv=2018-11-09&sig=uaQ0%2BxqE%2F1ohhmCIOJi5G0apE17KRm78qIYnBQWQdpI%3D&jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc1MzI3MzQ3NywibmJmIjoxNzUzMjczMTc3LCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.BVO1RZXbYGFWT0fBX8LaEo8kjmNgiPRJo6bEmjnw5ys&response-content-disposition=attachment%3B%20filename%3Dblackbox_exporter-0.14.0.linux-amd64.tar.gz&response-content-type=application%2Foctet-stream"
        }
      },
      {
        "title": "13. Creating a Service File for the Blackbox Exporter",
        "content": "As a system administrator, it's best practice to define service files for your executables rather than running them from your home directory.\n\n**Step 1:** Move the executable to a directory accessible to your user:\n\n**Step 2:** Create configuration folders for the Blackbox exporter:\n\n**Step 3:** Create a user account for the Blackbox exporter:\n\n**Step 4:** Set ownership and permissions:\n\n**Step 5:** Create the service file:\n\n**Step 6:** Edit the service file:\n\nPaste the following content:\n\n**Step 7:** Enable and start the service:\n\n**Step 8:** Verify that the service is running:\n\nlocalhost",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 13. Creating a Service File for the Blackbox Exporter",
          "snippet": "$ sudo mv blackbox_exporter /usr/local/bin"
        }
      },
      {
        "title": "14. Binding the Blackbox Exporter with Prometheus",
        "content": "To bind the Blackbox exporter with Prometheus, add it as a scrape target in the Prometheus configuration file:\n\n**Step 1:** Edit the Prometheus configuration file located at /etc/prometheus/prometheus.yml:\n\n**Step 2:** Add the Blackbox exporter as a scrape target:\n\n**Step 3: **Reload the Prometheus configuration by sending a SIGHUP signal to the Prometheus process:\n\nIdentify the PID and send the signal:\n\nTargets**Step 4: **Verify that Prometheus is scraping the Blackbox exporter by checking the target configuration at http://localhost:9090/targets.",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 14. Binding the Blackbox Exporter with Prometheus",
          "snippet": "$ sudo nano /etc/prometheus/prometheus.yml"
        }
      },
      {
        "title": "15. Monitoring HTTPS Endpoints with the Blackbox Exporter",
        "content": "**Step 1:** Edit the Blackbox configuration file to create a module for monitoring HTTPS endpoints:\n\n**Step 2:** Check the configuration file for correctness:\n\nconfig.check**Step 3: **Reload the Blackbox exporter configuration by sending a SIGHUP signal:\n\nIdentify the PID and send the signal:\n\n**Step 4: **Bind the Blackbox Exporter module in Prometheus by editing the configuration file:\n\n**Step 5: **Reload the Prometheus configuration:\n\n**Step 6: **Verify the setup by checking the Prometheus graph endpoint with the following PromQL query:",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 15. Monitoring HTTPS Endpoints with the Blackbox Exporter",
          "snippet": "modules:  http_prometheus:    prober: http    timeout: 5s    http:      valid_http_versions: [\"HTTP/1.1\", \"HTTP/2\"]      method: GET      fail_if_ssl: false      fail_if_not_ssl: true      tls_config:        insecure_skip_verify: true      basic_auth:        username: \"username\"        password: \"password\""
        }
      },
      {
        "title": "16. Visualizing HTTP Metrics on Grafana",
        "content": "**Step 1: **Install Grafana on your Linux host following the Grafana installation tutorial.\n\n**Step 2:** Import an existing Grafana dashboard:\n\n- Click on the “Plus” icon on the left menu, and select “Import”.\n- Enter the dashboard ID 7587 in the Grafana.com dashboard option.\n- Select Prometheus as the data source, and click “Import”.**Step 3: **Your dashboard should now be visible, showing metrics about your HTTPS endpoints, including status, SSL status, expiry date, latencies, and DNS lookup times.\n\ndashboardCongratulations! You have successfully installed the Blackbox Exporter with Prometheus, and you have visualized your metrics on Grafana."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Endpoint Probing with Prometheus Blackbox Exporter",
      "initialCode": "docker run -d \\  --name=blackbox_exporter \\  -p 9115:9115 \\  prom/blackbox-exporter",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Endpoint Probing with Prometheus Blackbox Exporter",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Endpoint Probing with Prometheus Blackbox Exporter in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Endpoint Probing with Prometheus Blackbox Exporter",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Endpoint Probing with Prometheus Blackbox Exporter enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-grafana-intro": {
    "id": "devops-grafana-intro",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "What is Grafana? Dashboards, Panels & Data Sources",
    "subtitle": "Complete DevOps engineering guide to What is Grafana? Dashboards, Panels & Data Sources — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Grafana is an open-source observability platform that visualizes real-time data from multiple external sources without storing it. It acts as a bridge between telemetry and monitoring workflows, helping teams understand system performance and respond faster to incidents.\n\n- Connects with tools like Prometheus, Elasticsearch, and MySQL for unified data visualization.\n- Offers interactive dashboards, alerting, plugins, and RBAC for secure and scalable monitoring.\n- Commonly paired with Prometheus to track infrastructure health, latency, and anomalies.\n- Supports diverse use cases including infrastructure, application performance, business metrics, and cloud monitoring.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for What is Grafana? Dashboards, Panels & Data Sources."
        }
      },
      {
        "title": "2. Grafana Working & Architecture Flow",
        "content": "Grafana acts as a visualization layer between your data sources and your monitoring workflows.\n\nGrafana Working\n- Data is collected by monitoring tools (e.g., Prometheus).\n- Grafana queries these sources in real time.\n- Results are displayed through dashboards.\n- Alerts are triggered when thresholds are exceeded.Grafana also integrates seamlessly with:\n\n- **Metrics:** Prometheus, InfluxDB\n- **Logs:** Loki, Elasticsearch\n- **Traces:** Tempo, JaegerThis unified approach provides complete visibility across your systems."
      },
      {
        "title": "3. Interactive Dashboards & Customizable Visualizations",
        "content": "- Grafana enables users to build interactive, real-time dashboards for monitoring data.\n- Grafana offers a wide range of visualization options, from simple line graphs to advanced charts like heatmaps, histograms, pie charts, and gauges.\n- Each visualization is highly customizable with settings such as color schemes, axes, legends, and queries.\n- The drag-and-drop interface makes dashboards easy to organize and customize.\n- Users can add, remove, and rearrange panels, allowing dashboards to adapt as data needs evolve."
      },
      {
        "title": "4. Support for Multiple Data Sources",
        "content": "- Grafana supports multiple data sources, offering flexibility in how data is collected and visualized.\n- It integrates with popular time-series databases like Prometheus, InfluxDB, and Graphite.\n- Grafana also connects to relational databases such as MySQL, PostgreSQL, and SQL Server.\n- It works with tools like Elasticsearch and AWS CloudWatch, enabling teams to unify data from multiple systems into a single monitoring interface."
      },
      {
        "title": "5. Alerting and Notifications",
        "content": "- Grafana’s alerting feature helps users actively monitor systems by triggering notifications based on defined thresholds.\n- Alerts can be set on any dashboard panel to warn teams when metrics cross configured limits.\n- It is particularly valuable for monitoring critical infrastructure and preventing outages.\n- Notifications can be sent through channels like email, Slack, or Microsoft Teams for quick response."
      },
      {
        "title": "6. Plugins and Extensibility",
        "content": "- Grafana supports numerous plugins that add new data sources, visualization types, and third-party integrations.\n- It can connect with external systems like Jira, PagerDuty, and Google Cloud Monitoring to enhance monitoring and incident management.\n- The plugin ecosystem allows users to expand functionality based on their operational needs.\n- Users can build custom panels, dashboards, and apps tailored to specific business requirements."
      },
      {
        "title": "7. Setting Up Grafana",
        "content": "**Install Grafana: **\n\n- Begin by installing Grafana on your system to enable monitoring and visualization capabilities.\n- Grafana offers installation packages for Linux, macOS, and Windows, allowing flexibility across different environments.\n- You can install it either through package managers or by downloading it directly from the official Grafana website, depending on your operating system.**Start and Enable Grafana: **\n\n- Once the installation is complete, you can start Grafana as a service on your system.\n- Running it as a service ensures that Grafana operates continuously in the background.\n- It also enables Grafana to start automatically whenever your system boots up.**Access Grafana Web Interface: **\n\n- By default, Grafana runs on port 3000 after the initial setup.\n- Open a web browser and visit the default URL to access the Grafana web interface.\n- Log in using the default credentials, after which you will be prompted to change your password.**Add Data Sources:**\n\n- After logging in, you need to add data sources to Grafana to begin visualizing metrics.\n- Grafana supports multiple data sources such as Prometheus, MySQL, and PostgreSQL, along with many other integrations.\n- Navigate to the settings section to add and configure a data source by providing details like the server address and login credentials.**Create Your First Dashboard: **\n\n- After connecting your data sources, you can start designing dashboards within Grafana.\n- Grafana’s interface makes it easy to create dashboards and visualize your data effectively.\n- Add panels to monitor different metrics, choosing from visualization options such as graphs, tables, and heatmaps.**Set Up Alerts:**\n\n- Grafana enables users to set up alerts to monitor specific conditions.\n- Alerts trigger notifications when defined metrics exceed or fall below specified threshold values.\n- You can create alert rules within the panel settings and configure notification channels to receive alerts.**Secure Grafana:**\n\n- Securing Grafana is essential for maintaining a safe deployment environment.\n- Enable HTTPS to encrypt data in transit and protect sensitive information.\n- Implement authentication methods such as LDAP or OAuth, and configure Role-Based Access Control (RBAC) to limit access to data and features."
      },
      {
        "title": "8. Grafana Management Solutions",
        "content": "Grafana offers different management solutions to cater to the diverse requirements of businesses, from small startups to large enterprises. These options provide flexibility, scalability, and control over how organizations monitor and manage their data. The primary management solutions offered are:"
      },
      {
        "title": "1 . Grafana Cloud",
        "content": "Grafana Cloud** **provides comprehensive monitoring capabilities which unite Grafana data visualization with strong full-stack monitoring performance. The platform perfectly connects with major data sources including Prometheus, Loki and Graphite to present businesses with a complete picture of their metrics and logs."
      },
      {
        "title": "2. Grafana Enterprise Stack",
        "content": "For organizations that prefer handling their observability setup on their own infrastructure **Grafana Enterprise Stack** provides complete control and high-performance capabilities. Some standout features include:\n\n- **Enterprise Log Management:** Secure and scalable log analysis for advanced log indexing.\n- **Enterprise Metric Handling: ** Self-managed scalable Prometheus-based service for storing and processing metrics.\n- **Enterprise Tracing: **With the tracing system, you maintain full control over tracing operations that link logs and metrics with traces to analyze system behavior in depth. The Enterprise Stack is ideal for teams who need to preserve their infrastructure while using Grafana’s advanced monitoring features."
      },
      {
        "title": "3. Grafana OnCall",
        "content": "**Grafana OnCall** represents a strong solution to manage which team member handles particular incidents at what time. The system was created to decrease manual workload through the automation of routine tasks such as schedule generation, escalation processes and notification distribution."
      },
      {
        "title": "12. Common Use Cases",
        "content": "Grafana is widely used across industries for various purposes due to its flexibility, scalability, and powerful visualization capabilities. Here are some of the most common use cases:"
      },
      {
        "title": "1. Infrastructure Monitoring",
        "content": "- Grafana serves as a powerful visualization tool for monitoring infrastructure health and performance.\n- It enables teams to view real-time metrics from servers, networks, and cloud services.\n- This helps track critical parameters such as system uptime, CPU usage, memory consumption, and network traffic."
      },
      {
        "title": "2. Application Performance Monitoring (APM)",
        "content": "- Developers and DevOps teams use Grafana to monitor application performance effectively.\n- By integrating data sources like Prometheus or Elasticsearch, Grafana can visualize metrics such as response times, error rates, and application throughput.\n- This helps ensure applications run smoothly and allows teams to quickly identify and resolve performance issues that could impact end users."
      },
      {
        "title": "3. Business Metrics Tracking",
        "content": "- Grafana is a valuable tool for tracking business metrics and key performance indicators (KPIs).\n- It can monitor data such as sales, website traffic, and customer interactions.\n- With the ability to visualize data from multiple sources like SQL databases and cloud services, Grafana helps organizations assess business health and make data-driven decisions in real time."
      },
      {
        "title": "4. Log and Event Monitoring",
        "content": "- Grafana can be integrated with tools like Loki and Elasticsearch to centralize log management and event monitoring.\n- Visualizing logs alongside system metrics provides a comprehensive view of your environment.\n- This capability is especially helpful for troubleshooting, system monitoring, and managing security events."
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: What is Grafana? Dashboards, Panels & Data Sources",
      "initialCode": "# What is Grafana? Dashboards, Panels & Data Sources\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: What is Grafana? Dashboards, Panels & Data Sources",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of What is Grafana? Dashboards, Panels & Data Sources in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via What is Grafana? Dashboards, Panels & Data Sources",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "What is Grafana? Dashboards, Panels & Data Sources enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-grafana-k8s": {
    "id": "devops-grafana-k8s",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "Visualizing Kubernetes Cluster Metrics with Grafana",
    "subtitle": "Complete DevOps engineering guide to Visualizing Kubernetes Cluster Metrics with Grafana — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Grafana is an open-source monitoring tool that enables users to create custom dashboards and visualizations.\n\n- Allows real-time analysis of metrics and logs for comprehensive monitoring insights\n- Ideal for monitoring Kubernetes clusters to ensure applications run in a healthy state with good performance\n- Enables observation of Kubernetes cluster health through customizable dashboards and visualizations\n- Essential for ensuring application health and performance in containerized environments\n- Provides flexible monitoring capabilities tailored to specific infrastructure and application needs",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Visualizing Kubernetes Cluster Metrics with Grafana."
        }
      },
      {
        "title": "2. Prerequisites",
        "content": "The following installation should be done before moving to the next section :\n\n- Docker\n- Kind\n- Kubernetes CLI(kubectl)"
      },
      {
        "title": "3. Visualization of Metrics using Grafana",
        "content": "**Step 1:** Create Kubernetes Cluster\n\nThe first step is to create a Kubernetes cluster . kind is recommended for creating a Kubernetes cluster because it supports multiple nodes on local machine. Start docker and use the configuration file provided below to create the cluster.\n\n**1. Configure YAML**\n\nconfig.yaml\n\nCreate the kubernetes cluster using the below command .\n\n**\n\n2 Deploy and autoscale an application on the Kubernetes cluster**\n\nAfter creating the cluster follow the below yaml files to deploy and autoscale an application on the Kubernetes cluster.\n\ndeployment.yaml\n\n**3) Download the metrics server**\n\nDownload the metrics server yaml file\n\nThen after downloading the components.yaml , under the section container add this command part (line number 140 in components.yaml):\n\nCreate the metric server using the command below\n\n**4) Create a service to connect the deployment**\n\nservice.yaml\n\nCreate a service to connect the deployment from the localhost.\n\n**\n\nAfter service is created you can access the website at http://localhost:80/ .\n\n5) Create a horizontal pod autoscaler **\n\nhpa.yaml\n\nCreate a horizontal pod autoscaler (this will scale up or scale down the number of pods on the user traffic)\n\n**\n\n- You can see the number of pods running using this command : kubectl get pods\n- Check the services running using this command : kubectl get svc\n- Check the whether metric-server is running or not using this command : kubectl get pods -n kube-system\n- Check hpa using this command : kubectl get hpa Step 2: **Setup Prometheus and Grafana on the cluster\n\nThe second step is to setup Prometheus and Grafana on the cluster .\n\nThe following commands will setup Prometheus server on the cluster.\n\nThe following commands will setup Grafana server on the cluster.\n\n**\n\nAfter installing Grafana, a command will be available in the terminal to obtain the Grafana server password.\n\nStep 3: **Connect the Prometheus server and Grafana server\n\nThe third step is to connect the Prometheus server and Grafana server . Use different terminals to write the below commands .Start the Prometheus server at port 9090 in localhost.\n\nStart the Grafana server at port 3000 in localhost.(to login into your Grafana you will require the password obtained in step 2)\n\nAccess the Grafana server at http://localhost:3000\n\n**Step 4: **Integrate the Prometheus server and Grafana server\n\nThe fourth step is to integrate the Prometheus server and Grafana server. Begin by logging into the Grafana server. You c",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 3. Visualization of Metrics using Grafana",
          "snippet": "kind: Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nnodes:\n- role: control-plane\n  extraPortMappings:\n  - containerPort: 32215\n    hostPort: 80\n- role: worker\n- role: worker"
        }
      },
      {
        "title": "4. Dashboard ID for pod overview",
        "content": "Here you can observe the number of pods running in the default namespace and also find out the number of nodes running in the cluster.\n\nTo monitor the Kubernetes cluster you can use this id : 6417 . To observe more pod details use this dashboard id : 15760\n\nComment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Visualizing Kubernetes Cluster Metrics with Grafana",
      "initialCode": "kind: Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nnodes:\n- role: control-plane\n  extraPortMappings:\n  - containerPort: 32215\n    hostPort: 80\n- role: worker\n- role: worker",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Visualizing Kubernetes Cluster Metrics with Grafana",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Visualizing Kubernetes Cluster Metrics with Grafana in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Visualizing Kubernetes Cluster Metrics with Grafana",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Visualizing Kubernetes Cluster Metrics with Grafana enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-helm-prom-grafana": {
    "id": "devops-helm-prom-grafana",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "14 min read",
    "level": "Advanced",
    "title": "Deploying Prometheus & Grafana on K8s Using Helm",
    "subtitle": "Complete DevOps engineering guide to Deploying Prometheus & Grafana on K8s Using Helm — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- HELM is a package manager for Kubernetes that simplifies the process of installing, configuring, upgrading, and managing applications on a Kubernetes cluster. It uses packages called Charts, which contain all the necessary Kubernetes configuration files needed to deploy an application.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Deploying Prometheus & Grafana on K8s Using Helm."
        }
      },
      {
        "title": "2. Prometheus",
        "content": "Prometheus is an open-source monitoring and alerting tool used to collect, store, query, and analyze metrics from applications, servers, and services. It is especially useful in cloud-native environments like Kubernetes.\n\n- Collects metrics such as CPU usage, memory usage, request rate, and response time to monitor the health and performance of applications and servers.\n- Can monitor Kubernetes clusters, nodes, pods, containers, and applications.\n- Uses PromQL (Prometheus Query Language) to query and analyze collected metrics.\n- Works with Alertmanager to send alerts and integrates with tools like Grafana for visualization and PagerDuty/Slack/Email for notifications.\n- Prometheus is free, open-source, and can work independently or with other monitoring too"
      },
      {
        "title": "3. Prometheus Architecture",
        "content": "Prometheus is a monitoring system that consists of the following components:\n\n- A main server that scrapes and stores time series data\n- A query language called PromQL is used to retrieve and analyze the data\n- A set of exporters that are used to collect metrics from various systems and applications\n- A set of alerting rules that can trigger notifications based on the data\n- An alert manager that handles the routing and suppression of alerts"
      },
      {
        "title": "4. Prometheus Server",
        "content": "- Data Storage: Prometheus stores collected metrics in a time-series database (TSDB), where data is stored with timestamps.\n- Web Interface & PromQL: It provides a web interface where you can use PromQL to query and analyze metrics.\n- Dashboards: You can create dashboards to visualize monitoring data.\n- Alerting: Prometheus uses alerting rules to detect problems and sends alerts through Alertmanager.\n- Flexible Architecture: Its modular design allows it to work with different tools like Grafana and other notification systems."
      },
      {
        "title": "5. Grafana",
        "content": "Grafana is an open-source monitoring and visualization tool used to create dashboards and display data and metrics in an easy-to-understand way. It is commonly used with Prometheus to visualize time-series data.\n\n- Displays metrics using graphs, charts, gauges, and tables.\n- Allows you to create and customize dashboards according to your needs.\n- Supports many data sources such as Prometheus, Elasticsearch, and InfluxDB.\n- Can create alerts and send notifications when specific conditions are met.\n- Supports plugins and integrations with tools like Slack and PagerDuty."
      },
      {
        "title": "6. Why Prometheus and Grafana?",
        "content": "- Prometheus and Grafana are commonly used together for monitoring and visualization.\n- Prometheus collects and stores metrics from applications, servers, and Kubernetes, while Grafana uses this data to create easy-to-understand dashboards, graphs, and charts.\n- Grafana can use PromQL to query data from Prometheus and can also provide alerts when problems occur.\n- Together, they provide a complete monitoring solution that helps you understand the performance and health of applications and infrastructure."
      },
      {
        "title": "7. Installation Steps",
        "content": "**Step 1: **Add Repositories. Add the following helm repositories by the commands below.\n\n**Step 2: **Update Helm Repositories. After we add the helm repositories, we have to update the helm repo by the following command.\n\n**Step 3:** Install Prometheus Kubernetes\n\n**Step 4: **Kubernetes Prometheus Port Forward\n\n**Step 5: **Log in to Grafana.\n\nOpen your browser and type localhost:3000. Since you are logging in for the first time, you will have to use a default username and password. However, you can create new users and update passwords later. Use the default credentials for now\n\n- **username:** admin\n- **password:** prom-operator **Step 6:** Open your dashboard to view and monitor the collected metrics.\n\nComment",
        "code": {
          "language": "bash",
          "caption": "DevOps Configuration / CLI — 7. Installation Steps",
          "snippet": "$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts/"
        }
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Deploying Prometheus & Grafana on K8s Using Helm",
      "initialCode": "$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts/",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Deploying Prometheus & Grafana on K8s Using Helm",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Deploying Prometheus & Grafana on K8s Using Helm in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Deploying Prometheus & Grafana on K8s Using Helm",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Deploying Prometheus & Grafana on K8s Using Helm enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  },
  "devops-aws-ecs": {
    "id": "devops-aws-ecs",
    "badge": "Module 10 • DevOps & Cloud",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "Deploying & Managing Containers on AWS ECS",
    "subtitle": "Complete DevOps engineering guide to Deploying & Managing Containers on AWS ECS — architecture, configuration syntax, CLI commands, and production best practices.",
    "sections": [
      {
        "title": "1. Overview & Architecture",
        "content": "- Containers can be deployed for applications on the AWS cloud platform. AWS has a special application for managing containerized applications. Elastic Container Service (ECS) serves this purpose. ECS is AWS's container orchestration tool which simplifies the management of containers. All the container management processes are collectively handled by the container orchestration tools eliminating the need for separate management of clusters.\n\nECS can deploy your architecture on the AWS cloud platform. Docker containers can be deployed on AWS through ECS providing the containerized environment for containers. AWS ECS can effectively be used to 'Deploy and Manage Containerized Applications'. In this blog, we will learn about the different ways to use ECS to deploy and manage containerized applications.",
        "callout": {
          "type": "info",
          "title": "DevOps & Cloud Engineering",
          "message": "Production concepts, architecture, and automation patterns for Deploying & Managing Containers on AWS ECS."
        }
      },
      {
        "title": "2. ECS (Elastic Container Service)",
        "content": "When tasks are made a part of ecs service then additional operations can be performed on the ecs service tasks. Listed below are some of the operations which can be performed on ecs service:\n\n- **Update a service: **ECS service can be updated for new configurations using the 'Update Service' button available on the aws ECS console.\n- **Scale a service**: ECS service comes with the ability to scale up resources. Scaling activities are performed to make sure that the infrastructure is available as per application needs.\n- **Rollback a service: **ECS service has the feature to roll back service to previous revisions. This is done especially when the new service version of the application is not stable and the user wants to go back on the previous service version."
      },
      {
        "title": "3. How To Manage Containerized Applications On AWS ECS (Elastic Container Service) Deploy?",
        "content": "Below are the steps that can be followed to deploy containers on AWS ECS:"
      },
      {
        "title": "4. Step 1: Task Definition creation",
        "content": "The first step for using ECS includes to create an ECS Task Definition. While creating a task definition we will have options to create a task definition on EC2 or Fargate configurations.\n\nIf we chose to create an EC2 task definition type specify the application details with permissions, cpu, memory and other configurations which need to be given to your application. If the application listens on specific entry-points they also must be specified here in the task definition."
      },
      {
        "title": "5. Step 2: Using the ECS Task definition",
        "content": "Once the task definition is created. The instantiation of the tasks can be performed directly with the task being made to run directly. The task can also be made to run as a part of am ecs service in the ecs cluster."
      },
      {
        "title": "6. Step 3: Application Running and Testing",
        "content": "Wait on the above steps till the task comes into running state. You can also test the deployed application runs fine as per the settings of application given for the ecs tasks."
      },
      {
        "title": "7. Significance of ECS (Elastic Container Service)",
        "content": "ECS holds significance in the containerised world. Below are the advantages of ECS listed:\n\n- ECS helps allocate resources for the deploying applications\n- Helps managing scaling infrastructure\n- ECS is en easy and handy tool for infrastructure management"
      },
      {
        "title": "8. Best practices for using AWS ECS (Elastic Container Service)",
        "content": "Below listed are the best Practices for using ecs :\n\n- Right infrastructure choice should be made for deploying and managing containerized applications.\n- Proper care should be taken while making deployments of containerized applications.\n- Containerized applications should be tested for their use and compatibilty on aws ecs.Comment"
      }
    ],
    "playground": {
      "title": "DevOps & Cloud Lab: Deploying & Managing Containers on AWS ECS",
      "initialCode": "# Deploying & Managing Containers on AWS ECS\n# DevOps CLI & Configuration Lab\n\ndocker --version\nkubectl version --client\nterraform -version",
      "expectedOutput": [
        "devops@cloud-cluster:~$ # Topic: Deploying & Managing Containers on AWS ECS",
        "[INFO] Validating configuration and cluster state...",
        "[OK] Pipeline / Infrastructure step completed (exit code 0)."
      ],
      "language": "bash",
      "engineBadge": "Docker • K8s • Terraform CLI"
    },
    "quiz": {
      "question": "What is the primary operational benefit of Deploying & Managing Containers on AWS ECS in a DevOps workflow?",
      "options": [
        "Replacing all network protocols with manual USB file transfers",
        "Automating, scaling, or standardizing software delivery and infrastructure via Deploying & Managing Containers on AWS ECS",
        "Preventing version control systems from tracking source code changes",
        "Running single-threaded desktop applications without monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Deploying & Managing Containers on AWS ECS enables reliable, repeatable, and scalable infrastructure, deployment, or observability in modern DevOps engineering."
    }
  }
};
