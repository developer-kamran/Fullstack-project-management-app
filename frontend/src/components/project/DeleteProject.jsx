import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../../graphql/queries/projectQueries';
import { DELETE_PROJECT } from '../../graphql/mutations/projectMutations';

const DeleteProject = ({ projectId }) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (confirmDelete) {
      deleteProject();
    }
  };
  return (
    <div className='d-flex align-items-center mt-5 ms-auto'>
      <button className='btn btn-danger' onClick={handleDelete}>
        <Trash2 /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProject;
