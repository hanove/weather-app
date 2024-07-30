import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherRestService {

  constructor() { }

  private geocodeKey = environment.geocodeKey;

  getGeocode(city: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${this.geocodeKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data && data.results && data.results.length > 0) {
            const result = data.results[0];
            const { formatted, geometry } = result;
            console.log('Geocode result:', geometry);
            resolve(geometry);
          } else {
            console.error('Geocode data not found in the response');
            reject();
          }
        })
        .catch(error => {
          console.error('Error fetching geocode data:', error);
          reject();
        });
    });
  }


  async getWeather(lat: any, lng: any): Promise<any> {
    const params = {
      "latitude": lat,
      "longitude": lng,
      "timezone": "America/Sao_Paulo",
      "models": "cma_grapes_global",
      "current_weather": "true"
    };

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current_weather=${params.current_weather}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.current_weather) {
        const currentWeather = data.current_weather;
        const weatherDescription = this.weatherCodeMapping[currentWeather.weathercode] || 'Unknown weather code';

        return { ...currentWeather, weatherDescription };

      } else {
        console.error('Current weather data not found in the response');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }

  }

  private weatherCodeMapping: { [key: number]: string } = {
    0: 'Céu limpo',
    1: 'Principalmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Nevoeiro',
    48: 'Nevoeiro com depósito de gelo',
    51: 'Chuvisco Leve',
    53: 'Chuvisco Moderado',
    55: 'Chuvisco Alta intensidade',
    56: 'Chuvisco congelante Leve',
    57: 'Chuvisco congelante Alta intensidade',
    61: 'Chuva Leve',
    63: 'Chuva Moderada',
    65: 'Chuva Alta intensidade',
    66: 'Chuva congelante Leve',
    67: 'Chuva congelante Alta intensidade',
    71: 'Nevasca Leve',
    73: 'Nevasca Moderada',
    75: 'Nevasca Alta intensidade',
    77: 'Neve Leve',
    80: 'Pancadas de chuva Leve',
    81: 'Pancadas de chuva Moderada',
    82: 'Pancadas de chuva Violenta',
    85: 'Pancadas de neve Leve',
    86: 'Pancadas de neve Alta intensidade',
    95: 'Tempestade Leve ou moderada',
    96: 'Tempestade com granizo leve',
    99: 'Tempestade com granizo pesado'
  };
}
