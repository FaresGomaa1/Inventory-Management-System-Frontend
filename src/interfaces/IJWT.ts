export interface JwtPayload {
    aud: string;
    exp: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    iss: string;
    jti: string;
    sub: string;
    managerId:string;
    teamId:string
  }
  