export const API_BASE = "https://api.roboglobal.com.br";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Erro API ${path}`);
  }
  return res.json();
}
