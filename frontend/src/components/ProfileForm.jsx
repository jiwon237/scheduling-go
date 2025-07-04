import React, { useState, useEffect } from 'react';
import '../styles/ProfileForm.css';
import { FaUserCircle } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { getCurrentUser, signout } from '../api/api';

export default function ProfileForm({ onLogout }) {
  const [ user, setUser ] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const current = await getCurrentUser();
        console.log(current);
        setUser(current);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signout();
      onLogout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="account-panel">
      <h3 className="section-title">Account</h3>
      <div className="user-info">
        <FaUserCircle className="profile-icon" />
        <div>
          <div className="user-name">{user.nickname}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
      <div className="version-info">
        <div>Version: v1.0.0-beta</div>
        <div>Release Date: 2025.06.26</div>
      </div>

    <div className="bottom-section">
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
      <a
        href="https://www.instagram.com/scheduling_go/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="instagram-icon" />
      </a>
    </div>
  </div>
  );
};

