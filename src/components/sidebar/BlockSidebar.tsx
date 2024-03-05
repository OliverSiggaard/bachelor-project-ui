import React, {useState} from 'react';
import api from "../../api/axiosConfig";
import {Button} from "@mui/material";
import {addBlock} from "../../redux/reducers/blockReducer";
import {useDispatch, useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";
import BlockEditor from "./block-editors/BlockEditor";
import InputBlock from "../blocks/InputBlock";
import OutputBlock from "../blocks/OutputBlock";

const BlockSidebar: React.FC = () => {

  const [helloString, setHelloString] = useState<string>('');

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dispatch = useDispatch();

  const handleAddBlock = () => {
    const newBlockId = blocks.length;
    dispatch(addBlock({
      index: newBlockId,
      type: "base"
    }));
  }

  const addBlockOfType = (type: string) => {
    const newBlockId = blocks.length;
    dispatch(addBlock({index: newBlockId, type: type}));
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

  const buttonBlock: Block = {index: -1, type: "button"}

  return (
    <div className="flex flex-col" style={{minWidth: "250px", maxWidth: "250px"}}>
      <div className="flex flex-col items-center space-y-6 overflow-auto" style={{padding: 10}}>
        <InputBlock block={buttonBlock} draggable={false} />
        <OutputBlock block={buttonBlock} draggable={false} />
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
      <BlockEditor />
    </div>
  );
};

export default BlockSidebar;
