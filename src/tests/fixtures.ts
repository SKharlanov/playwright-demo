import { test as base } from '@playwright/test';
import * as allure from 'allure-js-commons';

export const test = base.extend<{ allureDataSetup: void }>({
  allureDataSetup: [
    async ({ browser }, use) => {
      const browserName = browser.browserType().name();
      const browserVersion = browser.version();
      await allure.label('browser', browserName);
      await allure.label('browserVersion', browserVersion);

      await use();
    },
    { auto: true },
  ],
});
