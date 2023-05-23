import api, { route } from '@forge/api';
import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState, useEffect, Button } from '@forge/ui';

const fetchCommentsForIssue  = async (issueIdOrKey) => {
  const res = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);
  const data = await res.json();
  return data.comments;
};
const App = () => {

  const context = useProductContext();
  const [comments, setComments] = useState([]);

  const handleFetchComments = async()=>{
    const data = await fetchCommentsForIssue(context.platformContext.issueKey)
    console.log({data});
    if(data){
      setComments(data);
    };
  };

  useEffect(() => {
    handleFetchComments();
  }, [])

  console.log(`Number of comments on this page: ${comments.length}`);
  return (
    <Fragment>
      <Text>My First App 😎</Text>
      <Text>
        Number of comments on this page: {comments.length}
      </Text>
      <Button onClick={handleFetchComments} text='Reload'/>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
