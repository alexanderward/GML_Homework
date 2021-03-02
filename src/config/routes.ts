import { Users } from "../controllers/users";

export class Routes {
  public usersController: Users = new Users();

  public routes(app): void {
    app
      // .route("/users")
      .get("/users/", this.usersController.list)
      .get("/users/:id/", this.usersController.retrieve)
      .post("/users/", this.usersController.create)
      .put("/users/:id/", this.usersController.update)
      .delete("/users/:id/", this.usersController.destroy);
  }
}