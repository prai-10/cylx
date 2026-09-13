import React from 'react';

interface AdminTableProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  children,
  headerContent,
  emptyMessage = 'No records found.',
  isEmpty = false,
}) => {
  return (
    <div className="w-full bg-[#162048] border border-[rgba(251,252,252,0.08)] rounded-2xl overflow-hidden shadow-lg">
      {headerContent && (
        <div className="p-6 border-b border-[rgba(251,252,252,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {headerContent}
        </div>
      )}

      {isEmpty ? (
        <div className="py-16 text-center text-[#9aaecf] text-sm">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#9aaecf]">
            {children}
          </table>
        </div>
      )}
    </div>
  );
};
