[![GitHub license](https://img.shields.io/github/license/officialsanjaysharma/medicine-ecommerce-application?style=flat-square)](https://github.com/officialsanjaysharma/medicine-ecommerce-application/blob/master/License)

## Medicine E-commerce application

## Stack used

- Nodejs
- Redis
- Postgres
- React
- Express
- Material-UI
- Sequelize

## SETUP

    - Follow the following steps to setup the applicaton

### Client

1. Type <b>cd client</b> in terminal.
2. Type <b>npm install</b> or <b>yarn</b>.
3. To run the project type <b>yarn start/npm run start</b>.

### Server

1. Make config.js in <b>server/config</b> folder.

Sample <b>config.js</b>

    ```
    module.exports = {
    endpoint: "https://5f1a8228610bde0016fd2a74.mockapi.io/getTestList",
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "docker",
    DB: "testdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    }
    ```

2. Install node_modules by typing <b>npm install / yarn</b> in terminal.
3. Make sure you run <b>Posgres</b> and <b>redis</b> server before starting the server.
4. Type <b>npm run start / yarn start</b> in terminal to run server.
