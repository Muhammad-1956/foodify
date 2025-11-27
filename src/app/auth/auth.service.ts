import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../core/environment/environment";

@Injectable({
  providedIn:'root'
})

export class AuthService{

  private httpClient= inject(HttpClient);

register(fd: FormData){
  return this.httpClient.post(`register`,fd)
}
login(fd: FormData){
  return this.httpClient.post(`login`,fd)
}
forgotPassword(fd: FormData){
  return this.httpClient.post('forgot-password',fd)
}
resetPassword(fd: FormData){
  return this.httpClient.post('reset-password',fd)
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
  // set token localStorage
  setToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  // Logout
  logout(){
    // return this.httpClient.post('logout',{userId}).subscribe({
    //   next: (res: any)=>{
    //     console.log(res)
    //     localStorage.removeItem('userToken');
    //   }
    // })
    localStorage.removeItem('userToken');
  }
}
