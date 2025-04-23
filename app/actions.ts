"use server"

type JokeType = "dad" | "pun" | "oneliners" | "knockknock" | "programming"

export async function getRandomJoke(jokeType: JokeType = "dad"): Promise<string> {
  try {
    // Different APIs for different joke types
    switch (jokeType) {
      case "dad":
        return await fetchDadJoke()
      case "programming":
        return await fetchProgrammingJoke()
      case "oneliners":
        return await fetchOneLiners()
      case "pun":
        return await fetchPunJoke()
      case "knockknock":
        return await fetchKnockKnockJoke()
      default:
        return await fetchDadJoke()
    }
  } catch (error) {
    console.error("Error fetching joke:", error)
    return getFallbackJoke(jokeType)
  }
}

// Dad jokes from icanhazdadjoke API
async function fetchDadJoke(): Promise<string> {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch dad joke")
  }

  const data = await response.json()
  return data.joke
}

// Programming jokes from JokeAPI
async function fetchProgrammingJoke(): Promise<string> {
  const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single&safe-mode", {
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch programming joke")
  }

  const data = await response.json()

  // JokeAPI returns either a single joke or a setup/delivery format
  if (data.type === "single") {
    return data.joke
  } else {
    return `${data.setup} ${data.delivery}`
  }
}

// One-liners from the Official Joke API
async function fetchOneLiners(): Promise<string> {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke", {
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch one-liner")
  }

  const data = await response.json()
  return `${data.setup} ${data.punchline}`
}

// Pun jokes from JokeAPI
async function fetchPunJoke(): Promise<string> {
  const response = await fetch("https://v2.jokeapi.dev/joke/Pun?type=single&safe-mode", {
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch pun joke")
  }

  const data = await response.json()

  if (data.type === "single") {
    return data.joke
  } else {
    return `${data.setup} ${data.delivery}`
  }
}

// Knock-knock jokes - using a custom API
async function fetchKnockKnockJoke(): Promise<string> {
  // Try to fetch from a joke API that might have knock-knock jokes
  try {
    const response = await fetch("https://official-joke-api.appspot.com/jokes/knock-knock/random", {
      headers: {
        Accept: "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        return `${data[0].setup} ${data[0].punchline}`
      }
    }
  } catch (error) {
    console.error("Error fetching knock-knock joke:", error)
  }

  // Fallback to our predefined knock-knock jokes
  return getFallbackJoke("knockknock")
}

function getFallbackJoke(jokeType: JokeType): string {
  const jokes = {
    dad: [
      "I'm reading a book about anti-gravity. It's impossible to put down!",
      "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "What do you call a fake noodle? An impasta!",
      "Why don't scientists trust atoms? Because they make up everything!",
      "How do you organize a space party? You planet!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I would tell you a chemistry joke but I know I wouldn't get a reaction.",
      "Why don't eggs tell jokes? They'd crack each other up.",
      "I'm on a seafood diet. I see food and I eat it!",
    ],
    pun: [
      "I was wondering why the ball was getting bigger. Then it hit me.",
      "I used to be a baker, but I couldn't make enough dough.",
      "Velcro—what a rip-off!",
      "The shovel was a ground-breaking invention.",
      "I'm friends with all electricians. We have great current connections.",
      "I'm reading a book on the history of glue. I just can't seem to put it down.",
      "The future, the present, and the past walked into a bar. Things got a little tense.",
      "I tried to sue the airport for misplacing my luggage. I lost my case.",
      "I used to be addicted to the hokey pokey, but I turned myself around.",
      "I was going to tell a time-traveling joke, but you didn't like it.",
    ],
    oneliners: [
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "Parallel lines have so much in common. It's a shame they'll never meet.",
      "My wife told me to stop impersonating a flamingo. I had to put my foot down.",
      "I wasn't originally going to get a brain transplant, but then I changed my mind.",
      "It takes a lot of balls to golf the way I do.",
      "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
      "The problem with kleptomaniacs is that they always take things literally.",
      "I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
      "I can't believe I got fired from the calendar factory. All I did was take a day off!",
      "Most people are shocked when they find out how bad I am as an electrician.",
    ],
    knockknock: [
      "Knock knock. Who's there? Lettuce. Lettuce who? Lettuce in, it's cold out here!",
      "Knock knock. Who's there? Boo. Boo who? Don't cry, it's just a joke!",
      "Knock knock. Who's there? Cow says. Cow says who? No, a cow says mooooo!",
      "Knock knock. Who's there? Atch. Atch who? Bless you!",
      "Knock knock. Who's there? Olive. Olive who? Olive you and I don't care who knows it!",
      "Knock knock. Who's there? Tank. Tank who? You're welcome!",
      "Knock knock. Who's there? Hawaii. Hawaii who? I'm fine, Hawaii you?",
      "Knock knock. Who's there? Woo. Woo who? Don't get so excited, it's just a joke!",
      "Knock knock. Who's there? Banana. Banana who? Knock knock. Who's there? Banana. Banana who? Knock knock. Who's there? Orange. Orange who? Orange you glad I didn't say banana?",
      "Knock knock. Who's there? Interrupting cow. Interrupting cow w— MOOOOO!",
    ],
    programming: [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
      "Why do Java developers wear glasses? Because they don't C#.",
      "There are 10 types of people in the world: those who understand binary, and those who don't.",
      "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
      "What's the object-oriented way to become wealthy? Inheritance.",
      "Why did the developer go broke? Because he used up all his cache.",
      "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25.",
      "A programmer's wife tells him: 'Run to the store and pick up a loaf of bread. If they have eggs, get a dozen.' The programmer comes home with 12 loaves of bread.",
    ],
  }

  const selectedJokes = jokes[jokeType]
  return selectedJokes[Math.floor(Math.random() * selectedJokes.length)]
}
