import { BabelReponseInterface } from './types';
import { transform } from '@babel/standalone';
import plugin from './plugin';
import React from 'react';
import { micromark } from 'micromark';
import { HighlighterStateInterface, UseEffectBabelResponse } from './types';

export function parseCode(codeString: string) {
  return new Promise<BabelReponseInterface>((resolve) =>
    transform(codeString, {
      plugins: [
        [plugin, { onTreeReady: resolve, onLineNumbersReady: resolve }],
      ],
    })
  );
}

export const getHighlighterCoords = (res: BabelReponseInterface) => {
  const lineNumberElements = document.querySelectorAll(
    '.CodeMirror-linenumber'
  );
  const EditorElement = document.querySelector('.editor');
  const finalUseEffectPositionArray: HighlighterStateInterface[] = [];

  res.useEffect.forEach((effect) => {
    const startLineNumberElement =
      lineNumberElements[effect.startLineNumber - 1];

    const endLineNumberElement = lineNumberElements[effect.endLineNumber - 1];

    const startLineNumberPositionObject =
      startLineNumberElement.getBoundingClientRect();
    const EditorElementPositionObject = EditorElement?.getBoundingClientRect();

    console.log(getSentenceContent(effect, res), 'content');
    finalUseEffectPositionArray.push({
      top:
        startLineNumberPositionObject.top -
        (EditorElementPositionObject?.top || 0),
      height:
        (effect.endLineNumber - effect.startLineNumber + 1) *
        startLineNumberPositionObject.height,
      content: getSentenceContent(effect, res) || '',
    });
  });

  return finalUseEffectPositionArray;
};

export const getSentenceContent = (
  useEffectData: UseEffectBabelResponse,
  res: BabelReponseInterface
) => {
  const dependencyTree: { [key: string]: number } = {};
  res.useEffect.forEach((effect) => {
    effect.dependencies.forEach(({ name }) => {
      dependencyTree[name] = dependencyTree[name] + 1 || 1;
    });
  });
  let finalContent = `
  ## useEffect
  The Effect Hook lets you perform side effects in function components.

  This useEffect depends on `;
  const dependenciesArray = useEffectData.dependencies;
  console.log(dependenciesArray, 'DEPE ARRAY', res);

  // TODO: make this work for more than 3 items in array
  if (dependenciesArray.length < 2) {
    return micromark(`${finalContent} \`${dependenciesArray[0]?.name}\``);
  } else {
    return micromark(
      `${finalContent} \`${dependenciesArray[0].name}\` and \`${
        dependenciesArray[1].name
      }\`  
      
${
  dependencyTree[dependenciesArray[0].name] > 1
    ? dependencyTree[dependenciesArray[0].name] +
      'useEffects are dependedant on' +
      dependenciesArray[0].name
    : ''
}
${
  dependencyTree[dependenciesArray[1].name] > 1
    ? dependencyTree[dependenciesArray[1].name] +
      ' useEffects are dependedant on `' +
      dependenciesArray[1].name +
      '`'
    : ''
}
      `
    );
  }
};

export const getUseImageOnLoadContent = () => {
  return micromark(`
  ## useImageOnLoad
A simple React Hook that helps you improve UX while images are loading. Rather than having an image that "unfolds" from top to bottom, we load a smaller version first which will be blurred and which will be replaced by the normal size image once loaded.
![Alt Text](https://media.giphy.com/media/1takcfJ6mz5LSnub4p/giphy-downsized-large.gif)
`);
};

export const CONTENT_GENERATORS = {
  useEffect: getSentenceContent,
  useImageOnLoad: getUseImageOnLoadContent,
};
