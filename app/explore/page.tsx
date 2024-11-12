"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import ReactCountryFlag from "react-country-flag"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Function to generate mock posts with more diverse content
const generateMockPosts = (count) => {
  const countries = [
    { name: "Japan", code: "JP", tags: ["Cherry Blossoms", "Mount Fuji", "Sushi"] },
    { name: "Italy", code: "IT", tags: ["Colosseum", "Venice", "Pizza"] },
    { name: "France", code: "FR", tags: ["Eiffel Tower", "Louvre", "Croissant"] },
    { name: "United States", code: "US", tags: ["Grand Canyon", "New York", "BBQ"] },
    { name: "Australia", code: "AU", tags: ["Great Barrier Reef", "Sydney Opera House", "Kangaroo"] },
    { name: "Brazil", code: "BR", tags: ["Amazon Rainforest", "Rio Carnival", "Soccer"] },
    { name: "Egypt", code: "EG", tags: ["Pyramids", "Nile River", "Hieroglyphs"] },
    { name: "India", code: "IN", tags: ["Taj Mahal", "Yoga", "Curry"] },
    { name: "China", code: "CN", tags: ["Great Wall", "Forbidden City", "Dim Sum"] },
    { name: "South Africa", code: "ZA", tags: ["Safari", "Table Mountain", "Braai"] }
  ]

  return Array.from({ length: count }, (_, i) => {
    const country = countries[i % countries.length]
    const randomTag = country.tags[Math.floor(Math.random() * country.tags.length)]
    return {
      id: i + 1,
      user: {
        name: `Traveler ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      },
      ...country,
      content: `Exploring the wonders of ${country.name}! Can't get enough of the ${randomTag}. #Travel #${country.name} #${randomTag.replace(/\s+/g, '')}`,
      images: [
        `https://source.unsplash.com/featured/?${country.name},landmark`,
        `https://source.unsplash.com/featured/?${country.name},culture`,
        `https://source.unsplash.com/featured/?${country.name},food`
      ],
      likes: Math.floor(Math.random() * 1000) + 50,
      comments: Math.floor(Math.random() * 100) + 5,
      shares: Math.floor(Math.random() * 50) + 1,
    }
  })
}

const mockPosts = generateMockPosts(50)

export default function ExplorePage() {
  const [posts, setPosts] = useState(mockPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Loading amazing adventures...</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Adventures</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{post.user.name}</CardTitle>
                  <div className="flex items-center">
                    <ReactCountryFlag 
                      countryCode={post.code} 
                      svg 
                      style={{
                        width: '1em',
                        height: '1em',
                        marginRight: '0.5em'
                      }}
                    />
                    <span>{post.name}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              <Carousel className="w-full">
                <CarouselContent>
                  {post.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={image}
                          alt={`${post.name} ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => handleLike(post.id)}>
                <Heart className="mr-2 h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost">
                <MessageCircle className="mr-2 h-4 w-4" />
                {post.comments}
              </Button>
              <Button variant="ghost">
                <Share2 className="mr-2 h-4 w-4" />
                {post.shares}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}