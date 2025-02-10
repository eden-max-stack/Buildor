const axios = require("axios");
const { generateJWT } = require("./jwtUtils"); // Import JWT function

async function getInstallationToken(installationId) {
    const jwtToken = generateJWT();

    const response = await axios.post(
        `https://api.github.com/app/installations/${installationId}/access_tokens`,
        {},
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/vnd.github.v3+json",
            },
        }
    );

    return response.data.token;
}

module.exports = { getInstallationToken };
