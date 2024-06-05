export type TitlecaseConfig = {
  preference?: 'AMA' | 'AP' | 'APA' | 'NYT' | 'CMOS' | 'MLA' | 'Wikipedia' | 'Bluebook';
  ignoreCapitalized?: boolean;
  exceptions?: string[];
  prepositionCase?: 3 | 4 | false;
  exactCases?: string[];
  instanceExceptions?: Record<string, number[]>;
};