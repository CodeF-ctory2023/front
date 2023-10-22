"use client";
import { ExampleComponent } from '@/components/ExampleComponent';
import { Footer } from '@/components/common/footer';
import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

const Home = () => {
  return (
    <div>
      <main className='flex h-screen w-full items-center justify-center'>
        <ExampleComponent text='Welcome to CodeF@ctory' />
        <DynamicMapComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Home;