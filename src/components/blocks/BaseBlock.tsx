import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {dndItemTypes} from "../../types/dndItemTypes";
import type {Identifier} from 'dnd-core'
import {moveBlock, selectBlock} from "../../redux/reducers/blockReducer";
import {useDispatch, useSelector} from "react-redux";

interface BaseBlockProps {
  index: number;
  color: string;
  draggable?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

interface DragItem {
  index: number
  type: string
}

const BaseBlock: React.FC<BaseBlockProps> = ({ index, color, draggable = true, onClick, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const selectedBlock = useSelector((state: { selectedIndex: number | null }) => state.selectedIndex);
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

  if (draggable) drag(drop(ref));

  const handleBlockClick = () => {
    if (!draggable && onClick) {
      onClick();
    } else if (draggable) {
      dispatch(selectBlock(index))
    }
  }

  return (
    <div ref={ref} onClick={handleBlockClick} style={{
      backgroundColor: color,
      width: 150,
      height: 150,
      borderRadius: 10,
      margin: 15,
      cursor: 'pointer',
      boxShadow: selectedBlock === index ? '0px 3px 10px 3px rgba(0,0,0,0.3)' : 'none',
    }}>
      {children}
    </div>
  );
};

export default BaseBlock;