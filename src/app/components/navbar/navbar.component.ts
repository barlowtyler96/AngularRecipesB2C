import { Component, Inject, Input } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { b2cPolicies } from 'src/app/auth-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() loginDisplay = false;
  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,  private authService: MsalService) { }

  login() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() { 
    this.authService.logoutRedirect({
      postLogoutRedirectUri: `${environment.logoutRedirectUrl}`
    });
  }

  editProfile() {
    const authority = b2cPolicies.authorities.editProfile.authority;
    const editProfileRequest = {
      scopes: ['openid', 'profile'],
      authority: authority,
    };

    this.authService.loginRedirect({ ...editProfileRequest } as RedirectRequest);
  }
}
