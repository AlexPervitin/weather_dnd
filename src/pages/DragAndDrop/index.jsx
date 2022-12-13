/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

// const list = [
//   { id: 1, text: 'first', children: [{id: 1, text: 'first'}] },
//   { id: 2, text: 'second', children: [{id: 1, text: 'first'}] },
//   { id: 3, text: 'third', children: [{id: 1, text: 'first'}] },
//   { id: 4, text: 'fourth', children: [{id: 1, text: 'first'}] },
//   { id: 5, text: 'fifth', children: [{id: 1, text: 'first'}] },
// ];

const mock = [
  { id: 1, text: 'text1', lvl: 1, parentId: null, hasChildren: true },
  { id: 2, text: 'text2', lvl: 2, parentId: 1, hasChildren: true },
  { id: 3, text: 'text3', lvl: 3, parentId: 2, hasChildren: true },
  { id: 4, text: 'text4', lvl: 4, parentId: 3, hasChildren: false },
  { id: 1670932832773, text: '123', lvl: 3, parentId: 2, hasChildren: false },
];

function RenderItem({ element, index, handleAdd }) {
  const [initItemText, setInitItemText] = useState('');
  return (
    <FramerItem
      key={element.id}
      draggable
      layout
      style={{ background: 'fff' }}
      // onMouseDown={handleDragStart(index)}
      // onTouchStart={handleDragStart(index)}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      // onDrop={() => {
      //   setItems((prev) => insert(prev, fromIndex, index));
      // }}
    >
      <div>{element.text}</div>
      <div style={{ display: 'flex' }}>
        <input
          name="itemText"
          style={{ width: '100%', height: '100%', minHeight: '40px' }}
          value={initItemText}
          onChange={(e) => setInitItemText(e.target.value)}
        />
        <button
          onClick={() => {
            handleAdd({
              lvl: element.lvl + 1,
              parentId: element.id,
              text: initItemText,
            });
            setInitItemText('');
          }}
        >
          Add123
        </button>
        <button
        // onClick={() => setItems(() => removeObjectWithId(items, element.id))}
        >
          Delete
        </button>
      </div>
      {element?.children?.map((child, index) => (
        <RenderItem element={child} index={index} handleAdd={handleAdd} />
      ))}
    </FramerItem>
  );
}

function DragAndDrop() {
  const [fromIndex, setFromIndex] = useState(-1);
  const [items, setItems] = useState(mock);
  console.log('items', items);

  const [initItemText, setInitItemText] = useState('');

  const itemId = Date.now();

  function handleAdd({ lvl, parentId, text }) {
    setItems((prev) => {
      return [
        ...prev,
        {
          id: itemId,
          text,
          lvl,
          parentId,
          hasChildren: false,
        },
      ];
    });
  }

  function recurs(arr, result, mock) {
    arr.forEach((item) => {
      if (item.hasChildren) {
        const children = mock
          .filter((elem) => {
            return elem.parentId === item.id;
          })
          .map((item) => {
            if (item.hasChildren) {
              return { ...item, children: [] };
            }
            return item;
          });
        const arrayItem = { ...item, children };

        console.log('aI', arrayItem);

        // if (!result.map((item) => item.id).includes(arrayItem.id)) {
        //   result.push(arrayItem);
        // }

        result.push(arrayItem);
        const elementId = result.findIndex((item) => item.id === arrayItem.id);
        console.log('result[elementId].children', result[elementId].children);
        recurs(arrayItem.children, result[elementId].children, mock);
      }
    });
  }

  function mockFnc(mock) {
    const result = [];
    const firstLvl = mock.filter((elem) => elem.lvl === 1);
    recurs(firstLvl, result, mock);
    console.log('result', result);
    return result;
  }

  const resData = mockFnc(items);

  function insert(arr, from, to) {
    const newArr = [...arr];
    const [d] = newArr.splice(from, 1);
    newArr.splice(to, 0, d);
    return newArr;
  }

  function handleDragStart(index) {
    return () => setFromIndex(index);
  }

  function removeObjectWithId(arr, id) {
    return arr.filter((item) => item.id !== id);
  }

  function handleChangeItemText(e, id) {
    const updatedText = items.map((item) => {
      if (item.id === id) {
        return { ...item, text: e.target.value };
      }
      return item;
    });
    setItems(updatedText);
  }

  function handleAddChildren(id) {
    const addChildren = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          children: [
            ...item.children,
            { id: itemId, text: item.children.length, children: [] },
          ],
        };
      }
      return item;
    });
    setItems(addChildren);
  }

  return (
    <DnDWrapper style={{}}>
      <div style={{ display: 'flex' }}>
        <input
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
          Lets add new row
        </button>
      </div>
      <AnimateSharedLayout>
        {resData.length
          ? resData.map((element, index) => (
              <RenderItem
                element={element}
                index={index}
                handleAdd={handleAdd}
              />
            ))
          : 'add new row...'}
      </AnimateSharedLayout>
    </DnDWrapper>
  );
}

export default DragAndDrop;

const FramerItem = styled(motion.div)`
  background: #fff;
  margin: 8px;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const DnDWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
