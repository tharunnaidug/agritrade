import React from 'react';

const Announcementbar = ({ message }) => {
  return (
    <div className="bg-info text-dark text-center py-2 fw-semibold">
      🔔 {message}
    </div>
  );
};

export default Announcementbar;
