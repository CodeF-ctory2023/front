interface NonStopFee {
  id?: number;
  price: number;
  surcharge: number;
  begin_date: string;
  end_date: string;
}

type NonStopFeeResponse = NonStopFee[];

export type { NonStopFee, NonStopFeeResponse };
