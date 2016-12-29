/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { BannerInlineTemplateComponent } from './banner-inline-template.component';


describe('BannerInlineTemplateComponent (inline template)', () => {

  let comp:    BannerInlineTemplateComponent;
  let fixture: ComponentFixture<BannerInlineTemplateComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerInlineTemplateComponent ] // declare the test component
      // Automatic change detection - comment providers for manual detection
      // providers: [
      //   { provide: ComponentFixtureAutoDetect, useValue: true } 
      // ]
    });

    fixture = TestBed.createComponent(BannerInlineTemplateComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  // ### Manual change detection
  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });
  // ### END Manual change detection ( https://embed.plnkr.co/?show=preview&show=app%2Fbanner-inline.component.spec.ts )



  // // ### Automatic change detection
  // it('should display original title', () => {
  //   // Hooray! No `fixture.detectChanges()` needed
  //   expect(el.textContent).toContain(comp.title);
  // });

  // it('should still see original title after comp.title change', () => {
  //   const oldTitle = comp.title;
  //   comp.title = 'Test Title';
  //   // Displayed title is old because Angular didn't hear the change :(
  //   expect(el.textContent).toContain(oldTitle);
  // });

  // it('should display updated title after detectChanges', () => {
  //   comp.title = 'Test Title';
  //   fixture.detectChanges(); // change detection explicitly
  //   expect(el.textContent).toContain(comp.title);
  // });

  // /* NOTE: The second and third test reveal an important limitation. 
  //   The Angular testing environment does not know that the test changed the component's title. 
  //   The ComponentFixtureAutoDetect service responds to asynchronous activities such as promise resolution, timers, and DOM events. But a direct, synchronous update of the component property is invisible. The test must call fixture.detectChanges() manually to trigger another cycle of change detection. */
  
  // // ### END Automatic change detection
});