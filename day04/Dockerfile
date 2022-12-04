FROM debian:stable-slim
RUN apt-get update
RUN apt-get install -y curl unzip
RUN curl https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

COPY package.json bun.lockb tsconfig.json ./
RUN  bun install

COPY index.ts .
COPY input.txt .

CMD bun index.ts
