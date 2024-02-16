import React, { useRef } from 'react';
import Draggable from "react-draggable";
import './EmptyBlock.css';

const EmptyBlock: React.FC = () => {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div className="empty-block" ref={nodeRef}>
        Empty Block
      </div>
    </Draggable>
  );
};

export default EmptyBlock;
