#!/usr/bin/env node

const yargs = require('yargs');
const secrets = require('./src/secrets');
const config = require('./src/config')

yargs.version(require('./package.json').version);

yargs.command({
    command: 'import',
    describe: 'Import for github repositories',
    builder: {
        repo: {
            describe: 'Repository name',
            demandOption: true,
            type: 'string',
            alias: 'r'
        },
        environment: {
            describe: 'Specific environment',
            demandOption: false,
            type: 'string',
            alias: 'e'
        },
        path: {
            describe: 'Path to .env file',
            demandOption: false,
            type: 'string',
            alias: 'p'
        }
    },
    handler(argv) {
        if (!['dev', 'stag', 'prod'].includes(argv.environment)) {
            console.log('Envmironment not valid! Must be dev or stag', )
            return
        }

        const token = config.readConfigFile()
        if (token === '') {
            console.log('You must configure the token first')
            return
        }

        secrets.importGithubSecrets({
            repo: argv.repo, 
            environment: argv.environment.toLowerCase(),
            path: argv.path
        })
    }
});

yargs.command({
    command: 'config',
    describe: 'Configure github personal access token',
    builder: {
        token: {
            describe: 'Github token',
            demandOption: true,
            type: 'string',
            alias: 't'
        }
    },
    handler(argv) {
        config.writeConfigFile(argv.token)
    }
});

yargs.parse()