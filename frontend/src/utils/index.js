import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const calculateDeadlineMessage = (deadline) => {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);
  const differenceInTime = deadlineDate.getTime() - currentDate.getTime();
  const daysLeft =
    differenceInTime > 0
      ? Math.ceil(differenceInTime / (1000 * 3600 * 24))
      : -1;

  if (daysLeft === -1) {
    return 'Deadline has passed';
  } else {
    return daysLeft === 0
      ? 'Today is the deadline'
      : `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`;
  }
};
