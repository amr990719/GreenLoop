import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Recycle, MapPin, CheckCircle } from "lucide-react";
import generatedImage from '@assets/generated_images/abstract_circular_economy_3d_illustration.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-5 duration-700 fade-in">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Join the Circular Economy
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
                Close the Loop on <span className="text-primary">Waste</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Connecting waste pickers with certified recyclers to create a transparent, efficient, and sustainable recycling ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/join/waste-picker">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    I have Waste
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/join/recycler">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted/50">
                    I am a Recycler
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right-5 duration-1000 fade-in delay-200">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-3xl -z-10"></div>
               <img 
                 src={generatedImage} 
                 alt="Circular Economy Illustration" 
                 className="rounded-[2rem] shadow-2xl border border-white/20 w-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
               />
               
               {/* Floating Stats Card Mockups */}
               <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-xl shadow-xl border border-border/50 animate-bounce-slow hidden md:block">
                 <div className="flex items-center gap-3">
                   <div className="bg-green-100 p-2 rounded-lg">
                     <Recycle className="h-6 w-6 text-green-600" />
                   </div>
                   <div>
                     <p className="text-sm text-muted-foreground">Total Recycled</p>
                     <p className="font-bold text-lg">1,240 tons</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">How GreenLoop Works</h2>
            <p className="text-muted-foreground text-lg">
              A simple 3-step process to ensure materials get back into the production cycle efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl font-bold select-none group-hover:scale-110 transition-transform">1</div>
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Locate</h3>
              <p className="text-muted-foreground">
                Waste pickers use our geolocation tools to find the nearest certified recyclers accepting their specific materials.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl font-bold select-none group-hover:scale-110 transition-transform">2</div>
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verify & Trade</h3>
              <p className="text-muted-foreground">
                Materials are verified for quality. Digital transactions ensure transparent pricing and instant records.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-9xl font-bold select-none group-hover:scale-110 transition-transform">3</div>
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Recycle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Close the Loop</h3>
              <p className="text-muted-foreground">
                Recyclers process materials into raw feedstock for manufacturers, completing the circular economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready to make an impact?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of waste pickers and recycling facilities making a difference today.
          </p>
          <div className="flex justify-center gap-4">
             <Link href="/recyclers">
               <Button size="lg" className="rounded-full px-8 h-12">
                 Find Recyclers Near Me
               </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
