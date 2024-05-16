
## CHANGES to make the Angular tutorial WORK.

There is inconsistency in how the different pages were written.
Lets make this work without using NgModule, i.e. the components are now standlone, since the later parts of the tutorial look to be standalone.

`ng new angular-tour-of-heroes`

The create project page is ok, and no changes are necessary here.

## Part 1 - The hero editor

After running `ng generate component heroes`, it link it automatically with NgModule. This is on us now?

IN `app.component.ts`

ADD
```
import { HeroesComponent } from './heroes/heroes.component';
```

CHANGE
```
  imports: [RouterOutlet,
    HeroesComponent,
  ],
```


-----------

Also, we need to add the module for the uppercase pipe, which is in CommonModule. This goes in the heroes.component


IN `heroes.component.ts`

ADD
```
import { CommonModule } from '@angular/common';
```

CHANGE
```
  imports: [ CommonModule ],
```


This is the same place we will add the FormModule too, which is also the next change.
To add the `formsmodule`, make these changes in (***NOT in the app.module as stated in the tutorial***, *we are adding the imports to the hero components*)

IN `heroes.component.ts`

ADD
```
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
```

CHANGE
```
  imports: [ CommonModule,
    FormsModule
   ],
```


## Part 2 - Display a list.

*NOTES*

### Displaying heroes:
The export class HeroesComponent *REPLACES* the existing export.  Once this is changed, the page will be broken until the html template is also updated.


### Style the heros:
This is a little confusing. the file they are showing as an example will not match ours.There is nothing to change in the file they are showing, it was to point out the link to the css file - don't change anything in the component.ts - only add the css from the bottom of the page to the empty `heroes.component.css`

### Add a click event binding:
This is adding, not replacing. add `(click)="onSelect(hero)"` inside the button html tag

### Add the click event handler:
This code gets added to the `export class HeroesComponent`, so it looks like this:
```
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
```

### Add a details section:
This gets added to the bottom of the html.

### Style the selected hero: 
This gets added inside the button tag, so now it looks like this:

`   <button type="button"  (click)="onSelect(hero)" [class.selected]="hero === selectedHero">`


## 3 - Create a feature component.

Make the HeroDetailComponent
There are some imports missing to make this work.

IN `hero-detail.component.ts`

ADD:
```
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { Input } from '@angular/core';
import { Hero } from '../hero';
```

CHANGE:
```
  imports: [CommonModule,
    FormsModule
  ],
```

Add the @Input() hero property
the Add the @Input() stuff goes in the export class HeroDetailComponent

## 4 - Add services

*NOTES*

### Create the Hero Service
The getHeroes() addition should be put in the `export class HeroService`

### Inject the HeroService
The constructor gets added at the top inside `export class HeroesComponent`

### Add getHeroes
Same thing, this gets added inside the `export class HeroesComponent`

### Call it in ngOnInit
Same thing, this gets added inside the `export class HeroesComponent`

We need to add an additional import

IN `heroes.component.ts`

ADD:
```
import { OnInit } from '@angular/core';
```

### Create MessagesComponent
After running the ng generate component messages, add the import to app.component.ts

IN `app.component.ts`

ADD:
```
import { MessagesComponent } from './messages/messages.component';
```

CHANGE:
```
  imports: [RouterOutlet,
    HeroesComponent,
    FormsModule,
    MessagesComponent
  ],
```

### Bind to the MessageService
The ngIf needs the common module imported

IN `messages.component.ts`

ADD:
```
import { CommonModule } from '@angular/common';
```

CHANGE:
```
  imports: [CommonModule],
```


## 5 - Add navigation

### Add the AppRoutingModule
This whole section is f*#%!ed.

Don NOT run `ng generate module app-routing --flat --module=app`.

The Routing is done differently in this version. We need to edit the app.routes.ts
and also import the routing into the app.

**ALSO**: Once the route is added, you will want to adjust your browser URL to `/heroes`, 
otherwise it will display a blank page.

Once the nav is added, there will be a nav bar available no matter which URL

IN `app.component.ts`

Changing RouterOutlet to RouterModule gives us all the routing functions, 
which are needed for the nav links

CHANGE:
```
import {  RouterModule } from '@angular/router';

```

CHANGE: 
```
  imports: [RouterModule,
    HeroesComponent,
    FormsModule,
    MessagesComponent
  ],
```

IN `app.routes.ts`

CHANGE:
```
export const routes: Routes = [
    { path: 'heroes', component: HeroesComponent }
];
```


### Add RouterOutlet
Section should be ok.

### Add a navigation link using routerLink
Section should be ok.

### Add a dashboard view
The dashboard.component.ts needs an import for the CommonModule (for ngFor),
and needs to be declared as standalone so that it can import the module.

Corrected version of `dashboard.component.ts`
```
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [ CommonModule,
      RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
```

### Add the dashboard route
***Lies!***  We are adding this to the app.routes.ts, not their module.
We are adding one more route, the example of what this looks like will be below.

### Add a default route
***More lies!*** We are adding this to the app.routes.ts, not their module.

IN `app.routes.ts`

ADD:
```
import { DashboardComponent } from './dashboard/dashboard.component';
```

CHANGE:
```
export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'heroes', component: HeroesComponent } 
];
```

### Add dashboard link to the shell
Section should be ok.


### Add a hero detail route
All of these edits should be to the `app.routes.ts` INSTEAD of the module.
