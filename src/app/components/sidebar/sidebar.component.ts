import { Component, Inject, Input } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { b2cPolicies } from 'src/app/auth-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarExpanded = false;
  @Input() loginDisplay = false;

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private authService: MsalService) { }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
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
      authority: authority,
    };

    this.authService.loginRedirect({ ...editProfileRequest } as RedirectRequest);
  }
}
