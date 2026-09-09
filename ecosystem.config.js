module.exports = {
    apps: [
        {
            name: "number4ella.com",
            script: "node_modules/.bin/next",
            args: "start -p 3017",
            cwd: "/var/www/number4ella.com",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};
