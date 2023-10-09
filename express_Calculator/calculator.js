// import express from "express";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); //bodyParser.(text(): for text o/p, json(): to get response n json, urlencoded(): parse data which comes from html form)

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
    //if we send on cloud then path given as (__dirname + file_name); where,
    // __dirname : it give full directory path 
});

app.post("/", function (req, res) {
    let num1 = Number(req.body.num1),
    num2 = Number(req.body.num2),
    result = num1 + num2;
    res.send("The Sum of " + num1 + " and " + num2 + " is " + result);
   
});


app.listen(3000, function () {
    console.log("Server is started");
});