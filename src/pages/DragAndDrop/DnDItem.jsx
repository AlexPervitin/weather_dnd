import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Tooltip } from './styles';

export default function DnDItem({ items, dropId, setCount }) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [itemText, setItemText] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const [removed] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removed);
  };

  function handleAddChildren({ elem, text }) {
    elem?.children?.push({
      id: Date.now(),
      text,
      children: [],
    });
    setOpenTooltip((prev) => !prev);
    setItemText('');
    setCount((prev) => prev + 1);
  }

  function removeObjectWithId(arr, id) {
    const index = arr.findIndex((item) => item.id === id);
    arr.splice(index, 1);
    setCount((prev) => prev + 1);
    setOpenTooltip(false);
  }

  function editObjectWithId(arr, id) {
    setCount((prev) => prev + 1);
    setOpenTooltip(false);
    setItemText('');
    arr.forEach((element, index, arr) => {
      if (element.id === id) {
        arr[index] = { ...element, text: itemText };
      }
      if (element.children) {
        editObjectWithId(element.children, id);
      }
    });
  }

  return (
    <div style={{ width: '100%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={dropId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items?.map((elem, index) => {
                return (
                  <Draggable
                    key={elem.id}
                    draggableId={String(elem?.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 800,
                            fontSize: '28px',
                          }}
                        >
                          <div {...provided.dragHandleProps}>::</div>
                          <div
                            style={{
                              background: '#fff',
                              margin: '8px',
                              padding: '8px',
                              width: '90%',
                              display: 'flex',
                              flexDirection: 'column',
                              border: '1px solid black',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                              }}
                            >
                              <div style={{ width: '100%' }}>{elem.text}</div>
                              <div
                                onClick={() =>
                                  setOpenTooltip({
                                    index,
                                    condition: !openTooltip.condition,
                                  })
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                :::
                              </div>
                              <Tooltip
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity:
                                    openTooltip.condition &&
                                    openTooltip.index === index
                                      ? 1
                                      : 0,
                                  scale:
                                    openTooltip.condition &&
                                    openTooltip.index === index
                                      ? 1
                                      : 0,
                                }}
                              >
                                <input
                                  name="itemText"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    minHeight: '40px',
                                    marginBottom: '10px',
                                  }}
                                  value={itemText}
                                  onChange={(e) => setItemText(e.target.value)}
                                />
                                <div
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    height: '40px',
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      handleAddChildren({
                                        elem,
                                        text: itemText,
                                      });
                                    }}
                                  >
                                    Add children row
                                  </button>
                                  <button
                                    onClick={() => {
                                      editObjectWithId(items, elem.id);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      removeObjectWithId(items, elem.id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </Tooltip>
                            </div>
                            {elem?.children?.length > 0 && (
                              <DnDItem
                                items={elem?.children}
                                onDragEnd={onDragEnd}
                                dropId="childrens"
                                setCount={setCount}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
