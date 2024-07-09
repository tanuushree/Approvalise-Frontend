import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface UserContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  login: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Load userId from local storage on initial render
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId);
        localStorage.setItem('userId', data.userId); // Save userId to local storage
        localStorage.setItem('token', data.token);
      } else {
        throw new Error(data.msg || "Login failed");
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
