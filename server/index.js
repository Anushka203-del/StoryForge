const connectDB = require("./db/db"); 
const express = require("express");
const cors = require("cors"); 
const user_routes = require("./routers/user.routes");
const abstractRoutes = require("./routers/abstract.routes");
const chapter_routes = require("./routers/chapter.routes");

const app = express();


const corsOptions = {
    origin: '*'
}
// configuring middleewares
app.use(cors(corsOptions));
app.use(express.json());
  //binding the calc routes with /calc back url
app.use("/api/user",user_routes)
app.use("/api/abstract",abstractRoutes);
app.use("/api/chapter",chapter_routes);

connectDB().then(() => {app.listen(3000)}).catch((error) => {console.log("error aa gyi")});

//routers, middleware, mongodb.
//requestmethod(url,middleware1, middleware2,..., controller)
