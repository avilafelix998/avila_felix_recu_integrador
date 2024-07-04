//importamos el express
const express = require("express");
const app = express();
const database = require("./database");

//creamos una constante para guardar ahí una funcion que nos permite generar id automaticamente 
const generateId = ()=>{
    return new Date().getTime()
}
//middlewares
app.use(express.json());

//ahora mostramos los los estudiantes por el metodo get
app.get("/students",(req,res) => {
res.json(database)
})

//mostrar estudiante por id 
app.get("/students/:id",(req, res)=>{
    const id = parseInt(req.params.id)
    const estudiante = student => student.id === id
    const result = database.find(estudiante)
    if(result){
        res.json(result)
    }else{
        res.status(404).json({message:"estudiante no encontrado"})
    }
})
//agregar un estudiante
app.post("/students",(req, res)=>{
    const id = generateId()
    const {fullName, age, curse } = req.body 
    database.push({
        id,
        fullName,
        age,
        curse
    })
    res.send("estudiante agregado")
})
//editar los datos de un estudiante por id
app.put("/students/:id",(req, res)=>{
    const id = parseInt(req.params.id)
    const {fullName, age, curse} = req.body

    const estudiante = (student)=> student.id == id
    const resultado = database.findIndex(estudiante)

    if (resultado !== -1){
        database[resultado]= {id, fullName, age, curse}
        res.json({message: "datos del estudiante actualizado"})
    }else{
        res.status(404).json({message: "estudiante no encontrado"})
    }console.log(resultado)

})
//eliminar un estudiante
app.delete("/students/:id", (req, res) => {
    const idStudent = req.params.id; 

    const index = database.findIndex(student => student.id == idStudent); 

    if (index !== -1) {
        database.splice(index, 1); 
        res.json({message: "estudiante eliminado"});
    } else {
        res.status(404).json({message: "estudiante  no encontrado"})
    }console.log(resultado)
    }
);








//ponemos en escucha el servidor 
app.listen(4321,()=>{
    console.log("servidor funcionando en el puerto ",4321)
})