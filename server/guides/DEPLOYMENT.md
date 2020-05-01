# Deployment to Ubuntu on AWS EC2

This guide outlines steps for deploying a full stack JavaScript project to an EC2 instance on AWS. **Required tools**, **initial deployment**, and **deploying updates** are covered. The guide assumes that you have already provisioned an EC2 instance and that you have SSH access to the instance. Some parts of this guide may have been covered during class, but they are recorded here for future reference.

**Note:** This guide may use "EC2 Instance" and "Ubuntu" interchangeably, because your EC2 instance _should_ be running the Ubuntu operating system.

## Connect to EC2

All of the instructions in this guide require you do issue commands to your EC2 instance in an SSH session.

- On a **Mac OS** or **Linux** computer, open **Terminal**.
- On a **Windows** computer, open **Git Bash**.

Use the following `ssh` command to sign in. Replace `<your ip address>` with the IP address of your EC2 instance. Replace `path/to/key.pem` with the location of your own SSH key (_e.g._ `~/Desktop/aws-ec2.pem`).

```bash
ssh -i path/to/key.pem ubuntu@<your ip address>
```

> For example, if your SSH key is located on your `Desktop` and is named `aws-ec2.pem`, and your EC2 IP address is 111.222.333.444, then your command would be:<br>
```bash
ssh -i ~/Desktop/aws-ec2.pem ubuntu@111.222.333.444
```

If you are unable to connect, notify an instructor right away.

## Required Tools

You will be deploying your project more than one time as the application gains functionality or bugs are discovered and fixed. There is some setup required for your **first** deployment that is not required for subsequent deployments. This section covers that setup.

When you deploy your **first** full stack JavaScript project to an EC2 instance on AWS, you'll need to make sure that some tools are installed on your EC2 instance. After they've been installed once, they won't need to be installed again for future deployments of the same project or the deployment of additional full stack JavaScript projects.

This guide assumes EC2 Ubuntu 18.04 so all setup commands will be based on that.

**Note:** It doesn't matter what directory you are in when installing these packages on Ubuntu.

**Note:** The default `ubuntu` user account of your EC2 instance does not have permission to install packages, so installation commands will need to start with `sudo` to temporarily use the `root` user account.

### Before Installing Anything

Be sure that your Ubuntu instance's package list is up-to-date.

```bash
sudo apt update
```

### Install HTTPie

The HTTPie command line client is a lifesaver when debugging server issues. Install it now.

```bash
sudo apt install httpie
```

### Install Node.js v10 and NPM

