#!/bin/bash

export PROJECT=fashion-info
export ENVIRONMENT=local
export APP_ENV=local
export REGION=ap-southeast-1
export TAG=$(git rev-parse --short=10 HEAD)