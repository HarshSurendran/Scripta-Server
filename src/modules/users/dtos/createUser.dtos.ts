export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    dob: Date;
    image?: string;
    password: string;
}