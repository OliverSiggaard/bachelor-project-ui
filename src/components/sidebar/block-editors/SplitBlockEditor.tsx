import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/reducers/blockReducer";
import {Block, SplitBlockInfo} from "../../../types/blockTypes";

interface SplitBlockEditorProps {
  block: Block;
}

const SplitBlockEditor: React.FC<SplitBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [originDropletID, setOriginDropletID] = useState('');
  const [resultDropletID1, setResultDropletID1] = useState('');
  const [resultDropletID2, setResultDropletID2] = useState('');
  const [ratio, setRatio] = useState('');
  const [xPos1, setXPos1] = useState('');
  const [yPos1, setYPos1] = useState('');
  const [xPos2, setXPos2] = useState('');
  const [yPos2, setYPos2] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as SplitBlockInfo;
      setOriginDropletID(blockInfo.originDropletID);
      setResultDropletID1(blockInfo.resultDropletID1);
      setResultDropletID2(blockInfo.resultDropletID2);
      setRatio(blockInfo.ratio);
      setXPos1(blockInfo.xPos1);
      setYPos1(blockInfo.yPos1);
      setXPos2(blockInfo.xPos2);
      setYPos2(blockInfo.yPos2);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      originDropletID: originDropletID,
      resultDropletID1: resultDropletID1,
      resultDropletID2: resultDropletID2,
      ratio: ratio,
      xPos1: xPos1,
      yPos1: yPos1,
      xPos2: xPos2,
      yPos2: yPos2,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setOriginDropletID('');
    setResultDropletID1('');
    setResultDropletID2('');
    setRatio('');
    setXPos1('');
    setYPos1('');
    setXPos2('');
    setYPos2('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Split Block</div>
      <TextField
        variant="outlined"
        label="Origin Droplet ID"
        value={originDropletID}
        onChange={(e) => setOriginDropletID(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Droplet 1 ID"
        value={resultDropletID1}
        onChange={(e) => setResultDropletID1(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Droplet 2 ID"
        value={resultDropletID2}
        onChange={(e) => setResultDropletID2(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Ratio"
        value={ratio}
        onChange={(e) => setRatio(e.target.value)}
      />
      <div className="flex flex-row space-x-3">
        <TextField
          variant="outlined"
          label="x-Pos 1"
          value={xPos1}
          onChange={(e) => setXPos1(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="y-Pos 1"
          value={yPos1}
          onChange={(e) => setYPos1(e.target.value)}
        />
      </div>
      <div className="flex flex-row space-x-3">
        <TextField
          variant="outlined"
          label="x-Pos 2"
          value={xPos2}
          onChange={(e) => setXPos2(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="y-Pos 2"
          value={yPos2}
          onChange={(e) => setYPos2(e.target.value)}
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

export default SplitBlockEditor;