### Express Angular App with Gulp

This project is a demo app for Express with Angular JS and Gulp taskrunner. You can use this as a base project and extend it according to your needs. This app also has gulp tasks for JS/CSS minification using Google's Closure compiler.

This project came up when I wanted to move to Javascript based Environment. Do share your feedback, suggestions or comments.

### Getting Started - Prerequisite and Installation

Getting started with this app should be easy. You need to have Node.js and npm installed in your machine.

Once you have npm, just clone the app and install. Here's how you can install:

```
npm install
```

After installing, check if you are able to run forever command. If not, then you'll need to install forever globally on your machine.

forever, is a npm module which lets you run your node server in the background.

```
//check if you are able to run forver
forever start server.js
```

```
//If forever is not installed, you can use the below command to install forever module globally
npm install -g forever
```

Once the server has started, you can start the Gulp taskrunner to listen to file changes.

```
// If you just want to only concatenate JS/CSS files
gulp --concatenate

// If you just want to also minify JS/CSS files
gulp --minify

// For production
gulp --production

```

## License

MIT License
