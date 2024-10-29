import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserAuth } from '../interfaces/user-auth.interface';
import { JWTToken } from '../interfaces/jwt.interface';

describe('AuthService', () => {

    let httpTesting: HttpTestingController;
    let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        ]
    });

    httpTesting = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    
  });

  it('should login successfully with valid user credentials', async () => {

    const testURL: string = 'https://localhost:3000/login'; 

    const user: UserAuth = {
        id: 'test',
        password: 'test'
    }
    const response: JWTToken = {
    token: 'test_token'
    }
  
    const login = authService.login(user);
    const result = firstValueFrom(login);

    /*
    authService.login(user).subscribe((resp) => {
    expect(resp).toEqual(response);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', response.token);
    });
    */

    const req = httpTesting.expectOne(testURL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);

    req.flush(response);
    expect(await result).toEqual(response);
    
  });

  afterEach(() => {
    httpTesting.verify();
  });
});