const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = 4000; // Use a port other than 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
