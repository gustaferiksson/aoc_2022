FROM jarredsumner/bun:edge

COPY package.json bun.lockb ./
RUN bun install

COPY index.ts .
COPY input.txt .

CMD bun index.ts
