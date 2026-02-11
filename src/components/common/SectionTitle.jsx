import React from 'react';

const SectionTitle = ({ title, subtitle, icon: Icon, action }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 bg-sakura-100 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5 text-sakura-600" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-800">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sakura-600 hover:text-sakura-700 font-medium text-sm hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default SectionTitle;
