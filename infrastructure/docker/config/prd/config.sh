#!/bin/bash

export PROJECT=fashion-info
export ENVIRONMENT=prd
export APP_ENV=production
export REGION=ap-southeast-1
export TAG=$(git rev-parse --short=10 HEAD)