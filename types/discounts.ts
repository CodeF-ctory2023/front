export type TDiscount = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
  maxDiscount: number;
  discountValue: number;
  minValue: number;
  city: string;
  status: string;
  userType: string;
  familyProfile?: string;
};
