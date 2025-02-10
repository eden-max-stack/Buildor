const { getInstallationToken } = require("../src/auth/authMiddleware");

const getToken = async (req, res) => {
    try {
        const installationId = req.params.installationId;
        const token = await getInstallationToken(installationId);
        res.json({ token });
    } catch (error) {
        console.error("Error fetching installation token:", error);
        res.status(500).json({ error: "Failed to fetch token" });
    }
};

module.exports = { getToken };