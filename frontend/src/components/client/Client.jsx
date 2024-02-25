import { Trash2 } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../../graphql/queries/clientQueries';
import { DELETE_CLIENT } from '../../graphql/mutations/clientMutations';
import { GET_PROJECTS } from '../../graphql/queries/projectQueries';

const Client = ({ client, index }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });
  return (
    <tr>
      <th scope='row'>{index + 1}</th>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <Trash2 />
        </button>
      </td>
    </tr>
  );
};

export default Client;
