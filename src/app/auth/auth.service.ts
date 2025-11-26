import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../core/environment/environment";

@Injectable({
  providedIn:'root'
})

export class AuthService{

  private httpClient= inject(HttpClient);

register(full_name: string, phone: string, password: string, password_confirmation: string){
  const fd = new FormData();

  fd.append('full_name', full_name);
  fd.append('phone', phone);
  fd.append('password', password);
  fd.append('password_confirmation', password_confirmation);
  console.log(fd)
  return this.httpClient.post(`register`,fd)
}
login( phone: string, password: string){
  const fd = new FormData();
  fd.append('phone', phone);
  fd.append('password', password);
  console.log(fd)
  return this.httpClient.post(`login`,fd)
}

// verify phone number
verify(otp: string, phone: string){

  return this.sendRequest('verify-otp',otp,phone);
}

// resend otp
resend(otp: string, phone: string){
  return this.sendRequest('verify',otp,phone);
}

// resend-verify-otp
sendRequest(endPoint: string, otp: string, phone: string) {
  const fd = new FormData();
  fd.append('otp', otp);
  fd.append('phone', phone);
  return this.httpClient.post(`${endPoint}`, fd);
}
// 01528374839

  setToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  // ✅ Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

}
