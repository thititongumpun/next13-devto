export type IDevtoResponse = {
  id: number;
  title: string;
  url: string;
};

export const fetchData = async (): Promise<IDevtoResponse[]> => {
  const res = await fetch(`https://dev.to/api/articles`);
  // need to do this with fetch since doesn't automatically throw errors axios and graphql-request do
  if (res.ok) {
    return res.json();
  }
  throw new Error("Network response not ok"); // need to throw because react-query functions need to have error thrown to know its in error state
};
