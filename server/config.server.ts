import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
/* Routes */
import _Customer from '../routes/customer.route';
import _Orders from '../routes/orders.route';
import _Auth from '../routes/auth.route';
import _User from '../routes/user.route';
import _Employee from '../routes/employee.route';
import _EmployeeSchedule from '../routes/employee-schedule.route';
import _Product from '../routes/product.route';

export class ConfigServer {
    app: Application;
    constructor() {
      this.app = express()
      this.config()
    }

    private config() {
      this.app.set('port', process.env.PORT || 8000)
    }

    private middlewares() {
      this.app.use(morgan('dev'))
      this.app.use(cors({ origin: '*' }))
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
    }

    private routes() {
      this.app.use('/api/customer',_Customer);
      this.app.use('/api/order',_Orders);
      this.app.use('/api/auth',_Auth);
      this.app.use('/api/user',_User);
      this.app.use('/api/employee',_Employee);
      this.app.use('/api/employee-schedule',_EmployeeSchedule);
      this.app.use('/api/product',_Product);
    }

    start(callback: any) {
      // if (process.env.NODE_ENV === "production") {
      //   //* Set static folder
      //   this.app.use(express.static("dkelly-front/build"));
      //   this.app.get("*", (req: Request, res: Response) => {
      //     res.sendFile(path.resolve(__dirname, "dkelly-front", "build", "index.html"));
      //   });
      // }
      this.app.listen(this.app.get('port'), callback)
      this.middlewares()
      this.routes()
    }

}