const express = require('express');
const path = require('path');
const morgan = require('morgan');

const indexRouter = require('./routes');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8989);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/' , indexRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port is listening');
});
