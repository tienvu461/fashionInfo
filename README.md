# fashion-info

# I. How to run Docker with local environment
## 1. Requirement:
    - Docker version 20.10.5, build 55c4c88
    - docker-compose version 1.28.5, build c4eb3a1f

- Allow action: `build` `down` `prune` `logs` `restart` `start` `stop` `up` `deploy` `ps` `exec`
- Allow env: `local` `dev` `stg` `prd`
- Allow compoment: `admin` `front` `backend` `mysql`
- Show help:

```
./docker.sh -h
```

## 2. Build images

```
./docker.sh -e local -a build
```

## 3. Run container
- Front:

```
./docker.sh -e local -c front -a up

# Check logs
./docker.sh -e local -c front -a logs
```

- Admin:

```
./docker.sh -e local -c admin -a up

# Check logs
./docker.sh -e local -c admin -a logs
```

- Backend:

```
./docker.sh -e local -c backend -a up

# Check logs
./docker.sh -e local -c backend -a logs
```

# II. More options
## 1. Build images
- Build all images

```
./docker.sh -e local -a build
```

- Build each image

```
./docker.sh -e local -a build -c [component]

    Allow compoment:`admin` `front` `backend` `mysql`
```

- Build all images no cache

```
./docker.sh -e local -a build -o --no-cache
```

- Build each image no cache

```
./docker.sh -e local -a build -c [component] -o --no-cache

    Allow compoment:`admin` `front` `backend` `mysql`
```

- Build multiple images

```
./docker.sh -e local -a build -c [component_1] -c [component_2] -c [component_3]
   
    Allow compoment:`admin` `front` `backend` `mysql`
```

## 2. Run container
- Run all containers

```
./docker.sh -e local -a up
```

- Run each container

```
./docker.sh -e local -a up -c [component]

    Allow compoment:`admin` `front` `backend` `mysql`
```

- Run multiple containers

```
./docker.sh -e local -a up -c [component] -c [component_2] -c [component_3]

    Allow compoment:`admin` `front` `backend` `mysql`
```

## 3. Tail logs

```
./docker.sh -e local -a logs -c [component]
```

## 4. Stop container
- Stop all containers

```
./docker.sh -e local -a stop
```

- Stop each container

```
./docker.sh -e local -a stop -c [component]

```

- Stop multiple containers

```
./docker.sh -e stop -a up -c [component] -c [component_2] -c [component_3]
``` 

## 5. Execution container
```
./docker.sh -e local -a exec -c [component] -o [optional]

    Allow component:`admin` `front` `backend` `mysql`
    Allow optional: `sh`, `bash`

    Example: ./docker.sh -e local -a exec -c api -o sh
```

## 6. Connect Database local
```
Host: 127.0.0.1
DB_Name: fashion_info_user
DB_User: fashion_info_user
DB_Password: fashion_info_user
```