const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('./database/DB');

const app = express();
app.disable('etag');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

app.listen(process.env.PORT || 8081);
console.log(`Server started on port 8081`);
