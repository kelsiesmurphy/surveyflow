import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { brand } from "@/lib/constants/brand";
import Footer from "@/components/footer";

export default function AboutUs() {
  return (
    <div className="max-w-7xl flex-1 mx-auto px-4 pt-16 flex flex-col gap-20">
      {/* Intro */}
      <section className="space-y-6 md:space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          About {brand.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {brand.description ||
            "Surveyflow is a simple and intuitive platform for creating surveys, collecting responses, and gaining insights. Our goal is to make feedback easy to gather and actionable."}
        </p>
        <Button asChild>
          <a href="/sign-up">Join the Community</a>
        </Button>
      </section>

      {/* Key Features / Mission */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Build surveys quickly and easily with our intuitive tools.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Gather responses from your audience and keep everything organized.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analyze</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Get insights from your data to make informed decisions.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Call-to-Action */}
      <section className="space-y-6 md:space-y-8 max-w-3xl">
        <h2 className="text-3xl font-semibold">Our Team</h2>
        <p className="text-muted-foreground">
          We're a group of passionate creators and developers building tools to
          make surveys simple, accessible, and actionable for everyone.
        </p>
        <Button asChild>
          <a href="/contact">Contact Us</a>
        </Button>
      </section>

      <Footer />
    </div>
  );
}
