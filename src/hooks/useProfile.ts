// hooks/useProfile.ts
'use client';

import { useState, useEffect } from 'react';

export interface Profile {
  name: string;
  desiredJobTitle: string;
  about: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  // Загружаем профиль из LocalStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  // Сохраняем профиль в LocalStorage
  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('profile');
    }
  }, [profile]);

  const saveProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  const clearProfile = () => {
    setProfile(null);
  };

  return { profile, saveProfile, clearProfile };
}