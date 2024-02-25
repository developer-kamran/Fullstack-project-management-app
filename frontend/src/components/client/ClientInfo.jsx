import { User, Mail, Phone } from 'lucide-react';

const ClientInfo = ({ client }) => {
  return (
    <div className='mt-5'>
      <h5>Client Information</h5>
      <ul className='list-group mt-3'>
        <div className='list-group-item d-flex align-items-center gap-3'>
          <User color='#7430f9' /> {client.name}
        </div>
        <div className='list-group-item d-flex align-items-center gap-3'>
          <Mail color='#7430f9' /> {client.email}
        </div>
        <div className='list-group-item d-flex align-items-center gap-3'>
          <Phone color='#7430f9' /> {client.phone}
        </div>
      </ul>
    </div>
  );
};

export default ClientInfo;