Your full stack project is powered by Node.js and managed using NPM scripts in its `package.json`. Ubuntu does not come with Node.js and NPM preinstalled, so install them now with the following command.

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash && sudo apt install -y nodejs
```

### Install the PM2 Process Manager

Because your EC2 instance is not guaranteed to be online 100% of the time, it is important to prepare for unexpected reboots. Your Node.js applications will not automatically come back online if your EC2 instance restarts. To address this, you'll be using a tool named PM2 to make sure that your Node.js applications auto-start if the operating system reboots.

PM2 is distributed as an NPM package. **Note:** we are installing `pm2` **globally**.

```bash
sudo npm install --global pm2
```

You may need to fix the file permissions of the `.config` directory that this creates in your `/home/ubuntu` directory. We'll fix them now just in case.

```bash
sudo chown -R ubuntu:ubuntu /home/ubuntu/.config
```

### Install the PostgreSQL Database Server

This application will manage the databases of your projects.

```bash
sudo apt install postgresql
```

### Install the Nginx Web Server

Clients will not be connecting directly to your Node.js web server. All traffic will be ultimately routed to Nginx before Nginx forwards requests to your Node.js web server. You will also be configuring SSL for Nginx instead of Node.js so be sure that `nginx` is installed.

```bash
sudo apt install nginx
```

### Enable Free SSL Certificates with CertBot

To make sure that communication between clients and your app are encrypted and private, you'll want to set up CertBot. The official instructions are located at [`https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx`](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx), but for now, you'll only be following a couple of steps from the original instructions.

1. Include the `certbot` package list in Ubuntu's available packages.
    ```bash
    sudo add-apt-repository ppa:certbot/certbot
    ```
1. Install `certbot` and the required plugins for Nginx.
    ```bash
    sudo apt install certbot python-certbot-nginx
    ```

### Initial Setup Complete!

Once the above are installed and configured, your EC2 instance is ready for full stack JavaScript projects!

## First Deployment

The first time you deploy a full stack JavaScript project, you'll need to do some extra configuration, but when deploying updates of the application, these steps can be skipped.

This portion of the guide assumes that you have already registered a custom domain name with a provider like hover.com or name.com. This guide also assumes that you have added an `A` record to your domain's DNS settings that points to the Elastic IP address associated with your EC2 instance.

### Create a Subdomain

Visit your domain name registrar and create a new `CNAME` DNS record for your project. The `CNAME` record should point to your main domain name.

> For example, if your domain name is `learningfuze.com` and your project's name is `full-stack-project`, then you'll create a `CNAME` record for `full-stack-project.learningfuze.com` that points to `learningfuze.com`.

### Create a Database and Credentials

Assuming that your application is backed by a PostgreSQL database, you'll need to create one now. As a security measure, you'll be creating a unique set of database login credentials for each of your applications.

1. Sign into PostgreSQL with the "super user" `postgres` account. The following command elevates your permissions temporarily to the Ubuntu `root` user who can do anything, even become the `postgres` user. Then it signs you into the PostgreSQL database server through `psql`.
    ```bash
    sudo su postgres -c psql
    ```
1. While signed into PostgreSQL, create a **new user** for your application with the following SQL command. On success, you should see `CREATE ROLE`. Use `https://passwordsgenerator.net/` and disable symbols to generate the password. Don't lose this!
    ```sql
    create user "fullStackProject" with password 'superstrongpassword';
    ```
1. Still signed into PostgreSQL, create a **new database** for your application with the following SQL command. On success, you should see `CREATE DATABASE`.
    ```sql
    create database "fullStackProject";
    ```
1. Still signed into PostgreSQL, give your new user full control over your new database with the following SQL command. On success, you should see `GRANT`.
    ```sql
    grant all privileges on database "fullStackProject" to "fullStackProject";
    ```
1. Sign out of PostgreSQL with the following command. You should be returned to your bash prompt.
    ```bash
    \quit
    ```

### Clone the Project

When you have connected to your EC2 instance over SSH, you'll want to clone the project's source code into your home directory. Confirm that your current working directory is `/home/ubuntu` with the `pwd` command.

```bash
pwd
```

Ubuntu comes with `git` preinstalled so you can clone the project now. Replace `username` with the owner of the repository, `full-stack-project` with the name of the project, and `full-stack-project.learningfuze.com` with your project's subdomain. If the repository is private, then you'll be prompted for your GitHub username and password.

```bash
git clone https://github.com/username/full-stack-project full-stack-project.learningfuze.com
```

After the project is successfully cloned, running the `ls` command should show the project directory.

```bash
ls
```

The next few steps will be done from within the project directory, so change directories to the project. Replace `full-stack-project.learningfuze.com` with your subdomain.

```bash
cd full-stack-project.learningfuze.com
```

### Install NPM Packages

Although your `node_modules` directory should have been ignored (via `.gitignore`), the project should have all of its JavaScript dependencies listed in `package.json` so you can download them now.

```bash
npm install
```

### Bundle JavaScript Modules

Your project should have a `"build"` script in `package.json` that runs Webpack to bundle your front end modules into a `main.js` file inside `server/public`. Run the script now.

```bash
npm run build
```

### Configure Environment Variables

Although your `.env` file should have been ignored (via `.gitignore`), the project should include a `.env.example` file to serve as a template. Copy that file now to create a replacement `.env`.

```bash
cp .env.example .env
```

Use the `nano` command to edit the new `.env` file to include your _real_ configuration values, including the `DATABASE_URL`.

```bash
nano .env
```

