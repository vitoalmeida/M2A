import { Tab } from '@headlessui/react';
import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccountActions } from '../../../../redux/account';
import { GeneralActions } from '../../../../redux/general';
import { useSelector } from '../../../../redux/hooks';
import Button from '../../../Button';
import { InputFormik, SelectFormik } from '../../../index';
import formSchema from './formSchema';
import { FaArrowRight } from 'react-icons/fa';
import { CompaniesActions } from '../../../../redux/companies';
import * as helpers from '../../../../helpers/index';

const QuestionsEditForm = () => {
  const dispatch = useDispatch();
  const { general, account, companies, questionnaire } = useSelector(
    (state) => state
  );
  const [activeTab, setActiveTab] = useState<number>(0);
  const [answers, setAnswers] = useState([{ teste: 'teste' }]);

  const initialValues: any = {
    pergunta: 'x',
    resposta: '',
    objetivo: '',
  };

  function handleSubmit(values) {
    const verifiedCompany = companies?.editCompany
      ? helpers.companies.verifyCompanyToEdit(companies?.editCompany, values)
      : values;

    dispatch(CompaniesActions.setEditCompany(verifiedCompany));
  }

  const tabs = [
    { name: 'PERGUNTA', id: 0 },
    { name: 'RESPOSTAS', id: 1 },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit({ ...values })}
        {...formSchema}
      >
        <Form className='mx-10 my-12'>
          <h1 className='text-[#004975] mb-7 font-semibold text-2xl'>
            Perguntas
          </h1>
          <Tab.Group>
            <Tab.List className='space-x-9 flex justify-center bg-white p-2'>
              {tabs.map((tab) => (
                <Tab
                  className={`${
                    tab.id === activeTab
                      ? 'text-secondary-blue border-b border-main-blue'
                      : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className='md:w-96'>
                  <SelectFormik
                    required
                    name='Fundamento'
                    data={general.uf}
                    label='Fundamento'
                  />
                  <InputFormik
                    textArea
                    required
                    name='pergunta'
                    label='Pergunta'
                  />
                  <InputFormik textArea name='objetivo' label='Objetivo' />
                </div>
              </Tab.Panel>
              <Tab.Panel className='md:w-[35rem] overflow-scroll max-h-96'>
                {answers.map(() => (
                  <div className='md:flex md:justify-between'>
                    <div className='md:w-[30rem]'>
                      <InputFormik textArea name='resposta' label='Resposta' />
                    </div>
                    <div className='w-[4rem]'>
                      <InputFormik name='valor' label='Valor' />
                    </div>
                  </div>
                ))}
                <Button
                  title='Adicionar resposta'
                  onClick={() => {
                    setAnswers([...answers, { teste: 'teste' }]);
                  }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className='mt-5 w-full mx-auto'>
            <Button
              title='Salvar'
              loading={account.loading}
              icon={<FaArrowRight />}
            />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default QuestionsEditForm;
