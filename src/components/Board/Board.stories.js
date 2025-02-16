// import board from '../../open-board-format/examples/project-core.json';
import Pictogram from '../Pictogram';
import Tile from '../Tile';
import Board from './Board';

const board = {
  name: 'Home board',
  buttons: [
    {
      id: '1',
      label: 'speak',
      image: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/talk.png',
      background_color: 'rgb(204, 255, 170)',
    },
    {
      id: '2',
      label: 'with everyone',
      image:
        'https://s3.amazonaws.com/opensymbols/libraries/arasaac/group of people.png',
    },
    {
      id: '3',
      label: 'family',
      border_color: 'rgb(221, 221, 0)',
      background_color: 'rgb(255, 255, 170)',
      image:
        'https://s3.amazonaws.com/opensymbols/libraries/arasaac/group of people.png',
      load_board: { id: '1' },
    },
  ],
  grid: {
    columns: 2,
    rows: 2,
    order: [
      ['1', '2'],
      [null, '3'],
    ],
  },
};

const story = {
  title: 'Board/Components/Board',
  component: Board,
};

export default story;

const Template = (args) => <Board {...args} style={{ height: '300px' }} />;

export const Default = Template.bind({});

Default.args = {
  renderButton,
  title: board?.name,
  buttons: board?.buttons,
  grid: board?.grid,
  draggable: true,
};

function renderButton(button) {
  const { background_color, border_color, label, load_board, image } = button;

  const variant = load_board ? 'folder' : 'button';

  return (
    <Tile
      backgroundColor={background_color}
      borderColor={border_color}
      variant={variant}
    >
      <Pictogram label={label} src={image} />
    </Tile>
  );
}
