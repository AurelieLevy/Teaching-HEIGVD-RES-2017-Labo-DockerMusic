FROM node:4.3.1
MAINTAINER Aurelie Levy <aurelie.levy@heig-vd.ch>

COPY src /opt/app/
RUN ["npm", "install", "uuid", "--save"]
CMD ["node", "/opt/app/musician.js"]