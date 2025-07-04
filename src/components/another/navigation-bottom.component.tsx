export default function BottomNavigation({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed left-1/2 bottom-0 z-50 w-screen -translate-x-1/2 bg-white border-t border-gray-200  dark:bg-gray-700 dark:border-gray-600">
      <div className="py-3 h-full w-full place-items-stretch max-w-lg  mx-auto font-medium  justify-items-start">
            {children}
      </div>
    </div>
  );
}
