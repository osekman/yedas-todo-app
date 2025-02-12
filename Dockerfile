
FROM node:current-alpine3.17 as alp
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm install -g @vercel/ncc
RUN ncc build index.js -o dist

FROM alp
WORKDIR /app
COPY --from=alp /app/dist/index.js .

RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]

# Run your program under Tini
CMD ["node", "index.js"]

#CMD [ "npm", "run", "start" ]
