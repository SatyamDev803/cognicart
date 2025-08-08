# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set a dedicated workdir
WORKDIR /code

# Install poetry
RUN pip install poetry

# Copy only the dependency definitions
COPY pyproject.toml poetry.lock* /code/

# Install dependencies, but NOT the project itself
RUN poetry config virtualenvs.create false && poetry install --no-root --no-interaction --no-ansi

# Copy the entire app source code into the workdir
# This will create a structure like /code/app/main.py
COPY ./app /code/app

# Set the PYTHONPATH to the workdir
ENV PYTHONPATH="${PYTHONPATH}:/code"

# Command to run the application from within the /code directory
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]