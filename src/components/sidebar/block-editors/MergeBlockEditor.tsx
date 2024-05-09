import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/blockReducer";
import {Block, MergeBlockInfo} from "../../../types/blockTypes";
import AutocompleteDropletId from "./custom-block-editor-inputs/AutocompleteDropletId";
import PositionInput from "./custom-block-editor-inputs/PositionInput";
import {getAvailableDropletIdsForIndex} from "../../../utils/dropletIdUtils";
import {useKeyboardShortcut} from "./useKeyboardShortcut";

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
  const [resultDropletIdInvalid, setResultDropletInvalid] = useState(false);
  const [sameOriginDropletId, setSameOriginDropletId] = useState(false);

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dropletIds = getAvailableDropletIdsForIndex(blocks, block.index!);

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

    // Return early if result droplet ID is invalid
    if (dropletIds.includes(resultDropletId)) {
      setResultDropletInvalid(true);
      return;
    }

    // Return early if origin droplet IDs are the same
    if (originDropletId1 === originDropletId2 && originDropletId1 !== '' && originDropletId2 !== '') {
      setSameOriginDropletId(true);
      return;
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

  useKeyboardShortcut(handleSave, block.index, [originDropletId1, originDropletId2, resultDropletId, posX, posY]);

  return (
    <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}} data-testid="merge-block-editor">
      <div style={{fontSize: 24, textAlign: "center"}}>Merge Block</div>
      <AutocompleteDropletId
        dropletId={originDropletId1}
        setDropletId={(value) => {
          setOriginDropletId1(value);
          setSameOriginDropletId(false);
        }}
        showError={sameOriginDropletId}
        errorMessage="Origin droplet IDs are the same"
        text="Origin Droplet 1 ID"
      />
      <AutocompleteDropletId
        dropletId={originDropletId2}
        setDropletId={(value) => {
          setOriginDropletId2(value);
          setSameOriginDropletId(false);
        }}
        showError={sameOriginDropletId}
        errorMessage="Origin droplet IDs are the same"
        text="Origin Droplet 2 ID"
      />
      <TextField
        variant="outlined"
        label="Result Droplet ID"
        value={resultDropletId}
        onChange={(e) => {
          setResultDropletId(e.target.value);
          setResultDropletInvalid(false);
        }}
        error={resultDropletIdInvalid}
        helperText={resultDropletIdInvalid ? "Droplet ID must be unique" : ""}
      />
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

export default MergeBlockEditor;