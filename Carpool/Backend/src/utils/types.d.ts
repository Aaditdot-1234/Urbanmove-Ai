import { Prisma } from "@prisma/client";
import { UserAuthSafeSelect } from "./selectors/auth.selector";

type SafeUser = Prisma.UserGetPayload<{ select: typeof UserAuthSafeSelect }>;

declare global {
    namespace Express {
        interface Request {
            user: SafeUser;
        }
    }
}

export { };
