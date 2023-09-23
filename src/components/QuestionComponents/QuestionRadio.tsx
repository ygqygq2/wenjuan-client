'use client';

import React, { FC } from 'react';

import { useReadonly } from '@/lib/readonly-provider';

import styles from './QuestionRadio.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    options: Array<{ value: string; text: string }>;
    value: string;
    isVertical: boolean;
  };
};

const QuestionRadio: FC<PropsType> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical } = props;
  const readonly = useReadonly();

  return (
    <>
      <p>{title}</p>
      <ul>
        {options.map((opt) => {
          const { value: val, text } = opt;

          // 判断竖向、横向
          let liClassName = '';
          if (isVertical) {
            liClassName = styles.verticalItem;
          } else {
            liClassName = styles.horizontalItem;
          }

          return (
            <li key={val} className={liClassName}>
              <label>
                <input type="radio" name={fe_id} value={val} defaultChecked={val === value} disabled={readonly}></input>
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionRadio;
