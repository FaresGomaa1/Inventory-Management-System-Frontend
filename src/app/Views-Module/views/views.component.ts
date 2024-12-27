import { Component, OnInit } from '@angular/core';
import { GetRequests } from 'src/interfaces/IRequest';
import { AuthService } from 'src/services/auth.service';
import { RequestService } from 'src/services/request.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {
  request: GetRequests[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  currentView = "All Requests";
  views:string[]= ["All Requests", "My Request", "Active Requests", "Inactive Requests","Team Requests"];

  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchRequests('All Requests', 'Name', true);
  }

   fetchRequests(viewName:string, sortBy:string,isAscending:boolean): void {
    this.loading = true;
    const userId = this.authService.getToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    if (!userId) {
      this.errorMessage = 'User ID is missing or invalid.';
      this.loading = false;
      return;
    }

    this.requestService.getRequests(viewName, sortBy, userId, isAscending).subscribe(
      {
        next: (allRequests)=>{
          this.request = allRequests.data;
          this.loading = false;
        },
        error: (error)=>{
          this.errorMessage = error;
          this.loading = false;
        }
      }
    );
  }
  viewDetails(requestId:number){

  }
  changeView(event: Event): void {
    const selectedView = (event.target as HTMLSelectElement).value;
    this.currentView = selectedView;
    console.log("Current View", this.currentView);
    this.fetchRequests(this.currentView,"Name",true);
  }
}
