"use strict";(self.webpackChunkInventory_Management_System_Frontend=self.webpackChunkInventory_Management_System_Frontend||[]).push([[137],{137:(j,M,m)=>{m.r(M),m.d(M,{AdminModule:()=>$});var h=m(177),a=m(4341),p=m(6448);class b{constructor(o,t,s,n,i,l,d,u,g,c){if(this.FirstName=o,this.LastName=t,this.Password=s,this.PhoneNumber=n,this.Role=i,this.UserName=l,this.Email=d,this.TeamId=u,this.IsManager=g,this.ManagerId=c,!this.checkPassword())throw new Error("Password validation failed");if(!this.checkPhoneNumber())throw new Error("Phone number validation failed");if(!this.checkRole())throw new Error("Role validation failed");if(!this.checkUserName())throw new Error("Username validation failed");if(!this.checkEmail())throw new Error("Email validation failed");if(!this.checkIsManager())throw new Error("IsManager validation failed");if(!this.checkManagerId())throw new Error("ManagerId validation failed")}checkPassword(){return/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.Password)}checkPhoneNumber(){return/^(010|011|012)\d{8}$/.test(this.PhoneNumber)}checkRole(){return["Staff Member","Inventory Manager","Department Manager","Staff Member Manager","Inventory Manager Manager","Department Manager Manager"].includes(this.Role)}checkUserName(){return!/\s/.test(this.UserName)}checkEmail(){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.Email)}checkIsManager(){const o=this.Role.split(" ");return 3===o.length&&"Manager"===o[2]?!0===this.IsManager:!1===this.IsManager}checkManagerId(){return!!this.IsManager||""!==this.ManagerId.trim()}}var e=m(540),v=m(5030);function F(r,o){if(1&r&&(e.j41(0,"p",30),e.nrm(1,"i",31),e.EFF(2),e.k0s()),2&r){const t=o.$implicit;e.R7$(2),e.SpI(" ",t," ")}}function k(r,o){1&r&&(e.j41(0,"div",32),e.EFF(1," First Name is required. "),e.k0s())}function N(r,o){1&r&&(e.j41(0,"div",32),e.EFF(1," Last Name is required. "),e.k0s())}function E(r,o){1&r&&(e.j41(0,"div",32),e.EFF(1," Password must be at least 8 characters long and contain letters, numbers, and special characters. "),e.k0s())}function _(r,o){1&r&&(e.j41(0,"div",32),e.EFF(1," Enter a valid phone number starting with 010, 011, or 012. "),e.k0s())}function I(r,o){if(1&r&&(e.j41(0,"option",33),e.EFF(1),e.k0s()),2&r){const t=o.$implicit;e.Y8G("value",t),e.R7$(1),e.JRh(t)}}function C(r,o){1&r&&(e.j41(0,"div",32),e.EFF(1," Role is required. "),e.k0s())}function R(r,o){1&r&&(e.j41(0,"div",32),e.EFF(1," Username cannot contain spaces. "),e.k0s())}function U(r,o){1&r&&(e.j41(0,"div",32),e.EFF(1," Enter a valid email. "),e.k0s())}function S(r,o){if(1&r&&(e.j41(0,"option",33),e.EFF(1),e.k0s()),2&r){const t=o.$implicit;e.Y8G("value",t.id),e.R7$(1),e.Lme(" ",t.firstName," ",t.lastName," ")}}function P(r,o){if(1&r&&(e.j41(0,"div",6)(1,"label",34),e.EFF(2,"Manager:"),e.k0s(),e.j41(3,"select",35)(4,"option",36),e.EFF(5,"Select a Manager"),e.k0s(),e.DNE(6,S,2,3,"option",19),e.k0s()()),2&r){const t=e.XpG();e.R7$(6),e.Y8G("ngForOf",t.filteredManagers)}}const w=[{path:"",component:(()=>{class r{constructor(t,s,n){this.fb=t,this.authService=s,this.router=n,this.errorMessages=[],this.filteredManagers=[],this.IsManager=!1,this.roles=["Staff Member","Inventory Manager","Department Manager"],this.team="",this.role=""}ngOnInit(){this.userForm=this.fb.group({FirstName:["",a.k0.required],LastName:["",a.k0.required],Password:["",[a.k0.required,a.k0.minLength(8),a.k0.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],PhoneNumber:["",[a.k0.required,a.k0.pattern(/^(010|011|012)\d{8}$/)]],Role:["",a.k0.required],UserName:["",[a.k0.required,a.k0.pattern(/^\S+$/)]],Email:["",[a.k0.required,a.k0.email]],IsManager:[!1,a.k0.required],ManagerId:[""]}),this.userForm.get("IsManager")?.valueChanges.subscribe(t=>{const s=this.userForm.get("ManagerId");s?.setValidators(t?null:a.k0.required),s?.updateValueAndValidity()})}onSubmit(){if(this.userForm.valid){const t=this.userForm.value;try{const s=new b(t.FirstName,t.LastName,t.Password,t.PhoneNumber,t.Role,t.UserName,t.Email,this.TeamId,t.IsManager,t.ManagerId);this.authService.signUp(s).subscribe({next:n=>{this.authService.signOut(),this.router.navigateByUrl("/")},error:n=>{this.errorMessages=[],this.errorMessages.push(n.error.message)}})}catch(s){console.error("Error during user creation:",s)}}else console.error("Form is invalid")}filterRoles(){this.roles=this.IsManager?["Staff Member Manager","Inventory Manager Manager","Department Manager Manager"]:["Staff Member","Inventory Manager","Department Manager"]}filterTeams(){this.filteredManagers=[];const n=this.role.split(" ").slice(0,2).join(" "),i={"Staff Member":1,"Inventory Manager":2,"Department Manager":3}[n];i?(this.team=n,this.TeamId=i,this.authService.getAllManagers(this.team).subscribe({next:l=>{this.filteredManagers=l},error:l=>{this.errorMessages.push(l.message)}})):this.team=""}static{this.\u0275fac=function(s){return new(s||r)(e.rXU(a.ok),e.rXU(v.u),e.rXU(p.Ix))}}static{this.\u0275cmp=e.VBU({type:r,selectors:[["app-sign-up"]],decls:55,vars:15,consts:[[1,"container","mt-4","p-4","shadow-lg","rounded","bg-light",3,"formGroup","ngSubmit"],[1,"text-center","mb-4","text-primary"],["class","text-danger mb-2",4,"ngFor","ngForOf"],[1,"form-check","mb-4"],["for","IsManager",1,"form-check-label"],["id","IsManager","type","checkbox","formControlName","IsManager",1,"form-check-input",3,"ngModel","change","ngModelChange"],[1,"form-group","mb-3"],["for","FirstName",1,"form-label"],["id","FirstName","formControlName","FirstName","placeholder","Enter your first name",1,"form-control"],["class","invalid-feedback",4,"ngIf"],["for","LastName",1,"form-label"],["id","LastName","formControlName","LastName","placeholder","Enter your last name",1,"form-control"],["for","Password",1,"form-label"],["id","Password","type","password","formControlName","Password","placeholder","Enter a secure password",1,"form-control"],["for","PhoneNumber",1,"form-label"],["id","PhoneNumber","formControlName","PhoneNumber","placeholder","Enter a valid phone number (e.g., 01012345678)",1,"form-control"],["for","Role",1,"form-label"],["id","Role","formControlName","Role",1,"form-control",3,"ngModel","ngModelChange","change"],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["for","UserName",1,"form-label"],["id","UserName","formControlName","UserName","placeholder","Enter your username",1,"form-control"],["for","Email",1,"form-label"],["id","Email","formControlName","Email","placeholder","Enter a valid email",1,"form-control"],["for","Team",1,"form-label"],["type","text","disabled","",1,"form-control",3,"value"],["class","form-group mb-3",4,"ngIf"],[1,"d-flex","justify-content-center","mt-4"],["type","submit",1,"btn","btn-primary","w-50",3,"disabled"],[1,"fas","fa-user-plus"],[1,"text-danger","mb-2"],[1,"fas","fa-exclamation-circle"],[1,"invalid-feedback"],[3,"value"],["for","ManagerId",1,"form-label"],["id","ManagerId","formControlName","ManagerId",1,"form-control"],["value","","disabled","","selected",""]],template:function(s,n){if(1&s&&(e.j41(0,"form",0),e.bIt("ngSubmit",function(){return n.onSubmit()}),e.j41(1,"h3",1),e.EFF(2,"Create User"),e.k0s(),e.DNE(3,F,3,1,"p",2),e.j41(4,"div",3)(5,"label",4)(6,"input",5),e.bIt("change",function(){return n.filterRoles()})("ngModelChange",function(l){return n.IsManager=l}),e.k0s(),e.EFF(7," Is Manager "),e.k0s()(),e.j41(8,"div",6)(9,"label",7),e.EFF(10,"First Name:"),e.k0s(),e.nrm(11,"input",8),e.DNE(12,k,2,0,"div",9),e.k0s(),e.j41(13,"div",6)(14,"label",10),e.EFF(15,"Last Name:"),e.k0s(),e.nrm(16,"input",11),e.DNE(17,N,2,0,"div",9),e.k0s(),e.j41(18,"div",6)(19,"label",12),e.EFF(20,"Password:"),e.k0s(),e.nrm(21,"input",13),e.DNE(22,E,2,0,"div",9),e.k0s(),e.j41(23,"div",6)(24,"label",14),e.EFF(25,"Phone Number:"),e.k0s(),e.nrm(26,"input",15),e.DNE(27,_,2,0,"div",9),e.k0s(),e.j41(28,"div",6)(29,"label",16),e.EFF(30,"Role:"),e.k0s(),e.j41(31,"select",17),e.bIt("ngModelChange",function(l){return n.role=l})("change",function(){return n.filterTeams()}),e.j41(32,"option",18),e.EFF(33,"Select a Role"),e.k0s(),e.DNE(34,I,2,2,"option",19),e.k0s(),e.DNE(35,C,2,0,"div",9),e.k0s(),e.j41(36,"div",6)(37,"label",20),e.EFF(38,"User Name:"),e.k0s(),e.nrm(39,"input",21),e.DNE(40,R,2,0,"div",9),e.k0s(),e.j41(41,"div",6)(42,"label",22),e.EFF(43,"Email:"),e.k0s(),e.nrm(44,"input",23),e.DNE(45,U,2,0,"div",9),e.k0s(),e.j41(46,"div",6)(47,"label",24),e.EFF(48,"Team"),e.k0s(),e.nrm(49,"input",25),e.k0s(),e.DNE(50,P,7,1,"div",26),e.j41(51,"div",27)(52,"button",28),e.nrm(53,"i",29),e.EFF(54," Create User "),e.k0s()()()),2&s){let i,l,d,u,g,c,f;e.Y8G("formGroup",n.userForm),e.R7$(3),e.Y8G("ngForOf",n.errorMessages),e.R7$(3),e.Y8G("ngModel",n.IsManager),e.R7$(6),e.Y8G("ngIf",(null==(i=n.userForm.get("FirstName"))?null:i.invalid)&&(null==(i=n.userForm.get("FirstName"))?null:i.touched)),e.R7$(5),e.Y8G("ngIf",(null==(l=n.userForm.get("LastName"))?null:l.invalid)&&(null==(l=n.userForm.get("LastName"))?null:l.touched)),e.R7$(5),e.Y8G("ngIf",(null==(d=n.userForm.get("Password"))?null:d.invalid)&&(null==(d=n.userForm.get("Password"))?null:d.touched)),e.R7$(5),e.Y8G("ngIf",(null==(u=n.userForm.get("PhoneNumber"))?null:u.invalid)&&(null==(u=n.userForm.get("PhoneNumber"))?null:u.touched)),e.R7$(4),e.Y8G("ngModel",n.role),e.R7$(3),e.Y8G("ngForOf",n.roles),e.R7$(1),e.Y8G("ngIf",(null==(g=n.userForm.get("Role"))?null:g.invalid)&&(null==(g=n.userForm.get("Role"))?null:g.touched)),e.R7$(5),e.Y8G("ngIf",(null==(c=n.userForm.get("UserName"))?null:c.invalid)&&(null==(c=n.userForm.get("UserName"))?null:c.touched)),e.R7$(5),e.Y8G("ngIf",(null==(f=n.userForm.get("Email"))?null:f.invalid)&&(null==(f=n.userForm.get("Email"))?null:f.touched)),e.R7$(4),e.Y8G("value",n.team+"Team"),e.R7$(1),e.Y8G("ngIf",!n.IsManager),e.R7$(2),e.Y8G("disabled",n.userForm.invalid)}},dependencies:[h.Sq,h.bT,a.qT,a.xH,a.y7,a.me,a.Zm,a.wz,a.BC,a.cb,a.j4,a.JD],styles:[".container[_ngcontent-%COMP%]{max-width:600px}h3[_ngcontent-%COMP%]{font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;font-weight:700;color:#007bff}.form-group[_ngcontent-%COMP%]{margin-bottom:1.5rem}.form-label[_ngcontent-%COMP%]{font-size:1.1rem}.invalid-feedback[_ngcontent-%COMP%]{display:block;font-size:.9rem}.form-check-label[_ngcontent-%COMP%]{font-size:1.1rem}button[_ngcontent-%COMP%]:disabled{background-color:#ccc;border-color:#ccc}button[_ngcontent-%COMP%]{font-size:1.1rem;padding:10px;border-radius:5px;background-color:#007bff;border:none;color:#fff;transition:all .3s}button[_ngcontent-%COMP%]:hover{background-color:#0056b3}button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:8px}"]})}}return r})()}];let y=(()=>{class r{static{this.\u0275fac=function(s){return new(s||r)}}static{this.\u0275mod=e.$C({type:r})}static{this.\u0275inj=e.G2t({imports:[p.iI.forChild(w),p.iI]})}}return r})(),$=(()=>{class r{static{this.\u0275fac=function(s){return new(s||r)}}static{this.\u0275mod=e.$C({type:r})}static{this.\u0275inj=e.G2t({imports:[h.MD,y,a.X1]})}}return r})()}}]);