#!/bin/bash
ENVs=("local" "dev" "prd")
COMPONENTs=("admin" "front" "backend" "mysql")
ACTIONs=("build" "down" "prune" "logs" "restart" "start" "stop" "up" "deploy" "ps" "login" "push" "tag" "exec" "ut")

function _help() {
    echo    "Usage:"
    echo    "   ./docker.sh  -e [value]  -c [value]  -a [value]  -o [optional]"
    echo    ""
    echo    "   -e [value]                                  Require. Set environment variable."
    echo    "   -c [value]                                  Require. Set component variable."
    echo    "   -a [value]                                  Require. Set action variable."
    echo    ""
    echo    "   Environment allow value :                   local, dev, stg, prd"
    echo    "   Component allow value   :                   base, api, admin, portal, fluentbit, proxy"
    echo    "   Action allow value      :                   build, down, prune, logs, restart, start, stop, up, login, tag, deploy, ps, push, exec"
    echo    ""
    echo    "   Run with multiple components:"
    echo    "       Usage:"
    echo    "           ./docker.sh  -e [value]  -c [value_1] -c [value_2]  -a [value]  -o [optional]"
    echo    ""
    echo    "Optional:"
    echo    "   --no-cache                                  Build no cache (allow with action: build)"
    echo    ""
    echo    "       Usage:"
    echo    "           ./docker.sh  -e [value]  -c [value]  -a [value]  -o --no-cache"
}

while getopts ":e:c:a:o:h" opt; do
    case $opt in
        e)
            ENVIRONMENT=$OPTARG
            if ! [[ "${ENVs[@]}" =~ "${ENVIRONMENT}" ]]; then _help; exit 1; fi
            source ./infrastructure/docker/config/${ENVIRONMENT}/config.sh
            ;;
        c)  
            components+=("$OPTARG")
            for component in "${components[@]}"; do
                if [[ -d "./infrastructure/docker/${component}/" ]]; then
                    _components+="$component "
                else
                    echo "Component invalid."
                fi
                # if [[ "${COMPONENTs[@]}" =~ "${component}" ]]; then
                #     _components+="$component "
                # else
                #     echo "Component invalid."
                # fi
            done
            ;;
        a)
            ACTION=$OPTARG
            if ! [[ "${ACTIONs[@]}" =~ "${ACTION}" ]]; then _help; exit 1; fi
            ;;
        o)  
            OPTION="$OPTARG"
            ;;
        h)
            _help
            exit 0
            ;;
        ?)
            echo "Option -$OPTARG requires an argument." >&2
            echo ""
            _help
            exit 1
            ;;
    esac
done

COMPONENTs_ARRAY=($(echo $_components | tr " " "\n"))

function docker_build() {
    local _component=$1
    local _option=$2
    if [[ $_component = "base" || $_component = "fluentbit" || $_component = "redis" || $_component = "mysql" ]]; then
            docker-compose -p ${PROJECT} build $_option $_component
    else
        docker-compose  -p ${PROJECT} build $_option \
                        --build-arg BASE_IMAGE_NAME=${BASE_IMAGE_NAME} \
                        --build-arg BASE_IMAGE_TAG=${BASE_IMAGE_TAG} \
                        --build-arg APP_ENV=${APP_ENV} \
                        $_component
    fi
}

function docker_up() {
    local _component=$1
    docker-compose -p ${PROJECT} up -d $_component
    docker_healthcheck ${_component}
}

function docker_restart() {
    local _component=$1
    docker-compose -p ${PROJECT} restart ${_component}
}

function docker_logs() {
    local _component=$1
    docker-compose -p ${PROJECT} logs -f $_component
}

function docker_tag() {
    # 10 chars in long hash commit
    # TAG=`git rev-parse --short=10 HEAD`
    local _component=$1
    docker tag ${PROJECT}-$_component ${ECR_URI}/${PROJECT}-${ENVIRONMENT}-$_component:latest
    docker tag ${PROJECT}-$_component ${ECR_URI}/${PROJECT}-${ENVIRONMENT}-$_component:${TAG}
}

