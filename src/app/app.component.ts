import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  amount1: number;
  currency1: 'ZAR';
  amount2: number;
  currency2: 'USD';

  currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'ZAR'];

  constructor() {}

  async ngOnInit() {
    // Get all currencies ratios (so sw can cache them)
    this.currencies.forEach(cur1 => {
      this.currencies.forEach(cur2 => {
        fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${cur1}_${cur2}&compact=ultra`);
      });
    });
  }

  async convert() {
    try {
      const conversionObj = await (await fetch(
        `https://free.currencyconverterapi.com/api/v5/convert?q=${this.currency1}_${this.currency2}&compact=ultra`
      )).json();
      const ratio = Object.values(conversionObj)[0];
      this.amount2 = +ratio * +this.amount1;
    } catch (error) {
      console.error('[ERROR]:', error);
    }
  }
}
