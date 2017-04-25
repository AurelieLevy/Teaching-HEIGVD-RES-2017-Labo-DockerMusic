FROM node:4.3.1
MAINTAINER Aurelie Levy <aurelie.levy@heig-vd.ch>

EXPOSE 2205

COPY src /opt/app/

RUN cd /opt/app

ENTRYPOINT ["node", "/opt/app/auditor.js"]