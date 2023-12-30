FROM ubuntu:22.04 as base

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install -y \
    ca-certificates \
    curl \
    gnupg && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# install depdencies
RUN apt-get update -y && \
    apt-get install -y nodejs

# Install yarn seperately due to `no-install-recommends` to skip nodejs install 
RUN apt-get install -y --no-install-recommends yarn

FROM base as build

WORKDIR /www

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn install
COPY . .

RUN rm -rf dist && yarn build && \
    yarn cache clean && \
    yarn autoclean --force

FROM base as final

WORKDIR /www
COPY --from=build /www/node_modules ./node_modules
COPY --from=build /www/dist ./dist
COPY --from=build /www/package.json ./package.json
COPY --from=build /www/tsconfig.json ./tsconfig.json

ENV RUN_MODE="docker"
ENV NODE_ENV="production"

CMD [ "yarn", "start:prod" ]
