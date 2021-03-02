import { Request, Response } from "express";
import {User, UserInterface} from "../models/user";
import {weatherEnrichment} from "../weather_api/weather.com";


export class Users {

  public create(req: Request, res: Response) {
    const params: UserInterface = req.body;

    User.create<User>(params)
      .then((user) => weatherEnrichment([user]))
      .then((users) => res.status(201).json(users[0]))
      .catch((err: Error) => res.status(500).json(err));
  }

  public list(req: Request, res: Response) {
    User.findAll<User>({})
        .then((users: Array<User>) => weatherEnrichment(users))
        .then(results=>{
          res.json(results);
    })
        .catch((err: Error) => res.status(500).json(err));
  }

  public retrieve(req: Request, res: Response) {
    const { id } = req.params;
    User.findByPk<User>(id)
        .then((user) => weatherEnrichment([user]))
        .then((users) => res.json(users[0]))
        .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
    const params: UserInterface = req.body;
    const { id } = req.params;
    User.findOne({where: {id: id}}).then((user) => {
      Object.keys(params).forEach(key=>{
        user[key] = params[key];
      });
      return user.save();
    }).then((user) => weatherEnrichment([user]))
        .then((users) => res.json(users[0]))
        .catch((err: Error) => res.status(500).json(err));
  }

  public destroy(req: Request, res: Response) {
    const { id } = req.params;
    User.destroy({where: {id: id}}).then(() => res.json())
      .catch((err: Error) => res.status(500).json(err));
  }
}