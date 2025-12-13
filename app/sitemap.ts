import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.nordiskdev.se',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1.0,

        },
        {
            url: 'https://www.nordiskdev.se/team',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,       
        },
        {
            url: 'https://www.nordiskdev.se/kontakt',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,       
        }
    ]
}