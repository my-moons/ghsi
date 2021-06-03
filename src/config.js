const fs = require('fs');
const yaml = require('js-yaml');
const home = require('os').homedir()

const writeConfigFile = (githubToken) => {
    try {
        if (!fs.existsSync(`${home}/.ghs`)) {
            fs.mkdirSync(`${home}/.ghs`)
        }
        const yamlStr = yaml.dump({githubToken});
        fs.writeFileSync(`${home}/.ghs/config`, yamlStr, 'utf8');
    } catch (e) {
        console.log(e)
    }
    
}

const readConfigFile = () => {
    try {
        if (!fs.existsSync(`${home}/.ghs/config`))
            throw new Error('You must configure the github token first...');
        
        const fileContents = fs.readFileSync(`${home}/.ghs/config`, 'utf8');
        const data = yaml.load(fileContents);
        process.env.GITHUB_TOKEN = data.githubToken;
        return data.githubToken;

    } catch (e) {
        console.log(e.message)
    }
}

module.exports = {
    readConfigFile,
    writeConfigFile
}