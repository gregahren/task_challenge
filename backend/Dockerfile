FROM python:3
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ADD requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir
WORKDIR /api
ADD . /api
RUN chmod 755 /api/entrypoint.sh
ENTRYPOINT ["sh", "/api/entrypoint.sh"]
