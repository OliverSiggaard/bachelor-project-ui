import React from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {Block} from "../../../../types/blockTypes";
import {getAvailableDropletIdsForIndex} from "../../../../utils/dropletIdUtils";

interface AutocompleteDropletIdProps {
  dropletId: string;
  setDropletId: (dropletId: string) => void;
  text?: string;
}

const AutocompleteDropletId: React.FC<AutocompleteDropletIdProps> = ({dropletId, setDropletId, text = "Droplet ID"}) => {
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const blockIndex = useSelector((state: {selectedIndex: number | null}) => state.selectedIndex);

  const dropletIds = getAvailableDropletIdsForIndex(blocks, blockIndex!);

  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={text} variant="outlined" />}
      options={dropletIds}
      value={dropletIds.includes(dropletId) ? dropletId : null}
      onChange={(e, value) => setDropletId(value!)}
    />
  );
};

export default AutocompleteDropletId;