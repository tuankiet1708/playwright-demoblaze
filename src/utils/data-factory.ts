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
  // Keep generated identifiers compact and filesystem/report friendly.
  return `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
}

export function createUserCredentials(password: string): UserCredentials {
  // Username uniqueness prevents collisions in parallel CI runs.
  return {
    username: `autouser-${nowToken()}`,
    password,
  };
}

export function createOrderDetails(): OrderDetails {
  // Use realistic but synthetic data so tests remain deterministic and non-sensitive.
  return {
    name: `Auto Buyer ${Math.floor(Math.random() * 100)}`,
    country: 'Vietnam',
    city: 'Ho Chi Minh',
    creditCard: `411111111111${Math.floor(1000 + Math.random() * 9000)}`,
    month: `${Math.floor(1 + Math.random() * 12)}`,
    year: `${new Date().getFullYear() + 1}`,
  };
}
