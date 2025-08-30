import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  Heart,
  Leaf,
  Users,
  Globe,
  GraduationCap,
  Star,
  Award,
  MapPin,
  TrendingUp,
  LogIn,
  LogOut
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const impactAreas = [
    {
      icon: Leaf,
      title: "Empowering Farmers",
      description: "Strengthening farmer organisations and promoting sustainable agricultural practices.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Users,
      title: "Fostering Rural Entrepreneurship",
      description: "Cultivating local economic growth through skilled village-level entrepreneurs.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Globe,
      title: "Addressing Climate Change",
      description: "Building climate literacy and sustainable communities through green solutions.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: GraduationCap,
      title: "Advancing Education & Healthcare",
      description: "Investing in human capital for healthier and more knowledgeable communities.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ]

  const stats = [
    { label: "Villages Reached", value: "128+", icon: MapPin, color: "text-green-600" },
    { label: "Farmers Empowered", value: "2,560+", icon: Users, color: "text-blue-600" },
    { label: "Community Groups", value: "45+", icon: TrendingUp, color: "text-emerald-600" },
    { label: "Years of Impact", value: "5+", icon: Award, color: "text-purple-600" }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Farmer Leader",
      village: "Krishnapur",
      content: "Reaching Roots helped us form a strong farmers' group. Now we get better prices for our produce.",
      image: "/woman.jpeg"
    },
    {
      name: "Priya Devi",
      role: "VLE Coordinator",
      village: "Mahila Mandal",
      content: "The training programs have empowered our women to start their own businesses.",
      image: "/woman.jpeg"
    },
    {
      name: "Amit Singh",
      role: "Community Leader",
      village: "Green Valley",
      content: "Climate change workshops have made our village more resilient to environmental challenges.",
      image: "/woman.jpeg"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">🌾</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Reaching Roots</h1>
              <p className="text-sm text-gray-600">Village Data System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Welcome, {user?.name}</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs capitalize">
                    {user?.role}
                  </span>
                </div>
                <Button asChild variant="outline">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={handleLogout} variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Paddy Field Background */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/paddy.jpeg" 
            alt="Paddy Field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Rooted in Purpose, Growing Together
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Rooted in Purpose,{" "}
            <span className="text-green-300">Growing Together</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Reaching Roots aims to create a societal impact through evidence-based and community-driven interventions 
            at the intersection of agriculture, entrepreneurship, and climate change.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Link to="/dashboard">
                  Access Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Link to="/login">
                  Login to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Button asChild variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-green-600">
                <Link to="/village-onboarding">
                  Start Village Onboarding
                </Link>
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section with Crop Cutting Image */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                A thriving and resilient community where every individual learns, earns, and lives sustainably by 2030
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">Sustainable Growth</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Community Impact</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/crop cutting.jpg" 
                alt="Crop Harvesting" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Impact Areas */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Impact Areas
            </h2>
            <p className="text-xl text-gray-600">
              The Pillars of Change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area) => (
              <Card key={area.title} className={`${area.bgColor} ${area.borderColor} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${area.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <area.icon className={`w-8 h-8 ${area.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {area.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Farming Section with Bullock Image */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/bullock.jpeg" 
                alt="Traditional Farming" 
                className="rounded-2xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Preserving Traditions, Embracing Innovation
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                We bridge the gap between traditional farming practices and modern agricultural technology, 
                ensuring sustainable development while respecting cultural heritage.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Traditional farming knowledge preservation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Modern agricultural technology integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Sustainable farming practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Community Voices
            </h2>
            <p className="text-xl text-gray-600">
              Hear from the people whose lives we've touched
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-green-600">{testimonial.village}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-green-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-white rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-6">🌱</div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join us in creating sustainable communities and empowering rural India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Button asChild size="lg" variant="secondary" className="px-8 py-3">
                  <Link to="/dashboard">
                    Access Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                {user?.role === 'admin' && (
                  <Button asChild size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-green-600">
                    <Link to="/village-onboarding">
                      Start Village Onboarding
                    </Link>
                  </Button>
                )}
                {user?.role === 'vle' && (
                  <Button asChild size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-green-600">
                    <Link to="/log-income">
                      Log Income
                    </Link>
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button asChild size="lg" variant="secondary" className="px-8 py-3">
                  <Link to="/login">
                    Login to Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-green-600">
                  <Link to="/login">
                    Explore Dashboard
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 