```bash
PORT=3001
DEV_SERVER_PORT=3000
DATABASE_URL=postgres://dev:lfz@localhost/nameOfDatabase
SESSION_SECRET=secret
SESSION_EXPIRY=28800000
```

Change the following values:

- `NODE_ENV` should be set to `production` to enable some optimizations for your Express.js server.
- `PORT` should be an available port number in your EC2 instance, starting from `3001`. If you have other Node.js projects listening on ports, you may need to make this `3002` or `3003`. **Only one process can bind to a given port**, so this can't be the same as any other project in your EC2 instance.
- `DATABASE_URL` should be updated to match your new database credentials. The format is as follows: `postgres://username:password@localhost/nameOfDatabase`. Substitute the username, password, and database name for the values you specified when setting up your application's database.
- `SESSION_SECRET` should be a random string. You can use the same random password generator you used to create your database password. Be sure to disable symbols when generating the new `SESSION_SECRET`. This helps secure your session cookies from tampering.

### Import the Latest Database Dump

Your team should be dumping and committing the project's database locally any time the schema is modified. There are scripts available in `package.json` for performing imports and exports. Now that your database configuration has been set in `.env`, you can import your database.

1. Run the NPM script to import your database.
    ```bash
    npm run db:import
    ```
1. Sign into Postgresql to confirm that all of your tables were created. Replace `fullStackProject` with your project's database name.
    ```bash
    sudo su postgres -c 'psql fullStackProject'
    ```
1. You should see a prompt like `fullStackProject=#` when logged in. List out your database's tables with the following command:
    ```bash
    \dt
    ```
1. Exit PostgreSQL now by typing `\quit` and pressing enter.

### Start the Back End

You'll be putting [PM2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) in charge of making sure that your Node.js back end stays up and auto-starts if/when your EC2 instance reboots.

#### Launch the Process

Use PM2 to launch your Node.js back end with the following command. Replace `full-stack-project` with the name of your project. **Note:** the ` -- ` double dash with spaces between `npm` and `start` is required!

```bash
sudo pm2 start --name=full-stack-project npm -- start
```

#### Check the Console Output

You can examine the `STDOUT` and `STDERR` of your Node.js program with the following command. Type `Ctrl + C` to stop watching the logs. Replace `full-stack-project` with your project's name.

```bash
sudo pm2 logs full-stack-project
```

#### Test It!

Now you can test your `/api/health-check` endpoint with HTTPie to verify that the back end is working. Replace the port number with the `PORT` you specified in `.env`.

```bash
http localhost:3000
```

You should see your `index.html` file in the response body.

```bash
http localhost:3000/api/health-check
```

You should see a success message in the response body.

#### Register the Node.js Process for Startup

PM2 keeps a list of processes that it is in charge of, but the list needs to be saved whenever a process is added or removed. Save the list now with the following command:

```bash
sudo pm2 save && sudo pm2 startup
```

Your Node.js back end should now automatically start whenever your EC2 instance is rebooted. Reboot the instance now to verify that your back end auto-starts properly.

```bash
sudo reboot
```

You'll be kicked out of your SSH session while the EC2 instance reboots, but in a few moments, reconnect over SSH and verify that your `/api/health-check` endpoint is still operational. Replace the port number with the `PORT` you specified in `.env`.

```bash
http localhost:3000/api/health-check
```

### Configure a Virtual Host for Nginx

When web browsers visit your project, they'll be making HTTP requests to your Nginx web server. However, Nginx doesn't know anything about your project by default. Therefor, a special configuration file needs to be created.

#### Copy the Template

Your starter files should have included a reference configuration in `server/full-stack-project.example.conf`. Copy this file now, giving it a name that matches your project's subdomain.

> For example, if your project's subdomain is `full-stack-project.learningfuze.com`, then your configuration file's name should be `full-stack-project.learningfuze.com`. **There is no `.conf` at the end of the final file.**

**Note:** The default `ubuntu` user account of your EC2 instance does not have permission to modify files outside of its home directory, so the `cp` command will need to start with `sudo` to temporarily use the `root` user account.

```bash
sudo cp server/full-stack-project.example.conf /etc/nginx/sites-available/full-stack-project.learningfuze.com
```

