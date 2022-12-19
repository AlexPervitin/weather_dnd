import { useState } from 'react';
import DnDItem from './DnDItem';
import { DnDWrapper } from './styles';

export default function DragAndDrop() {
  const [items, setItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const [initItemText, setInitItemText] = useState('');
  const itemId = Date.now();

  return (
    <DnDWrapper>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          style={{ minHeight: '40px', minWidth: '50%' }}
          type="text"
          name="initText"
          onChange={(e) => setInitItemText(e.target.value)}
          value={initItemText}
        />
        <button
          onClick={() => {
            setItems((prev) => [
              ...prev,
              { id: itemId, text: initItemText, children: [] },
            ]);
            setInitItemText('');
          }}
        >
          Add new row
        </button>
      </div>
      <DnDItem items={items} dropId="parents" setCount={setCount} />
    </DnDWrapper>
  );
}
