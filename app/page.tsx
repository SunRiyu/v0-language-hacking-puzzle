'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Zap, Globe, Brain } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Go-gen</h1>
            </div>
            <Link href="/game">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Playing
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Unlock Ancient Languages
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Solve linguistic puzzles and discover the secrets of forgotten languages. 
            From translations to cipher breaking, challenge yourself with puzzles of increasing difficulty.
          </p>
          <Link href="/game">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Begin Your Journey
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Multiple Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore puzzles across 5+ ancient and constructed languages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20 mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Skill Building</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Master translation, decipherment, grammar, and literary puzzles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 mb-4">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>AI Explanations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get detailed AI-powered linguistic explanations for each puzzle
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-destructive/10 mb-4">
                <Globe className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle>Progressive Unlock</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unlock new languages and difficulties as you progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Game Features</CardTitle>
              <CardDescription>What you'll experience in Go-gen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm">1</span>
                    Translation Puzzles
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Translate ancient texts into modern English. Test your understanding of linguistic patterns and vocabulary.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm">2</span>
                    Decipherment
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Crack encoded messages and substitution ciphers. Use cryptographic knowledge to reveal hidden meanings.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-sm">3</span>
                    Grammar Patterns
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Master grammatical structures. Identify patterns and rules from linguistic examples.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/20 text-destructive text-sm">4</span>
                    Literary Quotes
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Complete famous quotations in ancient languages. Test your knowledge of historical texts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary to-accent border-0">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                Ready to become a master linguist?
              </h3>
              <Link href="/game">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary/20">
                  Start Playing Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Go-gen © 2025. An ancient language puzzle game.
          </p>
        </div>
      </footer>
    </div>
  );
}
