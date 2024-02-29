import React, {useState} from 'react';
import {Button, Divider, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editBlock, removeBlock, selectBlock} from "../../../redux/reducers/blockReducer";
import {KeyboardArrowDown} from "@mui/icons-material";

const InputBlockEditor: React.FC = () => {
  const [dropletID, setDropletID] = useState('');
  const [xPos, setXPos] = useState('');
  const [yPos, setYPos] = useState('');
  const [volume, setVolume] = useState('');

  const selectedBlock = useSelector((state: {selectedIndex: number | null}) => state.selectedIndex);

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

  const handleClose = () => {
    dispatch(selectBlock(null));
  }

  const handleRemoveBlock = () => {
    dispatch(removeBlock(selectedBlock!))
  }

  return (
    <div>
      {selectedBlock !== null &&
        <div>
          <Divider orientation="horizontal" sx={{borderTopWidth: 3}}/>
            <Button className="w-full" color="secondary" onClick={handleClose}>
              <KeyboardArrowDown/>
            </Button>
          <div className="flex flex-col space-y-3" style={{margin: "0px 20px 20px 20px"}}>
            <div style={{fontSize: 24, textAlign: "center"}}>Edit Block {selectedBlock}</div>
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
              <Button variant="contained" fullWidth={true} color="error" onClick={handleRemoveBlock}>Delete</Button>
              <Button variant="contained" fullWidth={true} color="success" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default InputBlockEditor;