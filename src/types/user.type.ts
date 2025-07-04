import { Prisma } from "@/services/db";
import { z } from "zod";
import validator from "validator";

export const UserLoginZod = z.object({
  password: z.string().min(6,{
    message:"Password Minimal 6 huruf"
  }),
  userName: z.string({
    message:"Username Harus Diisi"
  }),
});

export const UserZod = z.object({
  nomerTelp:z.string().refine(validator.isMobilePhone),
  username:z.string().min(4,{message:"Username Setidaknya Minimal 4 karekter"}),
  name:z.string({
    message:"Username Setidaknya Minimal 4 karekter"
  }),
  password:z.string().min(6),
  admin:z.boolean(),
  idTempat:z.string()
});

export const ChangePasswordZod = z.object({
  password:z.string({
    message:"Password Wajib diisi"
  }).min(6,{
    message:"Minimal 6 karakter"
  }),
  anotherPassword:z.string({
     message:"Password Wajib diisi"
  }).min(6,{
    message:"Minimal 6 karakter"
  }),
}).refine((values)=>values.password === values.anotherPassword,{
  message:"Password Tidak Sama, Silahkan Coba Lagi",
  path:['anotherPassword']
})

export const UpdateUserZod = z.object({
  nomerTelp:z.string().refine(validator.isMobilePhone),
  username:z.string({
    message:""
  }).min(4),
  name:z.string(),
  admin:z.boolean().default(false).optional()
})

export type UserLoginDOT = z.infer<typeof UserLoginZod>;
export type UpdateUserDOT = z.infer<typeof UpdateUserZod>
export type UserDOT = z.infer<typeof UserZod>;
export type changePassword = z.infer<typeof ChangePasswordZod>
export type User =
  Prisma.UserGetPayload<Prisma.UserDefaultArgs>;
