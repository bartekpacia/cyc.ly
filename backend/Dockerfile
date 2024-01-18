FROM python:3.12-bookworm as builder

RUN pip install poetry==1.7.0

WORKDIR /tmp

COPY ./pyproject.toml ./poetry.lock ./

RUN poetry config warnings.export false
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.12 as runtime

RUN apt-get update
RUN apt-get install -y libgdal-dev gdal-bin

WORKDIR /app

COPY --from=builder /tmp/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./

ENTRYPOINT ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "80"]
