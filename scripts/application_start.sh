#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/GroShop

#navigate into our working directory where we have all our github files
cd /home/ec2-user/GroShop/app

#add npm and node to path
#export NVM_DIR="$HOME/.nvm"	
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
#[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm ci

#start our node app in the background
sudo systemctl restart app.service
echo "app.service UP"

#node server.js > server.out.log 2> server.err.log < /dev/null & 

cd /home/ec2-user/GroShop/microservices/user-service
npm ci
sudo systemctl restart user.service
echo "user.service UP"

cd /home/ec2-user/GroShop/microservices/recipe-service
npm ci
sudo systemctl restart recipe.service
echo "recipe.service UP"

cd /home/ec2-user/GroShop/microservices/product-service
npm ci
sudo systemctl restart product.service
echo "product.service UP"

cd /home/ec2-user/GroShop/microservices/cart-service
npm ci
sudo systemctl restart cart.service
echo "product.service UP"