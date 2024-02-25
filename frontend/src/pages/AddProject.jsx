import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Ban } from 'lucide-react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../graphql/mutations/projectMutations';
import { GET_PROJECTS } from '../graphql/queries/projectQueries';
import { GET_CLIENTS } from '../graphql/queries/clientQueries';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'new',
    deadline: null,
    clientId: '',
  });
  const { name, description, status, deadline, clientId } = formData;

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const navigate = useNavigate();

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, deadline, clientId },
    onCompleted: () => navigate('/'),
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const isFormComplete = name && description && status && deadline && clientId;

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({
      variables: { name, description, status, deadline, clientId },
    });
    setFormData({
      name: '',
      description: '',
      status: 'new',
      deadline: null,
      clientId: '',
    });
  };

  if (loading) return null;

  if (error)
    return (
      <p className='text-center lead'>
        <Ban color='#cc0000' /> Something went wrong while adding the client.
      </p>
    );

  return (
    <>
      {!loading && !error && (
        <div className='w-75 m-auto'>
          <h2 className='mb-3'>Add a project</h2>
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
                  setFormData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                className='form-control'
                id='description'
                required
                value={description}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label htmlFor='deadline' className='form-label'>
                Deadline
              </label>
              <input
                type='date'
                className='form-control'
                id='deadline'
                required
                value={deadline}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    deadline: e.target.value,
                  }))
                }
              />
            </div>
            <div className='d-flex align-items-center gap-5 my-4'>
              <div>
                <label htmlFor='status' className='form-label'>
                  Status
                </label>
                <select
                  id='status'
                  className='form-select'
                  value={status}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value='new'>Not Started</option>
                  <option value='progress'>In Progress</option>
                  <option value='completed'>Completed</option>
                </select>
              </div>
              <div>
                <label className='form-label'>Client</label>
                <select
                  id='clientId'
                  className='form-select'
                  required
                  value={clientId}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      clientId: e.target.value,
                    }))
                  }
                >
                  <option value='' disabled>
                    Select Client
                  </option>
                  {data.clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type='submit'
              className='btn btn-lg btn-primary mt-1'
              disabled={!isFormComplete}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProject;
