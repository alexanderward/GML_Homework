import { Users } from "../controllers/users";

export class Routes {
  public nodesController: Users = new Users();

  public routes(app): void {
    app
      // .route("/users")
      .get("/users/", this.nodesController.list)
      .get("/users/:id/", this.nodesController.retrieve)
      .post("/users/", this.nodesController.create)
      .put("/users/:id/", this.nodesController.update)
      .delete("/users/:id/", this.nodesController.destroy);
  }
}