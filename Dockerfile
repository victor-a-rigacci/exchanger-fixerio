FROM node:14-alpine

# Exposed port to outside
EXPOSE 4646

# Enviroment variables
ENV APP_DIR challenge
ENV TZ=America/Buenos_Aires

# Update and install aditional apps 
RUN apk update

RUN apk add --no-cache  tini=0.18.0-r0 tzdata=2021a-r0


# Clean APK cache
RUN rm -rf /var/cache/apk/*

# Install yarn
RUN npm i yarn -g --force

# Create folder with permissions
RUN mkdir -p /home/node/${APP_DIR}/ && chown -Rh node:node /home/node/${APP_DIR}
WORKDIR /home/node/${APP_DIR}
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

# Change to node user
USER node


# Copy and install Dependencies using npm ci (package-lock.json is mandatory)
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --network-timeout 1000000

# Add node_modules to path
ENV PATH /home/node/${APP_DIR}/node_modules/.bin:$PATH

# Copy source code
COPY --chown=node:node . .

RUN yarn build

# Fix issue with PID1 (signaling improve)
ENTRYPOINT ["/sbin/tini", "--"]

# Start app
CMD ["node", "dist/index.js" ]


