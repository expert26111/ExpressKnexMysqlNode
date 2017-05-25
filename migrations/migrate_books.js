exports.up=function(knex,Promise){
    // return Promise.all([
    //
    //     knex.schema.createTable('books', function(table) {
    //         table.increments('number').primary();
    //         table.string('title');
    //         table.string('author');
    //
    //     }),
    //     knex.schema.createTable('citys', function(table){
    //         table.increments('id').primary();
    //         table.integer('number')
    //         .references('number')
    //         .inTable('books');
    //         table.string('city');
    //         table.double('lat','11','8').nullable();;
    //         table.double('longt','12','8').nullable();
    //
    //     })
    // ]);

    return Promise.all([

        knex.schema.createTable('books',function(table){
            table.increments('number').primary();
            table.string('title');
            table.string('author');
               })
            ])
            .then(function(){
                return Promise.all([
                    knex.schema.createTable('citys', function(table){
                        table.increments('id').primary();
                        table.integer('number').references('number').inTable('books');
                        table.string('city');
                        table.double('lat','11','8').nullable();
                        table.double('longt','12','8').nullable();
                    })
                        ]);
             });
          //});
};

exports.down=function(knex,Promise){

    return Promise.all([knex.schema.dropTable('book'),knex.schema.dropTable('city')]);

};
