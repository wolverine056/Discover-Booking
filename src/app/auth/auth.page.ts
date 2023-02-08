import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isloading=false;
  islogin=true;
  constructor(private auth:AuthService,
    private route:Router,
    private loadingctrl:LoadingController
    ) { }

  ngOnInit() {
  }
  login(){
    this.auth.login();
    this.loadingctrl.create({keyboardClose:true,message:'Loading in...'})
                    .then(loadingctrlAL=>{
                      loadingctrlAL.present();
                      this.isloading=true;
                    setTimeout(()=>{
                      this.isloading=false;
                      loadingctrlAL.dismiss();
                      this.route.navigateByUrl('/places/tabs/discover');
                    },2000)
    })
  }
  loginmethod(form:NgForm){
    if(!form.valid){
      return
    }
    const mail=form.value.email;
    const password=form.value.password;

    console.log(mail ,password)
  }
  switchauthmode(){
    this.islogin=!this.islogin;
  }
}
