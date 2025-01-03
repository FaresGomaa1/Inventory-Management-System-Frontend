import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload } from 'src/interfaces/IJWT';
import { GetRequests, IAssign, IUserRequestInfo } from 'src/interfaces/IRequest';
import { AuthService } from 'src/services/auth.service';
import { RequestService } from 'src/services/request.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {
  request: GetRequests[] = [];
  requestId :number= 0;
  role:string = '';
  loading: boolean = false;
  errorMessage: string | null = null;
  teamRequests: IUserRequestInfo[] = [];
  currentView = 'All Requests';
  views: string[] = [
    'All Requests',
    'My Request',
    'Active Requests',
    'Inactive Requests',
    'Team Requests',
  ];

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchRequests('All Requests', 'Name', true);
    this.role = this.authService.getToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  console.log("reqests",this.request)
  }

  fetchRequests(viewName: string, sortBy: string, isAscending: boolean): void {
    this.loading = true;
    const userId =
      this.authService.getToken()[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];

    if (!userId) {
      this.errorMessage = 'User ID is missing or invalid.';
      this.loading = false;
      return;
    }

    this.requestService
      .getRequests(viewName, sortBy, userId, isAscending)
      .subscribe({
        next: (allRequests) => {
          this.request = allRequests.data.result;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        },
      });
  }
  viewDetails(requestId: number): void {
    const role =
      this.authService.getToken()[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    const roleRoutes: { [key: string]: string } = {
      'Staff Member': '/staff-member/update-request',
      'Staff Member Manager': '/staff-member/update-request',
      'Inventory Manager': '/inventory-manager',
      'Inventory Manager Manager': '/inventory-manager',
      'Department Manager': '/inventory-manager',
      'Department Manager Manager': '/inventory-manager',
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
    console.log('Current View', this.currentView);
    this.fetchRequests(this.currentView, 'Name', true);
  }
  getTeamMembers(requestId:number) {
    this.requestId = requestId;
    const managerId = this.authService.getToken()[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

    this.requestService
    .getActiveRequestsForTeam(managerId)
    .subscribe((requests) => {
        this.teamRequests = requests.result;
        console.log(this.teamRequests);
    });
}
assignRecord(userId: string) {
  if (!userId) {
    console.error('Invalid userId');
    return;
  }

  const assign: IAssign = {
    userId: userId,
    managerId: this.authService.getToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
    requestId: this.requestId,
  };

  this.requestService.assignRequest(assign).subscribe({
    next: () => {
      // Notify user of success
      alert('Request assigned successfully!');
    },
    error: (err) => {
      // Log and notify user of error
      console.error('Error assigning request:', err);
      alert('Failed to assign the request. Please try again later.');
    },
    complete: () => {
      console.log('Request assignment completed.');
    },
  });
}
checkAssignPrivilege(request: GetRequests): boolean {
  const user: JwtPayload = this.authService.getToken();
  
  // Extract role and team information from the token
  const userRoleData = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].split(" ");
  const isManager = userRoleData.length === 3 && userRoleData[2] === "Manager";
  const userTeam = `${userRoleData[0]} ${userRoleData[1]}`;
  
  // Validate request properties
  const isRequestIncomplete = request.status === false;
  const isUserInDifferentTeam = userTeam !== request.team;
  const isRequestAssigned = request.userId !== null;

  // Check privileges
  if (isRequestIncomplete || !isManager || isUserInDifferentTeam || isRequestAssigned) {
    return false;
  }
  
  return true;
}

}
