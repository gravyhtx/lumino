// ~/constants/unicode.ts
export const APPLE = {
  logo: '\uF8FF',
  shift: '\u21E7',
  ctrl: {nrml: '\u2303', intl: '\u2388'},
  opt: '\u2325',
  alt: '\u2387',
  cmd: '\u2318',
  clear: '\u2327',
  space: '\u2423',
  enter: '\u2324',
  caps: '\u21EA',
  help: '\u003F\u20DD'.normalize('NFC'),
  power: {symbol: '\u23FB', toggle: '\u23FC', on: '\u23FD', off: '\u2B58'},
  sleep: '\u23FE',
  eject: '\u23CF',
  esc: '\u238B',
  home: '\u2196',
  end: '\u2198',
  return: {l: '\u21A9', r: '\u21AA'},
  tab: {l: '\u21E5', r: '\u21E4'},
  del: {l: '\u232B', r: '\u2326'},
  arrows: {
    solid: {l: '\u2190', u: '\u2191', r: '\u2192', d: '\u2193',},
    dashed: {l: '\u21E0', u: '\u21E1', r: '\u21E2', d: '\u21E3',}},
  page: {up: '\u21DE', down: '\u21DF'},
}

export const MATH_SYMBOLS = {
  times: '\xD7',
  divide: '\xF7',
  minus: '\u2212',
  plus: '\u002B',
  fraction: '\u2044',
  equals: '\u003D',
  percent: '\u0025',
  permille: '\u2030',
  plusMinus: '\xB1',
  tilde: '\u223C',
  equalto: {approx: '\u2245', almost: '\u2248', not: '\u2260',},
  identical: {is: '\u2261', not: '\u2262'},
  strictequal: '\u2263',
  lesser: {than: '\u003C', orequal: '\u2264'},
  greater: {than: '\u003E', orequal: '\u2265'},
  element: {of: '\u2208', notof: '\u2209'},
  multiply: {asterisk: '\u2217', dot: '\u22C5'},
  sumof: '\u2211',
  product: '\u220F',
  function: '\u0192',
  partial: '\u2202',
  sqrt: '\u221A',
  propotional: '\u221D',
  infinity: '\u221E',
  degrees: '\xB0',
  angle: '\u2220',
  integral: '\u222B',
  therefore: '\u2234',
  set: {union: '\u222A', intersect: '\u2229', empty: '\u2205', complement: '\u2202'},
  subset: {of: '\u2282', not: '\u2284', orequal: '\u2286'},
  superset: {of: '\u2283', not: '\u2285', orequal: '\u2287'},
  floor: {left: '\u230A', right: '\u230B'},
  ceiling: {left: '	\u2308', right: '	\u2309'},
  circled: {plus: '\u2295', times: '\u2297'},
  imaginary: '\u2111',
  real: '\u211C',
  null: '\u2205',
  numero: '\u2116',
}

export const MEASUREMENT = {
  micro: '\xB5',
  inches: '\u2033',
  feet: '\u2032',
  minute: '\u2033',
  second: '\u2032',
  percent: '\u0025',
  permille: '\u2030',
  angle: {sign: '\u2220', deg: '\xB0', prime: '\u2032', dblprime: '\u2033', perp: '\u22A5'}
}

export const VECTOR = {
  derivitive: '\u2207',
  partialderiv: '\u2202',
}

export const FRACTION = {
  symbol: '',
  onehalf: '\xBD',
  onefourth: '\xBC',
  threefourths: '\xBE',
}

export const LOGIC = {
  and: '\u2227',
  or: '\u2228',
  therefore: '\u2234',
  forall: '\u2200',
  exists: '\u2203',
  not: '\xAC',
}

export const MONEY = {
  number: '\u0023',
  dollar: '\u0024',
  euro: '\u20AC',
  cent: '\xA2',
  pound: '\xA3',
  currency: '\xA4',
  yen: '\xA5',
  florin: '\u0192',
}

export const CARD_SUITS = {
  spade: '\u2660',
  club: '\u2663',
  heart: '\u2665',
  diamond: '\u2666'
}

export const RIGHTS = {
  copy: '\xA9',
  nrml: '\xAE',
  tm: '\u2122',
}

export const PUNCTUATION = {
  exclaim: {nrml: '\u0021', inv: '\xA1'},
  question: {nrml: '\u003F', inv: '\u00BF'},
  parenthesis: {l: '\u0028', r: '\u0029'},
  comma: '\u002C',
  period: '\u002E',
  colon: '\u003A',
  semicolon: '\u003B',
  slash: '\u002F',
  similarto: '\u223C',
  section: '\xA7',
  paragraph: '\u00B6',
  ampersand: '\x26',
  asterisk: '\u002A',
  apostrophe: '\u0027',
  quotation: '\x22',
  snglQuot: {l: '\u2018', r: '\u2019', low: '\u201A', high: '\u201B'},
  dblQuot: {l: '\u201C', r: '\u201D', low: '\u201E', high: '\u201F'},
  snglAngle: {l: '\u201C', r: '\u201D', low: '\u201E', high: '\u201F'},
  dblAngle: {l: '\xAB', r: '\xBB'},
  ellipsis: '\u2026',
  dot: {middle: '\xB7', bullet: '\u2022'},
  numero: '\u2116',
}

