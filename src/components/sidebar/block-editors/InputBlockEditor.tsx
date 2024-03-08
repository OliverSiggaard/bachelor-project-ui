import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/reducers/blockReducer";
import {Block, InputBlockInfo} from "../../../types/blockTypes";

interface InputBlockEditorProps {
  block: Block;
}

const InputBlockEditor: React.FC<InputBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();
  
  const [dropletId, setDropletId] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');
  const [volume, setVolume] = useState('');

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

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setDropletId('');
    setPosX('');
    setPosY('');
    setVolume('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Input Block</div>
      <TextField
        variant="outlined"
        label="Droplet ID"
        value={dropletId}
        onChange={(e) => setDropletId(e.target.value)}
      />
      <div className="flex flex-row space-x-3">
        <TextField
          variant="outlined"
          label="x-Pos"
          value={posX}
          onChange={(e) => setPosX(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="y-Pos"
          value={posY}
          onChange={(e) => setPosY(e.target.value)}
        />
      </div>
      <TextField
        variant="outlined"
        label="Volume"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
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

export default InputBlockEditor;