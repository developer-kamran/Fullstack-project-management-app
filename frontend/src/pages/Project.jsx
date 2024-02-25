import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../graphql/queries/projectQueries';

import { Globe, Pencil, CalendarDays, Timer } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import Error from '../components/ui/Error';

import ClientInfo from '../components/client/ClientInfo';
import DeleteProject from '../components/project/DeleteProject';

import { calculateDeadlineMessage } from '../utils';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;

  if (error) return <Error text='project' />;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          {/* Header */}
          <div className='d-flex align-items-center'>
            <h1>{data.project.name}</h1>
            <Link to='/' className='btn btn-secondary d-inline ms-auto mb-3'>
              Back
            </Link>
          </div>

          {/* Description */}
          <p className='mb-3'>{data.project.description}</p>

          <p className='mb-4 mx-2'>
            <CalendarDays size={18} /> Ordered: {data.project.createdAt}
          </p>

          {/* Website */}
          {data.project.website && (
            <Link
              to={`https://${data.project.website}`}
              className='mb-3 text-primary'
              target='_blank'
            >
              <Globe size={20} /> {data.project.website}
            </Link>
          )}

          {/* Deadline */}
          {data.project.status !== 'Completed' && (
            <p className='bg-warning-subtle rounded p-1 px-2 w-50 flex align-items-center gap-2'>
              <Timer size={18} />{' '}
              <span>
                Deadline: {data.project.deadline} (
                {calculateDeadlineMessage(data.project.deadline)})
              </span>
            </p>
          )}

          {/* Status */}
          <h5 className='mt-3'>Project Status</h5>
          <li
            className={`lead ${
              data.project.status === 'Completed'
                ? 'text-success'
                : data.project.status === 'In Progress'
                ? 'text-warning'
                : ' text-info'
            }`}
          >
            {data.project.status}
          </li>

          {/* Client Info */}
          <ClientInfo client={data.project.client} />

          {data.project.status !== 'Completed' && (
            <>
              <Link
                to={`/projects/update/${data.project.id}`}
                className='btn btn-sm btn-light py-2 mt-3 w-25'
              >
                <div className='d-flex justify-content-center align-items-center gap-2'>
                  <span className='icon'>
                    <Pencil size={20} />
                  </span>
                  Edit Project
                </div>
              </Link>
            </>
          )}

          <DeleteProject projectId={data.project.id} />
        </div>
      )}
    </>
  );
};

export default Project;
