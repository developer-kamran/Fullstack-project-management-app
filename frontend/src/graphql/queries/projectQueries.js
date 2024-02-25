import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      status
      deadline
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      deadline
      createdAt
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
