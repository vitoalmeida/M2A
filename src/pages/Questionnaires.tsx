import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Button } from '../components';
import Question from '../components/Questionnairies/Question';

const settings = [
  {
    name: 'Public access',
  },
  {
    name: 'Private to Project Members',
  },
  {
    name: 'Private to you',
  },
];

const questions = [
  {
    id: 1,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
    answers: [
      'Sim elde é!',
      'Com toda cerdteza!',
      'Não haá mulher no mundo pra tornar ele macho!',
      'Se peidar cheira a camisinha usada!',
    ],
  },
  {
    id: 2,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
    answers: [
      'Sim egle é!',
      'Com toda certeza!',
      'Não há mdulher no mundo pra tornar ele macho!',
      'Se peiadar cheira a camisinha usada!',
    ],
  },
  {
    id: 3,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
    answers: [
      'Sim ele é!',
      'Com tosda certeza!',
      'Não há mulhers no mundo pra tornar ele macho!',
      'Se peiddar cheira a camisinha usada!',
    ],
  },
  {
    id: 4,
    question: 'Vitor boiolinha gayzinho viadinho bichinha frutinha soca mole',
    answers: [
      'Sim ele dé!',
      'Com toda certezaa!',
      'Não há mulherf no mundo pra tornar ele macho!',
      'Se peidarf cheira a camisinha usada!',
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Questionnaires() {
  const [selected, setSelected] = useState(settings[0]);

  return (
    <>
      <Helmet>
        <title>Questionários - M2A</title>
        <meta name='description' content='Login to M2A application' />
      </Helmet>
      <Layout>
        {questions.map((question) => (
          <Question question={question} />
        ))}
        <div className='py-10'>
          <Button title='ENVIAR' />
        </div>
      </Layout>
    </>
  );
}

export default Questionnaires;
