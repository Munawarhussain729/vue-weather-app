
const WeatherObjCons = ({temperature,feelsLike, weather, windSpeed, minTemp, maxTemp, name}) => {
    return {
        "temperature":(temperature - 273.15).toFixed(2),
        "feels-like":feelsLike,
        "weather":weather,
        "windspeed":windSpeed,
        "mintemp":(minTemp-273.15).toFixed(2),
        "maxtemp":(maxTemp-273.15).toFixed(2),
        "location":name
    }
    
}

export default WeatherObjCons