import SearchForm from '../components/questions/SearchForm';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import Results from '../components/questions/Results';
import { useState } from 'react';

function Questions() {
  return (
    <>
      <Helmet>
        <title>Perguntas - M2A</title>
        <meta name='description' content='Login to M2A application' />
      </Helmet>
      <Layout>
        <SearchForm />
        <Results />
      </Layout>
    </>
  );
}

export default Questions;
