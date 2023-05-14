import QuestionInput from '@/app/components/QuestionComponents/QuestionInput';

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
        <h1>Question page</h1>
        <p>{id}</p>
        <form>
          <QuestionInput fe_id="c1" props={{ title: 'input 测试', placeholder: 'test string' }}></QuestionInput>
        </form>
      </main>
    </>
  );
}
