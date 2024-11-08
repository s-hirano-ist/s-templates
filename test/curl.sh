#!/bin/bash

# TODO: amount <= 0 error

echo "health"

curl -s http://localhost:8080/health

echo "\n\nv1/stocks"

echo "Delete all"
curl -s -X DELETE http://localhost:8080/v1/stocks

echo "\nNormal insert"
curl -s -d '{"name": "A", "amount": 100}' -H 'Content-Type: application/json' http://localhost:8080/v1/stocks
curl -s -d '{"name": "B"}' -H 'Content-Type: application/json' http://localhost:8080/v1/stocks
curl -s -d '{"name": "C"}' -H 'Content-Type: application/json' http://localhost:8080/v1/stocks

echo "\nDuplicate entry"
curl -s -d '{"name": "A", "amount": 1000}' -H 'Content-Type: application/json' http://localhost:8080/v1/stocks

echo "\nERROR: invalid insert"
curl -s -d '{"invalid": "A"}' -H 'Content-Type: application/json' http://localhost:8080/v1/stocks
curl -s -d '{"name": 111}' -H 'Content-Type: application/json' http://localhost:8080/v1/stocks

echo "\nDatabase with data"
curl -s http://localhost:8080/v1/stocks/
curl -s http://localhost:8080/v1/stocks/A

echo "\nUpdate database"
curl -s -d '{"name": "A", "amount": 999}' -H 'Content-Type: application/json' -X PATCH http://localhost:8080/v1/stocks

echo "\nInvalid update database"
curl -s -d '{"name": "A", "amount": "xxx"}' -H 'Content-Type: application/json' -X PATCH http://localhost:8080/v1/stocks

echo "\nUpdated  database"
curl -s http://localhost:8080/v1/stocks/

echo "\nERROR: not found"
curl -s http://localhost:8080/v1/stocks/X

echo "\nDelete row"
curl -s -X DELETE http://localhost:8080/v1/stocks/A

echo "\nDeleted database"
curl -s http://localhost:8080/v1/stocks/

echo ""
