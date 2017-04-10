import { HealthNlpFrontendPage } from './app.po';

describe('health-nlp-frontend App', function() {
  let page: HealthNlpFrontendPage;

  beforeEach(() => {
    page = new HealthNlpFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
