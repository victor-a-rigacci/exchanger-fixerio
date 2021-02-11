# Postman collection:

    Api.postman_collection.json

# Running demo:

https://exchanger.datoenlinea.com/

https://exchanger.datoenlinea.com/documentation

### Endpoints:

| Method | Endpoint                                          | Description                                  | Body Example                                                                                |
| ------ | ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [GET]  | https://exchanger.datoenlinea.com/health          | _Get status http server_                     |                                                                                             |
| [GET]  | https://exchanger.datoenlinea.com/rates           | _Get cached original rates from FixerIO API_ |                                                                                             |
| [GET]  | https://exchanger.datoenlinea.com/pairs           | _Get all pairs created with fee > 0_         |                                                                                             |
| [POST] | https://exchanger.datoenlinea.com/pairs           | _Create/update pair fee_                     | `{"pairs": [{"pair": "EURUSD","feePercentage": 12},{"pair": "USDEUR","feePercentage": 5}]}` |
| [POST] | https://exchanger.datoenlinea.com/pairs/selective | \*Get selected pairs with fee\*              | `{"pairs": ["EURUSD","EURARS","USDARS"]}`                                                   |

# Swagger url:

{url}/documentation

# How to run:

1. Complete data in: /src/config/development.env

2. docker build . -t exchanger-fixerio
3. docker run -p 4646:4646 exchanger-fixerio
4. Visit http://localhost:4646
