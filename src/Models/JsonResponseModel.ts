import { ApiStatus } from "../Helpers/Enums/ApiStatus";

export interface JsonResponseModel {
  status: ApiStatus;
  message: string;
  data: any;
}
