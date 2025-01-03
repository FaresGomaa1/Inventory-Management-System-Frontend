import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../classes/User';
import { IManager } from 'src/interfaces/iuser';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userForm!: FormGroup;
  errorMessages: string[] = [];
  filteredManagers : IManager[] = [];
  IsManager: boolean = false;
  TeamId!:number ;
  roles:string [] = [
    "Staff Member", 
    "Inventory Manager",
    "Department Manager",
  ];
  team:string = ""
  role:string = ""

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      PhoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)],
      ],
      Role: ['', Validators.required],
      UserName: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      Email: ['', [Validators.required, Validators.email]],
      IsManager: [false, Validators.required],
      ManagerId: [''],
    });

    // Update ManagerId validator based on IsManager value
    this.userForm.get('IsManager')?.valueChanges.subscribe((isManager) => {
      const managerIdControl = this.userForm.get('ManagerId');
      if (isManager) {
        managerIdControl?.setValidators(null);
      } else {
        managerIdControl?.setValidators(Validators.required);
      }
      managerIdControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;

      try {
        const newUser = new User(
          formValues.FirstName,
          formValues.LastName,
          formValues.Password,
          formValues.PhoneNumber,
          formValues.Role,
          formValues.UserName,
          formValues.Email,
          this.TeamId,
          formValues.IsManager,
          formValues.ManagerId
        );

        this.authService.signUp(newUser).subscribe({
          next: (response) => {
            this.authService.signOut();
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            this.errorMessages = [];
            this.errorMessages.push(error.error.message)
          },
        });
      } catch (error) {
        console.error('Error during user creation:', error);
      }
    } else {
      console.error('Form is invalid');
      // Optionally, you can add feedback to the user that the form is invalid
    }
  }
  filterRoles(){
    if(this.IsManager){
      this.roles = [
        "Staff Member Manager", 
        "Inventory Manager Manager",
        "Department Manager Manager",
      ]
    }else {
      this.roles= [
        "Staff Member", 
        "Inventory Manager",
        "Department Manager",
      ]
    }
  }
  filterTeams() {
    // Clear filtered managers before starting
    this.filteredManagers = [];
  
    // Define a map for role to team ID mapping
    const roleToTeamIdMap: { [key: string]: number } = {
      "Staff Member": 1,
      "Inventory Manager": 2,
      "Department Manager": 3,
    };
  
    // Get role and extract the first two words for comparison
    const roleParts = this.role.split(" ");
    const role = roleParts.slice(0, 2).join(" ");
  
    // Check if the role is valid, if not, reset and return
    const teamId = roleToTeamIdMap[role];
    if (!teamId) {
      this.team = "";
      return;
    }
  
    // Set team and TeamId if role is valid
    this.team = role;
    this.TeamId = teamId;
  
    // Fetch the list of managers and filter them by team
    this.authService.getAllManagers(this.team).subscribe({
      next: (managers) => {
        this.filteredManagers = managers
      },
      error: (err) => {
        this.errorMessages.push(err.message);
      },
    });
  }
  
}
