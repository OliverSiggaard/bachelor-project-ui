import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/reducers/blockReducer";
import {Block, MoveBlockInfo} from "../../../types/blockTypes";

interface MoveBlockEditorProps {
  block: Block;
}

const MoveBlockEditor: React.FC<MoveBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [dropletID, setDropletID] = useState('');
  const [xPos, setXPos] = useState('');
  const [yPos, setYPos] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as MoveBlockInfo;
      setDropletID(blockInfo.dropletID);
      setXPos(blockInfo.xPos);
      setYPos(blockInfo.yPos);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      dropletID: dropletID,
      xPos: xPos,
      yPos: yPos,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setDropletID('');
    setXPos('');
    setYPos('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Move Block</div>
      <TextField
        variant="outlined"
        label="Droplet ID"
        value={dropletID}
        onChange={(e) => setDropletID(e.target.value)}
      />
      <div className="flex flex-row space-x-3">
        <TextField
          variant="outlined"
          label="x-Pos"
          value={xPos}
          onChange={(e) => setXPos(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="y-Pos"
          value={yPos}
          onChange={(e) => setYPos(e.target.value)}
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

export default MoveBlockEditor;