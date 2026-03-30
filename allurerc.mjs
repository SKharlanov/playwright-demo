import { defineConfig } from 'allure';

const outputDir = './reports/allure';

export default defineConfig({
  name: 'Allure Report',
  output: outputDir,
  historyPath: outputDir + '/history.jsonl',
  variables: {
    'App Version': '1.0.0',
    'Test Suite': 'Regression v1.0',
    'Launch Date': new Date().toLocaleDateString(),
    Environment: 'Prod',
  },
  plugins: {
    awesome: {
      options: {
        groupBy: ['parentSuite', 'suite', 'subSuite'],
      },
    },
    dashboard: {
      options: {
        reportName: 'Dashboard',
      },
    },
  },
});
