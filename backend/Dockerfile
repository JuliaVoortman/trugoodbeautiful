FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Use shell form instead of exec form to allow variable substitution
CMD uvicorn app:app --host 0.0.0.0 --port ${PORT:-8000}