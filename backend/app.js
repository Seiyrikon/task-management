const express = require('express');
const cors = require('cors');
const sequelize = require('./config/config');
const taskRoutes = require('./routes/tasks');

const app = express();

//cors configuration
app.use(cors());

//middlewares
app.use(express.json());

sequelize.sync()
    .then(() => {
        console.log("Database synced.");
    })
    .catch((err) => {
        console.log("Error syncing database:", err);
    });

//routes
app.use('/api', taskRoutes);


const PORT = 8000;
console.log("Listening to port: ", PORT);
app.listen(PORT);