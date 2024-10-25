import {Logger, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";

export class LoggingMiddleware implements NestMiddleware {

    private readonly logger = new Logger();

    use(req: Request, res: Response, next: NextFunction) {

        const startTime = Date.now();
        const {method, originalUrl} = req;

        res.on('finish', () => {
            const { statusCode } = res;
            const responseTime = Date.now() - startTime;

            this.logger.log(`[${method}]${originalUrl} : ${statusCode} - ${responseTime}ms`);
        });

        next();
    }
}
