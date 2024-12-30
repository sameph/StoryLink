import { useEffect, useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('/notifications', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <div>
      {notifications.map((notification) => (
        <p key={notification._id}>
          {notification.message} - {notification.isRead ? 'Read' : 'Unread'}
        </p>
      ))}
    </div>
  );
};

export default Notifications;

