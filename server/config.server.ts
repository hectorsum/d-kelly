import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
/* Routes */
import _Customer from '../routes/customer.route';
import _Orders from '../routes/orders.route';

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
    }

    start(callback: any) {
      this.app.listen(this.app.get('port'), callback)
      this.middlewares()
      this.routes()
    }

}