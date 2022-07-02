import SearchForm from '../components/pages/diagnostics/SearchForm';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import { useSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import Results from '../components/pages/diagnostics/Results';
import { useEffect } from 'react';
import { DiagnosticsActions } from '../redux/diagnostics';
import { QuestionnaireActions } from '../redux/questionnaire';

function Diagnostics() {
  const { diagnostics, questionnaire } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questionnaire.questions.length) {
      dispatch(QuestionnaireActions.getQuestionsRequest());
    }
    dispatch(DiagnosticsActions.getDiagnosticsRequest());
  }, []);

  return (
    <>
      <Helmet>
        <title>Diagnósticos - M2A</title>
        <meta name='description' content='Login to M2A application' />
      </Helmet>
      <Layout>
        <SearchForm />
        <Results />
      </Layout>
    </>
  );
}

export default Diagnostics;
