FROM alpine:3.23

RUN apk add --no-cache tini

ADD crontab.txt /crontab.txt
RUN /usr/bin/crontab /crontab.txt

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/sbin/crond", "-f", "-l", "8"]
