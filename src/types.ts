
export enum Priority {
    NotDefined = 0,
    Low,
    Medium,
    High,
}

export interface TodoItem {
    id: string;
    value: string;
    priority: Priority;
    tags?: string[];
    due?: Date;
}
