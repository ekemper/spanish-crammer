import { SpanishGrammerCrammerPage } from './app.po';

describe('spanish-grammer-crammer App', () => {
  let page: SpanishGrammerCrammerPage;

  beforeEach(() => {
    page = new SpanishGrammerCrammerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