#### Edit the Configuration File

Now use `nano` to edit the copy you've created. Replace `full-stack-project.learningfuze.com` with your config file's name.

**Note:** The default `ubuntu` user account of your EC2 instance does not have permission to modify files outside of its home directory, so the `nano` command will need to start with `sudo` to temporarily use the `root` user account.

```bash
sudo nano /etc/nginx/sites-available/full-stack-project.learningfuze.com
```

Modify the `server_name`, `root`, and `proxy_pass` directives in the configuration file. For example, if your project name is `fart-app` and your domain is `lol.com`, and the `PORT` you'll be using is `3003`, then your configuration file should look like this:

```conf
server {

  server_name fart-app.lol.com;

  root /home/ubuntu/fart-app.lol.com/server/public;

  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://localhost:3003;
  }

}
```

#### Enable the Site

Once your configuration file has been edited, it's time to let Nginx know about it.

**Note:** The default `ubuntu` user account of your EC2 instance does not have permission to modify files outside of its home directory, so the `ln` command will need to start with `sudo` to temporarily use the `root` user account. Replace `full-stack-project.learningfuze.com` with your own configuration file's name.

1. Enable the site.
    ```bash
    sudo ln -s /etc/nginx/sites-available/full-stack-project.learningfuze.com /etc/nginx/sites-enabled/
    ```
1. Test your new configuration file. You should see confirmation messages that your configuration is valid.
    ```bash
    sudo nginx -t
    ```
1. Restart Nginx.
    ```bash
    sudo service nginx restart
    ```

#### Try it out!

Your project is now deployed! You should be able to visit your subdomain (unless you have a `.dev` domain name) in a web browser to see the landing page of the app! 🎉🎉🎉

#### Enable SSL with Certbot

At this point, your web browser is not communicating with your application of a secure connection. Let's fix that! CertBot makes it easy to configure SSL for your project with one command.

**Note:** The default `ubuntu` user account of your EC2 instance does not have permission to run the `certbot` command, so it will need to begin with `sudo` to temporarily use the `root` user account.

```bash
sudo certbot --nginx
```

The following items may be requested of you by `certbot` if this is your first time running it:

1. Your _real_ email address is required for renewal and security notices.
1. You _must_ agree to the Let's Encrypt terms of service.
1. You _may_ opt to receive a newsletter from the EFF. You don't have to.
1. Choose your project for HTTPS activation.
1. Enable redirects to make all requests redirect to secure HTTPS connections.

#### Try it out again!!

Visit your subdomain again in a web browser and you should see a lock in the URL bar indicating that you are visiting the app over a private SSL connection!! 🔒🔒🔒

## Deploying Updates

"Redeploying" your project is required whenever fixes or new functionality has been added to its codebase. This process is much less involved than the initial deployment and the vast majority of it is simple repetition of some steps taken during your first deployment.

To get started, SSH into your EC2 instance.

### Pull the Latest Commits

Change directories to your project; it should be located at `/home/ubuntu/full-stack-project.learningfuze.com`. Change `full-stack-project.learningfuze.com` to your project's subdomain.

```bash
cd /home/ubuntu/full-stack-project.learningfuze.com
```

Pull the `master` branch of your GitHub repository.

```bash
git pull origin master
```

Now all of your most recent changes are downloaded!

### Re-Import the Database

It is possible that your database schema or initial data has changed since your last deployment. **Note:** this is _not_ how databases are normally managed in a real production application, but a full-fledged migration system is beyond the scope of this project.

```bash
npm run db:import
```

### Rebuild the Front End

Your client code may have been updated since your last deployment. Bundle your modules now.

```bash
npm run build
```

### Restart the Back End

Your server code may have been updated since your last deployment. Use PM2 to restart the back end to reflect the changes. Change `full-stack-project` to your project's name.

```bash
sudo pm2 restart full-stack-project
```

### Done!

Congratulations, your project has bee redeployed. 🎉🎉🎉 **Note:** You may need to "Empty Cache and Hard Reload" in your browser to see the latest updates.
