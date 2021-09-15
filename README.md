# Fcamara





[![Author](https://img.shields.io/badge/author-Raymw1-341s4f?style=flat-square)](https://github.com/Raymw1)
[![Languages](https://img.shields.io/github/languages/count/Raymw1/fcamara?color=41s4f&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/Raymw1/fcamara?color=41s4f&style=flat-square)](https://github.com/Raymw1/fcamara/stargazers)
[![Forks](https://img.shields.io/github/forks/Raymw1/fcamara?color=41s4f&style=flat-square)](https://github.com/Raymw1/fcamara/network/members)
[![Contributors](https://img.shields.io/github/contributors/Raymw1/fcamara?color=41s4f&style=flat-square)](https://github.com/Raymw1/fcamara/graphs/contributors)


> A WebApplication built to help companies to manage the hybrid system.

<br />

---

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [FAQ](#postbox-faq)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [License](#closed_book-license)


# :rocket: Features

* ⌚ Schedule times to go to work.
* 💺 Manage and create rooms to users(admin).
* 🧑‍🤝‍🧑 Manage users of the application(admin).

# :construction_worker: Installation

**You will need to install [Node.js](https://nodejs.org/en/download/) first and [Yarn](https://yarnpkg.com/) if you prefer, then in order to clone the project via HTTPS, run this command:**

```git clone https://github.com/Raymw1/fcamara.git```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have a SSH key registered in your Github account, clone the project using this command:

```git clone git@github.com:Raymw1/fcamara.git```

**Install dependencies**

* NPM: ```npm install```
* Yarn: ```yarn install```

Create your environment variables based on the examples of ```.env.local```

```cp .env.local .env```

After copying the examples, make sure to fill the variables with new values.

**.env**

* In the app secret variable, you can put the secret you want to use in Session Express.

* In the mail information, you can put the information of your favorite Mail Host.(#Mailtrap)


# :runner: Getting Started

**Manually setup**

You may prefer to manually configure the database and the application.

Install [Postgres](https://www.postgresql.org/) to create a database.

Execute the follow command to create tables, relationships:

```npm run init_db```

**Running seed**

You can generate the data already prepared running the script:

```npm run seed_db```

Run the following command in order to start the application in a development environment:

```npm run dev``` **or** ```yarn dev```

# :postbox: Faq

**Question:** What are the technologies used in this project?

**Answer:** The tecnologies used in this project are [NodeJS](https://nodejs.org/en/) + [Express Framework](http://expressjs.com/en/) to handle the server & [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) to develop amazing views.
##

**Question:** Are all kind of users able to create rooms?

**Answer:** The application has two kind of users: Visitors and Administrators. As a administrator, you're able to create, delete and view all the data related to rooms and also other users.

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [Fcamara](https://github.com/Raymw1/fcamara/issues) repository. If you already found a solution to your problem, **i would like to review your pull request**!

# :closed_book: License

Released in 2020.
This project is under the [MIT license](https://github.com/Raymw1/fcamara/blob/master/LICENSE).

Made with love by [Raymw1](https://github.com/Raymw1), [Lilian Nicolau](https://github.com/LilianNicolau) e [Esther Pimentel](https://github.com/EstherPimentel) 💜🚀
