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

  const [originDropletId, setOriginDropletId] = useState('');
  const [resultDropletId1, setResultDropletId1] = useState('');
  const [resultDropletId2, setResultDropletId2] = useState('');
  const [ratio, setRatio] = useState('');
  const [posX1, setPosX1] = useState('');
  const [posY1, setPosY1] = useState('');
  const [posX2, setPosX2] = useState('');
  const [posY2, setPosY2] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as SplitBlockInfo;
      setOriginDropletId(blockInfo.originDropletId);
      setResultDropletId1(blockInfo.resultDropletId1);
      setResultDropletId2(blockInfo.resultDropletId2);
      setRatio(blockInfo.ratio);
      setPosX1(blockInfo.posX1);
      setPosY1(blockInfo.posY1);
      setPosX2(blockInfo.posX2);
      setPosY2(blockInfo.posY2);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      originDropletId: originDropletId,
      resultDropletId1: resultDropletId1,
      resultDropletId2: resultDropletId2,
      ratio: ratio,
      posX1: posX1,
      posY1: posY1,
      posX2: posX2,
      posY2: posY2,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setOriginDropletId('');
    setResultDropletId1('');
    setResultDropletId2('');
    setRatio('');
    setPosX1('');
    setPosY1('');
    setPosX2('');
    setPosY2('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Split Block</div>
      <TextField
        variant="outlined"
        label="Origin Droplet ID"
        value={originDropletId}
        onChange={(e) => setOriginDropletId(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Result Droplet 1 ID"
        value={resultDropletId1}
        onChange={(e) => setResultDropletId1(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Result Droplet 2 ID"
        value={resultDropletId2}
        onChange={(e) => setResultDropletId2(e.target.value)}
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
          value={posX1}
          onChange={(e) => setPosX1(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="y-Pos 1"
          value={posY1}
          onChange={(e) => setPosY1(e.target.value)}
        />
      </div>
      <div className="flex flex-row space-x-3">
        <TextField
          variant="outlined"
          label="x-Pos 2"
          value={posX2}
          onChange={(e) => setPosX2(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="y-Pos 2"
          value={posY2}
          onChange={(e) => setPosY2(e.target.value)}
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