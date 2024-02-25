import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../graphql/queries/clientQueries';
import Client from './Client';
import Spinner from '../ui/Spinner';
import Error from '../ui/Error';

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;

  if (error) return <Error text='clients' />;

  return (
    <div>
      {data.clients.length > 0 ? (
        <>
          <h2 className='mb-3'>Clients</h2>
          {!loading && !error && (
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((client, index) => {
                  return (
                    <Client key={client.id} client={client} index={index} />
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p className='lead text-center'>No Client to show.</p>
      )}
    </div>
  );
};

export default Clients;
