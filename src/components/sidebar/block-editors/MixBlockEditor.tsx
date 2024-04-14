import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/blockReducer";
import {Block, MixBlockInfo} from "../../../types/blockTypes";
import AutocompleteDropletId from "./AutocompleteDropletId";

interface MixBlockEditorProps {
  block: Block;
}

const MixBlockEditor: React.FC<MixBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [dropletId, setDropletId] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');
  const [xSize, setXSize] = useState('');
  const [ySize, setYSize] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as MixBlockInfo;
      setDropletId(blockInfo.dropletId);
      setPosX(blockInfo.posX);
      setPosY(blockInfo.posY);
      setXSize(blockInfo.xSize);
      setYSize(blockInfo.ySize);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      dropletId: dropletId,
      posX: posX,
      posY: posY,
      xSize: xSize,
      ySize: ySize,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setDropletId('');
    setPosX('');
    setPosY('');
    setXSize('');
    setYSize('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Mix Block</div>
      <AutocompleteDropletId dropletId={dropletId} setDropletId={setDropletId} />
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
      <div className="flex flex-row space-x-3">
        <TextField
          variant="outlined"
          label="x-Size"
          value={xSize}
          onChange={(e) => setXSize(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="y-Size"
          value={ySize}
          onChange={(e) => setYSize(e.target.value)}
        />
      </div>
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

export default MixBlockEditor;