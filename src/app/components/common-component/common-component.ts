import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../common/header/header';
import { Footer } from '../../common/footer/footer';

@Component({
  selector: 'app-common-component',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './common-component.html',
  styleUrl: './common-component.scss'
})
export class CommonComponent {

}
