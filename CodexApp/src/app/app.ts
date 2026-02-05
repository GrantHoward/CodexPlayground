import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api, Item, WeatherForecast } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Codex Playground');
  items: Item[] = [];
  weather: WeatherForecast[] = [];
  newItem: Item = { id: 0, name: '', description: '' };
  loading = false;
  error = '';

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadItems();
    this.loadWeather();
  }

  loadItems() {
    this.loading = true;
    this.error = '';
    this.api.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load items: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadWeather() {
    this.api.getWeatherForecast().subscribe({
      next: (data) => {
        this.weather = data;
      },
      error: (err) => {
        console.error('Failed to load weather:', err);
      }
    });
  }

  addItem() {
    if (!this.newItem.name) return;
    
    const item: Item = {
      id: this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1,
      name: this.newItem.name,
      description: this.newItem.description
    };

    this.api.createItem(item).subscribe({
      next: (data) => {
        this.items.push(data);
        this.newItem = { id: 0, name: '', description: '' };
      },
      error: (err) => {
        this.error = 'Failed to create item: ' + err.message;
      }
    });
  }

  deleteItem(id: number) {
    this.api.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== id);
      },
      error: (err) => {
        this.error = 'Failed to delete item: ' + err.message;
      }
    });
  }
}
