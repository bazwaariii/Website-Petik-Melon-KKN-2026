import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white rounded-3xl p-4 border border-melon-100 animate-pulse">
    <div className="h-48 bg-melon-200/50 rounded-2xl mb-4" />
    <div className="h-6 bg-melon-200/60 rounded-md w-3/4 mb-2" />
    <div className="h-4 bg-melon-100 rounded-md w-full mb-2" />
    <div className="h-4 bg-melon-100 rounded-md w-2/3 mb-4" />
    <div className="h-10 bg-melon-200/50 rounded-full w-full" />
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-melon-100 animate-pulse space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-melon-100/50">
        <div className="h-5 bg-melon-200/60 rounded w-1/4" />
        <div className="h-5 bg-melon-100 rounded w-1/4" />
        <div className="h-5 bg-melon-100 rounded w-1/6" />
        <div className="h-8 bg-melon-200/50 rounded-full w-20" />
      </div>
    ))}
  </div>
);