export const BRACKETS = {
  round: {
    1: {l: '\u0028', r: '\u0029'},
    2: {l: '\u2E28', r: '\u2E29'},
    super: {l: '\u207D', r: '\u207E'},
    sub: {l: '\u208D', r: '\u208E'},
  },
  square: {l: '\u005B', r: '\u005C'},
  angle: {
    nrml: {l: '\u003C', r: '\u003D'},
    math: {
      1: {l: '\u27E8', r: '\u27E9'},
      2: {l: '\u27EA', r: '\u27EB'},
    },
    curved: {l: '\u29FC', r: '\u29FD'},
    dotted: {l: '\u2991', r: '\u2992'}
  },
  curly: {l: '\u007B', r: '\u007C'},
  boxed: {l: '\u23B8', r: '\u23B9'},
  tortoise: {l: '\u2997', r: '\u2998'},
  fancy: {
    feather: {l: '\u169B', r: '\u169C'},
    delimiter: {l: '\u27C5', r: '\u27C6'},
    tibetan: {l: '\u0F3A', r: '\u0F3B'},
    nKo: {l: '\u2E1C', r: '\u2E1D'},
    quill: {l: '\u2045', r: '\u2046'},
    crux: {l: '\u2E26', r: '\u2E27'},
    underbar: {l: '\u298B', r: '\u298C'},
    ticked: {
      top: {l: '\u298D', r: '\u2990'},
      btm: {l: '\u298E', r: '\u298F'},
    },
    cornerdot: {l: '\u27D3', r: '\u27D4'}
  },
  half: {
    top:{l: '\u2E22', r: '\u2E23'},
    bottom:{l: '\u2E24', r: '\u2E25'},
  },
  horizontal: {
    square: {top: '\u23B4', mid: '\u23B6', btm: '\u23B5'},
    round: {top: '\u23DC', btm: '\u23DD'},
    curly: {top: '\u23DE', btm: '\u23DF'},
    tortoise: {top: '\u23E0', btm: '\u23E1'},
  },
  white: {
    square: {l: '\u27E6', r: '\u27E7'},
    tortoise: {l: '\u27EC', r: '\u27ED'},
    round: {l: '\u2985', r: '\u2986'},
  },
  zNotation: {
    image: {l: '\u2987', r: '\u2988'},
    binding: {l: '\u2989', r: '\u298A'},
  },
  inequality: {
    1: {l: '\u2993', r: '\u2994'},
    2: {l: '\u2995', r: '\u2996'},
  },
  wiggly: {
    1: {l: '\u29D8', r: '\u29D9'},
    2: {l: '\u29DA', r: '\u29DB'},
  },
  ornament: {
    lite: {
      tortoise: {l: '\u2772', r: '\u2773'},
    },
    md: {
      tortoise: {l: '\u2772', r: '\u2773'},
      round: {l: '\u2768', r: '\u2769'},
      flat: {l: '\u276A', r: '\u276B'},
      curly: {l: '\u2774', r: '\u2775'},
    },
    hvy: {
      angle: {l: '\u2770', r: '\u2771', quotL: '\u276E', quotR: '\u276F'},
    },
  },
  asian: {
    nrml: {
      tortoise: {l: '\u3014', r: '\u3015'},
      white: {
        lenticular: {l: '\u3016', r: '\u3017'},
        tortoise: {l: '\u3018', r: '\u3019'},
        square: {l: '\u301A', r: '\u301B'},
      },
    },
    halfwidth: {
      corner: {l: '\uFF62', r: '\uFF63'},
    },
    fullwidth: {
      angle: {
        1: {l: '\u3008', r: '\u3009'},
        2: {l: '\u300B', r: '\u300B'},
      },
      corner: {
        nrml: {l: '\u300C', r: '\u300D'},
        white: {l: '\u300E', r: '\u300F'},
      },
      lenticular: {l: '\u3010', r: '\u3011'},
    }
  },
}

export const SPACE = {
  bar: '\u0020',
  nb: '\xA0',
  en: '\u2002',
  em: '\u2003',
  thin: '\u2009',
  zeroWidth: {joiner: '\u200D', nonjoiner: '\u200C'},
  macron: '\xAF',
  acute: '\xB4'
}

export const DASH = {
  n: '\u2012',
  en: '\u2013',
  em: '\u2014',
  emx: {2: '\u2E3A', 3: '\u2E3B'},
  bar: '\u2015',
  small: '\uFE58',
  hyphen: {nrml: '\u2010', nb: '\u2011', dbl: '\u2E40', minus: '\u002D', small: '\uFE63', full: '\uFF0D', canada: '\u1400'},
}

export const FOOTNOTE = {
  1: '\u2013',
  2: '\u2020',
  3: '\u2021'
}

export const SCRIPT = {
  super: {1: '\xB9', 2: '\xB2', 3: '\xB3', 4: '\xB4',},
  sub: {1: '\u2081', 2: '\u2082', 3: '\u2083', 4: '\u2084'},
}

export const CIRCLED = {
  filled: {white: '\u25CB', black: '\u25CF', dotted: '\u25CC',},
  black:{
    star: {white: '\u272A', eight: '\u2742'},
    whitedot:{1: '\u2688', 2: '\u2689'},
  },
  white: {
    small: '\u26AC',
    shadowed: '\u274D',
    blackdot:{1: '\u2686', 2: '\u2687'},
  },
  bullet: {
    filled: '\u29BF',
    empty: '\u29BE'
  }
}

export const UNICODE_CHARS = {
  ...APPLE,
  ...MATH_SYMBOLS,
  ...MEASUREMENT,
  ...VECTOR,
  ...FRACTION,
  ...LOGIC,
  ...MONEY,
  ...CARD_SUITS,
  ...RIGHTS,
  ...PUNCTUATION,
  ...BRACKETS,
  ...SPACE,
  ...DASH,
  ...FOOTNOTE,
  ...SCRIPT,
  ...CIRCLED,
}