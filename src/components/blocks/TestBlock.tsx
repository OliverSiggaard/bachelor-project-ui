import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {draggableItemTypes} from "../../types/draggableItemTypes";
import type {Identifier} from 'dnd-core'
import {moveBlock} from "../../redux/reducers/blockReducer";
import {useDispatch} from "react-redux";

interface BlockProps {
  color: string;
  index: number;
}

interface DragItem {
  index: number
  type: string
}

const TestBlock: React.FC<BlockProps> = ({index, color}) => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Drop target - each block acts as a drop target that allows blocks to switch place
  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: draggableItemTypes.BLOCK,
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
    type: draggableItemTypes.BLOCK,
    item: {index},
  })

  drag(drop(ref))
  return (
    <div ref={ref} style={{width: 150, height: 150, backgroundColor: color, borderRadius: 10, margin: 10}}/>
  )
};

export default TestBlock;