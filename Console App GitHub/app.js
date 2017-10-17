const github = require('./github');

const username = process.argv[2];

github.getRepos(username, (error, repos) => {
    if(error) return console.error(`Error: ${error.message}`);

    repos.forEach(repo => console.log(repo.name));
});