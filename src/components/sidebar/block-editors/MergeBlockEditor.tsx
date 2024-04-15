import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/blockReducer";
import {Block, MergeBlockInfo} from "../../../types/blockTypes";
import AutocompleteDropletId from "./block-editor-utils/AutocompleteDropletId";

interface MergeBlockEditorProps {
  block: Block;
}

const MergeBlockEditor: React.FC<MergeBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [originDropletId1, setOriginDropletId1] = useState('');
  const [originDropletId2, setOriginDropletId2] = useState('');
  const [resultDropletId, setResultDropletId] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as MergeBlockInfo;
      setOriginDropletId1(blockInfo.originDropletId1);
      setOriginDropletId2(blockInfo.originDropletId2);
      setResultDropletId(blockInfo.resultDropletId);
      setPosX(blockInfo.posX);
      setPosY(blockInfo.posY);
    }
  }, [block.info]);

  const handleSave = () => {
    const info = {
      originDropletId1: originDropletId1,
      originDropletId2: originDropletId2,
      resultDropletId: resultDropletId,
      posX: posX,
      posY: posY,
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setOriginDropletId1('');
    setOriginDropletId2('');
    setResultDropletId('');
    setPosX('');
    setPosY('');
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Merge Block</div>
      <AutocompleteDropletId dropletId={originDropletId1} setDropletId={setOriginDropletId1} text="Origin Droplet 1 ID" />
      <AutocompleteDropletId dropletId={originDropletId2} setDropletId={setOriginDropletId2} text="Origin Droplet 2 ID" />
      <TextField
        variant="outlined"
        label="Result Droplet ID"
        value={resultDropletId}
        onChange={(e) => setResultDropletId(e.target.value)}
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