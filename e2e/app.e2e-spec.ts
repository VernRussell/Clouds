import { MyCloudPage } from './app.po';

describe('my-cloud App', function() {
  let page: MyCloudPage;

  beforeEach(() => {
    page = new MyCloudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cl works!');
  });
});
