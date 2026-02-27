interface User {
    email: string;
    name: string;
    image: string;
    role: string;
    apiKeys: string[];
}

// UserModel class definition
class UserModel {
    private users: User[] = [];

    // Method to find or create a user
    findOrCreateUser(email: string, name: string): User {
        const existingUser = this.findByEmail(email);
        if (existingUser) {
            return existingUser;
        }
        const newUser: User = { email, name, image: '', role: 'user', apiKeys: [] };
        this.users.push(newUser);
        return newUser;
    }

    // Method to find a user by email
    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    // Method to find a user by id (not implemented, as there's no id in User interface)
    findById(id: string): User | undefined {
        console.warn('findById method is not implemented because User does not have an id property.');
        return undefined;
    }

    // Method to update user details
    updateUser(email: string, updates: Partial<Omit<User, 'email'>>): User | undefined {
        const user = this.findByEmail(email);
        if (user) {
            Object.assign(user, updates);
            return user;
        }
        return undefined;
    }

    // Method to save an API key
    saveApiKey(email: string, apiKey: string): User | undefined {
        const user = this.findByEmail(email);
        if (user) {
            user.apiKeys.push(apiKey);
            return user;
        }
        return undefined;
    }

    // Method to get API keys
    getApiKey(email: string): string[] | undefined {
        const user = this.findByEmail(email);
        return user ? user.apiKeys : undefined;
    }
}
