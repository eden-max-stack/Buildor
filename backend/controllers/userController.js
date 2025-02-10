const { getInstallationToken } = require("../src/auth/authMiddleware");

const getUserRepos = async (req, res) => {
    try {
        const installationId = req.params.installationId;
        const token = await getInstallationToken(installationId);

        const response = await axios.get(`https://api.github.com/installation/repositories`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching repositories:", error);
        res.status(500).json({ error: "Failed to fetch repositories" });
    }
};

const getRepoLanguages = async(req, res) => {
    try {
        const installationId = req.params.installationId;
        const token = await getInstallationToken(installationId);
        const { owner, repo } = req.params;

        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching repositories:", error);
        res.status(500).json({ error: "Failed to fetch repositories" });
    }
};

const getCommitHistory = async(req, res) => {
    try {
        const installationId = req.params.installationId;
        const token = await getInstallationToken(installationId);
        const { owner, repo } = req.params;

        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching commit history:", error);
        res.status(500).json({ error: "Failed to fetch commit history." });
    }
};

const getStarredRepos = async(req, res) => {
    try {
        const installationId = req.params.installationId;
        const token = await getInstallationToken(installationId);
        const { username } = req.params;

        const response = await axios.get(`https://api.github.com/users/${username}/starred`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching repositories:", error);
        res.status(500).json({ error: "Failed to fetch repositories" });
    }    
};
    

module.exports = { getUserRepos, getRepoLanguages, getStarredRepos, getCommitHistory };