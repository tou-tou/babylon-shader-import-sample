create-network:
	docker network create --driver bridge toutou_shared
local-deploy:
	docker network create --driver bridge toutou_shared
	docker-compose up -d
	docker-compose exec -T nginx ash -c "yarn install"
	docker-compose exec -T nginx ash -c "yarn build"
	docker-compose exec -T nginx ash -c "yarn dev"
local-update:
	docker network create --driver bridge toutou_shared
	docker-compose up -d
	docker-compose exec -T nginx ash -c "yarn install"
	docker-compose exec -T nginx ash -c "yarn build"

prod-deploy:
	docker-compose up -d
	docker-compose exec -T nginx ash -c "yarn install"
	docker-compose exec -T nginx ash -c "yarn build"
prod-update:
	docker-compose up -d
	docker-compose exec -T nginx ash -c "yarn install"
	docker-compose exec -T nginx ash -c "yarn build"
stop:
	docker-compose  stop