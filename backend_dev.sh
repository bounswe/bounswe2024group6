set -e 
docker-compose -f docker-compose-dev-backend.yml down --volumes
sudo rm -rf dbdata
cd backend/app
sudo rm -rf migrations
cd ../../
sudo git pull
sudo docker-compose -f docker-compose-dev-backend.yml up --build