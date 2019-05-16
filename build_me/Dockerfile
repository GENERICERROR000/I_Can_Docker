FROM node:8.16.0-jessie

LABEL maintainer="Levi Strauss & Co"

ENV SECRET=""

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN echo "I AM INSTALLING DEPENDENCIES."

RUN echo "BEEP BOOP BOP"

RUN sleep 2

RUN echo "I AM INSTALLING DEPENDENCIES."

# RUN echo "I AM INSTALLING DEPENDENCIES." \
#     && echo "BEEP BOOP BOP" \
#     && sleep 2 \
#     && echo "DEPENDENCIES INSTALLED YA FOOLS!"

CMD ["node", "index.js"]
