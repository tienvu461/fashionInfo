# fashionInfo
Fashion website &amp; forum

# Git rules
## Git flow
![](Gitflow.png)

## How to create branch
```
# create local feature branch from branch release_v.0.0.1
git checkout -b feature/photo_UI origin/release_v.0.0.1
# push local branch to github
git push origin feature/photo_UI
```

## How to push code to github
```
# check current working branch
git status
On branch feature/photo_UI
Your branch is up to date with 'origin/feature/photo_UI'.
# push local commit to remote branch on github
git push origin feature/photo_UI
```


# I. How to run Docker with dev environment
## 1. Requirement:
    - Docker version 20.10.5, build 55c4c88
    - docker-compose version 1.28.5, build c4eb3a1f

- Allow action: `build` `down` `prune` `logs` `restart` `start` `stop` `up` `deploy` `ps` `exec`
- Allow env: `dev` `prd`
- Allow compoment: `front` `backend` `mysql` 
- Show help:

```
./docker.sh -h
```
## 2. Build images

```
./docker.sh -e dev -a build
```

## 3. Run container
- Front:

```
./docker.sh -e dev -c front -a up

# Check logs
./docker.sh -e dev -c front -a logs
```

- Backend:

```
./docker.sh -e dev -c backend -a up

# Check logs
./docker.sh -e dev -c backend -a logs
```

# II. More options
## 1. Build images
- Build all images

```
./docker.sh -e dev -a build
```

- Build each image

```
./docker.sh -e dev -a build -c [component]

    Allow compoment: `front` `backend` `mysql` 
```

- Build all images no cache

```
./docker.sh -e dev -a build -o --no-cache
```

- Build each image no cache

```
./docker.sh -e dev -a build -c [component] -o --no-cache

    Allow compoment: `front` `backend` `mysql` 
```

- Build multiple images

```
./docker.sh -e dev -a build -c [component_1] -c [component_2] -c [component_3]
   
    Allow compoment: `front` `backend` `mysql` 
```

## 2. Run container
- Run all containers

```
./docker.sh -e dev -a up
```

- Run each container

```
./docker.sh -e dev -a up -c [component]

    Allow compoment: `front` `backend` `mysql` 
```

- Run multiple containers

```
./docker.sh -e dev -a up -c [component] -c [component_2] -c [component_3]

    Allow compoment: `front` `backend` `mysql` 
```

## 3. Tail logs

```
./docker.sh -e dev -a logs -c [component]
```

## 4. Stop container
- Stop all containers

```
./docker.sh -e dev -a stop
```

- Stop each container

```
./docker.sh -e dev -a stop -c [component]

```

- Stop multiple containers

```
./docker.sh -e stop -a up -c [component] -c [component_2] -c [component_3]
``` 

## 5. Execution container
```
./docker.sh -e dev -a exec -c [component] -o [optional]

    Allow component: `front` `backend` `mysql` 
    Allow optional: `sh`, `bash`

    Example: ./docker.sh -e dev -a exec -c api -o sh
```

## 6. Populate db
```
docker exec -i -u fashio_info fashion-info_postgresql_1 pg_restore -C -d fashio_info_db < init_psql.dump
cat init_psql.sql | docker exec -i info_postgresql_1 psql -U fashio_info

```

## 6. Backup db
```
docker exec -u fashion_info fashion-info_postgresql_1 pg_dump -Fc fasion_info_db
docker exec -t b1b873af3554 pg_dumpall -c -U fashion_info > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql

```


#####
Use alternative key
ssh-add ~/.ssh/personal_rsa
ssh-add -l
https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca/


INSERT INTO spirit_user_userprofile(slug,location,last_seen,last_ip,timezone,is_administrator,is_moderator,is_verified,topic_count,comment_count,user_id,last_post_hash,last_post_on,nickname,avatar,notify)
VALUES ('admin','',NOW(),'','UTC',true,true,false,0,0,1 ,'',NOW(),'admin','',1);