import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginPage } from './login.page';
import { SecurityService } from '../service/login/security.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ RouterTestingModule, FormsModule, HttpClientTestingModule ],
      providers: [ SecurityService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login function', () => {
    spyOn(component, 'login');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.login).toHaveBeenCalled();
  });

});
