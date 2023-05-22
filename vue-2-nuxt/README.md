# Developer guide

## Overview

- Vue 2
- Nuxt.js
- TailwindCSS
- ApexCharts
- PWA
- I18n

## Installation

### Prerequisites

- Nginx installed
- `docker` and `docker-compose` installed
- SSH-access to git repositories to clone this project (or login credentials if using HTTP-way)

**All prerequisites are satisfied if you have installed the Engineering API on the same machine**

### Guide

1. Clone source code (e.g cloning from bitbucket):

```sh
git clone git@bitbucket.org:xxx
```

2. Switch to cloned directory:

```sh
cd xxx
```

3. Create **.env** from example:

```sh
cp .env.example .env
```

Created .env file:

```dotenv
API_HOST=
```

Fill **API_HOST** variable (e.g http://path-to-api.com).

4. Create **docker-compose.yml** from production example:

```sh
cp docker-compose.prod.yml docker-compose.yml
```

This docker config exposes **3000** port — entry for the app.

5. Create nginx config file (**front.conf** in this case) from example:

```sh
sudo cp nginx.example.conf /etc/nginx/sites-available/front.conf
```

6. Enable new config by creating link to it in **sites-enabled**:

```sh
sudo ln /etc/nginx/sites-available/front.conf /etc/nginx/sites-enabled
```

Config:

```conf
server {
    listen 9090;
    server_name _;

    # ...

    location / {
        # ...
        proxy_pass  http://127.0.0.1:3000;
    }
}
```

This example nginx config file is set to listen **9090** port and reverse-proxying it to **http://127.0.0.1:3000** — it's where our application is located (see step 3).

7. Check if nginx config is valid:

```sh
sudo nginx -t
```

If tests are **ok** — proceed to the next step.

8. Restart nginx service to apply new config:

```sh
sudo services nginx restart
```

9. Run the application:

```sh
sudo docker-compose up -d
```

### CI/CD setup

Example Jenkins pipeline:

```sh
cd /home/ubuntu/xxx && \
git reset --hard && \
git checkout master && \
git pull && \
sudo docker-compose down && \
sudo docker-compose up -d
```

## NPM Scripts

### Main

- `yarn dev` - use in **local development**
- `yarn stage` - used to run on **staging server** (_production mode with Vue DevTools enabled_)
- `yarn prod` - used in **production**

### Additional

- `yarn serve` - used to locally run production mode _with DevTools_ and _without reinstalling node_modules_
- `yarn lint` - used to show ESLint issues
- `yarn lint:fix` - used to autofix some ESLint issues
