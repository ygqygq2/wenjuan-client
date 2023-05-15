import QuestionInput from '@/app/components/QuestionComponents/QuestionInput';

import QuestionRadio from '@/app/components/QuestionComponents/QuestionRadio';

import styles from './page.module.scss';

type ParamsType = {
  id: string;
};

export default function Page({ params }: { params: ParamsType }) {
  const { id = '' } = params;
  return (
    <>
      <header>
        <title>Question</title>
        <meta name="description" content="question page"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </header>
      <main>
        <form method="post" action="/api/answer">
          <input type="hidden" name="questionId" value={id}></input>
          <div className={styles.componentWrapper}>
            <QuestionInput fe_id="c1" props={{ title: '你的姓名', placeholder: '请输入姓名' }}></QuestionInput>
          </div>
          <div className={styles.componentWrapper}>
            <QuestionRadio
              fe_id="c2"
              props={{
                title: '你的性别',
                options: [
                  { value: 'male', text: '男' },
                  { value: 'female', text: '女' },
                ],
                value: '',
                isVertical: true,
              }}
            ></QuestionRadio>
          </div>
          <div className={styles.submitBtnContainer}>
            <button type="submit">提交</button>
          </div>
        </form>
      </main>
    </>
  );
}
