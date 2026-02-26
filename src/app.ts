import express from "express";
import usersRoutes from "./routes/users.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import lessonsRoutes from "./routes/lessons.routes.js";
import enrollmentsRoutes from "./routes/enrollments.routes.js";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/courses", coursesRoutes);
app.use("/lessons", lessonsRoutes);
app.use("/enrollments", enrollmentsRoutes);

export default app;