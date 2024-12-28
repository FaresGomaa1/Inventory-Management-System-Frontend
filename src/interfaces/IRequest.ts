export interface GetRequests {
  id: number;
  requestType: string;
  name: string;
  price: number;
  sku: string;
  quantity: number;
  description: string;
  status: boolean;
  rquestStatus: string;
  createdOn: Date;
  category: string;
  categoryId: number;
  supplier: string;
  supplierId: number;
  user: string;
  userId: string;
  team: string;
  teamId: number;
}
export interface GetRequestsResponse {
  data: GetRequests[];
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
  requestStatus: string;
}
