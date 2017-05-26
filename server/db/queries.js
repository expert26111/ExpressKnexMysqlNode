var knex = require('./knex');

function postBook(title,author){
  return  knex('books').returning(['number']).insert({title: title, author:author})
}

function getBookbyId(id)
{
    return knex('book').where('number', id).select()
}

function deleteByAuthor(author){
    return    knex('book')
    .where({author: author})
    .del()
}

function updateBook(title){
    return      knex('book')
    .where({title: title})
    .update({author: 'Great staff'})


}

module.exports = {
     getBookbyId: getBookbyId,
    postBook: postBook,
    deleteByAuthor: deleteByAuthor,
    updateBook: updateBook
};
