import app from "./config/express";
import logger from "./config/logger";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server running at ${PORT}.`)
})