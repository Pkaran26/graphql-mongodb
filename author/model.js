const ObjectID = require('mongodb').ObjectID;
const connection = require('../connection')

const createAuthor = async (payload)=>{
  try {
    const conn = await connection()
    return await conn.collection('author').insertOne(payload)
  } catch (e) {
    console.log(e);
    return null
  }
}

const authorList = async (payload=null)=>{
  try {
    const conn = await connection()
    return await conn.collection('author').find({ ...payload })
    .toArray()
  } catch (e) {
    console.log(e);
    return null
  }
}

const authorDetail = async (id)=>{
  try {
    const conn = await connection()
    return await conn.collection('author').findOne({ _id: ObjectID(id) })
  } catch (e) {
    console.log(e);
    return null
  }
}

const updateAuthor = async (id, payload)=>{
  try {
    const conn = await connection()
    return await conn.collection('author').updateOne(
      { _id: ObjectID(id) },
      { $set: { ...payload } }
    )
  } catch (e) {
    console.log(e);
    return null
  }
}

const deleteAuthor = async (id)=>{
  try {
    const conn = await connection()
    return await conn.collection('author').deleteOne({ _id: ObjectID(id) },)
  } catch (e) {
    console.log(e);
    return null
  }
}

module.exports = {
  createAuthor,
  authorList,
  authorDetail,
  updateAuthor,
  deleteAuthor
}
