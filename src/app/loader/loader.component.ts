import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() isVisible: boolean = false;

  ngOnInit() {
    this.generateMatrix();
  }

  private generateMatrix() {
    const matrix = document.getElementById("matrix");
    if (!matrix) return;
    const columns = Math.floor(window.innerWidth / 40); // fewer columns since half screen
    for (let i = 0; i < columns; i++) {
      const row = document.createElement("div");
      row.className = "matrix-row";
      row.style.animationDelay = `${Math.random() * 5}s`;
      row.style.position = "absolute";
      row.style.left = `${i * 20}px`;
      row.innerText = Array(40).fill(0).map(() => Math.random() > 0.5 ? "1" : "0").join(" ");
      matrix.appendChild(row);
    }
  }
}
