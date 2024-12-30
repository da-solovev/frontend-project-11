install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

dev:
	npx webpack serve

build_prod:
	npm run build:prod

build_dev:
	npm run build:dev
