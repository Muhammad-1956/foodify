import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({
  providedIn:'root'
})


export class ProfileService{
  private httpClient= inject(HttpClient);


// Get User Profile Information
getProfile(){
  return this.httpClient.get('me')
}

// Update User Profile
updateProfile(fd: FormData){
  return this.httpClient.post('profile',fd)
}


}
