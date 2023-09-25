'use client';

import React, { FC, useState } from 'react';

import { useReadonly } from '@/lib/readonly-provider';

import styles from './QuestionInput.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
    value?: string;
  };
};

const QuestionInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '', value = '' } = props;
  const readonly = useReadonly();

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <p>{title}</p>
      <div className={styles.inputWrapper}>
        <input name={fe_id} placeholder={placeholder} readOnly={readonly} value={inputValue} onChange={handleChange} />
      </div>
    </>
  );
};

export default QuestionInput;
