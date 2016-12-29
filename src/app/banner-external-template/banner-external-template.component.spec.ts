/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerExternalTemplateComponent } from './banner-external-template.component';

/*
The test setup for BannerComponent must give the Angular template compiler time to read the files. 
The logic in the beforeEach of the previous spec is split into two beforeEach calls. 
The first beforeEach handles asynchronous compilation.
https://embed.plnkr.co/?show=preview&show=app%2Fbanner.component.spec.ts
*/
describe('BannerExternalTemplateComponent', () => {
  let component: BannerExternalTemplateComponent;
  let fixture: ComponentFixture<BannerExternalTemplateComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  
  // async beforeEach
  beforeEach(async(() => { 
    TestBed.configureTestingModule({
      declarations: [ BannerExternalTemplateComponent ] // declare the test component
    })
    .compileComponents();  // compile template and css
  }));

 // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(BannerExternalTemplateComponent);
    component = fixture.componentInstance;
    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });
});
