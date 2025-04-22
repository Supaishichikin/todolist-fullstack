// Représente une tâche todo
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
  }
  
  // Pour créer une todo (pas encore d'id, ni created_at ni updated_at)
  export interface CreateTodo {
    title: string;
    description?: string;
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
  