/**
 * Creates a connector to an API
 * with REST methods to call the API
 * 
 */
export class ApiService {
    // private baseUrl = "http://localhost:8080";
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
      }

    /**
     * basic REST get method
     * 
     * @param endpoint 
     * @param authToken 
     * @param params 
     * @returns response of type T
     */
    async get<T>(endpoint: string, authToken?: string, params?: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(authToken),
        });

        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data: any, authToken?: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(authToken),
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data: any, authToken?: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(authToken),
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string, data?: any, authToken?: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders(authToken),
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    private getHeaders(authToken?: string): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (authToken) {
            headers.append('Authorization', `Bearer ${authToken}`);
        }
        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error ${response.status}: ${error}`)
        }

        return response.json();
    }
}