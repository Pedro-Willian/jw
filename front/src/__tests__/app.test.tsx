import * as redux from 'react-redux';

describe('<App />', () => {
  it('render', async () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ menu: { menuVisible: true, screenSmall: false } });
    // render(<App />);
    // expect(linkElement).toBeInTheDocument();
  });
});
