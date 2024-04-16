export type TitlecaseConfig = {
  exceptions?: string[];
  exactCases?: string[];
  instanceExceptions?: Record<string, number[]>;
};