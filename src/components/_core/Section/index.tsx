import React from 'react';
import type { WidthProperty, HeightProperty } from '~/types/declarations/css.d.ts';
import type { ExtendedCSSUnits } from '~/types/Units';
// import withAutoAnimate from '~/hoc/withAutoAnimate';
import { classnames } from '~/utils/global';
import styles from './section.module.css';

type Align = 'center' | 'start' | 'end';

interface SectionProps {
  layout?: 'row' | 'column';
  align?: Align | [horizontal: Align, vertical: Align];
  reverse?: boolean;
  wrap?: boolean;
  gap?: number;
  width?: WidthProperty<`${number}${ExtendedCSSUnits}`>;
  height?: HeightProperty<`${number}${ExtendedCSSUnits}`>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Section component to create a flexible and responsive layout section.
 * It uses flexbox to align and distribute content.
 * 
 * @component
 * @param {SectionProps} props - Props for the Section component.
 * @param {'row' | 'column'} [props.layout='column'] - Defines the flex direction of the section, either as a row or column.
 * @param {Align | [Align, Align]} [props.align='center'] - Specifies alignment of items. Can be a single value for horizontal
 * alignment or a tuple for both horizontal and vertical alignment.
 * @param {boolean} [props.reverse=false] - If true, reverses the order of the flex items.
 * @param {boolean} [props.wrap=true] - If true, items will wrap onto multiple lines or columns if needed.
 * @param {number} [props.gap=10] - Sets the gap between items in pixels.
 * @param {WidthProperty<string>} [props.width] - Sets the width of the section. Accepts any valid CSS width value.
 * @param {HeightProperty<string>} [props.height] - Sets the height of the section. Accepts any valid CSS height value.
 * @param {string} [props.className] - Additional CSS class names to apply to the section.
 * @param {React.CSSProperties} [props.style] - Inline styles to apply to the section.
 * @param {React.ReactNode} [props.children] - Child elements or components to render inside the section.
 * 
 * @returns {React.ReactElement} Rendered section component.
 *
 * @example
 * //* A simple row layout with center alignment
 * <Section layout="row" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Section>
 *
 * @example
 * //* A column layout with separate horizontal and vertical alignment
 * <Section layout="column" align={['start', 'end']}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Section>
 *
 * @example
 * //* A reversed row layout
 * <Section layout="row" reverse>
 *   <div>First Item (will appear last)</div>
 *   <div>Second Item (will appear first)</div>
 * </Section>
 */

const Section: React.FC<SectionProps> = ({
  layout = 'column',
  align = 'center',
  reverse = false,
  wrap = true,
  gap = 10,
  width,
  height,
  className,
  style,
  children,
}) => {
  const flexDirection: string = layout + (reverse ? '-reverse' : '');
  const justifyContent: string = Array.isArray(align) ? (align[0] === 'center' ? 'center' : align[0] === 'start' ? 'flex-start' : 'flex-end') : 'center';
  const alignItems: string = Array.isArray(align) ? (align[1] === 'center' ? 'center' : align[1] === 'start' ? 'flex-start' : 'flex-end') : 'center';

  const flexStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: flexDirection as 'row' | 'row-reverse' | 'column' | 'column-reverse',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    justifyContent,
    alignItems,
    gap: `${gap}px`,
    width,
    height,
  };

  const combinedStyles: React.CSSProperties = { ...style, ...flexStyles };
  const sectionClassNames: string = classnames(styles.wrapper, className);

  return (
    <div className={sectionClassNames} style={combinedStyles}>
      {children}
    </div>
  );
};

// export default withAutoAnimate(Section);
export default Section;