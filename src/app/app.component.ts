import { Component } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { Router, RouterModule, Routes } from '@angular/router';



import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroesComponent,
    FormsModule,
    MessagesComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tour of Heroes';
}
