const graphql = require('graphql');
const Blog = require('./blog/model')
const Author = require('./author/model')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: ()=>({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return Author.authorDetail(parent.authorId)
      }
    },
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: ()=>({
    id: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLInt },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve(parent, args){
        return Blog.blogList({ authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    blog: {
      type: BlogType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Blog.blogDetail(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return Author.authorDetail(args.id)
      }
    },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve(parent, args){
        return Blog.blogList({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.authorList({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addblog: {
      type: BlogType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        return Blog.createBlog({
          title: args.title,
          body: args.body,
          authorId: args.authorId
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
