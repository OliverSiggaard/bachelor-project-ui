import React from 'react';
import EmptyBlock from "./blocks/EmptyBlock";

const BlockSidebar: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center" style={{width: "300px"}}>
      <EmptyBlock />
    </div>
  );
};

export default BlockSidebar;
