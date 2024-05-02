import React from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {Block} from "../../../../types/blockTypes";
import {getAvailableDropletIdsForIndex} from "../../../../utils/dropletIdUtils";

interface AutocompleteDropletIdProps {
  dropletId: string;
  setDropletId: (dropletId: string) => void;
  showError?: boolean;
  errorMessage?: string;
  text?: string;
}

const AutocompleteDropletId: React.FC<AutocompleteDropletIdProps> = ({dropletId, setDropletId, showError = false, errorMessage = "", text = "Droplet ID"}) => {
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const blockIndex = useSelector((state: {selectedIndex: number | null}) => state.selectedIndex);

  const dropletIds = getAvailableDropletIdsForIndex(blocks, blockIndex!);

  return (
    <Autocomplete
      renderInput={(params) =>
        <TextField
          {...params}
          label={text}
          variant="outlined"
          error={showError}
          helperText={showError ? errorMessage : ""}
        />
      }
      options={dropletIds}
      value={dropletIds.includes(dropletId) ? dropletId : null}
      onChange={(e, value) => setDropletId(value!)}
    />
  );
};

export default AutocompleteDropletId;