
export interface LunchState {
    lunches: LunchValue[];
    loading: boolean;
}

export interface LunchValue {
    id: string;
    restaurant_id: string;
    value: string[]
}