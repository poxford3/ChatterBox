/**
 * Creates a connector to an API
 * with REST methods to call the API
 */
export class ApiService {
    // private baseUrl = "http://localhost:8080";
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
      }

    /**
     * basic REST get method
     * @method get
     * 
     * @param endpoint 
     * @param authToken 
     * @param params 
     * @returns response of type T
     */
    async get<T>(endpoint: string, authToken?: string, params?: any, contentType?: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(authToken, contentType),
        });

        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data: any, authToken?: string, contentType?: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(authToken, contentType),
            body: JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data: any, authToken: string, contentType?: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(authToken, contentType),
            body: data instanceof FormData ? data : JSON.stringify(data),
        });

        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string, authToken?: string, data?: any, contentType?: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders(authToken, contentType),
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    private getHeaders(authToken?: string, contentType?: string): Headers {
        const headers = new Headers();
        // if (contentType) {
        headers.append('Content-Type', contentType ?? 'application/json');
        // }
        if (authToken) {
            headers.append('Authorization', `Bearer ${authToken}`);
        }
        // console.log(headers);
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