FROM node:8.16.0-jessie

LABEL maintainer="Levi Strauss & Co"

ENV SECRET='undefined'

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN echo "I AM INSTALLING DEPENDENCIES."

RUN echo "BEEP BOOP BOP"

RUN echo "I AM INSTALLING DEPENDENCIES."

# RUN echo "I AM INSTALLING DEPENDENCIES." \
#     && echo "BEEP BOOP BOP" \
#     && echo "DEPENDENCIES INSTALLED YA FOOLS!"

ENTRYPOINT ["/usr/src/app/bin/entrypoint.sh"]

CMD ["node", "index.js"]
