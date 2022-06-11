import { AuthenticationService } from './../../authentication.service';
import { AppService } from '../../app.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild('inicial')itemInicial:ElementRef | any

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    userName='';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService) {}

ngOnInit() {
  let currentUser = this.authenticationService.getCurrentUser();
  this.userName = currentUser.user.name;
}

}
