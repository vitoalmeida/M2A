import { Tab } from '@headlessui/react';
import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccountActions } from '../../redux/account';
import { GeneralActions } from '../../redux/general';
import { useSelector } from '../../redux/hooks';
import Button from '../Button';
import { InputFormik, SelectFormik } from '../index';
import DadosDaEmpresa from './DadosDaEmpresa';
import Endereco from './Endereco';
import InformacoesComplementares from './InformacoesComplementares';

const tabs = [
  { name: 'Dados da Empresa', id: 0 },
  { name: 'Endereço', id: 1 },
  { name: 'Informações Complementares', id: 2 },
];

const AddForm = () => {
  const dispatch = useDispatch();
  const { general, account } = useSelector((state) => state);
  const [activeTab, setActiveTab] = useState<number>(0);

  function handleSubmit(values) {
    delete values.confirmPassword;
    dispatch(
      AccountActions.registerAccountRequest({
        ...values,
        uf: general.uf.find((uf) => uf.value === values.uf).id,
        username: values.email,
      })
    );
  }

  useEffect(() => {
    dispatch(GeneralActions.getUfRequest());
  }, []);

  return (
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
          <DadosDaEmpresa />
        </Tab.Panel>

        <Tab.Panel>
          <Endereco />
        </Tab.Panel>

        <Tab.Panel>
          <InformacoesComplementares />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    // <Formik onSubmit={(values) => handleSubmit({ ...values })} {...formSchema}>
    //   <Form>
    //     <div className='flex px-10 pt-10'>
    //       <div className='md:col-span-2'>
    //         <div className='grid grid-cols-12 gap-x-6'>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='cnpj' label='CNPJ' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='razao_social' label='Razão social' />
    //           </div>

    //           <div className='flex flex-col col-span-12 sm:col-span-7'>
    //             <InputFormik name='fantasia' label='Fantasia' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-5'>
    //             <InputFormik
    //               name='num_empregados'
    //               label='Número de empregados'
    //             />
    //           </div>

    //           <div className='flex flex-col col-span-12 sm:col-span-12'>
    //             <InputFormik name='dt_ano_inicio' label='Ano de início' />
    //           </div>

    //           <div className='col-span-12 sm:col-span-5'>
    //             <SelectFormik
    //               name='telefone'
    //               label='Telefone'
    //               data={general.uf}
    //             />
    //           </div>
    //           <div className='col-span-12 sm:col-span-7'>
    //             <SelectFormik
    //               name='inscricao_estadual'
    //               label='Inscrição estadual'
    //               data={[
    //                 { label: 'Analfabeto', value: 'analfabeto' },
    //                 { label: 'Primeiro grau', value: 'primeiro grau' },
    //                 { label: 'Segundo grau', value: 'segundo grau' },
    //                 { label: 'Superior', value: 'superior' },
    //                 { label: 'Pós-graduação', value: 'pos graduacao' },
    //                 {
    //                   label: 'Mestrado e/ou Doutorado',
    //                   value: 'mestrado ou doutorado',
    //                 },
    //               ]}
    //             />
    //           </div>

    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='fax' label='Fax' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='celular' label='Celular' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='ds_negocio' label='Descrição do negócio' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='missao' label='Missão' />
    //           </div>

    //           <div className='flex flex-col col-span-12 sm:col-span-7'>
    //             <InputFormik name='visao' label='Visão' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-5'>
    //             <InputFormik name='Valores' label='Valores' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='grupo' label='Grupo' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='segmento' label='Segmento' />
    //           </div>

    //           <div className='flex flex-col col-span-12 sm:col-span-7'>
    //             <InputFormik name='setor' label='Setor' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-5'>
    //             <InputFormik name='tipo_industria' label='Tipo de indústria' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='faturamento' label='Faturamento' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-6'>
    //             <InputFormik name='projeto' label='Projeto' />
    //           </div>

    //           <div className='flex flex-col col-span-12 sm:col-span-7'>
    //             <InputFormik name='endereco' label='Endereço' />
    //           </div>
    //           <div className='flex flex-col col-span-12 sm:col-span-5'>
    //             <InputFormik
    //               name='valor_arrecadacao'
    //               label='Valor arrecadação'
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className='mt-5'>
    //       <Button title='Salvar' loading={account.loading} />
    //     </div>
    //   </Form>
    // </Formik>
  );
};

export default AddForm;
