import { RtcPage } from './app.po';

describe('rtc App', () => {
  let page: RtcPage;

  beforeEach(() => {
    page = new RtcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
