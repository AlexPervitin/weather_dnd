import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller } from 'react-hook-form';
import {
  ActionButton,
  ActionRowBlock,
  ChangeRowTextInput,
  DnDItemWrapper,
  MenuItem,
  RowBlock,
  RowInner,
  RowWrapper,
  Tooltip,
} from './styles';

export default function DnDItem({
  items,
  dropId,
  register,
  setValue,
  control,
}) {
  const [openTooltip, setOpenTooltip] = useState(false);

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

  const handleAddChildren = (elem) => {
    elem?.children?.push({
      id: Date.now(),
      first: '',
      second: '',
      third: '',
      children: [],
    });
    setOpenTooltip((prev) => !prev);
  };

  const removeObjectWithId = (arr, id) => {
    const index = arr.findIndex((item) => item.id === id);
    arr.splice(index, 1);
    setOpenTooltip(false);
  };

  const editObjectWithId = (arr, id, value, name) => {
    arr.forEach((element, index, arr) => {
      if (element.id === id) {
        arr[index] =
          name === 'first'
            ? { ...element, first: value }
            : name === 'second'
            ? { ...element, second: value }
            : name === 'third'
            ? { ...element, third: value }
            : { ...element };
      }
      if (element.children) {
        editObjectWithId(element.children, id);
      }
    });
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
                              <Controller
                                control={control}
                                name="first"
                                render={({ field }) => (
                                  <ChangeRowTextInput
                                    {...field}
                                    value={elem.value}
                                    onChange={(e) => {
                                      editObjectWithId(
                                        items,
                                        elem.id,
                                        e.target.value,
                                        field.name,
                                      );
                                      setValue('first', e.target.value);
                                      field.onChange(e);
                                    }}
                                  />
                                )}
                              />
                              <Controller
                                control={control}
                                name="second"
                                render={({ field }) => (
                                  <ChangeRowTextInput
                                    {...field}
                                    value={elem.value}
                                    onChange={(e) => {
                                      editObjectWithId(
                                        items,
                                        elem.id,
                                        e.target.value,
                                        field.name,
                                      );
                                      setValue('second', e.target.value);
                                      field.onChange(e);
                                    }}
                                  />
                                )}
                              />
                              <Controller
                                control={control}
                                name="third"
                                render={({ field }) => (
                                  <ChangeRowTextInput
                                    {...field}
                                    value={elem.value}
                                    onChange={(e) => {
                                      editObjectWithId(
                                        items,
                                        elem.id,
                                        e.target.value,
                                        field.name,
                                      );
                                      setValue('third', e.target.value);
                                      field.onChange(e);
                                    }}
                                  />
                                )}
                              />
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
                                <ActionRowBlock>
                                  <ActionButton
                                    onClick={() => {
                                      handleAddChildren(elem);
                                    }}
                                  >
                                    Add children row
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
                                dropId="childrens"
                                register={register}
                                setValue={setValue}
                                control={control}
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
