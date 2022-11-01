const URL = process.env.STRAPIBASEURL;

export async function getStaticProps(context) {
  const fetchParams = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
      {
        sentences{
          data{
            id
            attributes{
              english
              thai
              note
            }
          }
        }
      }`,
    }),
  };
  const res = await fetch(`${URL}/graphql`, fetchParams);
  const data = await res.json();

  return {
    props: { sentences: data.data.sentences.data },
  };
}

const Query = (sentences) => {
  return { sentences };
};

export default Query;
