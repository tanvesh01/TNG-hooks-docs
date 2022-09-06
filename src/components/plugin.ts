// @ts-nocheck
import jsx from '@babel/plugin-syntax-jsx';

export default () => {
  return {
    inherits: jsx,
    visitor: {
      Program: {
        enter() {
          this.tree = [];
          this.data = {};
        },
        exit(_, state) {
          // state.opts.onTreeReady(this.tree[0]);
          state.opts.onLineNumbersReady(this.data);
        },
      },
      JSXElement: {
        enter(path) {
          this.tree.push({
            name: path.node.openingElement.name.name,
            start: path.node.start,
            end: path.node.end,
            children: [],
          });
        },
        exit() {
          if (this.tree.length > 1) {
            const child = this.tree.pop();
            const parent = this.tree[this.tree.length - 1];
            parent.children.push(child);
          }
        },
      },
      CallExpression: {
        enter(path) {
          if (path.node.callee.name === 'useEffect') {
            console.log('DETECTED USEEFFECT', path);

            // checking if depen array is present
            if (path.node.arguments.length > 1) {
              this.data['useEffect'] = [
                ...(this.data['useEffect'] || []),
                {
                  dependencies: [...path.node.arguments[1].elements],
                  startLineNumber: path.node.loc.start.line,
                  endLineNumber: path.node.loc.end.line,
                  start: path.node.callee.start,
                  end: path.node.callee.end,
                },
              ];
            }
          }

          if (path.node.callee.name === 'useImageOnLoad') {
            console.log(path, 'FOUND useImageOnLoad');
            this.data['useImageOnLoad'] = [
              ...(this.data['useImageOnLoad'] || []),
              {
                startLineNumber: path.node.loc.start.line,
                endLineNumber: path.node.loc.end.line,
                start: path.node.callee.start,
                end: path.node.callee.end,
              },
            ];
          }
        },
      },
    },
  };
};

// [
//   useCustomHook: {
//     // start and end will hightlight some reegin
//     start, end, meta,
//     // meta will have all the data
//   }
// ]

// getContent(meta);
