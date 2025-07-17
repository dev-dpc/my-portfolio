import { ThemeToggle, ButtonOne, ButtonTwo, LinkAsButton,  } from './theme-toggle';
import { TechStack, Introduction, Experience, Education, Projects } from './theme-components';
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-drafting text-black dark:text-white transition-all duration-300">
      <div className="max-w-3xl sm:p-8 text-center space-y-10">

        <div className='mt-12 pt-12'></div>
        <Introduction/>
        <div className='space-x-2 hidden'>
          <ButtonOne />
          <ButtonTwo />
          <LinkAsButton />
        </div>
        <ThemeToggle/>
        <TechStack/>
        <Experience/>
        <Education/>
        <Projects/>
        <Footer/>
      </div>      
    </div>
  );
}
