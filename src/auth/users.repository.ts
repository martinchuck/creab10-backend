import { EntityRepository, Repository } from "typeorm";
import { User } from "../Users/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{}