import { Region } from "./region.model";

export interface Entity {
  id?: number;
  corporate_name: string;
  trade_name: string;
  cnpj: string;
  region_id: number;
  region?: Region;
  inauguration_date: string;
  active: boolean;
}