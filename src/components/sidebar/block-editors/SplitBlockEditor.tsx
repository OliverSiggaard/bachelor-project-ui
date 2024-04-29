import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/blockReducer";
import {Block, SplitBlockInfo} from "../../../types/blockTypes";
import AutocompleteDropletId from "./custom-block-editor-inputs/AutocompleteDropletId";
import PositionInput from "./custom-block-editor-inputs/PositionInput";
import {getAvailableDropletIdsForIndex} from "../../../utils/dropletIdUtils";

interface SplitBlockEditorProps {
  block: Block;
}

const SplitBlockEditor: React.FC<SplitBlockEditorProps> = ({ block }) => {
  const dispatch = useDispatch();

  const [originDropletId, setOriginDropletId] = useState('');
  const [resultDropletId1, setResultDropletId1] = useState('');
  const [resultDropletId2, setResultDropletId2] = useState('');
  const [posX1, setPosX1] = useState('');
  const [posY1, setPosY1] = useState('');
  const [posX2, setPosX2] = useState('');
  const [posY2, setPosY2] = useState('');
  const [resultDropletId1Invalid, setResultDropletId1Invalid] = useState(false);
  const [resultDropletId2Invalid, setResultDropletId2Invalid] = useState(false);

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dropletIds = getAvailableDropletIdsForIndex(blocks, block.index!);

  useEffect(() => {
    if (block.info) {
      const blockInfo = block.info as SplitBlockInfo;
      setOriginDropletId(blockInfo.originDropletId);
      setResultDropletId1(blockInfo.resultDropletId1);
      setResultDropletId2(blockInfo.resultDropletId2);
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
      posX1: posX1,
      posY1: posY1,
      posX2: posX2,
      posY2: posY2,
    }

    // Check if some combination of result droplet IDs are invalid
    if ((dropletIds.includes(resultDropletId1) && dropletIds.includes(resultDropletId2)) || resultDropletId1 === resultDropletId2) {
      setResultDropletId1Invalid(true);
      setResultDropletId2Invalid(true);
      return;
    } else if (dropletIds.includes(resultDropletId1)) {
      setResultDropletId1Invalid(true);
      return;
    } else if (dropletIds.includes(resultDropletId2)) {
      setResultDropletId2Invalid(true);
      return;
    }

    // Dispatch new info and de-select block
    dispatch(editBlock({index: block.index, info: info}));
    dispatch(selectBlock(null));

    // Reset state
    setOriginDropletId('');
    setResultDropletId1('');
    setResultDropletId2('');
    setPosX1('');
    setPosY1('');
    setPosX2('');
    setPosY2('');
  }

  const resetInvalidStates = () => {
    setResultDropletId1Invalid(false);
    setResultDropletId2Invalid(false);
  }

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
      <div style={{fontSize: 24, textAlign: "center"}}>Split Block</div>
      <AutocompleteDropletId dropletId={originDropletId} setDropletId={setOriginDropletId} text="Origin Droplet ID" />
      <TextField
        variant="outlined"
        label="Result Droplet 1 ID"
        value={resultDropletId1}
        onChange={(e) => {
          setResultDropletId1(e.target.value);
          resetInvalidStates();
        }}
        error={resultDropletId1Invalid}
        helperText={resultDropletId1Invalid ? "Droplet ID must be unique" : ""}
      />
      <TextField
        variant="outlined"
        label="Result Droplet 2 ID"
        value={resultDropletId2}
        onChange={(e) => {
          setResultDropletId2(e.target.value);
          resetInvalidStates()
        }}
        error={resultDropletId2Invalid}
        helperText={resultDropletId2Invalid ? "Droplet ID must be unique" : ""}
      />
      <PositionInput
        posX={posX1}
        posY={posY1}
        setPosX={setPosX1}
        setPosY={setPosY1}
        textPosX={"x-Pos 1"}
        textPosY={"y-Pos 1"}
      />
      <PositionInput
        posX={posX2}
        posY={posY2}
        setPosX={setPosX2}
        setPosY={setPosY2}
        textPosX={"x-Pos 2"}
        textPosY={"y-Pos 2"}
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

export default SplitBlockEditor;