import {Point} from "../models/user";
const async = require('async');

const request = require('request');

export function retrieveWeather(url, callback) {
  const options = {
    url :  url,
    json : true,
    headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
    'User-Agent': 'my-client'
    }
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}

let buildUrls = {
    forecast: (points: Point[])=>points.map(point=>`https://api.weather.gov/points/${point.coordinates[0]},${point.coordinates[1]}/forecast`),
    location: (points: Point[])=>points.map(point=>`https://api.weather.gov/points/${point.coordinates[0]},${point.coordinates[1]}`),
};

export function weatherEnrichment(objects){
    let tempEnrichment = new Promise(function(resolve, reject){async.map(buildUrls.forecast(objects.map(user=>user.point)), retrieveWeather, function (err, res){
            if (err) return res.status(500).json(err);
            objects = objects.map((user: any, index) =>{
              user.dataValues.temperature = `${res[index].properties.periods[0].temperature} ${res[index].properties.periods[0].temperatureUnit}`;
              return user;
            });
            resolve(objects);
            return objects;
          })});
      let locationEnrichment = new Promise(function(resolve, reject){async.map(buildUrls.location(objects.map(user=>user.point)), retrieveWeather, function (err, res){
        if (err) return res.status(500).json(err);
        objects = objects.map((user: any, index) =>{
          user.dataValues.location = {city: res[index].properties.relativeLocation.properties.city,
                                      state: res[index].properties.relativeLocation.properties.state};
          return user;
        });
        resolve(objects);
        return objects;
      })});
     return Promise.all([tempEnrichment, locationEnrichment])
}