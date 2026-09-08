import type { Project } from "../state/useProject";

/* localStorage persistence for "My plots". */

const KEY = "reclaim.projects.v1";

export interface SavedProject extends Project {
  id: string;
  updatedAt: number;
}

function readAll(): SavedProject[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeAll(list: SavedProject[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage full or unavailable — saving is best-effort */
  }
}

export function listProjects(): SavedProject[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function saveProject(project: Project): SavedProject {
  const id = project.id ?? Math.random().toString(36).slice(2, 10);
  const saved: SavedProject = { ...project, id, updatedAt: Date.now() };
  writeAll([saved, ...readAll().filter((p) => p.id !== id)]);
  return saved;
}

export function deleteProject(id: string) {
  writeAll(readAll().filter((p) => p.id !== id));
}
