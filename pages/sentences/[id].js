// export const getStaticPaths = async () => {
//   const res = await fetch(
//     "https://my-json-server.typicode.com/14doan/json/sentences"
//   );
//   const data = await res.json();

//   const paths = data.map((sentence) => {
//     return {
//       params: { id: sentence.id.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

const URL = process.env.STRAPIBASEURL;

// export async function getStaticProps(context) {
//   const fetchParams = {
//     method: "post",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `
//       {
//         sentences{
//           data{
//             id
//             attributes{
//               english
//               thai
//               note
//             }
//           }
//         }
//       }`,
//     }),
//   };
//   const res = await fetch(`${URL}/graphql`, fetchParams);
//   const data = await res.json();

//   return {
//     props: { sentences: data.data.sentences.data },
//   };
// }
export const getStaticPaths = async () => {
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
      }`,
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
};

// export const getStaticProps = async (context, fetchParams) => {
//   const id = context.params.id;
//   const res = await fetch(`${URL}/graphql` + id, fetchParams);
//   const data = await res.json();

//   return {
//     props: { sentence: data.data.sentences.data },
//   };
// };

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
                contains:"${params.id}"
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

  return {
    props: { sentence: data.data.sentences.data[0] },
    revalidate: 30,
  };
}
const Details = ({ sentence }) => {
  // console.log(sentence);
  return (
    <div>
      <h2>{sentence.attributes.english}</h2>
      <p>{sentence.attributes.thai}</p>
      <p>{sentence.attributes.note}</p>
    </div>
  );
};

export default Details;
