import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IHero } from './hero.interface';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const herois: IHero[] = [
    { 'id': 1, 'nome': 'Homem de ferro', 'grupo': 'Vingadores' },
    { 'id': 2, 'nome': 'Homem Arranha', 'grupo': 'Vingadores' },
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientModule,
        HttpModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // MOCK
    spyOn(component, 'getAvengers').and.returnValue(herois);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it('should get avengers ', async(() => {

   // const subject = new Subject();
    // expect(component.avengers).toBeDefined();
    // expect(component.getAvengers()).toBe();
    // console.log('retorno lista ' + component.avengers);
    // expect(component.avengers);

  }));
});
