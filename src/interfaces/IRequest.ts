export interface GetRequests {
  id:number;
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
  supplier: string;
  user: string;
  team: string;
}
export interface GetRequestsResponse {
  data: GetRequests[];
  message:string;
  timestamp:Date;
}