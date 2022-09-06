import { basicSetup } from 'codemirror';
import { BabelReponseInterface, UseEffectBabelResponse } from './types';
import { EditorView, hoverTooltip } from '@codemirror/view';
import { syntaxHighlighting } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import React, { useEffect } from 'react';
import { parseCode } from './utils';

import {
  oneDark,
  oneDarkHighlightStyle,
  oneDarkTheme,
} from '@codemirror/theme-one-dark';
import { underlineSelection } from './editorUtils';
import { CONTENT_GENERATORS, getSentenceContent } from './utils';
import { popOverStyles } from './editorStyles';

const syntaxExtension = syntaxHighlighting(oneDarkHighlightStyle);

const FontSizeTheme = EditorView.theme({
  '.cm-scroller': { fontFamily: "'JetBrains Mono', monospace" },
  '.cm-line': {
    paddingLeft: '20px',
  },
  '.cm-content': {
    paddingTop: '20px',
  },
  '.cm-editor': {
    borderRadius: '1rem',
  },
});

const FontSizeThemeExtension = [FontSizeTheme];

const NewEditorChildren: React.FC<{ codeString: string; children: string }> = ({
  codeString,
  children,
}) => {
  console.log(children, 'CODESTRING');
  useEffect(() => {
    let parsedASTData: BabelReponseInterface;

    /*
      Logic that decides if a keyword can be hovered to
      render our popover.

      TODO: Right now the we are parsing data of our AST is obviously 
      very static, gotta make this a generic function.
    */
    const wordHover = hoverTooltip((view, pos, side) => {
      let { from, to, text, number: lineNumber } = view.state.doc.lineAt(pos);

      let start = pos,
        end = pos;

      while (start > from && /\w/.test(text[start - from - 1])) start--;
      while (end < to && /\w/.test(text[end - from])) end++;
      if ((start == pos && side < 0) || (end == pos && side > 0)) return null;
      const keyword = text.slice(start - from, end - from);

      let returnedObject = null;
      Object.keys(parsedASTData).forEach((name, index) => {
        parsedASTData[name].forEach(({ startLineNumber }) => {
          if (lineNumber === startLineNumber) {
            // this parses the content from the data given by the AST
            const content = CONTENT_GENERATORS[
              name as keyof typeof parsedASTData
            ](parsedASTData.useEffect[index], parsedASTData);

            returnedObject = {
              pos: start,
              end,
              above: true,

              create() {
                let dom = document.createElement('div');
                dom.style.color = 'black';
                dom.classList.add(popOverStyles());
                dom.innerHTML = content;
                return { dom };
              },
            };
          }
        });
      });
      return returnedObject;
    });

    // Initiate codemirror with default extensions
    const view = new EditorView({
      doc: children,
      extensions: [
        // basicSetup,
        javascript(),
        wordHover,
        oneDark,
        FontSizeThemeExtension,
        EditorView.editable.of(false),
        // oneDarkTheme,
        // syntaxExtension,
      ],
      parent: document.querySelector('#editor')!,
    });

    parseCode(children).then((res) => {
      parsedASTData = res;
      console.log(res, 'res of parseCode');
      /*
          Takes all the AST data from babel and loops through to it
          underline all the selections
        */
      // @ts-ignore
      Object.entries<UseEffectBabelResponse[]>(parsedASTData).map(
        ([key, value]) => {
          value.forEach(({ start, end }) => {
            underlineSelection(view, start, end);
          });
        }
      );
    });
    return () => {
      view.destroy();
    };
  }, []);

  return <div id="editor"> </div>;
};

export default NewEditorChildren;
