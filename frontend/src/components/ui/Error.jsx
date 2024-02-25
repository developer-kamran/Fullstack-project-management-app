import { Ban } from 'lucide-react';

const Error = ({ text }) => {
  return (
    <p className='text-center lead'>
      <Ban color='#cc0000' /> Something went wrong while fetching the {text}.
    </p>
  );
};

export default Error;
