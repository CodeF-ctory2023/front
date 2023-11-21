export interface User {
    name: string;
    lastname: string;
    id: string;
    email: string;
    password: string;
    information: boolean;
    payments:[{
        card: 1234567812341234,
        cardDate: "00/0000",
        cardSecurityNumber: 111,
    
    }]
  }