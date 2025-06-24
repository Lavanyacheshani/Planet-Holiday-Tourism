import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Sigiriya Rock Fortress',
    content: `Sigiriya Rock Fortress is one of Sri Lanka's most iconic landmarks, rising dramatically from the central plains. This ancient citadel, also known as Lion Rock, was once the royal palace of King Kashyapa. Today, it is a UNESCO World Heritage Site and a must-visit for travelers seeking history, adventure, and breathtaking views.\n\n**Highlights:**\n- Climb the 1,200 steps to the summit for panoramic views.\n- Marvel at the ancient frescoes and the Mirror Wall.\n- Explore the water gardens and boulder gardens at the base.\n- Learn about the fascinating history and legends surrounding the site.\n\n**Best Time to Visit:**\nThe best time to visit Sigiriya is early morning or late afternoon to avoid the midday heat. The dry season (December to April) offers the most comfortable climbing conditions.\n\n**Insider Tips:**\n- Wear comfortable shoes and bring water.\n- Take your time to enjoy the scenery and historical features.\n- Don't miss the museum at the entrance for more context.`,
    image: '/des/1.jpg',
    author: 'Rajesh Fernando',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'cultural',
    tags: ['Sigiriya', 'Culture', 'History', 'Ancient Sites'],
  },
  {
    id: 2,
    title: 'Best Beaches in Sri Lanka: A Complete Guide',
    content: `Sri Lanka is home to some of the world's most beautiful beaches, each offering its own unique charm. From the lively shores of Unawatuna to the tranquil sands of Mirissa, there's a beach for every traveler.\n\n**Top Beaches:**\n- Unawatuna: Great for swimming and nightlife.\n- Mirissa: Perfect for whale watching and relaxing.\n- Arugam Bay: A surfer's paradise.\n- Nilaveli: Pristine and less crowded.\n\n**Travel Tips:**\n- Visit during the dry season for the best weather.\n- Try local seafood at beachside restaurants.\n- Respect local customs and keep beaches clean.`,
    image: '/blog/2.jpg',
    author: 'Priya Wickramasinghe',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'travel-tips',
    tags: ['Beaches', 'Surfing', 'Coast', 'Travel Tips'],
  },
  {
    id: 3,
    title: 'Wildlife Safari: Your Guide to Yala National Park',
    content: `Yala National Park is Sri Lanka's premier wildlife destination, famous for its high density of leopards. The park is also home to elephants, sloth bears, crocodiles, and hundreds of bird species.\n\n**Safari Highlights:**\n- Early morning and late afternoon are the best times for wildlife sightings.\n- Book a guided jeep safari for the best experience.\n- Bring binoculars and a camera with a zoom lens.\n\n**Conservation Note:**\nRespect the park's rules and never disturb the animals. Responsible tourism helps protect this incredible ecosystem.`,
    image: '/blog/3.jpg',
    author: 'Chaminda Silva',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'wildlife',
    tags: ['Safari', 'Wildlife', 'Yala', 'National Parks'],
  },
  {
    id: 4,
    title: 'Tea Country Adventures: Ella and Beyond',
    content: `The hill country of Sri Lanka is a lush, green paradise dotted with tea plantations, waterfalls, and scenic train rides. Ella is the gateway to this region, offering hiking, relaxation, and stunning views.\n\n**Must-Do Activities:**\n- Hike to Little Adam's Peak and Ella Rock.\n- Visit the iconic Nine Arches Bridge.\n- Tour a working tea factory and sample fresh Ceylon tea.\n- Take the train from Kandy to Ella for breathtaking scenery.`,
    image: '/blog/4.jpg',
    author: 'Rajesh Fernando',
    date: '2023-12-28',
    readTime: '6 min read',
    category: 'adventure',
    tags: ['Tea Country', 'Ella', 'Hiking', 'Mountains'],
  },
  {
    id: 5,
    title: "Sri Lankan Cuisine: A Food Lover's Paradise",
    content: `Sri Lankan cuisine is a vibrant blend of flavors, spices, and fresh ingredients. From street food to fine dining, every meal is an adventure.\n\n**Must-Try Dishes:**\n- Rice and curry: The staple meal, with endless variations.\n- Hoppers: Bowl-shaped pancakes, often eaten for breakfast.\n- Kottu: Chopped roti stir-fried with vegetables, eggs, and meat.\n- Seafood: Fresh and delicious along the coast.\n\n**Foodie Tips:**\n- Don't be afraid to try spicy dishes.\n- Visit local markets for authentic flavors.\n- Take a cooking class to learn the secrets of Sri Lankan food.`,
    image: '/blog/5.jpg',
    author: 'Priya Wickramasinghe',
    date: '2023-12-20',
    readTime: '7 min read',
    category: 'food',
    tags: ['Food', 'Cuisine', 'Street Food', 'Restaurants'],
  },
  {
    id: 6,
    title: 'Budget Travel Guide to Sri Lanka',
    content: `Traveling Sri Lanka on a budget is easier than you think. With affordable guesthouses, public transport, and delicious street food, you can experience the island's wonders without overspending.\n\n**Budget Tips:**\n- Use trains and buses for cheap, scenic travel.\n- Eat at local eateries for authentic and affordable meals.\n- Stay in guesthouses or hostels for the best value.\n- Plan ahead for popular attractions to get the best deals.`,
    image: '/blog/6.webp',
    author: 'Chaminda Silva',
    date: '2023-12-15',
    readTime: '15 min read',
    category: 'travel-tips',
    tags: ['Budget Travel', 'Backpacking', 'Tips', 'Affordable'],
  },
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Link to="/blog" className="text-primary-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-8">
          <ArrowLeft className="w-5 h-5" /> Back to Blog
        </Link>
        <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded-2xl mb-8 shadow-lg" />
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-6 text-gray-500 mb-6">
          <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString()}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs flex items-center gap-1">
              <Tag className="w-3 h-3" />{tag}
            </span>
          ))}
        </div>
        <div className="prose max-w-none text-lg text-gray-800 mb-12">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 