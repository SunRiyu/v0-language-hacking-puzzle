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
                ゲーム開始
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            古代言語を解放しましょう
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            言語学パズルを解いて、失われた言語の秘密を発見しましょう。
            翻訳から暗号解読まで、難易度が上がるパズルに挑戦してください。
          </p>
          <Link href="/game">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              旅を始める
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
              <CardTitle>複数の言語</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                5以上の古代言語と人工言語のパズルを探索
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20 mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>スキル習得</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                翻訳、解読、文法、文献パズルをマスター
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/20 mb-4">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>AI解説</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                各パズルの詳細なAI駆動言語学的解説
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-destructive/10 mb-4">
                <Globe className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle>段階的解放</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                進行に応じて新しい言語と難易度をアンロック
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">ゲーム機能</CardTitle>
              <CardDescription>Go-genで体験できること</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm">1</span>
                    翻訳パズル
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    古代のテキストを現代日本語に翻訳してください。言語学的パターンと語彙の理解をテストします。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm">2</span>
                    解読パズル
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    エンコードされたメッセージと置換暗号を破ります。暗号化の知識を使って隠された意味を明かしてください。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-sm">3</span>
                    文法パターン
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    文法構造をマスターしてください。言語学的例からパターンとルールを識別します。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/20 text-destructive text-sm">4</span>
                    文献引用
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    古代言語の有名な引用句を完成させてください。歴史的テキストの知識をテストします。
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
                言語学の達人になる準備はできていますか？
              </h3>
              <Link href="/game">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary/20">
                  今すぐプレイ
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
            Go-gen © 2025. 古代言語パズルゲーム。
          </p>
        </div>
      </footer>
    </div>
  );
}
