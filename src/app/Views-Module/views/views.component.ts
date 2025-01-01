import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
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
  viewDetails(requestId: number): void {
    const role = this.authService.getToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
    const roleRoutes: { [key: string]: string } = {
      "Staff Member": '/staff-member/update-request',
      "Staff Member Manager": '/staff-member/update-request',
      "Inventory Manager": '/inventory-manager',
      "Inventory Manager Manager": '/inventory-manager',
      "Department Manager": '/department-manager',
      "Department Manager Manager": '/department-manager',
    };
  
    const route = roleRoutes[role];
    
    if (route) {
      // Ensure that the 'requestId' is passed as part of the route
      this.router.navigate([route, requestId]);
    } else {
      // Optional: Handle the case where role is not matched
      console.error('Role not found or not authorized to view details');
    }
  }  
  changeView(event: Event): void {
    const selectedView = (event.target as HTMLSelectElement).value;
    this.currentView = selectedView;
    console.log("Current View", this.currentView);
    this.fetchRequests(this.currentView,"Name",true);
  }
  assignRecord(){

  }
}
