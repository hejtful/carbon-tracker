export interface EstimateResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      country: string;
      state?: string;
      electricity_unit: string;
      electricity_value: string;
      estimated_at: Date;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    };
  };
}

export interface EstimateChartData {
  id: string;
  estimatedAt: string;
  carbonG: number;
  country: string;
}

export enum ElectricityUnit {
  MWH = 'mwh',
  KWH = 'kwh',
}

export interface AddEstimatePayload {
  type: 'electricity';
  electricity_unit: ElectricityUnit;
  electricity_value: number;
  country: string;
}

export interface Country {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
