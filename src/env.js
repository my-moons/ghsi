
const readDotEnvValues = (src = '') => {
    const {parsed} = require('dotenv').config({
        path: src === '' ? null : src
    });
    return parsed;
}

const buildEnvironmentSecrets = (environment, parsedValues) => {
    let environmentValues = {}
    const keys = Object.keys(parsedValues)

    if (environment && environment === '') 
        throw new Error('environment not provided')
    
    keys.forEach(k => {
        environmentValues[`${environment.toUpperCase()}_${k}`] = parsedValues[k]   
    })
    
    return environmentValues
}

module.exports = {
    readDotEnvValues,
    buildEnvironmentSecrets
}