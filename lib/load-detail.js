const URL = process.env.STRAPIBASEURL;

export async function loadDetailPath() {
  // Call an external API endpoint to get posts
  const fetchParams = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
                {
                    sentences{
                      data{
                        id
                      }
                    }
                  }
                `,
    }),
  };
  const res = await fetch(`${URL}/graphql`, fetchParams);
  const sens = await res.json();
  const paths = sens.data.sentences.data.map((sen) => {
    return { params: { id: sen.id } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function loadDetail({ params }) {
  // Call an external API endpoint to get posts
  const fetchParams = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
          {
            sentences(filters:{
              id:{
                eq:"${params.id}"
              }}){
            data{
              attributes{
                english
                thai
                note
              }
            }
          }}
                `,
    }),
  };

  const res = await fetch(`${URL}/graphql`, fetchParams);
  const data = await res.json();

  return data;
}