function docker_login() {
    if [ $ENVIRONMENT = "local" ]; then 
        echo "Current environment is local. No need login ECR."
    else
        AWS_CLI_VERSION=$(aws --version)
        echo "AWS CLI version: ${AWS_CLI_VERSION}"
        echo "Login ECR"
        echo $(aws ecr get-login-password --region ${REGION})|docker login --username AWS --password-stdin ${ECR_URI}
        # if [[ "${AWS_CLI_VERSION}" =~ ^aws-cli\/1 ]]; then
        #     $(aws ecr get-login --no-include-email --region ${REGION})
        # elif [[ "${AWS_CLI_VERSION}" =~ ^aws-cli\/2 ]]; then
        #     echo $(aws ecr get-login-password --region ${REGION})|docker login --username AWS --password-stdin ${ECR_URI}
        # else
        #     echo "AWS CLI version does not match. Can not login ECR."; exit 1
        # fi
    fi
}

function docker_push() {
    local _component=$1
    docker push ${ECR_URI}/${PROJECT}-${ENVIRONMENT}-$_component:latest
    docker push ${ECR_URI}/${PROJECT}-${ENVIRONMENT}-$_component:${TAG}
}

function docker_deploy() {
    local _component=$1
    if ! [ $ENVIRONMENT = "local" ]; then
        docker_login $_component
        docker_tag $_component
        docker_push $_component
    else 
        echo "Environment: $ENVIRONMENT. Cannot deploy with this environment."; exit 1
    fi
}

function docker_ps() {
    docker-compose -p ${PROJECT} ps -a
}

function docker_prune() {
    docker network prune --force
    docker container prune --force
}

function docker_down() {
    docker-compose -p ${PROJECT} down -v
}

function docker_stop() {
    local _component=$1
    docker-compose -p ${PROJECT} stop $_component
}

function docker_exec() {
    local _component=$1
    local _option=$2
    docker-compose -p ${PROJECT} exec $_component $_option
}

function docker_cp() {
    local _component=$1
    local _cp_src=$2
    local _cp_dest=$3
    docker cp ${_cp_src} ${_cp_dest}
}

function docker_healthcheck() {
    _component=$1

    if [ ${_component} = "admin" ]; then URL=${ADMIN_LOCAL_URL}
    elif [ ${_component} = "api" ]; then URL=${API_LOCAL_URL}
    elif [ ${_component} = "front" ]; then URL=${FRONT_LOCAL_URL}
    else
        echo "Service doesn't have the healthcheck."; exit 0
    fi

    t=0
    while [ $t -lt 10 ]; do
        if [ $(curl -s -o /dev/null -w "%{http_code}" ${URL}/healthcheck) = 200 ]; then 
            echo "Application ${_component} is ready."; break
        else 
            echo "Application ${_component} is not ready."; sleep 30; t=+1
        fi
    done
}

function docker_ut() {
    local _component=$1
    docker_up ${_component}
    docker_healthcheck ${_component}
    echo "■■■ ${_component}"
    echo "■■■■■■ Unit Test"
    echo "■■■■■■■■■ Config env testing"
    docker-compose exec -T ${_component} sh -c "cp /var/www/app/env/.env.testing /var/www/app/.env.testing"
    echo "■■■■■■■■■ Clear config"
    docker-compose exec -T ${_component} sh -c "php artisan config:clear --env=testing"
    echo "■■■■■■■■■ Running migration"
    docker-compose exec -T ${_component} sh -c "php artisan migrate --force"
    echo "■■■■■■■■■ Running Unit Test"
    docker-compose exec -T ${_component} sh -c "php artisan test --env=testing" 2>&1 | tee ./unit_test/${_component}_output.txt
}

# Main execution
if [ ${#COMPONENTs_ARRAY[@]} -eq 0 ]; then
    if [ ${ACTION} = "ut" ];then echo "Please put a list labels to run Unit Test"; exit 1; fi
    docker_${ACTION}
else
    for c in "${COMPONENTs_ARRAY[@]}"; do
        docker_${ACTION} ${c} ${OPTION}
    done
fi