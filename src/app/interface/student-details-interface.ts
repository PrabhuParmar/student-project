export interface StudentDetailsInterface {
    name: string;
    email: string;
    phoneNumber: number;
    dob: string | Date;
    subject?: any;
    gender: string;
    semester: number;
    termsStatus: boolean;
    enrollmentId?: number;
    grade?: string;
    noOfSububject?: number;
}
