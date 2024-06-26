import { Component } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HEROES } from '../mock-heroes';
import { NgFor } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    HeroDetailComponent,
    RouterModule
   ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})



export class HeroesComponent  implements OnInit {
  constructor(private heroService: HeroService, private messageService: MessageService) {}

  //heroes = HEROES;
  
  heroes: Hero[] = [];

  
  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }


  ngOnInit(): void {
    this.getHeroes();
  }
}
