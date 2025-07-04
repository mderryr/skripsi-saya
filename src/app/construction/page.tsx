import Image from "next/image";
import { Button } from "@/components/ui/button";
import Animation from "@/asset/image/under-construction.png";
import Link from "next/link";export default function Page() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-blue-950 py-5 md:py-10 lg:py-15 xl:py-20 2xl:py-25">
      <div className="w-full mx-auto text-center px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-25">
        <Image 
          className="w-5/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12 mx-auto"
          src={Animation} 
          alt="my gif"
        />
        <h1 className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
          Kami sedang ada pembaruan
        </h1>
        <p className="text-white text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
          Mohon maaf atas ketidaknyamanan ini. Kami sedang melakukan pembaruan dan perbaikan pada website.
        </p>
        <Link href={"/pendataan"}>
          <Button className="mt-8" >
            Melihat Pendataan
          </Button>
        </Link>
      </div>
    </div>
  );
}