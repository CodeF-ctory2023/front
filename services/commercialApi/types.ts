export type TCouponPayload = {
  code: string;
  amount: number;
  status: string;
  strategy: {
    idStrategy: number;
    name: string;
    description: string;
    discountPercentage: number;
    isActive: boolean;
    startDate: string;
    endDate: string;
    discountValue: number;
    minValue: number;
    maxDiscount: number;
    city: string;
    users: string[];
    // amountAvailable: number;
  };
};

export type TNewCouponPayload = {
  amount: number;
  strategy: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    discountPercentage: number;
    discountValue: number;
    minValue: number;
    maxDiscount: number;
    isActive: boolean;
    city: string;
  };
};
