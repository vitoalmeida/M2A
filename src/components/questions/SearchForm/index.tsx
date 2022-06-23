import { Formik, Form } from 'formik';
import { InputFormik, SelectFormik, Button } from '../../index';
import formSchema from './formSchema';
import { IoMdTrash, IoMdSearch } from 'react-icons/io';

const SearchForm = () => {
  function handleSubmit(values) {
    console.log(values);
  }

  return (
    <Formik onSubmit={handleSubmit} {...formSchema}>
      <Form>
        <div className='md:flex md:justify-around mt-5 w-full'>
          <div className='flex flex-col w-full md:pr-5'>
            <InputFormik
              label='Pesquisar'
              name='pesquisa'
              placeholder='Título da pergunta'
            />
          </div>
          <div className='flex flex-col w-full md:l-5'>
            <SelectFormik
              label='Questionário'
              name='uf'
              data={[
                { value: 'Test', label: 'test' },
                { value: 'Test2', label: 'test2' },
              ]}
            />
          </div>
        </div>
        <div className='-mt-3 flex w-full gap-x-5 justify-end'>
          <Button title='Limpar' color='#ff8282' icon={<IoMdTrash />} />
          <Button title='Filtrar' icon={<IoMdSearch />} />
        </div>
      </Form>
    </Formik>
  );
};

export default SearchForm;
