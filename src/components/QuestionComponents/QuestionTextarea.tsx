'use client';

import React, { FC } from 'react';

import { useReadonly } from '@/lib/readonly-provider';

import styles from './QuestionTextarea.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
  };
};

const QuestionTextarea: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '' } = props;
  const readonly = useReadonly();

  return (
    <>
      <p>{title}</p>
      <div className={styles.textareaWrapper}>
        <textarea name={fe_id} placeholder={placeholder} rows={5} readOnly={readonly} />
      </div>
    </>
  );
};

export default QuestionTextarea;
