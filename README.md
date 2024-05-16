
## CHANGES to make tutorial WORK.

Lets make this work the new way from the beginning, since the later parts of the tutorial are not using ngmodule

`ng new angular-tour-of-heroes`

Rest of creat project page is ok.

## Part 1 - The hero editor

after ng generate component heroes, the old way would link it automatically. This is on us now.

IN app.components.ts
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

Also, we need to add the module for the uppoercase pipe, which is in CommonModule, and it needs to go in the heroes.component


IN heroes.component.ts
ADD
```
import { CommonModule } from '@angular/common';
```

CHANGE
```
  imports: [ CommonModule ],
```


This is the same place we will add the FormModule too, which is also the next change.

To Add the formsmodule, make these changes in (NOT in the app.module, we are putting in the hero components)

IN heroes.component.ts
ADD
````
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
```

CHANGE
```
  imports: [ CommonModule,
    FormsModule
   ],
```


-----------

## Part 2 - Display a list.

NOTES

on displaying heroes:
THe export class HeroesComponent REPLACES the existing export.  Once this is changed, the page will be broken until the html template is also updated.


style the heros:
This is a little confusing. the file they are showing as an example will not match ours.There is nothing to change in the file they are showing, it was to point out the link to the css file - don't change anything in the component.ts - only add the css from the bottom of the page to the empty heroes.component.css

add a click binding:
you add adding, not replacing. add "(click)="onSelect(hero)"" inside the button html

the add click event handler
The code gets added to the "export class HeroesComponent ", so it looks like this:
```
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
```

the add a details section:
This gets added to the bottom of the html.

style the selected hero: 
This gets added inside the button tag, so now it looks like this:
`   <button type="button"  (click)="onSelect(hero)" [class.selected]="hero === selectedHero">`


## 3 - Create a feature component.

Make the HeroDetailComponent
There are some imports missing to make this work.

IN dero-detail.components.ts
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



