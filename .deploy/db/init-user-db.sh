#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$DB_USER" --dbname "$DB_NAME" <<-EOSQL
	CREATE DATABASE ever_api_starter_kit;
	GRANT ALL PRIVILEGES ON DATABASE ever_api_starter_kit TO postgres;
EOSQL
