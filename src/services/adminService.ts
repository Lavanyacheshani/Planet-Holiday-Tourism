const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

class AdminService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  }

  // Authentication
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse<{ token: string; user: any }>(
      response
    );

    if (data.success && data.data?.token) {
      localStorage.setItem("adminToken", data.data.token);
    }

    return data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem("adminToken");
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // Tour Packages
  async getTourPackages(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    category?: string;
    featured?: boolean;
  }): Promise<ApiResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/admin/tour-packages?${searchParams}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  async getTourPackage(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/tour-packages/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async createTourPackage(data: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/tour-packages`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async updateTourPackage(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/tour-packages/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async deleteTourPackage(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_BASE_URL}/admin/tour-packages/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateTourPackageStatus(
    id: string,
    status: string
  ): Promise<ApiResponse<any>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/tour-packages/${id}/status`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );

    return this.handleResponse(response);
  }

  async toggleTourPackageFeature(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/tour-packages/${id}/feature`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  // Destinations
  async getDestinations(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    category?: string;
    region?: string;
    featured?: boolean;
  }): Promise<ApiResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/admin/destinations?${searchParams}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  async getDestination(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/destinations/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async createDestination(data: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/destinations`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async updateDestination(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/destinations/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async deleteDestination(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_BASE_URL}/admin/destinations/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateDestinationStatus(
    id: string,
    status: string
  ): Promise<ApiResponse<any>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/destinations/${id}/status`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );

    return this.handleResponse(response);
  }

  async toggleDestinationFeature(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/destinations/${id}/feature`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  // Blog Articles
  async getBlogArticles(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    category?: string;
    featured?: boolean;
  }): Promise<ApiResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/admin/blog-articles?${searchParams}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  async getBlogArticle(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/blog-articles/${id}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async createBlogArticle(data: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/blog-articles`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async updateBlogArticle(id: string, data: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/blog-articles/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async deleteBlogArticle(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_BASE_URL}/admin/blog-articles/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateBlogArticleStatus(
    id: string,
    status: string
  ): Promise<ApiResponse<any>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/blog-articles/${id}/status`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );

    return this.handleResponse(response);
  }

  async toggleBlogArticleFeature(id: string): Promise<ApiResponse<any>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/blog-articles/${id}/feature`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  // Image Upload
  async uploadImage(
    file: File,
    type: "tour-package" | "destination" | "blog-article"
  ): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    const response = await fetch(`${API_BASE_URL}/admin/upload-image`, {
      method: "POST",
      headers: {
        Authorization: this.getAuthHeaders().Authorization as string,
      },
      body: formData,
    });

    return this.handleResponse(response);
  }

  // Bookings
  async getBookings(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<ApiResponse<any>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/admin/bookings?${searchParams}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    return this.handleResponse(response);
  }

  async updateBookingStatus(
    id: string,
    status: string
  ): Promise<ApiResponse<any>> {
    const response = await fetch(
      `${API_BASE_URL}/admin/bookings/${id}/status`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );

    return this.handleResponse(response);
  }

  // Settings
  async getSettings(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateSettings(data: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }
}

export const adminService = new AdminService();
export default adminService;
