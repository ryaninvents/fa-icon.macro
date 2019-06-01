import { createMacro, MacroError } from 'babel-plugin-macros';
import pathUtils from 'path';
import fs from 'fs';
import U from 'hast-util-select';
import unified from 'unified';
import rehype from 'rehype-parse';
import getBounds from 'svg-path-bounds';
import normalize from 'normalize-svg-coords';

function createFaIcon(source, props) {
  const ast = unified()
    .use(rehype)
    .data('settings', { fragment: true })
    .parse(source);
  const allPaths = normalize({
    min: 0,
    max: 256,
    path: U.selectAll('path', ast)
      .map((p) => p.properties.d)
      .filter(Boolean)
      .join(''),
  });
  const [, , width, height] = getBounds(allPaths);
  return Object.assign(
    {},
    {
      prefix: 'far',
      icon: [Math.round(width), Math.round(height), [], null, allPaths],
    },
    props
  );
}

export default createMacro(faIconMacro);

function faIconMacro({ references, state, babel: { types: t } }) {
  const { default: defaultImport = [] } = references;

  defaultImport.forEach((referencePath) => {
    if (referencePath.parentPath.type === 'CallExpression') {
      if (referencePath === referencePath.parentPath.get('callee')) {
        console.log(
          'function call arguments (as callee)',
          referencePath.parentPath.get('arguments')
        );
        if (
          !t.isStringLiteral(referencePath.parentPath.get('arguments.0').node)
        ) {
          throw new MacroError('`fa-icon.macro` requires a filename to import');
        }

        const filename = pathUtils.resolve(
          pathUtils.dirname(state.filename),
          referencePath.parentPath.get('arguments.0').node.value
        );

        const svgContents = fs.readFileSync(filename, { encoding: 'utf-8' });

        referencePath.parentPath.replaceWithSourceString(
          JSON.stringify(createFaIcon(svgContents, {}), null, 2)
        );
      }

      return;
    }

    throw new MacroError(
      '`fa-icon.macro` can only be used as a function call. Please refer to fa-icon.macro docs'
    );
  });
}
