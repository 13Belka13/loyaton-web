type id = string;

export type User = {
    id: string,
    email: string,
    password: string,
    name: string,
    rewards?: string[]
}
export type Company = User;

export type Reward = {
    rewardID: string,
    name: string,
    description: string,
    companyID: string,
}

export const users: Record<id, User> = {}; //userID -> User

export const companies: Record<id, Company> = {}; //companyID -> Company

export const rewards: Record<id, Reward[]> = {}; //companyID -> Reward[]

