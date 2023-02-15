import { z } from "zod";

export const coercedNumberCstr = z.coerce.number();
export const coercedStringCstr = z.coerce.string();
