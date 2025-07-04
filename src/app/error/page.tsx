// pages/error.tsx
'use client'

import { NextPage } from 'next';
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import ErrorImage from '@/asset/image/something-wrong.svg'

const ErrorPage: NextPage = () => {

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <Image 
                        src={ErrorImage} 
                        alt="Error Illustration" 
                        width={300} 
                        height={300} 
                        className="mx-auto"
                    />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Terjadi Kesalahan
                </h1>
                <p className="text-gray-600 mb-6">
                    Maaf, ada sesuatu yang salah. Silakan coba lagi nanti.
                </p>
                <Button 
                    onClick={handleGoBack} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    Coba Lagi
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;