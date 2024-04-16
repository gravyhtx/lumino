import { useMemo } from 'react';
import type { TailwindLayoutProps } from '~/types/Tailwind';
import type { Breakpoint, GridTemplateEntry, JustifyAlignPlacement } from '~/types/declarations/css';

/**
 * The types of classes generated for parent and child elements.
 */
interface TailwindLayoutClasses {
  /** 
   * Generated classes for the parent element. 
   * Apply these classes to your parent container to control its layout based on the specified configuration.
   */
  parent: string;

  /** 
   * Generated classes for the child elements. 
   * Apply these classes to child elements within the parent container to align them according to the specified configuration.
   */
  child: string;
}

/**
 * A hook to generate Tailwind CSS classes for grid and flex layouts.
 *
 * @param {TailwindLayoutProps} [props={}] - The layout configuration object.
 * @param {string} [props.layout='flex'] - The layout type, either 'grid' or 'flex'.
 * @param {GridTemplateEntry | Record<Breakpoint, GridTemplateEntry> | { default: string }} [props.columns={ default: 'none' }] - The column template configuration.
 * @param {GridTemplateEntry | Record<Breakpoint, GridTemplateEntry> | { default: string }} [props.rows={ default: 'none' }] - The row template configuration.
 * @param {Record<Breakpoint, string>} [props.template] - The custom template configuration using CSS Grid syntax.
 * @param {Record<Breakpoint, number>} [props.gap={ default: 0 }] - The gap configuration for each breakpoint.
 * @param {JustifyAlignPlacement} [props.justifyContent='center'] - The justify-content property value.
 * @param {JustifyAlignPlacement} [props.justifyItems='stretch'] - The justify-items property value.
 * @param {JustifyAlignPlacement} [props.alignContent='center'] - The align-content property value.
 * @param {JustifyAlignPlacement} [props.alignItems='stretch'] - The align-items property value.
 * @param {JustifyAlignPlacement} [props.placeContent='stretch'] - The place-content property value.
 * @param {JustifyAlignPlacement} [props.placeItems='stretch'] - The place-items property value.
 * @param {'row' | 'col' | 'row-dense' | 'col-dense'} [props.autoFlow='row'] - The grid-auto-flow property value.
 * @param {string} [props.autoColumns='auto'] - The grid-auto-columns property value.
 * @param {string} [props.autoRows='auto'] - The grid-auto-rows property value.
 * @param {'first' | 'last' | 'none' | 'initial' | number} [props.order='initial'] - The order property value.
 * @param {Record<Breakpoint, 'row' | 'row-reverse' | 'col' | 'col-reverse'>} [props.direction={ default: 'row' }] - The flex-direction property value for each breakpoint.
 * @param {'wrap' | 'wrap-reverse' | 'nowrap'} [props.wrap='wrap'] - The flex-wrap property value.
 * @param {Record<Breakpoint, string>} [props.basis={ default: 'auto' }] - The flex-basis property value for each breakpoint.
 * @param {Record<Breakpoint, number>} [props.grow={ default: 0 }] - The flex-grow property value for each breakpoint.
 * @param {Record<Breakpoint, number>} [props.shrink={ default: 1 }] - The flex-shrink property value for each breakpoint.
 *
 * @returns {Object} An object containing the generated Tailwind CSS classes for the parent and child elements.
 * @returns {string} return.parent - The generated classes for the parent element.
 * @returns {string} return.child - The generated classes for the child elements.
 *
 * @example
 * // Grid layout with custom template
 * const { parent, child } = useTailwindLayout({
 *   layout: 'grid',
 *   template: {
 *     default: 'repeat(2, 1fr)',
 *     md: 'repeat(3, 1fr)',
 *   },
 *   gap: { default: 4 },
 * });
 *
 * // Output:
 * // parent: 'grid grid-cols-[repeat(2,1fr)] md:grid-cols-[repeat(3,1fr)] gap-4'
 * // child: ''
 *
 * @example
 * // Flex layout with custom basis
 * const { parent, child } = useTailwindLayout({
 *   layout: 'flex',
 *   direction: {
 *     default: 'row',
 *     md: 'col',
 *   },
 *   gap: {
 *     default: 2,
 *     md: 4,
 *   },
 *   basis: {
 *     default: '1/2',
 *     md: '1/3',
 *   },
 * });
 *
 * // Output:
 * // parent: 'flex flex-row md:flex-col gap-2 md:gap-4'
 * // child: 'basis-1/2 md:basis-1/3'
 * 
  * @example
 * // Centering items in a flex container
 * const { parent, child } = useTailwindLayout({
 *   layout: 'flex',
 *   justifyContent: 'center',
 *   alignItems: 'center',
 * });
 * // Use `parent` for the container to center its children horizontally and vertically.
 * 
 * @example
 * // Grid layout with centered content and specific gap
 * const { parent } = useTailwindLayout({
 *   layout: 'grid',
 *   columns: { default: 'repeat(3, minmax(0, 1fr))' },
 *   gap: { default: 4 },
 *   justifyContent: 'center',
 *   alignContent: 'center',
 * });
 * // Apply `parent` to your grid container for a centered layout with 3 columns and gaps.
 * 
 * @example
 * // Flex layout with wrapped items, centered along the cross axis
 * const { parent, child } = useTailwindLayout({
 *   layout: 'flex',
 *   wrap: 'wrap',
 *   justifyContent: 'space-between',
 *   alignItems: 'center',
 *   gap: { default: 2 },
 * });
 * // `parent` will arrange children with space between them, wrapping as needed, and centering them vertically.
 * 
 * @example
 * // Centering content with CSS Grid using place-content
 * const { parent } = useTailwindLayout({
 *   layout: 'grid',
 *   template: {
 *     default: 'repeat(2, 1fr) / repeat(2, 1fr)',
 *   },
 *   placeContent: 'center',
 * });
 * // `parent` configures a 2x2 grid, centering all content both vertically and horizontally.
 * 
 * Note: The `child` classes can be used to apply flex or grid item-specific properties, such as order or grow, and might not be needed in all layout configurations.
 */
