import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

export interface updateUserResponse {}

export interface getUsersResponse {
  ok: boolean;
  users: User[];
  uid: string;
  total: number;
}

export interface UserByTermResponse {
  ok: boolean;
  results: User[];
}

export interface HospByTermResponse {
  ok: boolean;
  results: Hospital[];
}

export interface DocByTermResponse {
  ok: boolean;
  results: Doctor[];
}

export interface searchByTermResponse {
  ok: boolean;
  results: [];
}
