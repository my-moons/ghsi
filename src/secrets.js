const { default: axios } = require('axios');
const sodium = require('tweetsodium');
const env = require('./env');
const github = require('./github');

const importGithubSecrets = async ({ repo, environment = '', path }) => {
  try {
    const parsed = env.readDotEnvValues(path);
    
    if (!parsed)
      throw new Error('.env file cannot be parsed or file does not exists')
    
    const envValues = env.buildEnvironmentSecrets(environment, parsed);

    const [publicKey, keyId] = await github.getGithubPublicKeys(repo);

    const secrets = Object.keys(envValues);

    for (const s of secrets) {
      const encSecret = encryptSecret(envValues[s], publicKey);
      const res = await github.updateGithubSecret({
        repository: repo,
        secretName: s,
        secretValue: encSecret,
        keyId,
      });
      console.log('Created value: ', s, res);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const encryptSecret = (secretValue, publicKey) => {
  // Convert the message and key to Uint8Array's (Buffer implements that interface)
  const messageBytes = Buffer.from(secretValue);
  const keyBytes = Buffer.from(publicKey, 'base64');

  // Encrypt using LibSodium.
  const encryptedBytes = sodium.seal(messageBytes, keyBytes);

  // Base64 the encrypted secret
  return Buffer.from(encryptedBytes).toString('base64');
};

module.exports = {
  importGithubSecrets,
};
