# backend

Backend server for cyc.ly, written in FastAPI.

To start the server:

```
docker build -t cycly-backend .
docker run -p 8000:80 -t cycly-backend
```

### Install dependencies

This project uses Poetry to manage dependencies. [Install Poetry] and then run:

```
poetry install
```

### Run server

```
docker compose up --build
```

[Install Poetry]: https://python-poetry.org/docs/#installation
