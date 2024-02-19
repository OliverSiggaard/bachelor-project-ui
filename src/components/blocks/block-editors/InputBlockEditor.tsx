import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editBlock} from "../../../redux/reducers/blockReducer";
import {selectBlock} from "../../../redux/reducers/selectBlockReducer";

const InputBlockEditor: React.FC = () => {
  const [dropletID, setDropletID] = useState('');
  const [xPos, setXPos] = useState('');
  const [yPos, setYPos] = useState('');
  const [volume, setVolume] = useState('');

  const selectedBlock = useSelector((state: { selectBlock: {selectedIndex: number | null} }) => state.selectBlock.selectedIndex);

  const dispatch = useDispatch();

  const handleSave = () => {
    const info = {
      dropletID: dropletID,
      posX: xPos,
      posY: yPos,
      volume: volume,
    }

    if (selectedBlock !== null) {
      dispatch(editBlock({index: selectedBlock, info: info}));
    }

    dispatch(selectBlock(null));
  }

  const handleCancel = () => {
    dispatch(selectBlock(null));
  }

  return (
    <div>
      {selectedBlock !== null &&
        <div className="flex flex-col space-y-3" style={{margin: 20}}>
          <div style={{fontSize: 24, textAlign: "center"}}>{"Edit Input Block"}</div>
          <div style={{fontSize: 16, textAlign: "center"}}>Currently edits index {selectedBlock}</div>
          <TextField
            variant="outlined"
            label="Droplet ID"
            onChange={(e) => setDropletID(e.target.value)}
          />
          <div className="flex flex-row space-x-3">
            <TextField
              variant="outlined"
              label="x-Pos"
              onChange={(e) => setXPos(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="y-Pos"
              onChange={(e) => setYPos(e.target.value)}
            />
          </div>
          <TextField
            variant="outlined"
            label="Volume"
            onChange={(e) => setVolume(e.target.value)}
          />
          <div className="flex flex-row space-x-3">
            <Button variant="contained" color="error" fullWidth={true} onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" color="success" fullWidth={true} onClick={handleSave}>Save</Button>
          </div>
        </div>
      }
    </div>
  );
};

export default InputBlockEditor;