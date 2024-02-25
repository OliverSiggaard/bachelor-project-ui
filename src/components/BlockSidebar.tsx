import React, {useState} from 'react';
import api from "../api/axiosConfig";
import {Box, Button} from "@mui/material";
import {addBlock, removeBlock} from "../redux/reducers/blockReducer";
import {useDispatch, useSelector} from "react-redux";
import {Block} from "../types/blockTypes";
import InputBlockEditor from "./blocks/block-editors/InputBlockEditor";

const BlockSidebar: React.FC = () => {

  const [helloString, setHelloString] = useState<string>('');

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dispatch = useDispatch();
  type UnknownAction = any;

  const handleAddBlock = () => {
    const newBlockId = blocks.length;
    dispatch(addBlock({index: newBlockId, color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), type: "base"}));
  }

  const addBlockOfType = (type: string) => {
    const newBlockId = blocks.length;
    dispatch(addBlock({ index: newBlockId, color: "", type }));
  }

  const handleRemoveBlock = () => {
    dispatch(removeBlock());
  }

  const logBlocks = () => {
    for(let i = 0; i < blocks.length; i++) {
      console.log(blocks.at(i));
    }
  }

  const getHelloString = async () => {
    try {
      const response = await api.get("/root");
      setHelloString(response.data);
    } catch (err) {
      setHelloString("Error connecting to Spring Boot - check if it is running")
    }
  }

  return (
    // Remove this box, to remove scrollbar. Added for now, to see items below buttons..
    <Box
      mb={2}
      display="flex"
      flexDirection="column"
      // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
      height="700px" // fixed the height
      style={{
        border: "2px solid black",
        overflow: "hidden",
        overflowY: "scroll" // added scroll
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-6" style={{minWidth: "250px", maxWidth: "250px"}}>
        <Button variant="contained" onClick={handleAddBlock}>Add Base Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("input")}>Add Input Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("output")}>Add Output Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("move")}>Add Move Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("merge")}>Add Merge Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("split")}>Add Split Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("mix")}>Add Mix Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("store")}>Add Store Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("if")}>Add If Block</Button>
        <Button variant="contained" onClick={() => addBlockOfType("repeat")}>Add Repeat Block</Button>
        <Button variant="contained" onClick={handleRemoveBlock}>Remove Block</Button>
        <Button variant="contained" onClick={logBlocks}>Log Blocks</Button>
        <Button variant="contained" onClick={getHelloString}>Call Spring Boot</Button>
        <div style={{textAlign: 'center'}}>
          {helloString}
        </div>
        <InputBlockEditor />
      </div>
    </Box>

  );
};

export default BlockSidebar;
