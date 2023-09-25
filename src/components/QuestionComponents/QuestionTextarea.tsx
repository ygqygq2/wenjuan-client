'use client';

import React, { FC, useState } from 'react';

import { useReadonly } from '@/lib/readonly-provider';

import styles from './QuestionTextarea.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    placeholder?: string;
    value?: string;
  };
};

const QuestionTextarea: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '', value = '' } = props;
  const readonly = useReadonly();

  const [textValue, setTextValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <>
      <p>{title}</p>
      <div className={styles.textareaWrapper}>
        <textarea
          name={fe_id}
          placeholder={placeholder}
          rows={5}
          readOnly={readonly}
          value={textValue}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default QuestionTextarea;
