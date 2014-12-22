# Translatio!

Translate Characters to Secret Runes, Oooh! 

# Setup

Below are commands to initialize Translatio.  If you get an error while npm i'ing, see the second part.  Ensure you have mongo (and of course node, npm, and gulp) installed to run this project.

```
git clone https://github.com/dzoba/translate.git
cd translate
npm i
gulp less; gulp uglify; npm start
```

If you get an error when doing npm i, it is most likely because of an issue with the node-canvas module.  Perform the following two steps on OSX to avoid this error:

```
brew install cairo
export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig
```

For Ubuntu, use these commands:

```
sudo apt-get update 
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
```

For other OSes, refer here: https://github.com/Automattic/node-canvas/wiki

# The highlights
The app is a single page which translates characters in a text box to identicon 'runes' for the user.  The app makes use of Express and mongodb to create an API which the user input is passed over, and the runes and count of rune use is passed back to the client via ajax. API functions are stored in routes/index.js.

Translatio uses gulp for uglifying js and compiling less.  Clientside js is kept in client/index.js and minified to public/javascripts.  Less is kept in less/ and compiled to public/stylesheets.

On the front end, a simple bootstrap layout is used.  A backbone view is instantiated to manage the user interaction.  Public CDNs are used to load in Backbone, Bootstrap, underscore, and jquery.

Dust is the templating engine, with the primary page template being in views/layout.dust.  This template calls in both the header and the footer, and provides space for the body to go.  The index page template is kept in views/index.dust.

# Demo

You can view a working demo app here: http://sonosmith.com:3000/

Additionally, here is a short gif of the app in action:

![Translatio Demo](http://i.imgur.com/fLLY0PB.gif)
