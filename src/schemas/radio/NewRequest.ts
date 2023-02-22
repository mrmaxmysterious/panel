import { z } from "zod";
import { coercedStringCstr } from "../util";

const NewRequestBody = z.object({
  name: coercedStringCstr,
  message: coercedStringCstr,
});

export { NewRequestBody };
