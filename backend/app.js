const express = require('express');
const sequelize = require('./config/config');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

sequelize.sync()
    .then(() => {
        console.log("Database synced.");
    })
    .catch((err) => {
        console.log("Error syncing database:", err);
    });

app.use('/api', taskRoutes);


const PORT = 8000;
console.log("Listening to port: ", PORT);
app.listen(PORT);