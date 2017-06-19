import { SpanishPracticePage } from './app.po';

describe('spanish-practice App', () => {
  let page: SpanishPracticePage;

  beforeEach(() => {
    page = new SpanishPracticePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
