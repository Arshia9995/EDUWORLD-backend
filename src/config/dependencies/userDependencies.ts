import { IDependencies } from "../../application/interfaces/user/IDependencies";
import * as useCases from '../../application/applicationUsecases/user'
import * as repositories from '../../infrastructure/database/mongoDB/repositories/user'

const dependencies: IDependencies = {
  repositories,
  useCases
 }
 
 
 export { dependencies }