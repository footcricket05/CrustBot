import fs from 'fs/promises';
import path from 'path';

const KNOWLEDGE_BASE_DIR = './knowledge_base';

export async function enrichKnowledgeBase(newContent) {
  try {
    // Ensure directory exists
    await fs.mkdir(KNOWLEDGE_BASE_DIR, { recursive: true });

    // Save new content with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(KNOWLEDGE_BASE_DIR, `content-${timestamp}.json`);
    
    await fs.writeFile(filename, JSON.stringify(newContent, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error enriching knowledge base:', error);
    return false;
  }
}