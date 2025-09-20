# Project structure

Angular was mainly designed for Single Page Applications (SPA).

## index.html

The main HTML page, in which the angular app is going to live. Notice the presence of the component
<app-root>, which is going to be resolved by angular.

## main.ts

This code is responsible for bootstrapping the angular app.
- App, is the root component defined in app.ts/html/scss (notice that it gives the definition for <app-root>)
- app.config.ts gives appConfig, which gives the root providers (this topic will be addressed in dependency injection)

## app.routes.ts

The configuration of the router. This is at the core of an SPA. It gives the illusion of a multi-pages app
by telling which component to dynamically render for which url.

## styles.scss

Global stylesheet, as opposed to app.scss, which is style scoped to the component

## angular.json

Build configuration for the angular app

## package.json

Npm configuration, mainly
- to define npm scripts
- to list production and development dependencies (e.g. jest)

# Angular modules

These angular bricks tends to disappear in the most recent versions of angular, but it's important to understand
their anatomy

- declarations: components, directives and pipes belonging to a module. They'll have access to any module listed in section "imports", here below
- imports: modules made available in the current module
- exports: modules and other classes (components, directives and pipes) exported by the current module
- providers: instances for dependency injection

# Angular components

Exercise 1: Write a first component with some text inside a div. The text must be written in bold and red. This component must belong to a dedicated module and displayed in the root component.

Exercise 2: Display that component 3 times, by looping over the array ["blue", "red", "pink"]. Each instance must display the text in the related color

Exercise 3: Add a condition to hide the any component displayed in red and write message to tell the user that the component was hidden.

Exercise 4: Update your sources to work with a standalone component instead of a module

Exercise 5: Add a click event on a button to shift the colors in (e.g. ["blue", "red", "pink"] -> ["red", "pink", "blue"])