import { store } from './store';
import {addBlock, selectBlock} from "./blockReducer";

describe('Redux Store', () => {
  test('should dispatch actions and update the state correctly', () => {
    store.dispatch(addBlock({index: 0, type: 'input', info: {dropletId: '1', posX: '3', posY: '3', volume: '10'}}));
    store.dispatch(selectBlock(0));

    const state = store.getState();

    expect(state.blocks).toHaveLength(1);
    expect(state.selectedIndex).toBe(0);
  });
});