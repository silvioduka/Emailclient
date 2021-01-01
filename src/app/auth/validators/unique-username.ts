import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from './../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (control: FormControl): Observable<ValidationErrors> => {
    const { value } = control;

    return this.authService.usernameAvailable(value).pipe(
      map(value => {
        if (value.available) {
          return null;
        }
      }),
      catchError(error => {
        if (error.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
