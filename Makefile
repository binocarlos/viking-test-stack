.PHONY: images start stop

images:
	docker build -t test/db db
	docker build -t test/logic logic
	docker build -t test/web web

start:
	docker run --name logic -d -p 80 test/logic
	docker run --name db -d -p 80 test/db
	docker run --name web --link db:db --link logic:logic -d -p 8080:80 test/web


stop:
	docker stop logic
	docker stop db
	docker stop web
	docker rm logic
	docker rm db
	docker rm web
	
hit:
	@curl -L http://127.0.0.1:8080/add