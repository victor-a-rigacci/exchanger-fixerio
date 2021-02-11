# Postman collection:

    Api.postman_collection.json

# Running demo:

https://exchanger.datoenlinea.com/

https://exchanger.datoenlinea.com/documentation

### Endpoints:

**Health:**
|Method|Endpoint|Description|Body Example|
|--|--|--|--|
|[GET]|https://exchanger.datoenlinea.com/health|*Get status http server*||
|[GET]|https://exchanger.datoenlinea.com/rates|*Get cached original rates from FixerIO API*||
|[GET]|https://exchanger.datoenlinea.com/pairs|*Get all pairs created with fee > 0*||
|[POST]|https://exchanger.datoenlinea.com/pairs|*Create/update pair fee*|`{"pairs": [{"pair": "EURUSD","feePercentage": 12},{"pair": "USDEUR","feePercentage": 5}]}`|
|[POST]|https://exchanger.datoenlinea.com/pairs/selective|*Get selected pairs with fee\*|`{"pairs": ["EURUSD","EURARS","USDARS"]}`|

# Swagger url:

{url}/documentation

# How to run:

1. Complete data in: /src/config/development.env

2. docker build . -t exchanger-fixerio
3. docker run -p 4646:4646 exchanger-fixerio
4. Visit http://localhost:4646
