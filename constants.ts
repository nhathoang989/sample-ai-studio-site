
import { Post } from './types';

export const BLOG_POSTS: Post[] = [
  {
    id: '1',
    title: 'Introduction to Mixcore CMS: The .NET Core Powerhouse',
    excerpt: 'Discover why Mixcore CMS is becoming the go-to choice for enterprise-level applications built on ASP.NET Core.',
    content: `Mixcore CMS is an open-source, high-performance CMS built on top of ASP.NET Core. It provides a robust, scalable, and secure foundation for building complex web applications. 

### Why Mixcore?
Mixcore isn't just another CMS. It's designed with the modern developer in mind, leveraging the speed of .NET 8 (and newer) and providing a decoupled architecture that allows for headless or traditional delivery.

- **Performance**: Built on the fastest web framework.
- **Security**: Enterprise-grade security out of the box.
- **Ease of Use**: A clean UI for content managers.
- **Extensibility**: Easily create custom modules and themes.`,
    author: 'Mixcore Team',
    date: 'Oct 15, 2023',
    category: 'Development',
    image: 'https://picsum.photos/seed/mixcore1/800/400',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Headless Capabilities in Mixcore CMS',
    excerpt: 'Learn how to leverage Mixcore as a headless CMS to power your React, Vue, or mobile applications.',
    content: `One of the most powerful features of Mixcore CMS is its built-in API support. You can use Mixcore to manage your content and deliver it via JSON to any front-end framework.

This decoupling allows front-end developers to work independently of the back-end logic, using the tools they love while relying on Mixcore's solid content management features.`,
    author: 'Tech Guru',
    date: 'Nov 02, 2023',
    category: 'Architecture',
    image: 'https://picsum.photos/seed/mixcore2/800/400',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'SEO Best Practices with Mixcore CMS',
    excerpt: 'How Mixcore handles SEO metadata, sitemaps, and performance to ensure your site ranks high.',
    content: `SEO is built into the DNA of Mixcore. From customizable metadata for every page to automatic sitemap generation and high Lighthouse scores, Mixcore gives you the tools to succeed in search rankings.

We'll look at how the built-in SEO tools allow marketing teams to manage everything without developer intervention.`,
    author: 'SEO Specialist',
    date: 'Dec 10, 2023',
    category: 'Marketing',
    image: 'https://picsum.photos/seed/mixcore3/800/400',
    readTime: '4 min read'
  }
];
