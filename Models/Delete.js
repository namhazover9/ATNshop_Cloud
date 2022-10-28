var pg_conn= require('./pg.config')
async function deleteFunc(product_id){
    const del_query=
    {
        text: 'DELETE FROM products WHERE id=$1',
        values: [product_id]
    }
    try {
    var query_data=await pg_conn.query(del_query);
    // console.log(query_data);
    // return query_data;
    } catch(err) {
        console.error(err);
    }
}
module.exports=deleteFunc;