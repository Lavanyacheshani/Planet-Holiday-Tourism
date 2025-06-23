import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  MapPin,
  FileText,
  Image,
  Star,
  TrendingUp,
  Package,
  Globe,
  BookOpen,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TourPackage {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: string;
  price: number;
  originalPrice?: number;
  category: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  images: Array<{
    url: string;
    alt: string;
    isMain: boolean;
  }>;
  rating: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Destination {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: {
    city: string;
    region: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  images: Array<{
    url: string;
    alt: string;
    isMain: boolean;
  }>;
  rating: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface BlogArticle {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  featuredImage: {
    url: string;
    alt: string;
  };
  author: {
    name: string;
    email: string;
  };
  views: number;
  likes: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    revenue: 0,
    totalTours: 0,
    totalDestinations: 0,
    totalArticles: 0,
    featuredTours: 0,
    featuredDestinations: 0,
    featuredArticles: 0,
  });

  // Mock authentication - replace with real auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email === "admin@planethoday.lk" && password === "admin123") {
      setIsAuthenticated(true);
      setUser({
        id: "1",
        name: "Admin User",
        email: "admin@planethoday.lk",
        role: "admin",
      });
      localStorage.setItem("adminAuth", "true");
    } else {
      alert("Invalid credentials. Use admin@planethoday.lk / admin123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("adminAuth");
  };

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      setUser({
        id: "1",
        name: "Admin User",
        email: "admin@planethoday.lk",
        role: "admin",
      });
    }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load mock data - replace with API calls
      const mockTourPackages: TourPackage[] = [
        {
          _id: "1",
          title: "Cultural Triangle Explorer",
          slug: "cultural-triangle-explorer",
          description:
            "Explore the ancient wonders of Sri Lanka's Cultural Triangle.",
          shortDescription: "Discover ancient temples and historical sites.",
          duration: "5 Days",
          price: 1200,
          originalPrice: 1500,
          category: "Cultural",
          status: "published",
          featured: true,
          images: [
            { url: "/hero/1.jpg", alt: "Cultural Triangle", isMain: true },
          ],
          rating: { average: 4.8, count: 45 },
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
        {
          _id: "2",
          title: "Beach & Wildlife Adventure",
          slug: "beach-wildlife-adventure",
          description: "Combine beach relaxation with wildlife safaris.",
          shortDescription: "Perfect blend of beach and wildlife experiences.",
          duration: "7 Days",
          price: 1800,
          category: "Adventure",
          status: "published",
          featured: false,
          images: [
            { url: "/hero/2.jpg", alt: "Beach & Wildlife", isMain: true },
          ],
          rating: { average: 4.6, count: 32 },
          createdAt: "2024-01-14T14:20:00Z",
          updatedAt: "2024-01-14T14:20:00Z",
        },
      ];

      const mockDestinations: Destination[] = [
        {
          _id: "1",
          name: "Sigiriya",
          slug: "sigiriya",
          description: "Ancient palace and fortress complex.",
          shortDescription: "UNESCO World Heritage site with stunning views.",
          location: {
            city: "Sigiriya",
            region: "Central Province",
            country: "Sri Lanka",
            coordinates: { lat: 7.957, lng: 80.7603 },
          },
          category: "Cultural",
          status: "published",
          featured: true,
          images: [{ url: "/hero/1.jpg", alt: "Sigiriya", isMain: true }],
          rating: { average: 4.9, count: 156 },
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
      ];

      const mockBlogArticles: BlogArticle[] = [
        {
          _id: "1",
          title: "Top 10 Must-Visit Places in Sri Lanka",
          slug: "top-10-must-visit-places-sri-lanka",
          content:
            "Discover the most beautiful and culturally rich destinations...",
          excerpt:
            "A comprehensive guide to the best places to visit in Sri Lanka.",
          category: "Destination Guides",
          status: "published",
          featured: true,
          featuredImage: { url: "/hero/1.jpg", alt: "Sri Lanka Travel" },
          author: { name: "Admin User", email: "admin@planethoday.lk" },
          views: 1250,
          likes: 89,
          publishedAt: "2024-01-15T10:30:00Z",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
      ];

      setTourPackages(mockTourPackages);
      setDestinations(mockDestinations);
      setBlogArticles(mockBlogArticles);
      setStats({
        totalBookings: 156,
        pendingBookings: 23,
        confirmedBookings: 98,
        revenue: 125000,
        totalTours: mockTourPackages.length,
        totalDestinations: mockDestinations.length,
        totalArticles: mockBlogArticles.length,
        featuredTours: mockTourPackages.filter((t) => t.featured).length,
        featuredDestinations: mockDestinations.filter((d) => d.featured).length,
        featuredArticles: mockBlogArticles.filter((a) => a.featured).length,
      });
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (type: string) => {
    setEditingItem({ type, isNew: true });
    setShowCreateModal(true);
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setShowCreateModal(true);
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // Implement delete logic
      console.log(`Deleting ${type} with ID:`, id);
      loadData(); // Reload data
    }
  };

  const handleStatusChange = async (
    id: string,
    status: string,
    type: string
  ) => {
    // Implement status change logic
    console.log(`Changing ${type} status to:`, status);
    loadData(); // Reload data
  };

  const handleFeatureToggle = async (id: string, type: string) => {
    // Implement feature toggle logic
    console.log(`Toggling feature for ${type}:`, id);
    loadData(); // Reload data
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Planet Holiday Tourism</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@planethoday.lk"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo credentials: admin@planethoday.lk / admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Planet Holiday Tourism</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "tour-packages", label: "Tour Packages", icon: Package },
            { id: "destinations", label: "Destinations", icon: Globe },
            { id: "blog", label: "Blog Articles", icon: BookOpen },
            { id: "bookings", label: "Bookings", icon: Calendar },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setActiveSubTab("");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                activeTab === tab.id
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.totalBookings}
                    </p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${stats.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Tour Packages
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.totalTours}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Destinations
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.totalDestinations}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleCreate("tour-package")}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <Plus className="w-5 h-5 text-primary-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      Add Tour Package
                    </p>
                    <p className="text-sm text-gray-500">
                      Create a new tour package
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleCreate("destination")}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Add Destination</p>
                    <p className="text-sm text-gray-500">
                      Add a new destination
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleCreate("blog-article")}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <FileText className="w-5 h-5 text-primary-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Write Article</p>
                    <p className="text-sm text-gray-500">
                      Create a new blog post
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {tourPackages.slice(0, 3).map((tour) => (
                  <div
                    key={tour._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tour.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Tour Package • {tour.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(tour.createdAt).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          tour.status === "published"
                            ? "bg-green-100 text-green-800"
                            : tour.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tour.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tour Packages Tab */}
        {activeTab === "tour-packages" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Tour Packages
              </h2>
              <button
                onClick={() => handleCreate("tour-package")}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
                Add Tour Package
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tour packages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Beach">Beach</option>
                  <option value="Wildlife">Wildlife</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Family">Family</option>
                  <option value="Honeymoon">Honeymoon</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>
            </div>

            {/* Tour Packages List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tour
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tourPackages.map((tour) => (
                      <tr key={tour._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                              <img
                                src={tour.images[0]?.url || "/placeholder.jpg"}
                                alt={tour.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {tour.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {tour.duration}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {tour.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${tour.price}
                          </div>
                          {tour.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              ${tour.originalPrice}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={tour.status}
                            onChange={(e) =>
                              handleStatusChange(
                                tour._id,
                                e.target.value,
                                "tour-package"
                              )
                            }
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border-0 ${
                              tour.status === "published"
                                ? "bg-green-100 text-green-800"
                                : tour.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleFeatureToggle(tour._id, "tour-package")
                            }
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              tour.featured
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {tour.featured ? "Featured" : "Not Featured"}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(tour, "tour-package")}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(tour._id, "tour-package")
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Destinations Tab */}
        {activeTab === "destinations" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
              <button
                onClick={() => handleCreate("destination")}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
                Add Destination
              </button>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <div
                  key={destination._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={destination.images[0]?.url || "/placeholder.jpg"}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {destination.name}
                      </h3>
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {destination.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {destination.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">
                          {destination.rating.average}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(destination, "destination")}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(destination._id, "destination")
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Articles Tab */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Blog Articles
              </h2>
              <button
                onClick={() => handleCreate("blog-article")}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
                Write Article
              </button>
            </div>

            {/* Blog Articles List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Article
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogArticles.map((article) => (
                      <tr key={article._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                              <img
                                src={
                                  article.featuredImage.url ||
                                  "/placeholder.jpg"
                                }
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {article.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {article.excerpt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {article.author.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {article.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={article.status}
                            onChange={(e) =>
                              handleStatusChange(
                                article._id,
                                e.target.value,
                                "blog-article"
                              )
                            }
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border-0 ${
                              article.status === "published"
                                ? "bg-green-100 text-green-800"
                                : article.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleEdit(article, "blog-article")
                              }
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(article._id, "blog-article")
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Google Forms Integration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Form URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://docs.google.com/forms/d/e/..."
                    />
                  </div>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-300">
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem?.isNew ? "Create" : "Edit"}{" "}
                  {editingItem?.type === "tour-package"
                    ? "Tour Package"
                    : editingItem?.type === "destination"
                    ? "Destination"
                    : "Blog Article"}
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form content would go here */}
              <div className="space-y-4">
                <p className="text-gray-600">
                  Form implementation would go here with proper validation and
                  image upload functionality.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    {editingItem?.isNew ? "Create" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
