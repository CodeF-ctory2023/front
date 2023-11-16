export type TCouponPayload = {
  code: string;
  amountCreated: number;
  amountAvalaible: number;
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
    userType: string;
    users: string[];
  };
};

export type TNewCouponPayload = {
  amountCreated: number;
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
    usertype: string;
  };
};
