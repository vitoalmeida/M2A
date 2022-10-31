import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { QuestionnaireActions } from "../redux/questionnaire";
import QuestionnaireForm from "../components/pages/questionnaire";

const Questionnaires: React.FC = () => {
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
        <title>Questionário - M2A</title>
        <meta name="description" content="Login to M2A application" />
      </Helmet>
      <Layout>
        <QuestionnaireForm />
      </Layout>
    </>
  );
};

export default Questionnaires;
