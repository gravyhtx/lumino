export type Lowercase =
|'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'|'x'|'y'|'z';
export type Uppercase =
|'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z';

export type Letter = Lowercase | Uppercase;
export type Number = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Character = Letter | Number;

export type Punctuation = '!'|'.'|','|'?'|'-'|'_'|'+'|'='|'/'|'\\'|'('|')'|'['|']'|'{'|'}'|'<'|'>';