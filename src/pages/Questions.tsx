import SearchForm from "../components/questions/SearchForm";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import Results from "../components/questions/Results";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../redux/hooks";
import { QuestionnaireActions } from "../redux/questionnaire";

function Questions() {
  const { questionnaire } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(QuestionnaireActions.getQuestionsRequest());
  }, []);

  // Array de perguntas:
  console.log(questionnaire.questions);

  return (
    <>
      <Helmet>
        <title>Perguntas - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <Layout>
        <SearchForm />
        <Results />
      </Layout>
    </>
  );
}

export default Questions;
