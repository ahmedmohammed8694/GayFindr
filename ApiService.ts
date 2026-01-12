const API_BASE_URL = 'http://localhost:3000'; // Replace with your deployed backend URL

class ApiService {
  private token: string | null = null;

  setAuthToken(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Profile endpoints
  async getMyProfile() {
    return this.request('/profiles/me');
  }

  async updateProfile(data: any) {
    return this.request('/profiles/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getPhotoUploadUrl(contentType: string) {
    return this.request('/profiles/me/photos/upload-url', {
      method: 'POST',
      body: JSON.stringify({ contentType }),
    });
  }

  async confirmPhotoUpload(key: string, order: number) {
    return this.request('/profiles/me/photos', {
      method: 'POST',
      body: JSON.stringify({ key, order }),
    });
  }

  // Mock endpoints for UI (replace with actual backend endpoints)
  async getNearbyProfiles(filters: any = {}) {
    // This would connect to your location-based profile search
    return {
      profiles: [
        {
          id: '1',
          displayName: 'Alex',
          age: 25,
          distance: 150,
          isOnline: true,
          photos: [{ url: 'https://via.placeholder.com/200' }],
          bio: 'Love hiking and coffee',
          isVerified: true,
        },
        {
          id: '2',
          displayName: 'Jordan',
          age: 28,
          distance: 500,
          isOnline: false,
          photos: [{ url: 'https://via.placeholder.com/200' }],
          bio: 'Photographer and traveler',
          isVerified: false,
        },
      ],
    };
  }

  async getChats() {
    // This would connect to your chat list endpoint
    return {
      chats: [
        {
          id: '1',
          otherUser: {
            id: '1',
            displayName: 'Alex',
            photos: [{ url: 'https://via.placeholder.com/200' }],
            isOnline: true,
          },
          lastMessage: {
            content: 'Hey there!',
            createdAt: new Date().toISOString(),
          },
          unreadCount: 2,
        },
      ],
    };
  }

  async getChatMessages(chatId: string) {
    // This would connect to your messages endpoint
    return {
      messages: [
        {
          id: '1',
          content: 'Hey there!',
          senderId: '1',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          content: 'Hi! How are you?',
          senderId: 'currentUserId',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  async sendMessage(chatId: string, content: string) {
    // This would connect to your send message endpoint
    return {
      message: {
        id: Date.now().toString(),
        content,
        senderId: 'currentUserId',
        createdAt: new Date().toISOString(),
      },
    };
  }
}

export default new ApiService();