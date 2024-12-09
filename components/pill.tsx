import React from "react";

interface PillProps {
  children: React.ReactNode;
  bgColor: string;
}

const Pill: React.FC<PillProps> = ({ children, bgColor }) => {
  return (
    <div
      className="inline-flex items-center px-3 py-1 rounded-full text-white"
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
};

export default Pill;
