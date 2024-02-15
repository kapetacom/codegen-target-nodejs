# kapeta/cli

Kapeta block implemented using Language Target "NodeJS"

See [this file](kapeta.md) for more information about the generated code

## Prerequisites
- Docker installed and running
- Kapeta Desktop installed and running
- NodeJS 20+

## Setup

To prepare / setup the CLI, run the following command:
```bash
npm install
```

## Running
To build and run the CLI in production mode, run the following commands:
```bash
npm run build
bin/cli [arguments]
```

To run the CLI in dev mode, run the following commands:
```bash
npm run dev [arguments]
```

To rerun the CLI in dev mode while watching for changes, run the following commands:
```bash
npm run watch [-- arguments]
```