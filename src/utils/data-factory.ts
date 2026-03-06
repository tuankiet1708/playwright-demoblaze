export interface UserCredentials {
  username: string;
  password: string;
}

export interface OrderDetails {
  name: string;
  country: string;
  city: string;
  creditCard: string;
  month: string;
  year: string;
}

function nowToken(): string {
  return `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
}

export function createUserCredentials(password: string): UserCredentials {
  return {
    username: `autouser-${nowToken()}`,
    password,
  };
}

export function createOrderDetails(): OrderDetails {
  return {
    name: `Auto Buyer ${Math.floor(Math.random() * 100)}`,
    country: 'Vietnam',
    city: 'Ho Chi Minh',
    creditCard: `411111111111${Math.floor(1000 + Math.random() * 9000)}`,
    month: `${Math.floor(1 + Math.random() * 12)}`,
    year: `${new Date().getFullYear() + 1}`,
  };
}
