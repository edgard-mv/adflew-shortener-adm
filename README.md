# SPA for URL shortening restful API

`adflew-shortener-adm` contains an example of a React project that serves as the front-end for a url shortener restful api. This application uses:

- React Query
- MUI (previously know as Material UI)
- React Router

## How to start

Manually clone this repository. Project is ready to run (with some requirements). You need to clone and run:

```sh
$ git clone https://github.com/edgard-mv/adflew-shortener-adm.git .
$ npm install
```

Before executing `npm start`, there is some setup that needs to be done. We need to create a `.env` file in the root folder with the following variables:

- `PORT`: The port in which this app will be serve
- `REACT_APP_API_URL`: The URL to the api that serves as back-end

And we're done!

```
$ npm start
```
