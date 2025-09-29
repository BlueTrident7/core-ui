import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CardModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // texts: string[] = [
  //   'Improve your investment decisions and increase profitability through informed strategies',
  //   'Plan, protect and visualize your wealth',
  //   'Visualize your wealth, create a fair inheritance plan and keep important documents safe on one platform',
  // ];

  // colors: string[] = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1'];
  // currentText = this.texts[0];
  // currentColor = this.colors[0];

  // ngOnInit(): void {
  //   setInterval(() => this.changeText(), 4000);
  // }

  // changeText() {
  //   const nextIndex = Math.floor(Math.random() * this.texts.length);
  //   this.currentText = this.texts[nextIndex];

  //   const colorIndex = Math.floor(Math.random() * this.colors.length);
  //   this.currentColor = this.colors[colorIndex];

  //   const animations = [
  //     'rotateUp',
  //     'rotateDown',
  //     'rotateLeft',
  //     'rotateRight',
  //     'zoomIn',
  //     'zoomOut',
  //   ];
  //   const animationIndex = Math.floor(Math.random() * animations.length);
  //   this.animationClass = animations[animationIndex];
  // }

  // animationClass = 'rotateUp';

  // texts: string[] = [
  //   'Improve your investment decisions and increase profitability through informed strategies',
  //   'Plan, protect and visualize your wealth',
  //   'Visualize your wealth, create a fair inheritance plan and keep important documents safe on one platform',
  // ];

  // colors: string[] = ['#FFEB3B', '#FFD700', '#FF6F61', '#F7CAC9', '#FFFFFF'];

  // currentText = this.texts[0];
  // currentColor = this.colors[0];

  // animationClass = 'rotateUp';

  // ngOnInit(): void {
  //   setInterval(() => this.changeText(), 4000);
  // }

  // changeText() {
  //   const nextIndex = Math.floor(Math.random() * this.texts.length);
  //   this.currentText = this.texts[nextIndex];

  //   const colorIndex = Math.floor(Math.random() * this.colors.length);
  //   this.currentColor = this.colors[colorIndex];

  //   const animations = [
  //     'rotateUp',
  //     'rotateDown',
  //     'rotateLeft',
  //     'rotateRight',
  //     'zoomIn',
  //     'zoomOut',
  //   ];
  //   const animationIndex = Math.floor(Math.random() * animations.length);
  //   this.animationClass = animations[animationIndex];
  // }

  texts: string[] = [
    'Improve your investment decisions and increase profitability through informed strategies',
    'Plan, protect and visualize your wealth',
    'Visualize your wealth, create a fair inheritance plan and keep important documents safe on one platform',
    'Turn your dreams into plans.',
    'Consistency is the key to mastery.',
  ];

  colors: string[] = [
    '#1B1B1B', // dark gray
    '#2C2C54', // dark blue
    '#3B3B98', // indigo
    '#6F1E51', // deep purple
    '#E55039', // reddish
    '#1B9CFC', // bright blue
    '#2ED573', // bright green
  ];

  currentText = this.texts[0];
  currentColor = this.colors[0];

  animationClass = 'rotateUp';

  gradientColors: string[] = [
    '#A0E7E5', // soft aqua
    '#B4F8C8', // mint green
    '#D0BFFF', // lavender
    '#FFEAA7', // soft yellow
    '#FFCAD4', // pastel pink
    '#FFF5BA', // light cream
    '#FFDDD2', // soft peach
  ];

  currentGradientIndex = 0;

  ngOnInit(): void {
    setInterval(() => this.changeText(), 4000);
    setInterval(() => this.changeGradient(), 3000);
  }

  changeText() {
    const nextIndex = Math.floor(Math.random() * this.texts.length);
    this.currentText = this.texts[nextIndex];

    const colorIndex = Math.floor(Math.random() * this.colors.length);
    this.currentColor = this.colors[colorIndex];

    const animations = [
      'rotateUp',
      'rotateDown',
      'rotateLeft',
      'rotateRight',
      'zoomIn',
      'zoomOut',
    ];
    const animationIndex = Math.floor(Math.random() * animations.length);
    this.animationClass = animations[animationIndex];
  }

  changeGradient() {
    this.currentGradientIndex =
      (this.currentGradientIndex + 1) % this.gradientColors.length;
    const container = document.querySelector(
      '.rotating-text-background'
    ) as HTMLElement;
    if (container) {
      const nextColor = this.gradientColors[this.currentGradientIndex];
      container.style.background = `linear-gradient(135deg, ${nextColor}, ${
        this.gradientColors[
          (this.currentGradientIndex + 1) % this.gradientColors.length
        ]
      }, ${
        this.gradientColors[
          (this.currentGradientIndex + 2) % this.gradientColors.length
        ]
      })`;
    }
  }
}