const useTailwindLayout = (props: TailwindLayoutProps = {}): TailwindLayoutClasses => {
  const {
    layout = 'flex',
    columns = { default: 'none' },
    rows = { default: 'none' },
    template,
    gap = { default: 0 },
    justifyContent = 'center',
    justifyItems = 'stretch',
    alignContent = 'center',
    alignItems = 'stretch',
    placeContent = 'stretch',
    placeItems = 'stretch',
    autoFlow = 'row',
    autoColumns = 'auto',
    autoRows = 'auto',
    order = 'initial',
    direction = { default: 'row' },
    wrap = 'wrap',
    basis = { default: 'auto' },
    grow = { default: 0 },
    shrink = { default: 1 },
  } = props;

  const generateBreakpointClass = (breakpoint: Breakpoint, value: string | undefined) =>
    value ? `${breakpoint === 'default' ? '' : `${breakpoint}:`}${value}` : '';

  const generateTemplate = (value: GridTemplateEntry | Record<Breakpoint, GridTemplateEntry> | { default: string } | undefined) => {
    if (!value) return '';

    const generateValue = (entry: GridTemplateEntry) => {
      if (Array.isArray(entry)) {
        return entry.map((val) => (typeof val === 'number' ? `${String(val)}fr` : val)).join(' ');
      }
      return String(entry);
    };

    if (typeof value === 'object' && 'default' in value) {
      return `grid-cols-[${String(value.default)}]`;
    }

    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([breakpoint, entry]) => {
          const breakpointClass = generateBreakpointClass(breakpoint as Breakpoint, `grid-cols`);
          const entryValue = generateValue(entry as unknown as GridTemplateEntry);
          return `${breakpointClass}-[${entryValue}]`;
        })
        .join(' ');
    }

    return `grid-cols-[${generateValue(value as GridTemplateEntry)}]`;
  };

  const generateCustomTemplate = () => {
    if (!template) return '';

    return Object.entries(template)
      .map(([breakpoint, value]) => {
        const breakpointClass = generateBreakpointClass(breakpoint as Breakpoint, 'grid-cols');
        return `${breakpointClass}-[${String(value)}]`;
      })
      .join(' ');
  };

  const generateJustifyAlignPlacementClass = (prop: JustifyAlignPlacement | undefined, prefix: string) => {
    if (!prop) return '';

    const translateValue = (value: JustifyAlignPlacement) => {
      switch (value) {
        case 'start':
          return 'start';
        case 'end':
          return 'end';
        case 'center':
          return 'center';
        case 'between':
          return 'between';
        case 'around':
          return 'around';
        case 'evenly':
          return 'evenly';
        case 'stretch':
          return 'stretch';
        case 'baseline':
          return 'baseline';
        default:
          return 'center';
      }
    };

    return `${prefix}-${translateValue(prop)}`;
  };

  const parentClasses = useMemo(() => {
    const classes = [
      layout === 'grid' ? 'grid' : 'flex',
      generateCustomTemplate() || generateTemplate(columns) || generateTemplate(rows),
      Object.entries(gap).map(([breakpoint, value]) => generateBreakpointClass(breakpoint as Breakpoint, `gap-${value}`)).join(' '),
      generateJustifyAlignPlacementClass(justifyContent, 'justify-content'),
      generateJustifyAlignPlacementClass(justifyItems, 'justify-items'),
      generateJustifyAlignPlacementClass(alignContent, 'align-content'),
      generateJustifyAlignPlacementClass(alignItems, 'align-items'),
      generateJustifyAlignPlacementClass(placeContent, 'place-content'),
      generateJustifyAlignPlacementClass(placeItems, 'place-items'),
      layout === 'grid' && `grid-auto-flow-${autoFlow}`,
      layout === 'grid' && `auto-cols-${autoColumns}`,
      layout === 'grid' && `auto-rows-${autoRows}`,
      layout === 'flex' && Object.entries(direction).map(([breakpoint, value]) => generateBreakpointClass(breakpoint as Breakpoint, `flex-${value}`)).join(' '),
      layout === 'flex' && `flex-wrap-${wrap}`,
    ];

    return classes.filter(Boolean).join(' ');
  }, [
    layout,
    columns,
    rows,
    template,
    gap,
    justifyContent,
    justifyItems,
    alignContent,
    alignItems,
    placeContent,
    placeItems,
    autoFlow,
    autoColumns,
    autoRows,
    direction,
    wrap,
  ]);

  const childClasses = useMemo(() => {
    const classes = [
      `order-${order}`,
      layout === 'flex' && Object.entries(basis).map(([breakpoint, value]) => generateBreakpointClass(breakpoint as Breakpoint, `basis-${value}`)).join(' '),
      layout === 'flex' && Object.entries(grow).map(([breakpoint, value]) => generateBreakpointClass(breakpoint as Breakpoint, `grow-${value}`)).join(' '),
      layout === 'flex' && Object.entries(shrink).map(([breakpoint, value]) => generateBreakpointClass(breakpoint as Breakpoint, `shrink-${value}`)).join(' '),
    ];

    return classes.filter(Boolean).join(' ');
  }, [layout, order, basis, grow, shrink]);

  return {
    parent: parentClasses,
    child: childClasses,
  };
};

export default useTailwindLayout;