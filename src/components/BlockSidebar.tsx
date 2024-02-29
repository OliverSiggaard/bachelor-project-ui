import React, {useState} from 'react';
import api from "../api/axiosConfig";
import {Button} from "@mui/material";
import {addBlock} from "../redux/reducers/blockReducer";
import {useDispatch, useSelector} from "react-redux";
import {Block} from "../types/blockTypes";
import InputBlockEditor from "./blocks/block-editors/InputBlockEditor";

const BlockSidebar: React.FC = () => {

  const [helloString, setHelloString] = useState<string>('');

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dispatch = useDispatch();

  const handleAddBlock = () => {
    const newBlockId = blocks.length;
    dispatch(addBlock({
      index: newBlockId,
      color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
      type: "base"
    }));
  }

  const addBlockOfType = (type: string) => {
    const newBlockId = blocks.length;
    dispatch(addBlock({index: newBlockId, color: "", type}));
  }

  const logBlocks = () => {
    for (let i = 0; i < blocks.length; i++) {
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
    <div className="flex flex-col" style={{minWidth: "250px", maxWidth: "250px"}}>
      <div className="flex flex-col items-center space-y-6 overflow-auto" style={{padding: 10}}>
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
        <Button variant="contained" onClick={logBlocks}>Log Blocks</Button>
        <Button variant="contained" onClick={getHelloString}>Call Spring Boot</Button>
        <div style={{textAlign: 'center'}}>
          {helloString}
        </div>
      </div>
      <InputBlockEditor/>
    </div>
  );
};

export default BlockSidebar;
