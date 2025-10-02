import { HttpRequest } from "@angular/common/http";
import { environment } from "environments/environment";

export class ExcludeToken{

    public static isExclude(request: HttpRequest<any>): boolean {
        return request.url.includes(environment.googleRoutes);
    }
}