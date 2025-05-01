import { Task, CreateTask } from '../types';

const API_URL = 'http://localhost:8000/api/tasks'; // à changer avec des variables d'environnement

export const getTodos = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erreur lors du chargement des tâches');
  return await res.json();
};

export const createTodo = async (data: CreateTask): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur lors de la création');
  return await res.json();
};

export const updateTodo = async (id: number, data: Partial<Task>): Promise<Task> => {
  const res = await fetch(`${API_URL}/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour');
  return await res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
};
