import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/blockReducer";
import {Block, StoreBlockInfo} from "../../../types/blockTypes";
import AutocompleteDropletId from "./custom-block-editor-inputs/AutocompleteDropletId";
import PositionInput from "./custom-block-editor-inputs/PositionInput";
import DecimalInput from "./custom-block-editor-inputs/DecimalInput";

interface StoreBlockEditorProps {
  block: Block;
}

const StoreBlockEditor: React.FC<StoreBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [dropletId, setDropletId] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as StoreBlockInfo;
      setDropletId(blockInfo.dropletId);
      setPosX(blockInfo.posX);
      setPosY(blockInfo.posY);
      setTime(blockInfo.time);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      dropletId: dropletId,
      posX: posX,
      posY: posY,
      time: time,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setDropletId('');
    setPosX('');
    setPosY('');
    setTime('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Store Block</div>
      <AutocompleteDropletId dropletId={dropletId} setDropletId={setDropletId} />
      <PositionInput
        posX={posX}
        posY={posY}
        setPosX={setPosX}
        setPosY={setPosY}
      />
      <DecimalInput value={time} setValue={setTime} text="Time (ms)" />
      <div className="flex flex-row space-x-3">
        <Button variant="contained" fullWidth={true} color="error" onClick={() => dispatch(removeBlock(block.index))}>
          Delete
        </Button>
        <Button variant="contained" fullWidth={true} color="success" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default StoreBlockEditor;