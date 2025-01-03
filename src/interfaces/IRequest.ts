export interface GetRequests {
  id: number;
  requestType: string;
  name: string;
  price: number;
  sku: string;
  quantity: number;
  description: string;
  status: boolean;
  requestStatus: string;
  createdOn: Date;
  category: string;
  inventoryManagerComment:string;
  inventoryManagerDecision: string;
  departmentManagerComment:string;
  departmentManagerDecision:string;
  categoryId: number;
  supplier: string;
  supplierId: number;
  user: string;
  userId: string;
  team: string;
  teamId: number;
}
export interface GetRequestsResponse {
  data: {result:GetRequests[]};
  message: string;
  timestamp: Date;
}
export interface AddRequest {
  requestType?: string;
  name?: string;
  price?: number;
  sku?: string;
  quantity?: number;
  description?: string;
  categoryId?: number;
  supplierId?: number;
  userId?: string;
}
export interface UpdateRequest extends AddRequest {
  requestId: number;
  requestStatus : string;
}
export interface IAssign{
  userId:string;
  managerId:string;
  requestId:number
}
export interface IUserRequestInfo {
  userId:string;
  email:string;
  phoneNumber:string;
  firstName:string;
  lastName:string;
  activeRequestCount:string;
}
