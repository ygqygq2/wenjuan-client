import QuestionCheckbox from './QuestionCheckbox';
import QuestionInfo from './QuestionInfo';
import QuestionInput from './QuestionInput';
import QuestionParagraph from './QuestionParagraph';
import QuestionRadio from './QuestionRadio';
import QuestionTextarea from './QuestionTextarea';
import QuestionTitle from './QuestionTitle';

type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden: boolean;
  props: any;
};

export const getComponent = (comp: ComponentInfoType, index: number) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { fe_id, type, isHidden, props = {} } = comp;
  if (isHidden) return null;

  const updatedProps = {
    ...props,
    title: `${index}. ${props.title}`,
  };

  if (type === 'questionInput') {
    return <QuestionInput fe_id={fe_id} props={updatedProps} />;
  }

  if (type === 'questionRadio') {
    return <QuestionRadio fe_id={fe_id} props={updatedProps} />;
  }

  if (type === 'questionTitle') {
    return <QuestionTitle {...updatedProps} />;
  }

  if (type === 'questionParagraph') {
    return <QuestionParagraph {...updatedProps} />;
  }

  if (type === 'questionInfo') {
    return <QuestionInfo {...updatedProps} />;
  }

  if (type === 'questionTextarea') {
    return <QuestionTextarea fe_id={fe_id} props={updatedProps} />;
  }

  if (type === 'questionCheckbox') {
    return <QuestionCheckbox fe_id={fe_id} props={updatedProps} />;
  }

  return null;
};
