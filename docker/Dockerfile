FROM node:8.9.1-alpine

LABEL email="hm910705@163.com" 
LABEL version="0.0.1"
LABEL description="The docker image for h5ds."

COPY dist/ dist/

COPY dumb-init /usr/local/bin/dumb-init
RUN chmod 777 /usr/local/bin/dumb-init

RUN cd /dist && npm i --production

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

WORKDIR /dist

CMD ["node", "index.js"]
