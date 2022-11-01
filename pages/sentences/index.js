import Link from "next/link";
import Query from "../../comps/query";
import styles from "../../styles/sentences.module.css";

const URL = process.env.STRAPIBASEURL;
// const sentences = Query();
// console.log(sentences);

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
    revalidate: 30,
  };
}

const Sentences = ({ sentences }) => {
  return (
    <div>
      <h2>All Basic Sentences</h2>
      {console.log(sentences)}

      {sentences.map((s) => (
        <div key={s.id}>
          <Link href={"/sentences/" + s.id}>
            <a className={styles.single}>
              <p>{s.attributes.english}</p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sentences;
