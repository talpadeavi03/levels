const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: "DevOps Level 1 App Running",
        environment: process.env.ENVIRONMENT || "dev",
        timestamp: new Date()
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "healthy" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});// redeploy prod
// force prod redeploy again
