import { GraphAppPage } from './app.po';

describe('graph-app App', () => {
  let page: GraphAppPage;

  beforeEach(() => {
    page = new GraphAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
