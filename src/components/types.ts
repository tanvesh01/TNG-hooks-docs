export type UseEffectBabelResponse = {
  startLineNumber: number;
  endLineNumber: number;
  start: number;
  end: number;
  dependencies: { name: string }[];
};

export interface BabelReponseInterface {
  useEffect: UseEffectBabelResponse[];
  [s: string]: {
    startLineNumber?: number;
    endLineNumber?: number;
    start?: number;
    end?: number;
  }[];
}

export type HighlighterStateInterface = {
  top: number | string;
  height: number | string;
  content: string;
};
