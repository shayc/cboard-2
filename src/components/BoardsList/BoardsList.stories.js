import BoardsList from './BoardsList';

const story = {
  title: 'App/Components/BoardsList',
  component: BoardsList,
};
export default story;

const Template = (args) => <BoardsList {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { width: '340px' },
  boards: [
    { id: 'a', name: 'Board 1' },
    { id: 'b', name: 'Board 2' },
    { id: 'c', name: 'Board 3' },
  ],
  rootId: 'a',
  onActiveIdChange: () => {},
  onRootIdChange: () => {},
  onDeleteClick: () => {},
  onSelectionChange: () => {},
};
