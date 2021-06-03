# Github secrets importer
This cli loads a `.env` file to github repository secrets section with an environment prefix for github actions use

### Installation
```
$ npm i -g gh-secrets-importer`
```
### Getting started
You must create a GitHub Personal Access Token
Instructions [here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

You must store the token for future uses with
```
$ gh-secrets-importer config -t <your personal token>`
```

Now you're ready to run the importer

```
$ gh-secrets-importer import -r "<moons-repo-name>" -e "<enviromnent>" [-p "<path to .env file>"]
```