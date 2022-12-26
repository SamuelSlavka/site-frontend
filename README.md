# Frontend
Application with dashboard containing links to self-hosted services and scraped menus from lcoal restaurants. Written in `React` with `Redux` as state managment.

### Project setup
Project has its own `.env` which is structured according to `.env.dist` file.
### CI/CD setup
CI/CD is configured to build arm64 immages. To change this in `.gitlab-ci.yml` change all `--platform`  flags.

CI/CD has also set of following variables:
```
CI_REGISTRY: [registry.gitlab.com]
CI_REGISTRY_PASSWORD: [passwd]
CI_REGISTRY_USER: [user]
ENV_FILE: [.env.dist]
PROD_SERVER_IP: [domain]
SSH_PRIVATE_KEY: [pk]
SSH_CONFIG: [
  Host [domain]
  ProxyCommand cloudflared access ssh --hostname %h
]
```

### Project dev execution
Running jest test suite:
#### `yarn test`
Running eslint:
#### `yarn lint`
Installing deps:
#### `yarn install`
Running frontend in dev mode:
#### `yarn run start`

### Project prod execution
building docker image:
#### `docker build .`
running the built imaage:
#### `docker run`
