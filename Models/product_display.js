var pg_conn=require("./pg.config");


async function display_table(shop_id){
    if(shop_id==0){
        var product_query='SELECT * FROM products ORDER BY id'
    }
    else{
        var product_query=
        {
            text: 'SELECT * FROM products WHERE shop_id=$1 ORDER BY id',
            values: [shop_id]
        };
    }
    var data= await pg_conn.query(product_query);
    var table_string=`
        <h2 style="margin-top: 20px; margin-bottom: 20px; text-align: center;"> Product of shop ${shop_id}</h2>
        <table style="width: 80%; margin: auto;" border="1">
        <tr >`
    let num_fields=data.fields.length;
    let num_rows=data.rowCount;
    const list_fields= [];
    // Display table header(list of fields name)
    for(let i=0; i<num_fields;i++)
    {
        let fields_name=data.fields[i].name;
        list_fields.push(fields_name);
        table_string += `<th style="padding: 5px; margin: 5px; font-size: 16px; background-color: #AEA1F0;">${fields_name}</th>`
    }
    table_string +=`<th style="padding: 5px; margin: 5px; font-size: 16px; background-color: #AEA1F0; width: 100%;">function</th></tr>`
    // display all row
    for(let i=0;i<num_rows;i++)
    {
        table_string +=`<tr>
                        <form action="/users/functions" method="post">`;
        // display all cell
        for(let j=0; j<num_fields;j++)
        {
            let cell=data.rows[i][list_fields[j]]
            let fields_name=data.fields[j].name
            table_string+=`<td><input style="padding: 5px; margin: 5px; font-size: 16px;" name=${fields_name} value=${cell}></td>`
        }
        table_string +=`
        <td style="display:flex; justify-content: center;">
        <button style="background-color: #AEA1F0; border: none; color: black; padding: 5px; text-decoration: none; font-size: 16px; font-weight: bold; margin: 4px;
        cursor: pointer;" name="btt" type="submit" value="delete">Delete</button>
        <button style="background-color: #AEA1F0; border: none; color: black; padding: 5px; text-decoration: none; font-size: 16px; font-weight: bold; margin: 4px;
        cursor: pointer;" name="btt" type="submit" value"update">Update</button>
        </td>
        </form>
        </tr>`
    }
    // th??m d??ng insert
    table_string +=`<form action="/users/addProduct" method="post">
        <tr>`
    for(let j=0; j<num_fields;j++)
        {
            let fields_name=data.fields[j].name
            table_string += `<td><input style="padding: 5px; margin: 5px; font-size: 16px;" name=${fields_name} id=${fields_name}></td>`;
        }
    table_string +=`
        <td style="display:flex; justify-content: center;">
        <button style="background-color: #AEA1F0; border: none; color: black; padding: 5px; text-decoration: none; font-size: 16px; font-weight: bold; text-align: center; margin: 4px;
        cursor: pointer;" type="submit" value="addProduct">Insert</button>
        </td>
        </tr>
        </form>
        </table>`;
    
    return table_string;
}

module.exports=display_table
