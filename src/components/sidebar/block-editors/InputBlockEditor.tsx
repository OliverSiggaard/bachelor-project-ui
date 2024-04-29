import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/blockReducer";
import {Block, InputBlockInfo} from "../../../types/blockTypes";
import PositionInput from "./custom-block-editor-inputs/PositionInput";
import {getAvailableDropletIdsForIndex} from "../../../utils/dropletIdUtils";
import VolumeInput from "./custom-block-editor-inputs/VolumeInput";

interface InputBlockEditorProps {
  block: Block;
}

const InputBlockEditor: React.FC<InputBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();
  
  const [dropletId, setDropletId] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');
  const [volume, setVolume] = useState('');
  const [dropletIdInvalid, setDropletIdInvalid] = useState(false);

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dropletIds = getAvailableDropletIdsForIndex(blocks, block.index!);

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as InputBlockInfo;
      setDropletId(blockInfo.dropletId);
      setPosX(blockInfo.posX);
      setPosY(blockInfo.posY);
      setVolume(blockInfo.volume);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      dropletId: dropletId,
      posX: posX,
      posY: posY,
      volume: volume,
    }

    // Return early if droplet ID is invalid
    if (dropletIds.includes(dropletId)) {
      setDropletIdInvalid(true);
      return;
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setDropletId('');
    setPosX('');
    setPosY('');
    setVolume('');
    setDropletIdInvalid(false);
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Input Block</div>
      <TextField
        variant="outlined"
        label="Droplet ID"
        value={dropletId}
        onChange={(e) => {
          setDropletId(e.target.value);
          setDropletIdInvalid(false);
        }}
        error={dropletIdInvalid}
        helperText={dropletIdInvalid ? "Droplet ID must be unique" : ""}
      />
      <PositionInput
        posX={posX}
        posY={posY}
        setPosX={setPosX}
        setPosY={setPosY}
      />
      <VolumeInput volume={volume} setVolume={setVolume} />
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

export default InputBlockEditor;