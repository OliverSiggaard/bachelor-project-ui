import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/reducers/blockReducer";
import {Block, MergeBlockInfo} from "../../../types/blockTypes";

interface MergeBlockEditorProps {
  block: Block;
}

const MergeBlockEditor: React.FC<MergeBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [originDropletID1, setOriginDropletID1] = useState('');
  const [originDropletID2, setOriginDropletID2] = useState('');
  const [resultDropletID, setResultDropletID] = useState('');
  const [xPos, setXPos] = useState('');
  const [yPos, setYPos] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as MergeBlockInfo;
      setOriginDropletID1(blockInfo.originDropletID1);
      setOriginDropletID2(blockInfo.originDropletID2);
      setResultDropletID(blockInfo.resultDropletID);
      setXPos(blockInfo.xPos);
      setYPos(blockInfo.yPos);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      originDropletID1: originDropletID1,
      originDropletID2: originDropletID2,
      resultDropletID: resultDropletID,
      xPos: xPos,
      yPos: yPos,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setOriginDropletID1('');
    setOriginDropletID2('');
    setResultDropletID('');
    setXPos('');
    setYPos('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Merge Block</div>
      <TextField
        variant="outlined"
        label="Origin Droplet 1 ID"
        value={originDropletID1}
        onChange={(e) => setOriginDropletID1(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Origin Droplet 2 ID"
        value={originDropletID2}
        onChange={(e) => setOriginDropletID2(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Result Droplet ID"
        value={resultDropletID}
        onChange={(e) => setResultDropletID(e.target.value)}
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

export default MergeBlockEditor;