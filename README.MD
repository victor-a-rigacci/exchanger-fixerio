# Postman collection:

    DIR: Api.postman_collection.json

# Running demo:

https://exchanger.datoenlinea.com/

# How to run:

1. Complete data in: /src/config/development.env

2. docker build . -t exchanger-fixerio
3. docker run -p 4646:4646 exchanger-fixerio
4. Visit http://localhost:4646
