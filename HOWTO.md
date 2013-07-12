# HOWTO

## Setup CouchDB

curl -X PUT http://127.0.0.1:5984/emotv
curl -X POST http://127.0.0.1:5984/emotv -H 'Content-Type: application/json' -d@public/lanz.json
curl -X GET http://127.0.0.1:5984/_uuids
