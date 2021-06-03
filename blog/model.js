const ObjectID = require('mongodb').ObjectID;
const connection = require('../connection')

const createBlog = async (payload)=>{
  try {
    const conn = await connection()
    return await conn.collection('blog').insertOne(payload)
  } catch (e) {
    console.log(e);
    return null
  }
}

const blogList = async (payload=null)=>{
  try {
    const conn = await connection()
    return await conn.collection('blog').find({ ...payload })
    .toArray()
  } catch (e) {
    console.log(e);
    return []
  }
}

const blogDetail = async (id)=>{
  try {
    const conn = await connection()
    return await conn.collection('blog').findOne({ _id: ObjectID(id) })
  } catch (e) {
    console.log(e);
    return null
  }
}

const updateBlog = async (id, payload)=>{
  try {
    const conn = await connection()
    return await conn.collection('blog').updateOne(
      { _id: ObjectID(id) },
      { $set: { ...payload } }
    )
  } catch (e) {
    console.log(e);
    return null
  }
}

const deleteBlog = async (id)=>{
  try {
    const conn = await connection()
    return await conn.collection('blog').deleteOne({ _id: ObjectID(id) },)
  } catch (e) {
    console.log(e);
    return null
  }
}

module.exports = {
  createBlog,
  blogList,
  blogDetail,
  updateBlog,
  deleteBlog
}
