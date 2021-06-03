const axios = require('axios').default;

const updateGithubSecret = async ({repository, secretName, secretValue, keyId}) => {
  try {
    const token = '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';
    const url = `https://api.github.com/repos/my-moons/${repository}/actions/secrets/${secretName}`;
    const res = await axios.put(
      url,
      { encrypted_value: secretValue, key_id: keyId },
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
  
};

const getGithubPublicKeys = async (repoName) => {
  try {
    const token = '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';
    const res = await axios.get(
      `https://api.github.com/repos/my-moons/${repoName}/actions/secrets/public-key`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`
        },
      }
    );
    const { key, key_id } = res.data;
    return [key, key_id];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  getGithubPublicKeys,
  updateGithubSecret,
};
