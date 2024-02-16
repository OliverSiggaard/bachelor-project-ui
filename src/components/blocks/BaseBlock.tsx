import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {dndItemTypes} from "../../types/dndItemTypes";
import type {Identifier} from 'dnd-core'
import {moveBlock} from "../../redux/reducers/blockReducer";
import {useDispatch} from "react-redux";

interface BaseBlockProps {
  index: number;
  color: string;
  children?: React.ReactNode;
}

interface DragItem {
  index: number
  type: string
}

const BaseBlock: React.FC<BaseBlockProps> = ({ index, color, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Drop target - each block acts as a drop target that allows blocks to switch place
  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: dndItemTypes.BLOCK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem) {
      if (!ref.current) return;

      const dragIndex = item.index; // Index of dragged item
      const hoverIndex = index; // Index of drop target
      if (dragIndex === hoverIndex) return;

      dispatch(moveBlock({dragIndex, hoverIndex}));

      item.index = hoverIndex;
    }
  });

  // Makes the block draggable
  const [, drag] = useDrag({
    type: dndItemTypes.BLOCK,
    item: {index},
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{
      backgroundColor: color,
      width: 150,
      height: 150,
      borderRadius: 10,
      margin: 15,
    }}>
      {children}
    </div>
  );
};

export default BaseBlock;