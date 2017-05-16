import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero'
import { HeroService } from './hero.service';

/*
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
*/

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  /*
  template: `<!--<h1>{{title}}</h1>-->
             <!--<h2>{{hero.name}} details!</h2>-->

             <h2>My Heroes</h2>
             <ul class="heroes">
               <li *ngFor = "let hero of heroes"   [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
                 <!-- each hero goes here -->
                   <span class="badge">{{hero.id}}</span> {{hero.name}}
               </li>
             </ul>
             <!--<hero-detail [hero]="selectedHero"></hero-detail>-->
             <div *ngIf="selectedHero">
               <h2>
                 {{selectedHero.name | uppercase}} is my hero
               </h2>
               <button (click)="gotoDetail()">View Details</button>
             </div>


             <!--
             <div>
                <label>name: </label>
                <input [(ngModel)]="hero.name" placeholder="name">
             </div>
             <div><label>id: </label> {{hero.id}}</div>
             <div><label>name: </label> {{hero.name}}</div>-->`,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],*/


  //providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService,
              private router: Router) { }

  title = 'Tour of Heroes';
  //heroes = HEROES;
  heroes: Hero[];
  selectedHero: Hero;

  /*
  getHeroes(): void {
   this.heroes = this.heroService.getHeroes();
 }
 */
 getHeroes(): void {
   this.heroService.getHeroes().then(heroes => this.heroes = heroes);
 }

  ngOnInit(): void {
   this.getHeroes();
 }

 onSelect(hero: Hero):void {
   this.selectedHero = hero;
 }

 gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]);
}

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.create(name)
    .then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
}

delete(hero: Hero): void {
  this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
}
/*
 getHeroes(): Promise<Hero[]> {
  return Promise.resolve(HEROES);
}

getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
}
*/



  /*
  hero: Hero = {
    id: 1,
    name: 'windstorm'
  };
  */
}
