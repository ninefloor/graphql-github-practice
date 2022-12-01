import { graphql } from "@octokit/graphql";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // graphql = graphql.defaults({
  //   headers: {
  //     authorization: `token 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`,
  //   },
  // });
  const [data, setData] = useState([]);
  useEffect(() => {
    graphql(
      `
        {
          repository(owner: "codestates-seb", name: "agora-states-fe") {
            id
            createdAt
            discussions(first: 10){
              nodes {
                id
                title
                url
                body
                author {
                  login
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token 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`,
        },
      }
    ).then((res) => {
      console.log(res);
      console.log(res.repository.discussions.nodes);
      setData(res.repository.discussions.nodes);
    });
  }, []);
  return (
    <div className="App">
      Hello World!
      {data.map(el => {
        return (
          <div key={el.id}>
            <h1>{el.title}</h1>
            <p>{el.body}</p>
            <a href={el.url}>바로가기</a>
          </div>
        )
      })}
    </div>
  );
}

export default App;
