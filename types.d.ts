import { Document, Types } from "mongoose";
import {
  ACCOUNT_STATUS,
  CAR_STATUS,
  CAR_TYPE,
  COUNTRY,
  GENDER,
  USER_STATUS,
} from "./utilts/enum";

// Set up User Schema Blueprint
export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  uid: string;
  gender: GENDER;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  country: COUNTRY;
  coordinates: {
    longitude: string;
    latitude: string;
    elevation: string;
  };
  status?: ACCOUNT_STATUS;
  isActive?: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  photoUrl?: string;
  role?: ROLE;
}

export interface AccountDocument extends User, Document {
  _doc: UserAccount;
}

// Set up Driver Schema Blueprint
export interface Driver {
  isSuspended: boolean;
  isVerified: boolean;
  isOnline: boolean;
  hasClient: boolean;
  user: Types.ObjectId;
  driverLicense: {
    front: string;
    back: string;
  };
  driverAuthNumber: string;
  carId: Types.ObjectId;
  privateCar?: Types.ObjectId;
  otherDocuments: string[];
  serviceKey: string;
  isIndependent: boolean;
  businessId: Types.ObjectId;
  coordinates: {
    longitude: number;
    latitude: number;
    elevation: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Set up Business Driver Schema Blueprint
export interface businessDriver {
  isSuspended: boolean;
  isVerified: boolean;
  user: Types.ObjectId;
  idCard: {
    front: string;
    back: string;
  };
  otherDocuments?: string[];
  cars: Types.ObjectId[];
  serviceKey: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CarProps extends Document {
  vin: string;
  color: string;
  plateNumber: string;
  model: string;
  make: string;
  year: string;
  doors: number;
  owner: string;
  driver?: string;
  hasInsurance: boolean;
  status: CAR_STATUS;
  insurance?: CarInsuranceProps;
  documents: Types.DocumentArray<IDocument[]>;
  type: CAR_TYPE;
  images?: string[];
  isApproved: boolean;
  rating?: number;
  ratingCount?: string;
}

export interface CarInsuranceProps {
  insuranceId: Types.ObjectId;
  insuranceType: string;
  status: string;
  isActive: boolean;
  issuedDate?: Date;
  expiresDate?: Date;
}

export interface InsuranceProps extends Document {
  name: string;
  insuranceType: string;
  owner: Types.ObjectId;
  isApproved: boolean;
  approvedOn: string;
  expiresOn: Date;
}

// Document interface
export interface IDocument extends Document {
  name: string;
  url: string;
  status: USER_STATUS;
}

// Insurance Type interface
export interface IInsuranceType extends Document {
  name: string;
  price: number;
  duration: string;
  coverage: string;
}

// Insurance Company interface
export interface IInsuranceCompany extends Document {
  name: string;
  user: Types.ObjectId;
  email: string;
  phone: string;
  photoUrl: string;
  documents: Types.DocumentArray<IDocument[]>;
  types: Types.DocumentArray<IInsuranceType[]>;
  isVerified: boolean;
}

export type EmailContent = {
  subject: string;
  body: string;
};

interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
  active: number;
  count: number;
}

interface PaginatedResponse<T> {
  links: PaginationLinks;
  data: T[];
}
