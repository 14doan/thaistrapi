import reactMarkdown from "react-markdown";

const URL = process.env.STRAPIBASEURL;

export async function getStaticPaths() {
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

export async function getStaticProps({ params }) {
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
  console.log(data);

  return {
    props: data.data.sentences.data[0],
    revalidate: 30,
  };
}
const Details = ({ attributes }) => {
  // console.log(sentence);
  return (
    <div>
      <reactMarkdown>
        <h2>{attributes.english}</h2>
        <p>{attributes.thai}</p>
        <p>{attributes.note}</p>
      </reactMarkdown>
    </div>
  );
};

export default Details;
