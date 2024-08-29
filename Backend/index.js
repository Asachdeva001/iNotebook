const connectToMonge = require('./db');
const express = require('express');
const cors = require('cors')

connectToMonge();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())

app.use('/api/auth', require('./Routes/Auth'));
app.use('/api/notes', require('./Routes/Notes'));
app.listen(port, () => {
    console.log('iNotebook Backend listening at http://localhost:' + port)
})