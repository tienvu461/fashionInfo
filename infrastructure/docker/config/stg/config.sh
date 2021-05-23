#!/bin/bash

export PROJECT=fashion-info
export ENVIRONMENT=stg
export APP_ENV=staging
export REGION=ap-southeast-1
export TAG=$(git rev-parse --short=10 HEAD)