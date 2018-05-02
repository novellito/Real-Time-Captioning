# RTC
![landing](https://user-images.githubusercontent.com/21237266/39331554-c10e3794-4959-11e8-86fa-9cd3a38e5695.jpg)
## Features

![features](https://user-images.githubusercontent.com/21237266/39331557-c29fad2c-4959-11e8-87bb-8d604ac7aff8.PNG)

### Text Expansion
![unravel](https://user-images.githubusercontent.com/21237266/39331496-99b32a9c-4959-11e8-99fb-e676e42d5a43.gif)

### Distraction Free Mode
![Distraction free mode](https://user-images.githubusercontent.com/21237266/39331923-bb180a62-495a-11e8-87ec-853347266b53.gif)


## Dependencies & Setup 
Make sure you have a version of node.js that's at least version 6.0 or above. To check what version you have run `node -v`

To use the angular cli, you will need to install it from [here](https://cli.angular.io/)

You will also need to have mongodb installed on your computer. 

   * [Windows Setup](https://www.youtube.com/watch?v=1uFY60CESlM)

   * You will need to lookup how to set it up on a Mac :(

## Folder Structure

This highlights the location of the major folders
```
rtc/
 ├──backend
 |      └── config
 |            └── database.js
 |      └── routes
 |      └── controllers
 |      └── index.js
 |      └── package.json
 |
 ├── src
 |    └── app
 |         └── components
 |         └── guards
 |         └── services     
 |    └── styles.scss
 |    └── index.html
 ```
 
 
 `styles.scss` defines the global styles for the project 
 
 `index.js` is the starting point of the backend

## Running the project

<h3> Starting the backend of the application </h3>

* Navigate to the backend directory (`cd backend`) and run`node index.js` (or `nodemon`). <b>Note you may have to run `npm install` if it's your first time running the app</b>

* In one terminal window run `mongod` to start up mongodb

<h3> Starting the frontend of the application </h3>

 * Run `ng serve` (on another terminal window) for a dev server. Navigate to `http://34.209.157.38:4200/`. The app will automatically reload if you change any of the source files. <b>Note you may have to run `npm install` if it's your first time running the app</b>
 
 
## Code scaffolding 

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.


## Useful Resources

[Mongoose Docs](http://mongoosejs.com/)

[Express.js Docs](https://expressjs.com/)

[Angular Docs](https://angular.io/)

[Node.js Docs](https://nodejs.org/dist/latest-v8.x/docs/api/)

[Bootstrap Material Design Styles](https://mdbootstrap.com/) - Use this when you are making your components as this project was initialized with the material design theme.

[RoboMongo](https://robomongo.org/) -- A GUI for seeing your collections (Similar to MySQL Work Bench)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
