async function getData() {
  const res = await fetch(`https://${process.env.API_BASE_URL}/api/question`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return (
    <>
      <pre>{data}</pre>
    </>
  );
}
