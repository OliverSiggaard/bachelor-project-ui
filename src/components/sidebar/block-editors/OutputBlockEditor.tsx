import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/blockReducer";
import {Block, OutputBlockInfo} from "../../../types/blockTypes";
import AutocompleteDropletId from "./custom-block-editor-inputs/AutocompleteDropletId";
import PositionInput from "./custom-block-editor-inputs/PositionInput";
import {useKeyboardShortcut} from "./useKeyboardShortcut";

interface OutputBlockEditorProps {
  block: Block;
}

const OutputBlockEditor: React.FC<OutputBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [dropletId, setDropletId] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as OutputBlockInfo;
      setDropletId(blockInfo.dropletId);
      setPosX(blockInfo.posX);
      setPosY(blockInfo.posY);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      dropletId: dropletId,
      posX: posX,
      posY: posY,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setDropletId('');
    setPosX('');
    setPosY('');
  }

  useKeyboardShortcut(handleSave, [dropletId, posX, posY]);

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Output Block</div>
      <AutocompleteDropletId dropletId={dropletId} setDropletId={setDropletId} />
      <PositionInput
        posX={posX}
        posY={posY}
        setPosX={setPosX}
        setPosY={setPosY}
      />
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

export default OutputBlockEditor;