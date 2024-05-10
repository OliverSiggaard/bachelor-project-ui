import {useEffect} from "react";
import {removeBlock, selectBlock} from "../../../redux/blockReducer";
import {useDispatch} from "react-redux";

export const useKeyboardShortcut = (handleSave: () => void, index: number, dependencies: any[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
        e.preventDefault();
        dispatch(removeBlock(index));
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        dispatch(selectBlock(null));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, ...dependencies]); // eslint-disable-line
};