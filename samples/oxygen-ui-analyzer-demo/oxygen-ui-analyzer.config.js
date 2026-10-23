/**
 * Oxygen UI analyzer configuration. This file belongs to the product: the analyzer reads it but
 * never changes it.
 *
 * @type {import('@wso2/oxygen-ui-analyzer').AnalyzerConfig}
 */
export default {
  exceptions: [
    {
      rule: 'no-direct-mui-imports',
      files: ['src/legacy/**'],
      reason: 'The legacy audit log is replaced by the new activity page in the 2027 redesign.',
      expires: '2027-06-30',
    },
  ],

  // Checks that fix --apply runs on its changes. The demo is never built, so there is nothing to run.
  verify: [],
};
