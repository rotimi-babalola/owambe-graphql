import { OwambeGraphqlPage } from './app.po';

describe('owambe-graphql App', function() {
  let page: OwambeGraphqlPage;

  beforeEach(() => {
    page = new OwambeGraphqlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
