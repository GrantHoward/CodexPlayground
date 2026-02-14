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
  protected readonly items = signal<Item[]>([]);
  protected readonly weather = signal<WeatherForecast[]>([]);
  protected readonly newItemName = signal('');
  protected readonly newItemDescription = signal('');
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadItems();
    this.loadWeather();
  }

  loadItems() {
    this.loading.set(true);
    this.error.set('');
    this.api.getItems().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load items: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  loadWeather() {
    this.api.getWeatherForecast().subscribe({
      next: (data) => {
        this.weather.set(data);
      },
      error: (err) => {
        console.error('Failed to load weather:', err);
      }
    });
  }

  addItem() {
    if (!this.newItemName()) return;
    
    const item: Item = {
      id: this.items().length > 0 ? Math.max(...this.items().map(i => i.id)) + 1 : 1,
      name: this.newItemName(),
      description: this.newItemDescription()
    };

    this.api.createItem(item).subscribe({
      next: (data) => {
        this.items.update(items => [...items, data]);
        this.newItemName.set('');
        this.newItemDescription.set('');
      },
      error: (err) => {
        this.error.set('Failed to create item: ' + err.message);
      }
    });
  }

  deleteItem(id: number) {
    this.api.deleteItem(id).subscribe({
      next: () => {
        this.items.update(items => items.filter(i => i.id !== id));
      },
      error: (err) => {
        this.error.set('Failed to delete item: ' + err.message);
      }
    });
  }
}
