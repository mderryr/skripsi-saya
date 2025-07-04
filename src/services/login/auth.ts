"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UserLoginDOT, changePassword as PasswordType } from "@/types";
import { Logic } from "@/services/user";
import { createHash } from "crypto";
import { RateLimiter } from "@/utils/rate-limiter.utils";
// import { redirect } from "next/navigation";
import {TIME} from '@/env/time.mjs'

const key = new TextEncoder().encode(process.env.SECREATKEY);

// Global rate limiter for authenticated users
const globalRateLimiter = new RateLimiter();

export async function hash(input: string): Promise<string> {
  return createHash("sha256").update(input).digest("hex") as string;
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + 3600)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login({ userName, password }: UserLoginDOT) {
  try {
    // Verify credentials && get the user
    const { getUsernameAndPassword } = Logic;

    const user = await getUsernameAndPassword({
      userName: userName,
      password: (await hash(password)).toString(),
    });
      // console.log("Pengguna : ",user)

    if (!user) throw new Error("Pengguna Tidak Ditemukan");
    // Create the session
    const Saveuser = {
      nama: user?.name,
      telp: user?.nomerTelp,
      idUser: user?.idUser,
      admin: user?.admin,
      userName: user?.username,
    };
    const expires = new Date(Date.now() + TIME.CACHE.VERY_LONG);
    const session = await encrypt({ Saveuser, expires });

    // Save the session in a cookie
    (await cookies()).set("session", session, { expires, httpOnly: true });
  } catch (e: any) {
    console.log(e);
    throw e;
  }
}

export const changePassword = async ({ password }: PasswordType) => {
  try {
    const { updatePassword } = Logic;
    const { Saveuser } = await getSession();
    const updateInputPassword = await hash(password);
    // console.log(updateInputPassword )
    const res = await updatePassword({
      idUser: Saveuser.idUser,
      anotherPassword: "",
      password: updateInputPassword,
    });
    return {
      massage: `data di update pada tanggal ${Date.now()}`,
      kode: 202,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
};

  // Destroy the session
export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

//Get Sessions 
export async function getSession(): Promise<
  Awaited<ReturnType<typeof decrypt>>
> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const cookieStore = await cookies();

  if (!process.env.SECREATKEY || process.env.SECREATKEY.length === 0) {
    console.error("SECREATKEY is not set or is empty");
    throw new Error("Secret key is not properly configured");
  }

  const session = cookieStore.get("session")?.value;
  // console.log(session)

  if (!session || session === undefined) {
    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/pendataan" ||
      request.nextUrl.pathname === "/api/data-tukik" ||
      request.nextUrl.pathname === "/ujicoba"||
      request.nextUrl.pathname === "/tentang-kami"||
      request.nextUrl.pathname === "/error"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);

  parsed.expires = new Date(Date.now() + TIME.CACHE.VERY_LONG);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

//rateLimit 
export async function rateLimitCheck(request: NextRequest) {
  try {
    
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    globalRateLimiter.updateConfig("guest", {
      maxAttempts: 20,
      timeWindow: TIME.DELAY.INPUT_DEBOUNCE,
    });

    globalRateLimiter.updateConfig("authenticated", {
      maxAttempts: 30,
      timeWindow: TIME.DELAY.INPUT_DEBOUNCE,
    });
    // Ambil IP atau generate unique identifier
    const getIP = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip");
    let idUserGuest = request.headers.get("x-user-id");

    // Jika tidak ada user ID, generate baru
    if (!idUserGuest) {
      idUserGuest = crypto.randomUUID().toString();
    
    }
    // console.log({
    //   "ID Guest":idUserGuest,
    //   "IP":getIP
    // })
    // Tentukan identifier berdasarkan session
    let identifier: string;
    let userType: 'authenticated' | 'guest';

    if (session) {
      const parsed = await decrypt(session);
      identifier = parsed?.Saveuser?.idUser;
      userType = 'authenticated';
    } else {
      // Jika tidak ada session, gunakan random UID
      identifier = getIP ? getIP : idUserGuest;
      userType = 'guest';
    }

    // Lakukan rate limit check
    const rateLimitResult = globalRateLimiter.check(identifier, userType);
    // Jika melebihi rate limit, kembalikan error
    if (!rateLimitResult.allowed) {
      return {
        error: true,
        message: "Terlalu banyak permintaan",
        retryAfter: Math.ceil((rateLimitResult.resetAt! - Date.now()) / 1000)
      };
    }

    // Jika lolos, kembalikan null (tidak ada error)
    return null;
  } catch (error) {
    console.error('Rate limit check error:', error);
    return {
      error: true,
      message: "Terjadi kesalahan pada rate limit"
    };
  }
}