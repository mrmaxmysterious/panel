import { z } from "zod";
import { coercedStringCstr } from "../util";

const RequestAccessBody = z.object({
  username: coercedStringCstr,
  password: coercedStringCstr,
});

export { RequestAccessBody };
