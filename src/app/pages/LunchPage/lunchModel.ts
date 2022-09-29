
export interface LunchState {
    lunches: LunchValue[];
    restaurants: {[id: string]: Restaurnat};
    loading: boolean;
}

export interface Restaurnat {
    endpoint: string;
    selected: boolean;
}

export interface LunchValue {
    value: string;
    restaurantId: string;
}