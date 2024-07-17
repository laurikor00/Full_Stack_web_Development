// src/components/Notification.js
import React, { useEffect } from 'react';

const Notification = ({ message, removeNotification }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        removeNotification();
      }, 3000); // Clear notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, removeNotification]);

  if (!message) {
    return null;
  }

  return (
    <div>
      {message}
    </div>
  );
};

export default Notification;
