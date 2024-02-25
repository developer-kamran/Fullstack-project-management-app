import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { calculateDeadlineMessage } from '../../utils';

const Project = ({ project }) => {
  const message = calculateDeadlineMessage(project.deadline);

  return (
    <div className='col-md-4'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5>{project.name}</h5>
            <Link
              to={`/projects/${project.id}`}
              className='btn btn-sm btn-light'
            >
              View{' '}
              <span className='icon'>
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
          <p className='small mb-1'>
            Status:{' '}
            <strong
              className={`${
                project.status === 'Completed'
                  ? 'text-success'
                  : project.status === 'In Progress'
                  ? 'text-warning'
                  : ' text-info'
              }`}
            >
              {project.status}
            </strong>
          </p>
          {project.status !== 'Completed' && (
            <small className='opacity-75 mb-2'>
              Deadline: {project.deadline} ({message})
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
