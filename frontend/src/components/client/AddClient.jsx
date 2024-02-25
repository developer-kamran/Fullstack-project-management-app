import { useState } from 'react';
import { CircleUser } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../../graphql/mutations/clientMutations';
import { GET_CLIENTS } from '../../graphql/queries/clientQueries';

const AddClient = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { name, email, phone } = data;

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const isFormComplete = name && email && phone;

  const handleSubmit = (e) => {
    e.preventDefault();
    addClient(name, email, phone);
    setData({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className='my-4'>
      <button
        type='button'
        className='btn btn-secondary py-2'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex justify-content-center align-items-center gap-2'>
          <span className='icon'>
            <CircleUser />
          </span>
          Add Client
        </div>
      </button>
      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='addClientModalLabel'>
                Add Client
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body p-4 pb-5'>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    required
                    value={name}
                    onChange={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email address
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    required
                    value={email}
                    onChange={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='phone' className='form-label'>
                    Phone no.
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    required
                    value={phone}
                    onChange={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-secondary mt-1'
                  data-bs-dismiss='modal'
                  disabled={!isFormComplete}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
