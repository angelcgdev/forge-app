import api, { route } from '@forge/api';
import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState, useEffect } from '@forge/ui';

const fetchCommentsForContent = async (contentId) => {
  const res = await api.asUser().requestConfluence(route`/wiki/rest/api/content/${contentId}/child/comment`);
  const data = await res.json();
  return data.results;
};
const App = () => {

  const context = useProductContext ();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async()=>{
      const data = await fetchCommentsForContent(context.contentId)
      console.log({data});
      if(data){
        setComments(data);
      };
    })()
  }, [])

  console.log(`Number of comments on this page: ${comments.length}`);
  return (
    <Fragment>
      <Text>My First App 😎</Text>
      <Text>
        Number of comments on this page: {comments.length}
      </Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
