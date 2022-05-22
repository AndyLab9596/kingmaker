export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginQueryParams {
  redirect_url?: string;
}

export interface RegisterFromData {
  username: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  position: string;
  confirmPassword: string;
}

export interface PaymentFormData {
  firstName: string;
  lastName: string;
  address: string;
  apt?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
}
export interface ProfileFormData {
  username: string;
  position: string;
  phoneNumber: string;
  email: string;
  address: string;
  password: string;
  avatar: File;
}
