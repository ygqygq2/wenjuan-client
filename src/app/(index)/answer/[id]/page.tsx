import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getQuestionById, getAnswerById } from '@/app/services/server';
import { getComponent } from '@/components/QuestionComponents';
import { ReadonlyProvider } from '@/lib/readonly-provider';

type PropsType = {
  params: { id: string };
};

type AnswerType = {
  _id: number;
  questionId: number;
  answerContent: string;
};

type ComponentType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden: boolean;
  disabled: boolean;
  props: {
    [key: string]: any; // 允许动态添加其他属性
    options?: any[];
  };
};

type QuestionType = {
  _id: number;
  title: string;
  answerCount: number;
  componentList: ComponentType[];
};

async function getData(id: string, token: string): Promise<any> {
  const answer = (await getAnswerById(id, token)) as unknown as AnswerType;
  const answerContentObj = JSON.parse(answer.answerContent);
  const { questionId } = answer;
  const question = (await getQuestionById(questionId.toString(), token)) as unknown as QuestionType;

  // 遍历组件列表
  question.componentList.forEach((component: ComponentType) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { fe_id, props } = component;

    // 检查答案中是否存在与组件相对应的 fe_id
    if (answerContentObj?.[fe_id]) {
      const value = answerContentObj[fe_id];

      if (props?.options) {
        // 遍历选项列表
        props.options.forEach((option: any) => {
          const { value: optionValue } = option;
          const regex = new RegExp(`\\b${optionValue}\\b`, 'i');
          const checked = regex.test(` ${value} `); // 在 value 前后添加空格，以确保单词边界匹配
          option.checked = checked;
        });
      } else {
        // 将答案的值添加到组件的 props 中
        component.props.value = value;
      }
    }
  });

  // 拼凑 question answer 成一个数据
  const data = {
    ...question,
  };
  console.log('🚀 ~ file: page.tsx:65 ~ getData ~ data:', data);
  return data;
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  if (tokenCookie) {
    const { value } = tokenCookie;
    const data = await getData(params.id, value);
    const metaData = { title: data?.title || '', desc: data?.desc || '' };
    return {
      title: metaData.title,
      description: metaData.desc,
    };
  }

  return {
    title: '',
    description: '',
  };
}

export default async function Page({ params }: { params: any }) {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  let data;
  if (tokenCookie) {
    const { value } = tokenCookie;
    data = await getData(params.id, value);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id = '', title = '', componentList = [] } = data || {};

  // 遍历组件
  const readonly = true;
  const ComponentListElem = (
    <ReadonlyProvider readonly={readonly}>
      {componentList.map((c: any, index: number) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className="border-b border-[#f1f1f1]">
            {ComponentElem}
          </div>
        );
      })}
    </ReadonlyProvider>
  );

  return (
    <>
      <h1 className="text-2xl leading-8 font-semibold text-center text-blue-600">{title}</h1>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={_id} />

        {ComponentListElem}
      </form>
    </>
  );
}
