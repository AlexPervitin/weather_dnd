import { useForm } from 'react-hook-form';
import DnDItem from './DnDItem';
import { ActionButton, AddNewRowBlock, DndTitle, DnDWrapper } from './styles';

export default function DragAndDrop() {
  const itemId = Date.now();
  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: {
      items: [],
      first: '',
      second: '',
      third: '',
    },
  });

  const items = watch('items');

  const handleAddNewRow = () => {
    setValue('items', [
      ...items,
      { id: itemId, first: '', second: '', third: '', children: [] },
    ]);
  };

  const onSubmit = (data) => {
    console.info('submit', data.items);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DnDWrapper>
        <DndTitle>Create your nested drag and drop table</DndTitle>
        <AddNewRowBlock>
          <ActionButton onClick={handleAddNewRow}>Add new row</ActionButton>
        </AddNewRowBlock>

        <DnDItem
          items={items}
          dropId="parents"
          register={register}
          setValue={setValue}
          control={control}
        />

        <ActionButton type="submit">Submit</ActionButton>
      </DnDWrapper>
    </form>
  );
}
