#!/bin/bash

sudo chmod -R 777 /home/ec2-user/GroShop

cd /home/ec2-user/GroShop/app

npm ci

npm test