import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
      import createIcon from './macro';

      const homeIcon = createIcon('./home.svg');
    `,
  ],
});
