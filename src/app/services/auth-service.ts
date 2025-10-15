import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterUserForm } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/users';

  register(newUser: RegisterUserForm) {
    return this.http.post(this.url, newUser).subscribe();
  }
}
