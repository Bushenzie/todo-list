
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
    completed: boolean;
    tags: string[];
    due?: Date;
}
