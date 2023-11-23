interface CityFeeDto {
  id: number;
  name: string;
  percentage: number;
}

interface CityFeeRequest {
  cityId: number;
  percentage: number;
}

type CityFeeResponse = CityFeeDto[];

export type { CityFeeDto as CityFee, CityFeeRequest, CityFeeResponse };
