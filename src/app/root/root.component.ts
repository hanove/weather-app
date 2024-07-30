import { Component, OnInit, ɵdetectChangesInViewIfRequired } from '@angular/core';
import { WeatherRestService } from '../services/rest-services/weather-rest.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent implements OnInit {
  private lat: any;
  private lng: any;
  public city: string = "Medianeira, Paraná";
  public image!: string;
  public temperature!: number;
  public isDay!: boolean;
  public weatherDescription!: string;
  private weatherCode!: number;
  public cardBackgroundClass: string = 'default-weather';

  constructor(private fetchWeather: WeatherRestService) { }

  ngOnInit(): void {
    // this.getWeather();
  }

  getBackgroundClass(): string {
    switch (this.weatherCode) {
      case 0:
        return this.isDay ? 'clear-sky-day' : 'clear-sky-night';
      case 1:
        return this.isDay ? 'cloudy-day' : 'cloudy-night';
      case 2:
        return this.isDay ? 'cloudy-day' : 'cloudy-night';
      case 3:
        return this.isDay ? 'cloudy-day' : 'cloudy-night';
      case 45:
        return this.isDay ? 'fog-day' : 'fog-night';
      case 48:
        return this.isDay ? 'fog-day' : 'fog-night';
      case 51:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 53:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 55:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 56:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 57:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 61:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 63:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 65:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 66:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 67:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 71:
        return this.isDay ? 'snow-day' : 'snow-night';
      case 73:
        return this.isDay ? 'snow-day' : 'snow-night';
      case 75:
        return this.isDay ? 'snow-day' : 'snow-night';
      case 77:
        return this.isDay ? 'snow-day' : 'snow-night';
      case 80:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 81:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 82:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 85:
        return this.isDay ? 'snow-day' : 'snow-night';
      case 86:
        return this.isDay ? 'snow-day' : 'snow-night';
      case 95:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 96:
        return this.isDay ? 'rain-day' : 'rain-night';
      case 99:
        return this.isDay ? 'rain-day' : 'rain-night';
      default:
        return 'default-weather';
    }
  }

  getWeather() {
    this.fetchWeather.getGeocode(this.city).then((data) => {
      this.lat = data.lat;
      this.lng = data.lng;
      console.log(this.lat, this.lng);

      this.fetchWeather.getWeather(this.lat, this.lng).then((data) => {
        console.log(data);
        this.temperature = data.temperature;
        this.isDay = data.is_day == 1 ? true : false;
        this.weatherCode = data.weathercode;
        this.weatherDescription = data.weatherDescription;
        this.image = this.getImage(this.weatherCode, this.isDay);
        this.cardBackgroundClass = this.getBackgroundClass();
      }
      );
    }
    );
  }

  getImage(weatherCode: number, isDay: boolean): string {
    switch (weatherCode) {
      case 0:
        return isDay ? 'assets/weather-images/clear-day.png' : 'assets/weather-images/clear-night.png';
      case 1:
        return isDay ? 'assets/weather-images/cloudly-day.png' : 'assets/weather-images/cloudly-night.png';
      case 2:
        return isDay ? 'assets/weather-images/partly-cloud-day.png' : 'assets/weather-images/partly-cloud-night.png';
      case 3:
        return isDay ? 'assets/weather-images/cloudly-day.png' : 'assets/weather-images/cloudly-night.png';
      case 45:
        return isDay ? 'assets/weather-images/fog.png' : 'assets/weather-images/fog.png';
      case 48:
        return isDay ? 'assets/weather-images/fog.png' : 'assets/weather-images/fog.png';
      case 51:
        return isDay ? 'assets/weather-images/light-rain.png' : 'assets/weather-images/light-rain.png';
      case 53:
        return isDay ? 'assets/weather-images/light-rain.png' : 'assets/weather-images/light-rain.png';
      case 55:
        return isDay ? 'assets/weather-images/light-rain.png' : 'assets/weather-images/light-rain.png';
      case 56:
        return isDay ? 'assets/weather-images/light-rain.png' : 'assets/weather-images/light-rain.png';
      case 57:
        return isDay ? 'assets/weather-images/light-rain.png' : 'assets/weather-images/light-rain.png';
      case 61:
        return isDay ? 'assets/weather-images/rain.png' : 'assets/weather-images/rain.png';
      case 63:
        return isDay ? 'assets/weather-images/rain.png' : 'assets/weather-images/rain.png';
      case 65:
        return isDay ? 'assets/weather-images/rain.png' : 'assets/weather-images/rain.png';
      case 66:
        return isDay ? 'assets/weather-images/rain.png' : 'assets/weather-images/rain.png';
      case 67:
        return isDay ? 'assets/weather-images/rain.png' : 'assets/weather-images/rain.png';
      case 71:
        return isDay ? 'assets/weather-images/snow.png' : 'assets/weather-images/snow.png';
      case 73:
        return isDay ? 'assets/weather-images/snow.png' : 'assets/weather-images/snow.png';
      case 75:
        return isDay ? 'assets/weather-images/snow.png' : 'assets/weather-images/snow.png';
      case 77:
        return isDay ? 'assets/weather-images/snow.png' : 'assets/weather-images/snow.png';
      case 80:
        return isDay ? 'assets/weather-images/occasional-showers.png' : 'assets/weather-images/occasional-showers.png';
      case 81:
        return isDay ? 'assets/weather-images/light-showers.png' : 'assets/weather-images/light-showers.png';
      case 82:
        return isDay ? 'assets/weather-images/showers.png' : 'assets/weather-images/showers.png';
      case 85:
        return isDay ? 'assets/weather-images/snow.png' : 'assets/weather-images/snow.png';
      case 86:
        return isDay ? 'assets/weather-images/snow.png' : 'assets/weather-images/snow.png';
      case 95:
        return isDay ? 'assets/weather-images/thunderstorm.png' : 'assets/weather-images/thunderstorm.png';
      case 96:
        return isDay ? 'assets/weather-images/thunderstorm.png' : 'assets/weather-images/thunderstorm.png';
      case 99:
        return isDay ? 'assets/weather-images/thunderstorm.png' : 'assets/weather-images/thunderstorm.png';
      default:
        return 'assets/weather-images/clear-day.png';
    }
  }

}
