import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Users,
  Zap,
  Briefcase,
  Target,
  BotMessageSquare,
  Check,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* Floating Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto rounded-xl border bg-background/80 shadow-lg backdrop-blur-sm">
          <div className="flex h-16 items-center px-6">
            <Link className="flex items-center justify-center gap-2" href="#">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center"> C
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">CogniCart</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-secondary transition-colors hidden md:inline-block"
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="text-sm font-medium hover:text-secondary transition-colors hidden md:inline-block"
              >
                Solutions
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-secondary transition-colors hidden md:inline-block"
              >
                Testimonials
              </Link>
              <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90">
                <Link href="/register">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                <Sparkles className="h-3 w-3 mr-1.5 inline" />
                AI-Powered Analytics Platform
              </Badge>

              <h1 className="text-balance font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
                Transform Data Into <span className="text-gray-400">Actionable Insights</span>
              </h1>

              <p className="text-pretty max-w-[700px] text-lg md:text-xl text-muted-foreground leading-relaxed">
                CogniCart is the AI-powered analytics engine that turns your e-commerce data into intelligent decisions.
                Make smarter choices, faster than ever before.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-base">
                  <Link href="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                  <Link href="#features">See How It Works</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col items-center gap-4 pt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">Trusted by 10,000+ e-commerce businesses</span>
                </div>
              </div>
            </div>

            {/* Hero Visual
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
                <Image
                  src="/modern-analytics-dashboard.png"
                  alt="CogniCart Dashboard Preview"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div> */}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/40">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "50M+", label: "Data Points Analyzed" },
                { value: "4.9/5", label: "Customer Rating" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-gray-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <Badge variant="outline" className="px-4 py-1.5">
                Key Features
              </Badge>
              <h2 className="text-balance font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Everything You Need to Succeed
              </h2>
              <p className="text-pretty max-w-[900px] mx-auto text-lg text-muted-foreground leading-relaxed">
                Our platform is packed with powerful features designed to give you a competitive edge in the e-commerce
                landscape.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Large Feature Card */}
              {/* <Card className="md:col-span-2 lg:col-span-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <AreaChart className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl font-[family-name:var(--font-space-grotesk)]">
                    Advanced Analytics Dashboard
                  </CardTitle>
                  <CardDescription className="text-base">
                    Visualize trends, track KPIs, and monitor your business health with our interactive, real-time
                    dashboard powered by AI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/frontend/public/image1.png"
                    alt="Analytics Dashboard"
                    width={800}
                    height={450}
                    className="rounded-lg border w-full h-auto"
                  />
                </CardContent>
              </Card> */}

              {/* Regular Feature Cards */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <BotMessageSquare className="h-6 w-6 text-gray-400" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-space-grotesk)]">AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Ask questions in plain English and get instant, intelligent answers from your data.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-gray-400" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Enterprise Security</CardTitle>
                  <CardDescription>
                    Your data is protected with industry-leading security practices and compliance standards.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Team Collaboration</CardTitle>
                  <CardDescription>
                    Control access with robust admin and viewer roles. Share insights seamlessly across your team.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-gray-400" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Real-Time Updates</CardTitle>
                  <CardDescription>
                    Get instant notifications and updates as your data changes. Never miss a critical insight.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="md:col-span-2 lg:col-span-1 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <TrendingUp className="h-7 w-7 text-gray-400" />
                  </div>
                  <CardTitle className="text-center font-[family-name:var(--font-space-grotesk)] text-xl">
                    Predictive Analytics
                  </CardTitle>
                  <CardDescription className="text-center">
                    Forecast trends and anticipate customer behavior with machine learning models.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Revenue tracking</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Product performance</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Customer insights</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Growth metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-muted/40">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <Badge variant="outline" className="px-4 py-1.5">
                Solutions
              </Badge>
              <h2 className="text-balance font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Built for Your Role
              </h2>
              <p className="text-pretty max-w-[900px] mx-auto text-lg text-muted-foreground leading-relaxed">
                CogniCart provides tailored insights for every member of your team, from executives to analysts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <Briefcase className="h-7 w-7 text-gray-400" />
                  </div>
                  <CardTitle className="text-center font-[family-name:var(--font-space-grotesk)] text-xl">
                    E-commerce Owners
                  </CardTitle>
                  <CardDescription className="text-center">
                    Get a high-level overview of your business health, track revenue trends, and identify best-selling
                    products instantly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Revenue tracking</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Product performance</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Customer insights</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Growth metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <Target className="h-7 w-7 text-gray-400" />
                  </div>
                  <CardTitle className="text-center font-[family-name:var(--font-space-grotesk)] text-xl">
                    Marketing Managers
                  </CardTitle>
                  <CardDescription className="text-center">
                    Discover trending products to feature in ad campaigns, newsletters, and social media promotions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Campaign analytics</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Trend detection</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Customer segmentation</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>ROI tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <BotMessageSquare className="h-7 w-7 text-gray-400" />
                  </div>
                  <CardTitle className="text-center font-[family-name:var(--font-space-grotesk)] text-xl">
                    Data Analysts
                  </CardTitle>
                  <CardDescription className="text-center">
                    Ask complex questions in plain English and get instant answers without manual report generation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Natural language queries</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Custom reports</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Data visualization</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>Export capabilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <Badge variant="outline" className="px-4 py-1.5">
                Testimonials
              </Badge>
              <h2 className="text-balance font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Loved by Teams Worldwide
              </h2>
              <p className="text-pretty max-w-[900px] mx-auto text-lg text-muted-foreground leading-relaxed">
                See what our customers have to say about transforming their e-commerce analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-secondary text-gray-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-foreground leading-relaxed">
                    &ldquo;CogniCart transformed how we understand our customers. The AI insights are incredibly
                    accurate and actionable.&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-400">SC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Sarah Chen</div>
                      <div className="text-xs text-muted-foreground">CEO, StyleHub</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-secondary text-gray-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-foreground leading-relaxed">
                    &ldquo;We&apos;ve increased our revenue by 40% since implementing CogniCart. The predictive analytics are
                    game-changing.&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-400">MR</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Michael Rodriguez</div>
                      <div className="text-xs text-muted-foreground">Marketing Director, TechGear</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-secondary text-gray-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-foreground leading-relaxed">
                    &ldquo;The natural language queries save me hours every week. I can get answers instantly without
                    writing complex SQL.&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-400">EW</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Emily Watson</div>
                      <div className="text-xs text-muted-foreground">Data Analyst, FreshMarket</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-secondary text-secondary-foreground">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-balance font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Ready to Transform Your Data?
              </h2>
              <p className="text-pretty text-lg md:text-xl text-secondary-foreground/90 leading-relaxed">
                Join thousands of e-commerce businesses making smarter decisions with CogniCart. Start your free trial
                today—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 text-base"
                >
                  <Link href="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 text-base bg-transparent"
                >
                  <Link href="#features">Schedule a Demo</Link>
                </Button>
              </div>
              <p className="text-sm text-secondary-foreground/70">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-[family-name:var(--font-space-grotesk)]">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">C
              </div>
              <span className="font-bold font-[family-name:var(--font-space-grotesk)]">CogniCart</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} CogniCart AI. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
