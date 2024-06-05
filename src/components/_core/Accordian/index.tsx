import React, { type ReactNode, useState } from 'react';

interface AccordionItemProps {
  header: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
  defaultOpen?: number | number[];
  headerClassName?: string;
  contentClassName?: string;
  iconOpen?: ReactNode;
  iconClosed?: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpen = [],
  headerClassName = '',
  contentClassName = '',
  iconOpen = '▼',
  iconClosed = '►',
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]
  );

  const toggleItem = (index: number) => {
    setOpenIndexes((prevOpenIndexes) =>
      prevOpenIndexes.includes(index)
        ? prevOpenIndexes.filter((i) => i !== index)
        : [...prevOpenIndexes, index]
    );
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-header ${headerClassName}`}
            onClick={() => toggleItem(index)}
          >
            <span>{item.header}</span>
            <span>{openIndexes.includes(index) ? iconOpen : iconClosed}</span>
          </div>
          {openIndexes.includes(index) && (
            <div className={`accordion-content ${contentClassName}`}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;