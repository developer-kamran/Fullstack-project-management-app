const Client = require('../models/Client');
const Project = require('../models/Project');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');
const { GraphQLDate } = require('graphql-iso-date');

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    website: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    deadline: { type: GraphQLDate },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Get All Projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, type) {
        return Project.find().then((projects) => {
          // Sort projects based on status
          projects.sort((a, b) => {
            const statusOrder = {
              'In Progress': 1,
              'Not Started': 2,
              Completed: 3,
            };
            return statusOrder[a.status] - statusOrder[b.status];
          });
          return projects;
        });
      },
    },
    // Get Single Project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    // Get All Clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, type) {
        return Client.find();
      },
    },
    // Get a Client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID }, email: { type: GraphQLString } },
      resolve(parent, args) {
        const query = {};
        if (args.id) {
          query._id = args.id;
        } else if (args.email) {
          query.email = args.email;
        }
        return Client.findOne(query);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add Client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },

    // Delete Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.deleteMany({ clientId: args.id }).then(() => {
          return Client.findByIdAndDelete(args.id);
        });
      },
    },

    // Add Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        deadline: { type: GraphQLNonNull(GraphQLDate) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          deadline: args.deadline,
          clientId: args.clientId,
        });
        return project.save();
      },
    },

    // Update Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'UpdateProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    // Delete Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
