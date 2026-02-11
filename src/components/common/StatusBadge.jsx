import React from 'react';
import { getStatusColor } from '../../utils/helpers';

const StatusBadge = ({ status, size = 'md' }) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`${sizes[size]} ${getStatusColor(status)} text-white rounded-full font-medium inline-block`}>
      {status}
    </span>
  );
};

export default StatusBadge;
