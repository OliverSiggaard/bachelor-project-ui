import React, {useState} from 'react';
import api from "../../api/axiosConfig";
import {Button} from "@mui/material";
import {addBlock} from "../../redux/reducers/blockReducer";
import {useDispatch, useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";
import BlockEditor from "./block-editors/BlockEditor";
import InputBlock from "../blocks/InputBlock";
import OutputBlock from "../blocks/OutputBlock";
import MoveBlock from "../blocks/MoveBlock";
import MergeBlock from "../blocks/MergeBlock";
import SplitBlock from "../blocks/SplitBlock";
import MixBlock from "../blocks/MixBlock";
import StoreBlock from "../blocks/StoreBlock";
import IfBlock from "../blocks/IfBlock";
import RepeatBlock from "../blocks/RepeatBlock";

const BlockSidebar: React.FC = () => {

  const [helloString, setHelloString] = useState<string>('');

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dispatch = useDispatch();

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
    <div className="flex flex-col" style={{minWidth: 250, maxWidth: 250}}>
      <div className="flex flex-col items-center space-y-4 overflow-auto select-none" style={{padding: 20}}>
        <InputBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("input")}/>
        <OutputBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("output")}/>
        <MoveBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("move")}/>
        <MergeBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("merge")}/>
        <SplitBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("split")}/>
        <MixBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("mix")}/>
        <StoreBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("store")}/>
        <IfBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("if")}/>
        <RepeatBlock block={buttonBlock} draggable={false} onClick={() => addBlockOfType("repeat")}/>
        <Button variant="contained" onClick={logBlocks} sx={{width: 150}}>Log Blocks</Button>
        <Button variant="contained" onClick={getHelloString} sx={{width: 150}}>Spring Boot</Button>
        <div style={{textAlign: 'center'}}>
          {helloString}
        </div>
      </div>
      <BlockEditor/>
    </div>
  );
};

export default BlockSidebar;
