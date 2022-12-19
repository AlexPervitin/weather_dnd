import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  ActionButton,
  ActionRowBlock,
  ChangeRowTextInput,
  DnDItemWrapper,
  MenuItem,
  RowBlock,
  RowInner,
  RowText,
  RowWrapper,
  Tooltip,
} from './styles';

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

  const handleAddChildren = ({ elem, text }) => {
    elem?.children?.push({
      id: Date.now(),
      text,
      children: [],
    });
    setOpenTooltip((prev) => !prev);
    setItemText('');
    setCount((prev) => prev + 1);
  };

  const removeObjectWithId = (arr, id) => {
    const index = arr.findIndex((item) => item.id === id);
    arr.splice(index, 1);
    setCount((prev) => prev + 1);
    setOpenTooltip(false);
  };

  const editObjectWithId = (arr, id) => {
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
  };

  const handleChangeText = (e) => {
    setItemText(e.target.value);
  };

  return (
    <DnDItemWrapper>
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
                        <RowWrapper>
                          <div {...provided.dragHandleProps}>::</div>
                          <RowBlock>
                            <RowInner>
                              <RowText>{elem.text}</RowText>
                              <MenuItem
                                onClick={() =>
                                  setOpenTooltip({
                                    index,
                                    condition: !openTooltip.condition,
                                  })
                                }
                              >
                                :::
                              </MenuItem>
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
                                <ChangeRowTextInput
                                  name="itemText"
                                  value={itemText}
                                  onChange={handleChangeText}
                                />
                                <ActionRowBlock>
                                  <ActionButton
                                    disabled={!itemText}
                                    onClick={() => {
                                      handleAddChildren({
                                        elem,
                                        text: itemText,
                                      });
                                    }}
                                  >
                                    Add children row
                                  </ActionButton>
                                  <ActionButton
                                    disabled={!itemText}
                                    onClick={() => {
                                      editObjectWithId(items, elem.id);
                                    }}
                                  >
                                    Edit current row
                                  </ActionButton>
                                  <ActionButton
                                    onClick={() => {
                                      removeObjectWithId(items, elem.id);
                                    }}
                                  >
                                    Delete current row
                                  </ActionButton>
                                </ActionRowBlock>
                              </Tooltip>
                            </RowInner>
                            {elem?.children?.length > 0 && (
                              <DnDItem
                                items={elem?.children}
                                onDragEnd={onDragEnd}
                                dropId="childrens"
                                setCount={setCount}
                              />
                            )}
                          </RowBlock>
                        </RowWrapper>
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
    </DnDItemWrapper>
  );
}
