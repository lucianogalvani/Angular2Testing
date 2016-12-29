/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { HeroService } from './model';
import { FakeHeroService } from './testing/fake-hero.service';

import { click } from '../../testing';

/**
 * As a rule you test the component, not the router, and care only if the component navigates with the right address under the given conditions. 
 * Stubbing the router with a test implementation is an easy option. This should do the trick.
 */
class RouterStub {
  navigateByUrl(url: string) { return url; }
}

let component:  DashboardComponent;
let fixture:    ComponentFixture<DashboardComponent>;
let heroEl:     DebugElement;


describe('DashboardComponent (shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas:      [NO_ERRORS_SCHEMA]
    });
  });

  compileAndCreate();

  tests(clickForShallow);

  function clickForShallow() {
    // get first <dashboard-hero> DebugElement
    const heroEl = fixture.debugElement.query(By.css('dashboard-hero'));
    heroEl.triggerEventHandler('selected', component.heroes[0]);
  }
});

/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
  // #docregion compile-and-create-body
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useClass: FakeHeroService },
        { provide: Router,      useClass: RouterStub }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
    });
    // #enddocregion compile-and-create-body
  }));
}


function tests(heroClick: Function) {

  it('should NOT have heroes before ngOnInit', () => {
    expect(component.heroes.length).toBe(0,
      'should not have heroes before ngOnInit');
  });

  it('should NOT have heroes immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(component.heroes.length).toBe(0,
      'should not have heroes until service promise resolves');
  });

  describe('after get dashboard heroes', () => {

     // Trigger component so it gets heroes and binds to them
     beforeEach( async(() => {
        fixture.detectChanges(); // runs ngOnInit -> getHeroes
        fixture.whenStable() // No need for the `lastPromise` hack!
          .then(() => fixture.detectChanges()); // bind to heroes
     }));

    it('should HAVE heroes', () => {
      expect(component.heroes.length).toBeGreaterThan(0,
        'should have heroes after service promise resolves');
    });

    it('should DISPLAY heroes', () => {
      // Find and examine the displayed heroes
      // Look for them in the DOM by css class
      const heroes = fixture.debugElement.queryAll(By.css('dashboard-hero'));
      expect(heroes.length).toBe(4, 'should display 4 heroes');
    });

    it('should tell ROUTER to navigate when hero clicked',
      inject([Router], (router: Router) => { // ...

      const spy = spyOn(router, 'navigateByUrl');

      heroClick(); // trigger click on first inner <div class="hero">

      // args passed to router.navigateByUrl()
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to id of the component's first hero
      const id = component.heroes[0].id;
      expect(navArgs).toBe('/heroes/' + id,
        'should nav to HeroDetail for first hero');
    }));

  });
}
