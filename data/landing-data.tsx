import { Code2, MessageCircle, Sparkles } from "lucide-react";

const landingNavItems = [""]; // TODO

const landingFeatures = [
  {
    title: "Content Pipeline",
    description: "Trace ideas to published content in one place",
    icon: Sparkles,
  },
  {
    title: "AI Assistant",
    description: "Generate captions, ideas, emails & more",
    icon: Sparkles,
  },
  {
    title: "Built for Creators",
    description: "Simple, fast and focused on what matters",
    icon: Sparkles,
  },
  {
    title: "All in One Place",
    description: "Everything you need in a single workspace",
    icon: Sparkles,
  },
];

const footerLinks = [
  {
    label: "Contact",
    icon: MessageCircle,
    to: "mailto:prashantnath6307@gmail.com",
  },
  { label: "GitHub", icon: Code2, to: "https://github.com/prashant00797" },
];

export { footerLinks, landingFeatures, landingNavItems };
