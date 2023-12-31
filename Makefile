run-server:
	yarn typeorm-ts-node-commonjs migration:run -d ./src/database
	yarn start:prod
