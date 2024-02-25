import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $deadline: Date!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      deadline: $deadline
      clientId: $clientId
    ) {
      id
      name
      description
      status
      deadline
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: UpdateProjectStatus!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;
