// services/api.ts
// This file contains API service functions for backend integration

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // User Management
  async createUser(userData: any): Promise<ApiResponse<any>> {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId: string): Promise<ApiResponse<any>> {
    return this.request(`/users/${userId}`);
  }

  async updateUser(userId: string, userData: any): Promise<ApiResponse<any>> {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Order Management
  async createOrder(orderData: any): Promise<ApiResponse<any>> {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(userId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/orders?userId=${userId}`);
  }

  async getOrder(orderId: string): Promise<ApiResponse<any>> {
    return this.request(`/orders/${orderId}`);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<ApiResponse<any>> {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Service Management
  async getServices(): Promise<ApiResponse<any[]>> {
    return this.request('/services');
  }

  async getService(serviceId: string): Promise<ApiResponse<any>> {
    return this.request(`/services/${serviceId}`);
  }

  // Payment Management
  async createPayment(paymentData: any): Promise<ApiResponse<any>> {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPayment(paymentId: string): Promise<ApiResponse<any>> {
    return this.request(`/payments/${paymentId}`);
  }

  // Address Management
  async getAddresses(userId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/addresses?userId=${userId}`);
  }

  async createAddress(addressData: any): Promise<ApiResponse<any>> {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async updateAddress(addressId: string, addressData: any): Promise<ApiResponse<any>> {
    return this.request(`/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  }

  async deleteAddress(addressId: string): Promise<ApiResponse<any>> {
    return this.request(`/addresses/${addressId}`, {
      method: 'DELETE',
    });
  }

  // Rating Management
  async createRating(ratingData: any): Promise<ApiResponse<any>> {
    return this.request('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    });
  }

  async getRatings(orderId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/ratings?orderId=${orderId}`);
  }

  // Analytics (Admin)
  async getAnalytics(period: string = 'week'): Promise<ApiResponse<any>> {
    return this.request(`/analytics?period=${period}`);
  }

  async getRevenueStats(): Promise<ApiResponse<any>> {
    return this.request('/analytics/revenue');
  }

  // Delivery Management
  async getDeliveryTasks(deliveryUserId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/delivery/tasks?userId=${deliveryUserId}`);
  }

  async updateTaskStatus(taskId: string, status: string): Promise<ApiResponse<any>> {
    return this.request(`/delivery/tasks/${taskId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getDeliveryEarnings(deliveryUserId: string, period: string): Promise<ApiResponse<any>> {
    return this.request(`/delivery/earnings?userId=${deliveryUserId}&period=${period}`);
  }
}

export const apiService = new ApiService();
export default apiService;
