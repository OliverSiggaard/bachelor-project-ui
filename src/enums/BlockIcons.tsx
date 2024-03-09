import React from "react";
import {
  Input,
  Output,
  OpenWith as Move,
  Merge,
  CallSplit as Split,
  Cached as Mix,
  HourglassTop as Store,
  QuestionMark as If,
  Repeat
} from "@mui/icons-material";

// It is not possible to have components in enums, therefore this make shift enum

export const BlockIcons = {
  InputBlockIcon: <Input />,
  OutputBlockIcon: <Output />,
  MoveBlockIcon: <Move />,
  MergeBlockIcon: <Merge />,
  SplitBlockIcon: <Split />,
  MixBlockIcon: <Mix />,
  StoreBlockIcon: <Store />,
  IfBlockIcon: <If />,
  RepeatBlockIcon: <Repeat />,
}