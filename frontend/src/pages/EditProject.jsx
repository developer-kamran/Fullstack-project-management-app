import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../graphql/mutations/projectMutations';
import { GET_PROJECT } from '../graphql/queries/projectQueries';

import Spinner from '../components/ui/Spinner';
import Error from '../components/ui/Error';

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    if (data) {
      setName(data.project.name);
      setDescription(data.project.description);
      switch (data.project.status) {
        case 'Not Started':
          setStatus('new');
          break;
        case 'In Progress':
          setStatus('progress');
          break;
        case 'Completed':
          setStatus('completed');
          break;
        default:
          throw new Error(`Unknown status: ${data.project.status}`);
      }
    }
  }, [data]);

  const [isValuesChanged, setIsValuesChanged] = useState(false);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id } }],
    onCompleted: () => navigate('/projects/' + id),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject({
      variables: {
        id,
        name,
        description,
        status,
      },
    });
    setIsValuesChanged(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'status') {
      setStatus(value);
    }
    setIsValuesChanged(true);
  };

  if (loading) return <Spinner />;

  if (error) return <Error text='project' />;

  return (
    <>
      <div className='w-75 m-auto'>
        <h2 className='mb-3'>Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              required
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea
              className='form-control'
              id='description'
              name='description'
              required
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='status' className='form-label'>
              Status
            </label>
            <select
              id='status'
              className='form-select'
              name='status'
              value={status}
              onChange={handleChange}
            >
              <option value='new'>Not Started</option>
              <option value='progress'>In Progress</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
          <button
            type='submit'
            className='btn btn-primary mt-1'
            disabled={!isValuesChanged}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProject;
