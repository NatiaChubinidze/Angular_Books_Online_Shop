import { Injectable } from '@angular/core';
import { TOKEN_EXP_KEY, TOKEN_TTL } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  setTokenValidTime(): void {
    console.log('new key');
    const date = new Date();
    date.setMinutes(new Date().getMinutes() + TOKEN_TTL);
    localStorage.setItem(TOKEN_EXP_KEY, date.toJSON());
  }

  tokenIsValid(): boolean {
    const timeNow = new Date().getTime();
    const tokenValidTill = new Date(
      localStorage.getItem(TOKEN_EXP_KEY)
    ).getTime();
    return timeNow < tokenValidTill;
  }
}
