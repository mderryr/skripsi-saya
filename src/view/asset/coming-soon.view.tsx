
import ComingSoon from '@/asset/image/coming-soon.svg'
import Image from 'next/image'


export default function ComingSoonPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
          <div className="w-full max-w-2xl mx-auto mb-8">
          <Image 
            src={ComingSoon} 
            alt="Coming Soon" 
            className="w-full h-auto" 
          />
        </div>

        </div>
      </div>
    );
  }