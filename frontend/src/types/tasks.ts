export interface Task {
    id: number;
    title: string;
    status: Status;
    priority: Priority;
    created_at: Date;
    updated_at: Date;
    completed_at: Date;
    to_complete_at: Date;
  }

  export enum Status {
    Todo = "Todo",
    InProgress = "InProgress",
    Done = "Done"
  }

  export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High"
  }  
  
  
  // Pour créer une task (pas encore d'id, ni created_at ni updated_at)
  export interface CreateTask {
    title: string;
    description?: string;
    to_complete_at: Date;
    priority: Priority;
  }

  // Pour mettre à jour une task
  export interface UpdateTask {
    title?: string;
    description?: string;
    to_complete_at?: Date;
    priority?: Priority;
    status?: Status;
  }