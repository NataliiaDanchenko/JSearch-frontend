'use client';

import { useState, useEffect } from 'react';

export interface Profile {
  name: string;
  desiredJobTitle: string;
  about: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

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