#!/usr/bin/env node
import moment from "moment-timezone";
import fetch from "node-fetch";
import minimist from "minimist";

const args = minimist(process.argv.slice(2))

if (args.h){
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
        -h            Show this help message and exit.
        -n, -s        Latitude: N positive; S negative.
        -e, -w        Longitude: E positive; W negative.
        -z            Time zone: uses tz.guess() from moment-timezone by default.
        -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
        -j            Echo pretty JSON from open-meteo API and exit.
    `);
    process.exit(0);
}

let timezone;
if (args.t) {
    timezone = args.t;
} else {
    timezone = moment.tz.guess();
}

if (args.h) {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
	console.log("    -h            Show this help message and exit.");
	console.log("    -n, -s        Latitude: N positive; S negative.");
	console.log("    -e, -w        Longitude: E positive; W negative.");
	console.log("    -z            Time zone: uses tz.guess() from moment-timezone by default.");
	console.log("    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
	console.log("    -j            Echo pretty JSON from open-meteo API and exit.");
	process.exit(0);
}

let lat
let long

if(args.n) {
    lat = args.n;
} else if (args.s) {
    lat = -args.s;
} else {
    console.log('LATITUDE must be in range');
}

if(args.n && args.s) {
    console.log('Provide only one LATITUDE');
    process.exit(0);
}

if(args.e) {
    long = args.e;
} else if (args.w) {
    long = -args.w;
} else {
    console.log('LONGITUDE must be in range');
}

if(args.e && args.w) {
    console.log('Provide only one LONGITUDE');
    process.exit(0);
}

const res = await fetch(url + 'latitude=' + `${latitude}` + '&longitude=' + `${longitude}` + '&daily=precipitation_hours&timezone=' + timezone);
const data = await response.json()

if (args.j) {
    console.log(data);
    process.exit(0);
}

const days = args.d;
const precip = data.daily.precipitation_hours;

let num_days;

if (days > 1) {
     day_str = "In " + days + " Days";
} else if (days > 1) {
     dat_str = "Today"
} else {
    day_str = "Tomorrow";
}

if (!days) {
    if (precipitation_hours_data[1] > 0) {
        console.log('You might need your galoshes ' + day_str);
    } else {
        console.log('You will not need your galoshes ' + day_str);
    }
} else if (precipitation_hours_data[days] > 0) {
    console.log('You might need your galoshes ' + day_str);
} else {
    console.log('You will not need your galoshes ' + day_str);
}
