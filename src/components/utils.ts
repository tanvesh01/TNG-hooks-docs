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
    effect?.dependencies?.forEach(({ name }) => {
      dependencyTree[name] = dependencyTree[name] + 1 || 1;
    });
  });
  let finalContent = `
  ### useEffect
  The Effect Hook lets you perform side effects in function components.
  Like [React's \`useEffect(..)\` hook](https://reactjs.org/docs/hooks-effect.html), the TNG \`useEffect(..)\` hook will conditionally run side-effect code "after" the current Articulated Function completes its invocation.

  This useEffect depends on `;
  const dependenciesArray = useEffectData.dependencies || [];
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

const constructSentenceFromArrayOfStrings = (arr: string[]): string => {
  if (arr.length === 1) {
    return `\`${arr[0]}\``;
  }
  let temp = '';
  if (arr.length > 1) {
    arr.forEach((identifier, index) => {
      // if last element
      if (index === arr.length - 1) {
        temp = temp + 'and ' + `\`${identifier}\``;
      } else {
        temp = temp + `\`${identifier}\`` + ', ';
      }
    });
  }
  return temp;
};

export const getUseImageOnLoadContent = () => {
  return micromark(`
  ## useImageOnLoad
A simple React Hook that helps you improve UX while images are loading. Rather than having an image that "unfolds" from top to bottom, we load a smaller version first which will be blurred and which will be replaced by the normal size image once loaded.
![Alt Text](https://media.giphy.com/media/1takcfJ6mz5LSnub4p/giphy-downsized-large.gif)
`);
};

const getTNGContent = (res) => {
  const argumentsArray = res?.arguments.map(({ name }) => name);
  return micromark(`
  \`TNG(..)\` is a utility to produce Articulated Functions from normal, stanadlone functions. Articulated Functions adopt an active hooks-context to enable hooks capabilities.
  
  ${
    argumentsArray
      ? argumentsArray.length > 0 &&
        `For example here, ${constructSentenceFromArrayOfStrings(
          argumentsArray
        )}  will be decorated with a TNG hooks-context which means hooks are valid to use during its invocation`
      : ''
  } 
  `);
};

const getUseStateContent = () => {
  return micromark(`
  The TNG \`useState(..)\` hook, like [React's \`useState(..)\` hook](https://reactjs.org/docs/hooks-state.html), allows an Articulated Function to persist a unit of state across multiple invocations, without relying on global variables or having to manually create a closure to store that state.
`);
};

const getHitCounterContent = () => {
  return micromark(
    `The \`useHitCounter(..)\` Custom Hook -- again, just a normal non-Articulated Function that uses a TNG hook like \`useState(..)\`! -- inherits the TNG hooks-context of the Articulated Function that invoked it. In this example, the invoking Articulated Function is either one of the two click handlers (produced via the two \`TNG(..)\` calls) that were bound, respectively, as each button's click handler.`
  );
};

export const CONTENT_GENERATORS = {
  useEffect: getSentenceContent,
  useImageOnLoad: getUseImageOnLoadContent,
  TNG: getTNGContent,
  useState: getUseStateContent,
  useHitCounter: getHitCounterContent,
};
