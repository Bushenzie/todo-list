
export enum Priority {
    Low = 1,
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
