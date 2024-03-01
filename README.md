# CordonBleus

## Develop

> The development is based on Docker

```shell
docker compose watch
```

After running the command, you can access http://localhost:5173/ to view the application.
All modifications are reflected in real-time for the API server and the frontend.

## Toolbox

The toolbox contains multiple tools like NodeJS, Yarn, PHP and the Symfony CLI

### Building the container

```shell
docker build -f docker/toolbox.Dockerfile -t cordonbleus-toolbox .
```

### Running the container

This command must run from the project's root.

```shell
docker run -it -v .:/app cordonbleus-toolbox
```