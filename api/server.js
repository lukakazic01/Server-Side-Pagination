const express = require('express');
const app = express();
const data = require('./sales.js');

app.get("/sales", (req, res) => {
    const { filter, itemsPerPage, sortBy, page, sortDesc } = req.query;
    const salesCopy = JSON.parse(JSON.stringify(data));
    if (sortBy !== undefined && sortDesc !== undefined){
      salesCopy.default.results.sort((a, b) => {
        const sortA = a[sortBy[0]] || a['user'].first_name;
        const sortB = b[sortBy[0]] || b['user'].first_name;
        if (sortDesc[0] === 'true'){
          if (sortA < sortB) return 1;
          if (sortA > sortB) return -1;
          return 0;
        } 
        else{
          if (sortA < sortB) return -1;
          if (sortA > sortB) return 1;
          return 0;
        }
      });
    } 

    let searchedData = null;
    if(filter !== undefined){
       searchedData = salesCopy.default.results.filter(item => {
        return Object.values(item).join(",").toLowerCase().includes(filter.toLowerCase()) ||
         Object.values(item.user).join(",").toLowerCase().includes(filter.toLowerCase());
     })
    }

    let serverItemsLength = 0;
    let finalData = null;
    if(searchedData !== null){
      finalData = searchedData.slice((page-1)*itemsPerPage, page*itemsPerPage);
      serverItemsLength = searchedData.length;
    }
    else{
      finalData = salesCopy.default.results.slice((page-1)*itemsPerPage, page*itemsPerPage);
      serverItemsLength = salesCopy.default.results.length;
    }
  
    res.json({
        filter,
        listItems: finalData,
        itemsPerPage,
        page,
        sortBy,
        sortDesc,
        serverItemsLength
    })
});

module.exports = app