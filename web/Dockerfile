FROM 		binocarlos/nodejs
MAINTAINER 	Kai Davenport <kaiyadavenport@gmail.com>

ADD . /srv/app
RUN cd /srv/app && npm install

EXPOSE 80

ENTRYPOINT ["node", "index.js"]
CMD [""]