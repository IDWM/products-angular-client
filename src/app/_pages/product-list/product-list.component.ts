import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  apiUrl: string = 'https://fakestoreapi.com/products';
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe((products) => {
      this.products = products;
    });
  }

  floorRating(rating: number): number {
    return Math.floor(rating);
  }
}
