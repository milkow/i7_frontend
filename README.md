# I7frontend

# Build the docker image:

    docker build -t registry.gitlab.com/meme7/i7/i7_frontend .

# Copy dist folder from container to the host:

    docker run \
        --rm \
        -v /home/jroslaniec/Projects/i7_root/i7_frontend/dist/:/dist/ \
        registry.gitlab.com/meme7/i7/i7_frontend \
        cp -r /src/dist/ /

# Deploy to aws s3

Firstly you need these environment variables:

    export AWS_ACCESS_KEY_ID=<key_here>
    export AWS_SECRET_ACCESS_KEY=<key_here>

Then run:

    docker run \
        --rm \
        -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
        -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
        registry.gitlab.com/meme7/i7/i7_frontend deploy

# About

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
