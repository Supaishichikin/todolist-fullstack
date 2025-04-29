// Représente une tâche todo
export interface Todo {
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
  
  
  // Pour créer une todo (pas encore d'id, ni created_at ni updated_at)
  export interface CreateTodo {
    title: string;
    description?: string;
    to_complete_at: Date;
    priority: Priority;
  }

  // Pour mettre à jour une todo
  export interface UpdateTodo {
    title?: string;
    description?: string;
    to_complete_at?: Date;
    priority?: Priority;
    status?: Status;
  }
  
  // Représente un utilisateur
  export interface User {
    id: number;
    username: string;
    email?: string;
  }
  
  // Pour s’inscrire ou se connecter
  export interface AuthCredentials {
    username: string;
    password: string;
  }
  
  // Réponse d’authentification (ex : login)
  export interface AuthResponse {
    access_token: string;
    refresh_token?: string;
    user: User;
  }
  