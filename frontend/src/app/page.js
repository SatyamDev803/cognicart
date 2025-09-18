// src/app/page.js
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Users, FileLock, Bolt, Search, MessageSquare, Briefcase, Target, BotMessageSquare, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">

      {/* --- REFINED FLOATING NAVBAR --- */}
      <header className="fixed top-4 inset-x-4 z-50 rounded-xl border bg-background/80 shadow-lg backdrop-blur-sm">
        <div className="flex h-14 items-center px-6">
          <Link className="flex items-center justify-center" href="#">
            <span className="text-lg font-semibold">CogniCart</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 sm:gap-4">
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link></Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION (FULL VIEW) --- */}
        <section className="flex min-h-screen w-full items-center justify-center">
          <div className="container text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Unlock Insights, Drive Growth.
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              CogniCart is the AI-powered analytics engine that turns your e-commerce data into actionable intelligence. Make smarter decisions, faster.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button asChild size="lg"><Link href="/register">Get Started for Free</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="#features">Learn More</Link></Button>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION (REDESIGNED WITH CARDS) --- */}
        <section id="features" className="flex min-h-screen w-full items-center justify-center bg-muted/40">
          <div className="container text-center">
            <div className="mb-12 space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
                Our platform is packed with powerful features designed to give you a competitive edge.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="text-left">
                <CardHeader><AreaChart className="mb-2 h-8 w-8 text-primary" /><CardTitle>Advanced Analytics</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Visualize trends and track KPIs with our interactive dashboard.</p></CardContent>
              </Card>
              <Card className="text-left">
                <CardHeader><Users className="mb-2 h-8 w-8 text-primary" /><CardTitle>User Management</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Control access with robust admin and viewer roles.</p></CardContent>
              </Card>
              <Card className="text-left">
                <CardHeader><FileLock className="mb-2 h-8 w-8 text-primary" /><CardTitle>Secure by Design</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Your data is protected with industry-standard security practices.</p></CardContent>
              </Card>
              <Card className="text-left">
                <CardHeader><FileLock className="mb-2 h-8 w-8 text-primary" /><CardTitle>Secure by Design</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Your data is protected with industry-standard security practices.</p></CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* --- "BUILT FOR YOUR ROLE" SECTION (FULL VIEW) --- */}
        <section className="flex min-h-screen w-full items-center justify-center">
          <div className="container text-center">
            <div className="mb-12 space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Use Cases</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built for Your Role</h2>
              <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">CogniCart provides tailored insights for every member of your team.</p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              <Card><CardHeader><Briefcase className="mx-auto h-8 w-8 text-primary" /><CardTitle className="pt-4">E-commerce Owners</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Get a high-level overview of your business health, track revenue, and identify best-selling products instantly.</p></CardContent></Card>
              <Card><CardHeader><Target className="mx-auto h-8 w-8 text-primary" /><CardTitle className="pt-4">Marketing Managers</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Discover trending products to feature in ad campaigns, newsletters, and social media promotions.</p></CardContent></Card>
              <Card><CardHeader><BotMessageSquare className="mx-auto h-8 w-8 text-primary" /><CardTitle className="pt-4">Data Analysts</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Ask complex questions in plain English and get instant answers without manual report generation.</p></CardContent></Card>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA (FULL VIEW) --- */}
        <section className="flex min-h-screen w-full items-center justify-center bg-muted/40">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your Data?</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">Sign up today and start making smarter decisions for your e-commerce business.</p>
            <Button asChild size="lg" className="mt-6"><Link href="/register">Sign Up Now - It&apos;s Free</Link></Button>
          </div>
        </section>
      </main>

      {/* --- RESPONSIVE FOOTER --- */}
      <footer className="border-t">
        <div className="container flex items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between md:px-6">
          <p className="text-xs text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} CogniCart AI. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}