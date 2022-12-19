import { useState } from 'react';
import DnDItem from './DnDItem';
import {
  ActionButton,
  AddNewRowBlock,
  AddNewRowInput,
  DndTitle,
  DnDWrapper,
} from './styles';

export default function DragAndDrop() {
  const [items, setItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const [initItemText, setInitItemText] = useState('');
  const itemId = Date.now();

  const handleChangeNewRowText = (e) => {
    setInitItemText(e.target.value);
  };

  const handleAddNewRow = () => {
    setItems((prev) => [
      ...prev,
      { id: itemId, text: initItemText, children: [] },
    ]);
    setInitItemText('');
  };

  return (
    <DnDWrapper>
      <DndTitle>Create your nested drag and drop table</DndTitle>
      <AddNewRowBlock>
        <AddNewRowInput
          type="text"
          name="initText"
          onChange={handleChangeNewRowText}
          value={initItemText}
        />
        <ActionButton onClick={handleAddNewRow} disabled={!initItemText}>
          Add new row
        </ActionButton>
      </AddNewRowBlock>
      <DnDItem items={items} dropId="parents" setCount={setCount} />
    </DnDWrapper>
  );
}
