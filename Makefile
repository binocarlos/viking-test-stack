.PHONY: images start stop

images:
	docker build -t binocarlos/viking-test-stack-db db
	docker build -t binocarlos/viking-test-stack-logic logic
	docker build -t binocarlos/viking-test-stack-web web

start:
	docker run --name logic -d -p 80 binocarlos/viking-test-stack-logic
	docker run --name db -d -p 80 binocarlos/viking-test-stack-db
	docker run --name web --link db:db --link logic:logic -d -p 8080:80 binocarlos/viking-test-stack-web

stop:
	docker stop logic
	docker stop db
	docker stop web
	docker rm logic
	docker rm db
	docker rm web

vikingstart:
	viking docker run -d --name logic -p 80 binocarlos/viking-test-stack-logic
	#viking docker run -d --name db -p 80 binocarlos/viking-test-stack-db
	#viking docker run -d --name web --link db:db --link logic:logic -p 8080:80 binocarlos/viking-test-stack-web
	
hit:
	@curl -L http://127.0.0.1:8080/add