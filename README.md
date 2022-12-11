# Scheduler

Scheduler is single page application built using React to create meetings for students to connect with mentors in real time. It offers 5 appointments per day from 12pm to 5pm, Monday - Friday.

The user is to click on an empty appointment where they can then proceed to fill out the form to submit their interview spot. Upon completion of the form, the user will have the option to edit or delete their interveiw. During this process the open appointments or 'spots' will update on the list of avalible days.

See GIF below for functionality

## Set up

Install all dependencies with `npm install`

##### Dependencies include:

- axios: 0.20.0
- classnames: ^2.2.6
- normalize.css: ^8.0.1
- react: ^16.9.0
- react-dom: ^16.9.0
- react-hooks-testing-library: ^0.6.0
- react-scripts: 3.0.0

## Running Webpack Development Server

`npm start`

## Running Jest test Framework

`npm test`

## Running Storybook visual tests

`npm run storybook`

## Runnig the API server

To populate the scheduler app, first fork and clone [this repo](https://github.com/Cheryet/scheduler-api) and follow the instructions on the README

## Final Product

#### Apointments Page

![screenshot](https://github.com/Cheryet/Scheduler/blob/master/docs/appointments.png)

#### Booking Appointment

![screenshot](https://github.com/Cheryet/Scheduler/blob/master/docs/book-appointment.png)

#### Deleting Appointment

![screenshot](https://github.com/Cheryet/Scheduler/blob/master/docs/delete-appointments.png)

#### a GIF for fun 😁

![GIF](https://github.com/Cheryet/Scheduler/blob/master/docs/scheduler-app.gif)
