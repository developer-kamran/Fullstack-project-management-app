import Project from './Project';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../graphql/queries/projectQueries';
import Spinner from '../ui/Spinner';
import Error from '../ui/Error';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;

  if (error) return <Error text='projects' />;

  return (
    <div className='mb-4'>
      <h2 className='mt-4 mb-3'>Projects</h2>
      {data.projects.length > 0 ? (
        <div className='row'>
          {data.projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className='lead text-center'>No projects to show.</p>
      )}
    </div>
  );
};

export default Projects;
