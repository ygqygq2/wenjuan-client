'use client';

import React, { FC } from 'react';

import { useReadonly } from '@/lib/readonly-provider';

import styles from './QuestionInput.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QuestionInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '' } = props;
  const readonly = useReadonly();

  return (
    <>
      <p>{title}</p>
      <div className={styles.inputWrapper}>
        <input name={fe_id} placeholder={placeholder} value="" readOnly={readonly} />
      </div>
    </>
  );
};

export default QuestionInput;
