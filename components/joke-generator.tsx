"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Laugh, Copy, RefreshCw } from "lucide-react"
import { getRandomJoke } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type JokeType = "dad" | "pun" | "oneliners" | "knockknock" | "programming"

export default function JokeGenerator() {
  const [joke, setJoke] = useState<string>("Why don't scientists trust atoms? Because they make up everything!")
  const [isLoading, setIsLoading] = useState(false)
  const [jokeType, setJokeType] = useState<JokeType>("dad")
  const { toast } = useToast()

  // Generate a joke on initial load
  useEffect(() => {
    generateJoke()
  }, [])

  // Generate a new joke when joke type changes
  useEffect(() => {
    generateJoke()
  }, [jokeType])

  const generateJoke = async () => {
    setIsLoading(true)
    try {
      const newJoke = await getRandomJoke(jokeType)
      setJoke(newJoke)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch a joke. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joke)
    toast({
      title: "Copied!",
      description: "Joke copied to clipboard",
    })
  }

  return (
    <div className="space-y-4 mb-6">
      <Tabs defaultValue="dad" className="w-full" onValueChange={(value) => setJokeType(value as JokeType)}>
        <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full bg-amber-100/90 p-1 text-xs sm:text-sm">
          <TabsTrigger value="dad" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Dad Jokes
          </TabsTrigger>
          <TabsTrigger value="pun" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Puns
          </TabsTrigger>
          <TabsTrigger value="oneliners" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            One-liners
          </TabsTrigger>
          <TabsTrigger
            value="knockknock"
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white hidden sm:block"
          >
            Knock-knock
          </TabsTrigger>
          <TabsTrigger
            value="programming"
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white hidden sm:block"
          >
            Programming
          </TabsTrigger>
        </TabsList>

        {/* Additional row for mobile */}
        <TabsList className="grid grid-cols-2 w-full bg-amber-100/90 p-1 text-xs sm:hidden mt-1">
          <TabsTrigger value="knockknock" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Knock-knock
          </TabsTrigger>
          <TabsTrigger value="programming" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Programming
          </TabsTrigger>
        </TabsList>

        <Card className="shadow-lg border-amber-400 bg-white/95 mt-3">
          <CardContent className="pt-6">
            <div className="min-h-[120px] flex items-center justify-center p-4">
              {isLoading ? (
                <div className="animate-spin">
                  <RefreshCw className="h-8 w-8 text-amber-500" />
                </div>
              ) : (
                <p className="text-base sm:text-xl text-center animate-fadeIn">{joke}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </Tabs>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={generateJoke}
          disabled={isLoading}
          className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-md transform transition-transform hover:scale-105"
        >
          <Laugh className="mr-2 h-4 w-4" />
          New Joke
        </Button>

        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="border-amber-500 text-amber-700 hover:bg-amber-100 shadow-md transform transition-transform hover:scale-105"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>
    </div>
  )
}
