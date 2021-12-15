![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)


# Energy Watch

:zap::boom: [Project Link](https://energy-watch-frontend.vercel.app/)

This is the frontend of Energy Watch project. Users can monitor the energy consumption of facilities and performs basic CRUD operations. It is also multilingual.



## Table of Contents

* [Technologies](#technologies)
* [Features](#features)
* [Project Setup](#project-setup)

## Technologies

- Vue.js
- VueRouter
- Vuex
- BootstrapVue
- Sass
- i18n


## Features

- User can perform basic CRUD operations 
- Users can record and view custom fileds. It gives the appearance of a new column being created.
- **Only user created custom columns can be deleted.**
- Users can login and register.
- User authentication and authorization is proivded with JWT.
- **User roles are; Admin (read, write, delete), Editor (read, write), User(write).**
- Its a multilingual app, users can change language.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
