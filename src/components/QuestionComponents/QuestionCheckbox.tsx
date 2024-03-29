'use client';

import React, { FC, useEffect, useState } from 'react';

import { useReadonly } from '@/lib/readonly-provider';

import styles from './QuestionCheckbox.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    isVertical?: boolean;
    options: Array<{
      value: string;
      text: string;
      checked: boolean;
    }>;
  };
};

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, isVertical, options = [] } = props;
  const readonly = useReadonly();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // 初始化时，判断默认选中
  useEffect(() => {
    options.forEach((item) => {
      const { value, checked } = item;
      if (checked) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setSelectedValues((selectedValues) => selectedValues.concat(value));
      }
    });
  }, [options, selectedValues]);

  function toggleChecked(value: string) {
    if (selectedValues.includes(value)) {
      // 已经被选中，则取消选择
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setSelectedValues((selectedValues) => selectedValues.filter((v) => v !== value));
    } else {
      // 未被选中，则增加选择
      setSelectedValues(selectedValues.concat(value));
    }
  }

  return (
    <>
      <p>{title}</p>

      <input type="hidden" name={fe_id} value={selectedValues.toString()} readOnly={readonly}></input>

      <ul className={styles.list}>
        {options.map((item) => {
          const { value, text } = item;
          let className;
          if (isVertical) {
            className = styles.verticalItem;
          } else {
            className = styles.horizontalItem;
          }
          return (
            <li key={value} className={className}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleChecked(value)}
                  disabled={readonly}
                ></input>
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionCheckbox;
