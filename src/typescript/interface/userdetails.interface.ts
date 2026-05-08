export interface userDetails {
  name: string;         // student display name (student table)
  fullname: string;     // auth / users table full name
  email: string;
  password: string;
  phone: string;
  course: string;
  address: string;
  image?: FileList | null;
}