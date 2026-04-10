import { useState, useEffect } from 'react';
import enContent from '../content/course/en.json';
import zhContent from '../content/course/zh.json';

const CONTENT_MAP = {
  en: enContent,
  zh: zhContent,
};

/**
 * Hook to load course content based on language
 * 
 * @param {string} lang - Language code ('en' or 'zh')
 * @returns {Object} Content for the specified language
 */
export function useCourseContent(lang) {
  const [content, setContent] = useState(CONTENT_MAP[lang] || zhContent);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // In the future, this could fetch from an API or CMS
    const newContent = CONTENT_MAP[lang] || zhContent;
    setContent(newContent);
    setIsLoading(false);
  }, [lang]);

  return { content, isLoading };
}

/**
 * Get content synchronously (for SSR or when you don't need loading state)
 * 
 * @param {string} lang - Language code ('en' or 'zh')
 * @returns {Object} Content for the specified language
 */
export function getCourseContent(lang) {
  return CONTENT_MAP[lang] || zhContent;
}

/**
 * Get SEO configuration for a language
 * 
 * @param {string} lang - Language code ('en' or 'zh')
 * @returns {Object} SEO configuration
 */
export function getCourseSEO(lang) {
  const content = CONTENT_MAP[lang] || zhContent;
  return content.seo;
}
