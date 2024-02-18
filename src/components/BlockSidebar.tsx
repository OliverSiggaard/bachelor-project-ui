import React, {useState} from 'react';
import api from "../api/axiosConfig";
import {Button} from "@mui/material";
import {addTestBlock, removeTestBlock} from "../redux/reducers/blockReducer";
import {useDispatch, useSelector} from "react-redux";
import {Block} from "../types/blockTypes";
import InputBlockEditor from "./blocks/block-editors/InputBlockEditor";

const BlockSidebar: React.FC = () => {

  const [helloString, setHelloString] = useState<string>('');

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dispatch = useDispatch();

  const addBlock = () => {
    const newBlockId = blocks.length;
    dispatch(addTestBlock({index: newBlockId, color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), type: "base"}));
  }

  const addInputBlock = () => {
    const newBlockId = blocks.length;
    dispatch(addTestBlock({index: newBlockId, color: "", type: "input"}));
  }

  const removeBlock = () => {
    dispatch(removeTestBlock());
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
    <div className="flex flex-col items-center justify-center space-y-6" style={{minWidth: "250px", maxWidth: "250px"}}>
      <Button variant="contained" onClick={addBlock}>Add Base Block</Button>
      <Button variant="contained" onClick={addInputBlock}>Add Input Block</Button>
      <Button variant="contained" onClick={removeBlock}>Remove Block</Button>
      <Button variant="contained" onClick={logBlocks}>Log Blocks</Button>
      <Button variant="contained" onClick={getHelloString}>Call Spring Boot</Button>
      <div style={{textAlign: 'center'}}>
        {helloString}
      </div>
      <InputBlockEditor />
    </div>
  );
};

export default BlockSidebar;
