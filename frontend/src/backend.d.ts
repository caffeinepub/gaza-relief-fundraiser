import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Donation {
    id: bigint;
    name?: string;
    message?: string;
    timestamp: bigint;
    amount: bigint;
    donor: Principal;
}
export interface backendInterface {
    getDonation(donationId: bigint): Promise<Donation>;
    getDonationCount(): Promise<bigint>;
    getDonationsByAmount(): Promise<Array<Donation>>;
    getRecentDonations(limit: bigint): Promise<Array<Donation>>;
    getTotalAmount(): Promise<bigint>;
    searchDonationsByAmount(minAmount: bigint): Promise<Array<Donation>>;
    searchDonationsByDonor(donor: Principal): Promise<Array<Donation>>;
    submitDonation(amount: bigint, name: string | null, message: string | null): Promise<void>;
}
