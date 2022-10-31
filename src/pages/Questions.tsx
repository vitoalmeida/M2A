import SearchForm from "../components/pages/questions/SearchForm";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import Results from "../components/pages/questions/Results";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../redux/hooks";
import { QuestionnaireActions } from "../redux/questionnaire";

function Questions() {
  const { questionnaire } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questionnaire.questions.length) {
      dispatch(QuestionnaireActions.getQuestionsRequest());
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Perguntas - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <Layout>
        {/* <SearchForm /> */}
        <Results />
      </Layout>
    </>
  );
}

export default Questions;
