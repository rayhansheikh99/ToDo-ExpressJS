const ToDoListModel = require("../models/ToDoListModel");


exports.CreateToDo = (req,res)=>{
    let reqBody = req.body;


    let TodoSubject = reqBody['TodoSubject'];
    let TodoDescription = reqBody['TodoDescription'];
    let UserName = req.headers['username'];
    let TodoStatus = "New";
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    let PostBody = {
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
        TodoUpdateDate:TodoUpdateDate
    }


    ToDoListModel.create(PostBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else {
            res.status(200).json({status:"Success",data:data})
        }
    })
}

exports.SelectToDo = (req,res)=>{
    let UserName = req.headers['username']
    ToDoListModel.find({UserName:UserName},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else {
            res.status(200).json({status:"Success",data:data})
        }
    })
    
}


exports.UpdateToDo = (req,res)=>{
    let TodoSubject = req.body['TodoSubject']
    let TodoDescription = req.body['TodoDescription']
    let _id = req.body['_id']
    let TodoUpdateDate = Date.now();

    let PostBody = {
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate,
    }

    ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else {
            res.status(200).json({status:"Success",data:data})
        }
    })
}