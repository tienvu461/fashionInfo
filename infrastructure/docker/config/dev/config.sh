#!/bin/bash

export PROJECT=fashion-info
export ENVIRONMENT=dev
export APP_ENV=dev
export REGION=ap-southeast-1
export TAG=$(git rev-parse --short=10 HEAD)