[![Build Status][travis-badge]][travis-badge-url]
[![Coverage Status][coveralls-badge]][coveralls-badge-url]
[![Dependency Status][david-badge]][david-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

[travis-badge]: https://travis-ci.org/fjrd84/health-nlp-frontend.svg?branch=master
[travis-badge-url]: https://travis-ci.org/fjrd84/health-nlp-frontend
[coveralls-badge]: https://coveralls.io/repos/github/fjrd84/health-nlp-frontend/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/fjrd84/health-nlp-frontend?branch=master
[david-badge]: https://david-dm.org/fjrd84/health-nlp-frontend.svg
[david-badge-url]: https://david-dm.org/fjrd84/health-nlp-frontend
[david-dev-badge]: https://david-dm.org/fjrd84/health-nlp-frontend/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/fjrd84/health-nlp-frontend?type=dev

# HealthNlpFrontend

This repository contains the frontend part of the ***health-nlp*** project.

The ***health-nlp*** project is an NLP (Natural Language Processing) demo composed by the following repositories:

- [health-nlp-frontend](https://github.com/fjrd84/health-nlp-frontend): frontend part. It displays the results of the analysis (stored in firebase) and explains everything about the project. It is an Angular based web application.
- [health-nlp-node](https://github.com/fjrd84/health-nlp-node): nodeJS/express backend for the health-nlp-angular frontend. It takes new job requests and sends them to the beanstalkd job queue.
- [health-nlp-analysis](https://github.com/fjrd84/health-nlp-analysis) (this repository): it processes jobs from beanstalkd and sends the results to firebase. It is a Python project.

This project is still on an early stage of development. As soon as there's an online demo available, you'll find a link here.

[Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.31 was used to scaffold the first commit of this repository.

## Development server

Run `npm start` or `ng serve` to start a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
