const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENVIRONMENT || "dev";
const VERSION = process.env.APP_VERSION || "unknown";

let isShuttingDown = false;

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "DevOps Level 2 Hardened App Running",
        environment: ENV,
        version: VERSION,
        timestamp: new Date()
    });
});

// Health endpoint (liveness + readiness style)
app.get('/health', (req, res) => {
    if (isShuttingDown) {
        return res.status(503).json({
            status: "shutting_down"
        });
    }

    res.status(200).json({
        status: "healthy",
        uptime: process.uptime(),
        environment: ENV,
        version: VERSION,
        timestamp: new Date()
    });
});

// Graceful shutdown preparation
process.on('SIGTERM', () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    isShuttingDown = true;

    setTimeout(() => {
        process.exit(0);
    }, 5000);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});// redeploy dev cleanly
// dev test
// dev test
// dev deployment test
